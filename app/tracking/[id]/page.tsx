"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, Trash2 } from "lucide-react";
import {
  getTrackedLesion,
  getAnalysesForLesion,
  deleteTrackedLesion,
  type SavedAnalysis,
  type TrackedLesion,
} from "@/lib/history";

// Maps internal classifier class keys to human-readable German labels
const CLASS_NAMES_DE: Record<string, string> = {
  mel: "Melanom",
  bcc: "Basalzellkarzinom",
  akiec: "Aktinische Keratose / Intraepith. Karzinom",
  nv: "Melanozytischer Nävus",
  bkl: "Benigne Keratose",
  df: "Dermatofibrom",
  vasc: "Vaskuläre Läsion",
};

export default function TrackingPage() {
  // Read the dynamic lesion ID from the URL segment (e.g. /tracking/[id])
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Core data state: the tracked lesion metadata and its associated analyses
  const [lesion, setLesion] = useState<TrackedLesion | null>(null);
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);
  const [notFound, setNotFound] = useState(false);

  // AI-generated trend state returned by /api/risk-trend
  type TrendValue = "Verbesserung" | "Stabil" | "Verschlechterung";
  const [trend, setTrend] = useState<TrendValue | null>(null);
  const [trendExplanation, setTrendExplanation] = useState<string | null>(null);
  const [trendLoading, setTrendLoading] = useState(false);
  // Ref guard prevents the trend API call from firing more than once
  // even if the effect re-runs (e.g. in React Strict Mode double-invoke)
  const trendCalledRef = useRef(false);

  useEffect(() => {
    const found = getTrackedLesion(id);
    if (!found) {
      setNotFound(true);
      return;
    }
    setLesion(found);
    // Sorted newest first already (from getHistory)
    const loaded = getAnalysesForLesion(id);
    setAnalyses(loaded);

    // Only request a trend when there are at least 2 data points to compare
    if (loaded.length >= 2 && !trendCalledRef.current) {
      trendCalledRef.current = true;
      setTrendLoading(true);
      const payload = {
        lesionName: found.name,
        analyses: [...loaded].reverse().map((a) => ({
          date: new Date(a.savedAt).toLocaleDateString("de-DE"),
          risk_level: a.result.high_risk ? "Hoch-Risiko" : "Niedrig-Risiko",
          confidence: a.result.confidence,
          top_class: a.result.top_class,
        })),
      };
      fetch("/api/risk-trend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data: { trend?: TrendValue; explanation?: string }) => {
          if (data.trend) setTrend(data.trend);
          if (data.explanation) setTrendExplanation(data.explanation);
        })
        .catch(() => {
          // trend is non-critical, silent failure
        })
        .finally(() => setTrendLoading(false));
    }
  }, [id]);

  // Confirm before deleting; analyses are kept in history even after removal
  function handleDelete() {
    if (!confirm(`Tracking für "${lesion?.name}" löschen? Die Analysen bleiben im Verlauf erhalten.`)) return;
    deleteTrackedLesion(id);
    router.push("/dashboard");
  }

  // Store the lesion ID in sessionStorage so the camera page knows which
  // lesion to attach the new photo to after capture
  function handleNewAnalysis() {
    sessionStorage.setItem("dermasense_pending_track_id", id);
    router.push("/camera");
  }

  // ── Early-return render states ────────────────────────────────────────────
  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center space-y-4">
        <p className="text-muted-foreground">Läsion nicht gefunden.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zum Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  // Show a minimal loading indicator while the lesion is being fetched
  if (!lesion) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <p className="text-muted-foreground">Laden...</p>
      </div>
    );
  }

  const latest = analyses[0];
  const highRiskCount = analyses.filter((a) => a.result.high_risk).length;

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-bold mb-1">Läsions-Tracking</h1>
              <p className="text-xl text-muted-foreground">{lesion.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Erstellt am {new Date(lesion.createdAt).toLocaleDateString("de-DE")} &bull;{" "}
                {analyses.length} {analyses.length === 1 ? "Analyse" : "Analysen"}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-1" />
              Tracking löschen
            </Button>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="p-4 bg-background border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Analysen gesamt</p>
            <p className="text-2xl font-bold">{analyses.length}</p>
          </div>
          <div className="p-4 bg-background border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Hoch-Risiko Befunde</p>
            <p className={`text-2xl font-bold ${highRiskCount > 0 ? "text-red-600" : "text-green-600"}`}>
              {highRiskCount}
            </p>
          </div>
          <div className="p-4 bg-background border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Letzter Befund</p>
            <p className="text-2xl font-bold">
              {latest ? new Date(latest.savedAt).toLocaleDateString("de-DE") : "—"}
            </p>
          </div>
          {analyses.length >= 2 && (
            <div className="p-4 bg-background border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Risikotrend</p>
              {trendLoading ? (
                <span className="inline-block h-3 w-3 rounded-full bg-primary animate-pulse mt-2" />
              ) : trend ? (
                <div className={`font-bold ${
                  trend === "Verbesserung" ? "text-green-600" :
                  trend === "Verschlechterung" ? "text-red-600" :
                  "text-yellow-600"
                }`}>
                  <span className="text-2xl leading-none">
                    {trend === "Verbesserung" ? "↑" : trend === "Verschlechterung" ? "↓" : "→"}
                  </span>
                  <p className="text-sm font-semibold mt-0.5 break-words">{trend}</p>
                </div>
              ) : (
                <p className="text-2xl font-bold text-muted-foreground">—</p>
              )}
            </div>
          )}
        </div>

        {/* AI-Risk Trends */}
        {analyses.length >= 2 && (
          <div className="mb-8 p-6 bg-background border rounded-lg space-y-3">
            <h2 className="text-xl font-semibold">KI-Risikotrend</h2>
            {trendLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                KI analysiert Verlauf...
              </div>
            ) : trend ? (
              <div className="space-y-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
                  trend === "Verbesserung"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : trend === "Verschlechterung"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                }`}>
                  {trend === "Verbesserung" ? "↑" : trend === "Verschlechterung" ? "↓" : "→"}
                  {trend}
                </span>
                {trendExplanation && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{trendExplanation}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">Kein Risikotrend verfügbar.</p>
            )}
          </div>
        )}

        {/* Latest analysis */}
        {latest && (
          <div className="mb-8 p-6 bg-background border rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold">Aktuellste Analyse</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {latest.image ? (
                <div className="rounded-lg overflow-hidden border bg-muted">
                  <img
                    src={latest.image}
                    alt="Aktuellste Aufnahme"
                    className="w-full max-h-64 object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Risikobewertung</span>
                  <p className={`text-lg font-semibold ${latest.result.high_risk ? "text-red-600" : "text-green-600"}`}>
                    <span className="flex items-center gap-1.5">
                      <span className={`inline-block h-2.5 w-2.5 rounded-full ${latest.result.high_risk ? "bg-red-500" : "bg-green-500"}`} />
                      {latest.result.high_risk ? "Hoch-Risiko" : "Niedrig-Risiko"}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Hauptbefund</span>
                  <p className="font-medium">{latest.result.top_name}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Vertrauen</span>
                  <p className="font-medium">{Math.round(latest.result.confidence * 100)}%</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Körperstelle</span>
                  <p className="font-medium">{latest.location}</p>
                </div>
                {latest.notes && (
                  <div>
                    <span className="text-sm text-muted-foreground">Notizen</span>
                    <p className="text-sm italic">&ldquo;{latest.notes}&rdquo;</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {analyses.length > 1 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Verlauf</h2>
            <div className="space-y-3">
              {analyses.map((entry, idx) => {
                const isLatest = idx === 0;
                const confidence = Math.round(entry.result.confidence * 100);
                const topName = CLASS_NAMES_DE[entry.result.top_class] ?? entry.result.top_name;
                const date = new Date(entry.savedAt).toLocaleDateString("de-DE");

                return (
                  <div
                    key={entry.id}
                    className={`p-4 border rounded-lg flex items-center gap-4 ${
                      isLatest ? "border-primary/50 bg-primary/5" : "bg-background"
                    }`}
                  >
                    {entry.image ? (
                      <div className="w-14 h-14 shrink-0 rounded-md overflow-hidden border">
                        <img src={entry.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 shrink-0 rounded-md bg-muted flex items-center justify-center">
                        <Camera className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{date}</span>
                        {isLatest && (
                          <Badge variant="secondary" className="text-xs">Aktuell</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{topName}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className={`font-semibold text-sm ${entry.result.high_risk ? "text-red-600" : "text-green-600"}`}>
                        {entry.result.high_risk ? "Hoch" : "Niedrig"}
                      </p>
                      <p className="text-xs text-muted-foreground">{confidence}% Vertrauen</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No analyses yet */}
        {analyses.length === 0 && (
          <div className="text-center py-16 border rounded-lg bg-muted/20 mb-8">
            <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              Noch keine Analysen für diese Läsion.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleNewAnalysis}>
            <Camera className="mr-2 h-4 w-4" />
            Neue Aufnahme hinzufügen
          </Button>
          <Button variant="outline" asChild>
            <Link href="/doctors">Dermatologen finden</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
