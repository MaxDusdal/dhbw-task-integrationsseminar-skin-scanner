/**
 * Represents a single saved skin analysis result, including metadata,
 * classification output, and optional image/explanation data.
 */
export interface SavedAnalysis {
  id: string;
  savedAt: string; // ISO string
  location: string;
  notes: string;
  trackedLesionId?: string;
  result: {
    top_class: string;
    top_name: string;
    confidence: number;
    high_risk: boolean;
    probabilities: Record<string, number>;
    tta: boolean;
  };
  image?: string; // base64 data URL, omitted if storage is tight
  explanation?: string; // cached German explanation from OpenAI
}

/**
 * A named lesion that the user is monitoring over time.
 * Multiple SavedAnalysis entries can be linked to one TrackedLesion.
 */
export interface TrackedLesion {
  id: string;
  name: string;
  createdAt: string; // ISO string
}

/** localStorage key used to persist the analysis history array. */
const HISTORY_KEY = "dermasense_history";
/** localStorage key used to persist the tracked-lesion array. */
const TRACKING_KEY = "dermasense_tracking";

// ── History ──────────────────────────────────────────────────────────────────

/** Reads and deserialises the analysis history from localStorage. Returns an empty array on error or during SSR. */
function readHistory(): SavedAnalysis[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as SavedAnalysis[]) : [];
  } catch {
    return [];
  }
}

/** Serialises and writes the full analysis history array to localStorage. */
function writeHistory(entries: SavedAnalysis[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
}

/** Returns the full analysis history, newest entries first. */
export function getHistory(): SavedAnalysis[] {
  return readHistory();
}

/**
 * Persists a new analysis entry to localStorage.
 * If writing fails due to a storage quota error, the image is stripped
 * and the write is retried to stay within quota.
 *
 * @param entry - Analysis data excluding auto-generated `id` and `savedAt`.
 * @returns The complete SavedAnalysis object that was stored.
 */
export function saveAnalysis(
  entry: Omit<SavedAnalysis, "id" | "savedAt">
): SavedAnalysis {
  const newEntry: SavedAnalysis = {
    ...entry,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  };

  const history = readHistory();
  history.unshift(newEntry); // prepend so the list stays newest-first

  try {
    writeHistory(history);
  } catch {
    // Quota exceeded, retry without image
    newEntry.image = undefined;
    history[0] = newEntry;
    writeHistory(history);
  }

  return newEntry;
}

/**
 * Applies a partial update to an existing analysis entry.
 * Only the fields in `patch` are changed; all others are preserved.
 *
 * @param id    - ID of the analysis to update.
 * @param patch - Fields to overwrite (location, notes, trackedLesionId, or explanation).
 */
export function updateAnalysis(
  id: string,
  patch: Partial<Pick<SavedAnalysis, "location" | "notes" | "trackedLesionId" | "explanation">>
): void {
  writeHistory(readHistory().map((e) => (e.id === id ? { ...e, ...patch } : e)));
}

/**
 * Permanently removes an analysis entry from history.
 *
 * @param id - ID of the analysis to delete.
 */
export function deleteAnalysis(id: string): void {
  writeHistory(readHistory().filter((e) => e.id !== id));
}

// ── Tracked lesions ───────────────────────────────────────────────────────────
/** Reads and deserialises the tracked-lesion list from localStorage. Returns an empty array on error or during SSR. */
function readTrackedLesions(): TrackedLesion[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TRACKING_KEY);
    return raw ? (JSON.parse(raw) as TrackedLesion[]) : [];
  } catch {
    return [];
  }
}

/** Serialises and writes the full tracked-lesion array to localStorage. */
function writeTrackedLesions(lesions: TrackedLesion[]) {
  localStorage.setItem(TRACKING_KEY, JSON.stringify(lesions));
}

/** Returns all tracked lesions, newest first. */
export function getTrackedLesions(): TrackedLesion[] {
  return readTrackedLesions();
}

/**
 * Looks up a single tracked lesion by ID.
 *
 * @param id - ID of the lesion to find.
 * @returns The matching TrackedLesion, or `undefined` if not found.
 */
export function getTrackedLesion(id: string): TrackedLesion | undefined {
  return readTrackedLesions().find((l) => l.id === id);
}

/**
 * Creates and persists a new TrackedLesion entry.
 * Falls back to "Unbenannte Läsion" if `name` is blank.
 *
 * @param name - Display name for the new lesion.
 * @returns The newly created TrackedLesion object.
 */
export function createTrackedLesion(name: string): TrackedLesion {
  const lesion: TrackedLesion = {
    id: crypto.randomUUID(),
    name: name.trim() || "Unbenannte Läsion",
    createdAt: new Date().toISOString(),
  };
  const lesions = readTrackedLesions();
  lesions.unshift(lesion); // prepend so the list stays newest-first
  writeTrackedLesions(lesions);
  return lesion;
}

/**
 * Deletes a tracked lesion and unlinks it from any associated analyses.
 * Analyses themselves are kept; only their `trackedLesionId` is cleared.
 *
 * @param id - ID of the lesion to delete.
 */
export function deleteTrackedLesion(id: string): void {
  writeTrackedLesions(readTrackedLesions().filter((l) => l.id !== id));
  // Unlink all analyses that referenced this lesion
  writeHistory(
    readHistory().map((e) =>
      e.trackedLesionId === id ? { ...e, trackedLesionId: undefined } : e
    )
  );
}

/**
 * Returns all analyses that have been linked to a specific tracked lesion,
 * in the order they appear in history (newest first).
 *
 * @param lesionId - ID of the lesion to filter by.
 */
export function getAnalysesForLesion(lesionId: string): SavedAnalysis[] {
  return readHistory().filter((e) => e.trackedLesionId === lesionId);
}
