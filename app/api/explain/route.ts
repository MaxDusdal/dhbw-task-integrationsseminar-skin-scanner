import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Returns a patient-friendly German explanation of the AI classification result.
// Falls back silently when OPENAI_API_KEY is missing so the rest of the result
// page still renders correctly.
const FALLBACK_EXPLANATION =
  "Eine KI-Erklärung ist derzeit nicht verfügbar. Bitte konsultieren Sie einen Dermatologen für eine fachkundige Einschätzung.";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { top_class, top_name, confidence, high_risk, probabilities } = body as {
    top_class: string;
    top_name: string;
    confidence: number;
    high_risk: boolean;
    probabilities: Record<string, number>;
  };

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ explanation: FALLBACK_EXPLANATION });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const confidencePercent = Math.round(confidence * 100);
  const riskLabel = high_risk ? "Hoch-Risiko" : "Niedrig-Risiko";

  const topProbs = Object.entries(probabilities)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([k, v]) => `${k}: ${Math.round(v * 100)}%`)
    .join(", ");

  const prompt = `Du bist ein medizinischer KI-Assistent für DermaSense, eine Hautkrebs-Früherkennungs-App.
Erkläre einem Patienten auf Deutsch in 3–5 verständlichen Sätzen, warum das KI-Modell zu diesem Ergebnis gekommen ist.

Analyseergebnis:
- Diagnose: ${top_name} (Kürzel: ${top_class})
- Risikostufe: ${riskLabel}
- Konfidenz des Modells: ${confidencePercent}%
- Top-Wahrscheinlichkeiten: ${topProbs}

Wichtige Hinweise:
- Schreibe in einfacher, patientenverständlicher Sprache (kein Fachjargon)
- Erkläre, welche visuellen oder statistischen Merkmale typischerweise zu dieser Klassifikation führen
- Weise darauf hin, dass dies keine ärztliche Diagnose ersetzt
- Gib keine Diagnose, sondern erkläre das Modell-Ergebnis`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 400,
    });

    const explanation =
      completion.choices[0]?.message?.content?.trim() ?? FALLBACK_EXPLANATION;

    return NextResponse.json({ explanation });
  } catch {
    return NextResponse.json({ explanation: FALLBACK_EXPLANATION });
  }
}
