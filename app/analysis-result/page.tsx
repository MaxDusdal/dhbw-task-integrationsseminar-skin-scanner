"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  saveAnalysis,
  updateAnalysis,
  createTrackedLesion,
  getTrackedLesions,
  type SavedAnalysis,
  type TrackedLesion,
} from "@/lib/history";

interface PredictionResult {
  top_class: string;
  top_name: string;
  confidence: number;
  high_risk: boolean;
  probabilities: Record<string, number>;
  tta: boolean;
}

const CLASS_NAMES_DE: Record<string, string> = {
  mel: "Melanom",
  bcc: "Basalzellkarzinom",
  akiec: "Aktinische Keratose / Intraepith. Karzinom",
  nv: "Melanozytischer Nävus",
  bkl: "Benigne Keratose",
  df: "Dermatofibrom",
  vasc: "Vaskuläre Läsion",
};

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-background border rounded-lg shadow-xl w-full max-w-md mx-4 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-base">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AnalysisResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // savedEntryRef prevents the analysis from being written twice when React
  // Strict Mode double-invokes effects. savedId is the state-visible copy used
  // to wire up the notes/tracking mutations after the entry is persisted.
  const savedEntryRef = useRef<SavedAnalysis | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Modal state
  const [notesOpen, setNotesOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);

  // Notes fields
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [metaUpdated, setMetaUpdated] = useState(false);

  // Tracking state
  const [tracked, setTracked] = useState(false);
  const [trackedLesion, setTrackedLesion] = useState<TrackedLesion | null>(null);
  const [existingLesions, setExistingLesions] = useState<TrackedLesion[]>([]);

  // Combobox state
  const [comboValue, setComboValue] = useState("");
  const [comboOpen, setComboOpen] = useState(false);
  const [selectedExisting, setSelectedExisting] = useState<TrackedLesion | null>(null);
  const comboRef = useRef<HTMLDivElement>(null);

  // Explanation state
  const [explanation, setExplanation] = useState<string | null>(null);
  const [explanationLoading, setExplanationLoading] = useState(false);
  const explainCalledRef = useRef(false);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (comboRef.current && !comboRef.current.contains(e.target as Node)) {
        setComboOpen(false);
      }
    }
    if (comboOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [comboOpen]);

  // Load result from sessionStorage and auto-save once
  useEffect(() => {
    const storedResult = sessionStorage.getItem("analysisResult");
    const storedImage = sessionStorage.getItem("analysisImage");

    if (!storedResult) {
      router.push("/camera");
      return;
    }

    const parsed: PredictionResult = JSON.parse(storedResult);
    setResult(parsed);
    if (storedImage) setCapturedImage(storedImage);

    setExistingLesions(getTrackedLesions());

    // If the user initiated this scan from a tracking page, the lesion ID was
    // stored in sessionStorage before navigation so we can attach the new
    // analysis to the correct tracked lesion automatically.
    const pendingTrackId = sessionStorage.getItem("dermasense_pending_track_id");

    if (!savedEntryRef.current) {
      const entry = saveAnalysis({
        location: "Nicht angegeben",
        notes: "",
        result: parsed,
        image: storedImage ?? undefined,
        trackedLesionId: pendingTrackId ?? undefined,
      });
      savedEntryRef.current = entry;
      setSavedId(entry.id);

      // Fetch explanation (guard against Strict Mode double-fetch)
      if (!explainCalledRef.current) {
        explainCalledRef.current = true;
        setExplanationLoading(true);
        fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            top_class: parsed.top_class,
            top_name: parsed.top_name,
            confidence: parsed.confidence,
            high_risk: parsed.high_risk,
            probabilities: parsed.probabilities,
          }),
        })
          .then((res) => res.json())
          .then((data: { explanation?: string }) => {
            const text = data.explanation ?? null;
            setExplanation(text);
            if (text && entry.id) {
              updateAnalysis(entry.id, { explanation: text });
            }
          })
          .catch(() => {
            // explanation is non-critical, silent failure
          })
          .finally(() => setExplanationLoading(false));
      }

      if (pendingTrackId) {
        sessionStorage.removeItem("dermasense_pending_track_id");
        const lesions = getTrackedLesions();
        const lesion = lesions.find((l) => l.id === pendingTrackId);
        if (lesion) {
          setTracked(true);
          setTrackedLesion(lesion);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleUpdateMeta() {
    if (!savedId) return;
    updateAnalysis(savedId, {
      location: location.trim() || "Nicht angegeben",
      notes: notes.trim(),
    });
    setMetaUpdated(true);
    setTimeout(() => setMetaUpdated(false), 2000);
  }

  function handleTrack() {
    if (!savedId) return;
    let lesion: TrackedLesion;
    if (selectedExisting) {
      lesion = selectedExisting;
    } else {
      const name = comboValue.trim() || location.trim() || "Neue Läsion";
      lesion = createTrackedLesion(name);
    }
    updateAnalysis(savedId, { trackedLesionId: lesion.id });
    setTracked(true);
    setTrackedLesion(lesion);
    setTrackOpen(false);
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <p className="text-muted-foreground">Laden...</p>
      </div>
    );
  }

  const riskLevel = result.high_risk ? "high" : "low";
  const confidencePercent = Math.min(Math.round(result.confidence * 100), 99);

  const getRiskInfo = () => {
    if (riskLevel === "high") {
      return {
        circleClass: "bg-red-500",
        label: "Hoch-Risiko",
        description: "Dringend empfohlene dermatologische Abklärung.",
        recommendation: "Bitte kontaktieren Sie innerhalb von 2 Wochen einen Dermatologen.",
      };
    }
    return {
      circleClass: "bg-green-500",
      label: "Niedrig-Risiko",
      description: "Diese Hautveränderung zeigt Merkmale einer gutartigen Läsion.",
      recommendation: "Regelmäßige Selbstkontrolle alle 3 Monate empfohlen.",
    };
  };

  const riskInfo = getRiskInfo();

  const sortedProbs = Object.entries(result.probabilities).sort(
    ([, a], [, b]) => b - a
  );

  const filteredLesions = existingLesions.filter((l) =>
    l.name.toLowerCase().includes(comboValue.toLowerCase())
  );
  const exactMatch = existingLesions.some(
    (l) => l.name.toLowerCase() === comboValue.toLowerCase()
  );

  return (
    <>
      {/* Notes modal */}
      <Modal open={notesOpen} onClose={() => setNotesOpen(false)} title="Notizen">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Körperstelle (z.B. Rücken rechts)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <textarea
            placeholder="Persönliche Anmerkungen..."
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setNotesOpen(false)}>
              Schließen
            </Button>
            <Button size="sm" onClick={() => { handleUpdateMeta(); setNotesOpen(false); }}>
              {metaUpdated ? "✓ Gespeichert" : "Speichern"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Track modal */}
      <Modal open={trackOpen} onClose={() => setTrackOpen(false)} title="Läsion tracken">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ordnen Sie diese Analyse einer Läsion zu, um Veränderungen über Zeit zu dokumentieren.
          </p>

          {existingLesions.length === 0 ? (
            // No existing lesions, simple create input
            <input
              type="text"
              placeholder={location.trim() || "z.B. Muttermal Rücken rechts"}
              value={comboValue}
              onChange={(e) => setComboValue(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              autoFocus
            />
          ) : (
            // Combobox, search existing or create new
            <div className="relative" ref={comboRef}>
              <input
                type="text"
                placeholder="Suchen oder neu eingeben..."
                value={comboValue}
                onChange={(e) => {
                  setComboValue(e.target.value);
                  setSelectedExisting(null);
                  setComboOpen(true);
                }}
                onFocus={() => setComboOpen(true)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                autoFocus
              />
              {comboOpen && (filteredLesions.length > 0 || (comboValue.trim() && !exactMatch)) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filteredLesions.map((l) => (
                    <button
                      key={l.id}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setComboValue(l.name);
                        setSelectedExisting(l);
                        setComboOpen(false);
                      }}
                    >
                      {l.name}
                    </button>
                  ))}
                  {comboValue.trim() && !exactMatch && (
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors text-primary border-t"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSelectedExisting(null);
                        setComboOpen(false);
                      }}
                    >
                      Neu erstellen: &ldquo;{comboValue}&rdquo;
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {selectedExisting && (
            <p className="text-xs text-muted-foreground">
              Analyse wird der bestehenden Läsion &ldquo;{selectedExisting.name}&rdquo; zugeordnet.
            </p>
          )}

          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setTrackOpen(false)}>
              Abbrechen
            </Button>
            <Button size="sm" onClick={handleTrack} disabled={!comboValue.trim() && !selectedExisting}>
              Tracken
            </Button>
          </div>
        </div>
      </Modal>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-8">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Analyseergebnis</h1>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
                {savedId && <span className="ml-3 text-green-600">✓ Gespeichert</span>}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="sm" variant="outline" onClick={() => setNotesOpen(true)}>
                Notizen
              </Button>
              {tracked && trackedLesion ? (
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/tracking/${trackedLesion.id}`}>Getrackt →</Link>
                </Button>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setTrackOpen(true)}>
                  Tracken
                </Button>
              )}
            </div>
          </div>

          {/* High-risk banner */}
          {riskLevel === "high" && !tracked && (
            <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-4 space-y-3">
              <p className="text-sm font-medium text-red-900 dark:text-red-100">
                Dringend empfohlen: Diese Läsion sollte ärztlich abgeklärt und engmaschig beobachtet werden.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" onClick={() => setTrackOpen(true)}>
                  Jetzt tracken
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/doctors">Dermatologen finden</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Image */}
          {capturedImage && (
            <div className="rounded-lg overflow-hidden border bg-muted">
              <img
                src={capturedImage}
                alt="Analysiertes Bild"
                className="w-full max-h-72 object-contain"
              />
            </div>
          )}

          {/* Risk summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full shrink-0 ${riskInfo.circleClass}`} />
              <span className="font-semibold text-lg">{riskInfo.label}</span>
              <span className="ml-auto text-sm text-muted-foreground">{confidencePercent}% Vertrauen</span>
            </div>
            <p className="text-base font-medium">{CLASS_NAMES_DE[result.top_class] ?? result.top_name}</p>
            <p className="text-sm text-muted-foreground">{riskInfo.description}</p>
          </div>

          <Separator />

          {/* Classification */}
          <div className="space-y-4">
            <h2 className="font-semibold">Klassifikation</h2>
            <div className="space-y-3">
              {sortedProbs.map(([code, prob]) => {
                const percentage = Math.min(Math.round(prob * 1000) / 10, 99.9);
                const name = CLASS_NAMES_DE[code] ?? code;
                const isTop = code === result.top_class;
                return (
                  <div key={code} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className={isTop ? "font-medium" : "text-muted-foreground"}>{name}</span>
                      <span className={isTop ? "font-medium" : "text-muted-foreground"}>{percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isTop ? "bg-primary" : "bg-muted-foreground/30"}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {result.tta && (
              <p className="text-xs text-muted-foreground">Mit Test-Time Augmentation analysiert</p>
            )}
          </div>

          <Separator />

          {/* AI Explanation */}
          <div className="space-y-3">
            <h2 className="font-semibold">KI-Erklärung</h2>
            {explanationLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                KI analysiert Ergebnis...
              </div>
            ) : explanation ? (
              <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">Keine KI-Erklärung verfügbar.</p>
            )}
          </div>

          <Separator />

          {/* Recommendation */}
          <div className="space-y-2">
            <h2 className="font-semibold">Empfehlung</h2>
            <p className="text-sm text-muted-foreground">{riskInfo.recommendation}</p>
            {riskLevel === "low" && (
              <p className="text-sm text-muted-foreground">
                Nächste Kontrolle empfohlen am{" "}
                {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE")}.
              </p>
            )}
            <p className="text-xs text-muted-foreground pt-1 border-t mt-3">
              Diese Analyse ersetzt keine ärztliche Diagnose.
            </p>
          </div>

          {/* Bottom navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Zum Dashboard</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/camera">Neue Analyse →</Link>
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}
