"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Binoculars, Building2, FileText, Trash2, X } from "lucide-react";
import {
  getHistory,
  deleteAnalysis,
  createTrackedLesion,
  getTrackedLesions,
  updateAnalysis,
  type SavedAnalysis,
  type TrackedLesion,
} from "@/lib/history";

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
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [entries, setEntries] = useState<SavedAnalysis[]>([]);
  const [lesions, setLesions] = useState<TrackedLesion[]>([]);

  const [trackEntry, setTrackEntry] = useState<SavedAnalysis | null>(null);
  const [comboValue, setComboValue] = useState("");
  const [comboOpen, setComboOpen] = useState(false);
  const [selectedExisting, setSelectedExisting] = useState<TrackedLesion | null>(null);
  const comboRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEntries(getHistory());
    setLesions(getTrackedLesions());
  }, []);

  // Close the lesion combobox when the user clicks outside of it.
  // The listener is attached only while the dropdown is open to avoid overhead.
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (comboRef.current && !comboRef.current.contains(e.target as Node)) {
        setComboOpen(false);
      }
    }
    if (comboOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [comboOpen]);

  function openTrackModal(entry: SavedAnalysis) {
    setTrackEntry(entry);
    setComboValue("");
    setSelectedExisting(null);
    setComboOpen(false);
  }

  function handleDelete(id: string) {
    deleteAnalysis(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function handleTrack() {
    if (!trackEntry) return;
    let lesion: TrackedLesion;
    if (selectedExisting) {
      lesion = selectedExisting;
    } else {
      const name = comboValue.trim() || trackEntry.location || "Neue Läsion";
      lesion = createTrackedLesion(name);
      setLesions((prev) => [lesion, ...prev]);
    }
    updateAnalysis(trackEntry.id, { trackedLesionId: lesion.id });
    setEntries((prev) =>
      prev.map((e) => (e.id === trackEntry.id ? { ...e, trackedLesionId: lesion.id } : e))
    );
    setTrackEntry(null);
  }

  const filteredLesions = lesions.filter((l) =>
    l.name.toLowerCase().includes(comboValue.toLowerCase())
  );
  const exactMatch = lesions.some(
    (l) => l.name.toLowerCase() === comboValue.toLowerCase()
  );

  const highRiskCount = entries.filter((e) => e.result.high_risk).length;

  return (
    <>
      <Modal open={!!trackEntry} onClose={() => setTrackEntry(null)} title="Läsion tracken">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ordnen Sie diese Analyse einer Läsion zu, um Veränderungen über Zeit zu dokumentieren.
          </p>

          {lesions.length === 0 ? (
            <input
              type="text"
              placeholder={trackEntry?.location || "z.B. Muttermal Rücken rechts"}
              value={comboValue}
              onChange={(e) => setComboValue(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              autoFocus
            />
          ) : (
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
            <Button variant="ghost" size="sm" onClick={() => setTrackEntry(null)}>
              Abbrechen
            </Button>
            <Button size="sm" onClick={handleTrack} disabled={!comboValue.trim() && !selectedExisting}>
              Tracken
            </Button>
          </div>
        </div>
      </Modal>

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Welcome + Quick Action */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">Willkommen zurück!</h1>
            <p className="text-muted-foreground">Bereit für Ihre nächste Hautanalyse?</p>
          </div>
          <Button size="lg" asChild className="shrink-0">
            <Link href="/camera">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 mr-2"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              Neue Analyse
            </Link>
          </Button>
        </div>

        <Separator className="my-8" />

        {/* History */}
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Verlauf</h2>
              {entries.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {entries.length} {entries.length === 1 ? "Analyse" : "Analysen"}
                  {highRiskCount > 0 && (
                    <span className="text-red-600 ml-2">· {highRiskCount} Hoch-Risiko</span>
                  )}
                  {lesions.length > 0 && (
                    <span className="ml-2">· {lesions.length} getrackt</span>
                  )}
                </p>
              )}
            </div>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground border rounded-lg bg-muted/20">
              <p className="mb-4">Noch keine Analysen gespeichert.</p>
              <Button asChild>
                <Link href="/camera">Erste Analyse starten</Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {entries.map((entry) => {
                const linkedLesion = entry.trackedLesionId
                  ? lesions.find((l) => l.id === entry.trackedLesionId)
                  : null;
                const diagnosis = CLASS_NAMES_DE[entry.result.top_class] ?? entry.result.top_name;
                const confidence = Math.round(entry.result.confidence * 100);
                const date = new Date(entry.savedAt).toLocaleDateString("de-DE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
                const showLocation =
                  entry.location && entry.location !== "Nicht angegeben";

                return (
                  <div key={entry.id} className="py-5 flex items-start gap-4">
                    {entry.image && (
                      <div className="w-14 h-14 shrink-0 rounded-md overflow-hidden border bg-muted">
                        <img src={entry.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs text-muted-foreground">{date}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-block h-2 w-2 rounded-full shrink-0 ${
                            entry.result.high_risk ? "bg-red-500" : "bg-green-500"
                          }`}
                        />
                        <span className="font-medium text-sm">{diagnosis}</span>
                        <span className="text-xs text-muted-foreground">{confidence}%</span>
                      </div>
                      {showLocation && (
                        <p className="text-sm text-muted-foreground">{entry.location}</p>
                      )}
                      {entry.notes && (
                        <p className="text-sm text-muted-foreground italic">
                          &ldquo;{entry.notes}&rdquo;
                        </p>
                      )}
                      {linkedLesion && (
                        <Link
                          href={`/tracking/${linkedLesion.id}`}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <Binoculars className="h-3 w-3" />
                          {linkedLesion.name}
                        </Link>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {!linkedLesion && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-muted-foreground"
                          onClick={() => openTrackModal(entry)}
                        >
                          <Binoculars className="h-4 w-4 mr-1.5" />
                          Beobachten
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                        title="Löschen"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Separator className="my-8" />

        {/* Further Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 shrink-0 text-muted-foreground" />
              <div>
                <h3 className="font-bold">Dermatologen finden</h3>
                <p className="text-sm text-muted-foreground">Spezialisten in Ihrer Nähe</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/doctors">Suchen</Link>
            </Button>
          </div>

          <div className="border rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 shrink-0 text-muted-foreground" />
              <div>
                <h3 className="font-bold">Bericht exportieren</h3>
                <p className="text-sm text-muted-foreground">Für Ihren Arztbesuch</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/export">Erstellen</Link>
            </Button>
          </div>
        </div>

      </div>
    </>
  );
}
