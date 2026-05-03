import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Analyses the longitudinal risk history of a single tracked lesion and returns
// a structured trend verdict. Requires at least 2 data points; returns 400 otherwise.
// Uses response_format: json_object to guarantee parseable output from the model.
type TrendValue = "Verbesserung" | "Stabil" | "Verschlechterung";

const VALID_TRENDS: TrendValue[] = ["Verbesserung", "Stabil", "Verschlechterung"];

const FALLBACK_RESPONSE = {
  trend: "Stabil" as TrendValue,
  explanation:
    "Eine KI-Trendanalyse ist derzeit nicht verfügbar. Bitte konsultieren Sie einen Dermatologen für eine fachkundige Verlaufsbeurteilung.",
};

interface AnalysisEntry {
  date: string;
  risk_level: string;
  confidence: number;
  top_class: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { analyses, lesionName } = body as {
    analyses: AnalysisEntry[];
    lesionName: string;
  };

  if (!analyses || analyses.length < 2) {
    return NextResponse.json(
      { error: "Mindestens 2 Analysen erforderlich für eine Trendanalyse." },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(FALLBACK_RESPONSE);
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const analysisText = analyses
    .map(
      (a, i) =>
        `${i + 1}. Datum: ${a.date}, Risiko: ${a.risk_level}, Klasse: ${a.top_class}, Konfidenz: ${Math.round(a.confidence * 100)}%`
    )
    .join("\n");

  const prompt = `Du bist ein medizinischer KI-Assistent für DermaSense, eine Hautkrebs-Früherkennungs-App.
Analysiere den zeitlichen Verlauf der Untersuchungsergebnisse für die Läsion "${lesionName}" und bestimme den Risikotrend.

Verlaufsdaten (chronologisch, älteste zuerst):
${analysisText}

Antworte ausschließlich mit einem validen JSON-Objekt in folgendem Format:
{
  "trend": "<Verbesserung|Stabil|Verschlechterung>",
  "explanation": "<2-3 Sätze auf Deutsch, die den Trend für den Patienten erklären>"
}

Regeln:
- "Verbesserung": Risiko nimmt ab, Klassifikationen werden weniger besorgniserregend
- "Stabil": Risiko bleibt konstant, keine wesentlichen Veränderungen
- "Verschlechterung": Risiko nimmt zu, Klassifikationen werden besorgniserregender
- Schreibe die Erklärung in einfacher, patientenverständlicher Sprache
- Weise darauf hin, dass dies keine ärztliche Diagnose ersetzt`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 300,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content?.trim();
    if (!raw) return NextResponse.json(FALLBACK_RESPONSE);

    const parsed = JSON.parse(raw) as { trend?: string; explanation?: string };

    const trend = VALID_TRENDS.includes(parsed.trend as TrendValue)
      ? (parsed.trend as TrendValue)
      : "Stabil";

    const explanation =
      parsed.explanation?.trim() ?? FALLBACK_RESPONSE.explanation;

    return NextResponse.json({ trend, explanation });
  } catch {
    return NextResponse.json(FALLBACK_RESPONSE);
  }
}
