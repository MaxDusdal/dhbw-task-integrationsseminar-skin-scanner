import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sun,
  ShieldCheck,
  Repeat2,
  Thermometer,
  Shirt,
  Trees,
  Ban,
  Apple,
  Droplets,
  CigaretteOff,
  Stethoscope,
  Brain,
  Smile,
  Camera,
  CalendarCheck,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

// ── Page metadata ─────────────────────────────────────────────────────────────
// Used by Next.js to generate <title> and <meta name="description"> tags
export const metadata = {
  title: "Hautschutz-Tipps - DermaSense",
  description:
    "Praktische Tipps zum Schutz Ihrer Haut – für alle Hauttypen. Erfahren Sie, wie Sie Hautkrebs durch richtige Vorsorge verhindern können.",
};

// ── Static data ───────────────────────────────────────────────────────────────

// Fitzpatrick skin type scale (I–VI): UV sensitivity, characteristics, and
// melanoma risk per type. riskColor drives the coloured risk text in the card.
const fitzpatrickTypes = [
  {
    type: "Typ I",
    label: "Sehr hell",
    color: "bg-amber-50 border border-amber-200",
    traits: "Verbrennt immer, bräunt nie. Rote oder blonde Haare, blaue Augen, Sommersprossen.",
    risk: "Höchstes Melanomrisiko. Konsequenter UV-Schutz mit LSF 50+ ist unerlässlich.",
    riskColor: "text-red-600",
  },
  {
    type: "Typ II",
    label: "Hell",
    color: "bg-amber-100 border border-amber-200",
    traits: "Verbrennt leicht, bräunt kaum. Oft helle Haare und helle Augen.",
    risk: "Sehr hohes Melanomrisiko. LSF 50+ täglich und regelmäßige Selbstuntersuchung.",
    riskColor: "text-red-500",
  },
  {
    type: "Typ III",
    label: "Mittel",
    color: "bg-amber-200 border border-amber-300",
    traits: "Verbrennt manchmal, bräunt langsam. Braune oder dunkle Haare.",
    risk: "Erhöhtes Risiko. Mindestens LSF 30–50, besonders im Sommer und im Freien.",
    riskColor: "text-orange-500",
  },
  {
    type: "Typ IV",
    label: "Olivfarben",
    color: "bg-amber-400 border border-amber-500",
    traits: "Verbrennt selten, bräunt gut. Dunkle Haare und Augen.",
    risk: "Moderates Risiko. LSF 15–30 täglich; auch nicht-sonnenexponierte Stellen prüfen.",
    riskColor: "text-orange-400",
  },
  {
    type: "Typ V",
    label: "Braun",
    color: "bg-amber-700 border border-amber-800",
    traits: "Verbrennt sehr selten. Dunkle Haut, Haare und Augen.",
    risk: "Geringeres, aber reales Risiko. Melanome werden oft später entdeckt – daher besonders gefährlich.",
    riskColor: "text-yellow-600",
  },
  {
    type: "Typ VI",
    label: "Sehr dunkel",
    color: "bg-amber-950 border border-stone-800",
    traits: "Verbrennt nie. Tiefschwarze Haut, Haare und Augen.",
    risk: "Seltenes, aber oft zu spät erkanntes Melanom. Besonders auf Handflächen, Fußsohlen und Nägel achten.",
    riskColor: "text-yellow-500",
  },
];

// Six actionable sun protection rules, each with a Lucide icon and description
const sunProtectionTips = [
  {
    icon: ShieldCheck,
    title: "LSF richtig wählen",
    desc: "Täglich mindestens LSF 30, bei empfindlicher Haut (Typ I–III) oder Aufenthalt im Freien LSF 50+. Auch im Winter und bei bewölktem Himmel.",
  },
  {
    icon: Repeat2,
    title: "Nachcremen nicht vergessen",
    desc: "Sonnencreme alle 2 Stunden neu auftragen – nach dem Schwimmen oder Schwitzen sofort. Ein einmaliges Eincremen reicht nicht für den ganzen Tag.",
  },
  {
    icon: Thermometer,
    title: "UV-Index beachten",
    desc: "Bei UV-Index ≥ 3 Sonnenschutz nutzen. Ab Index 8 ist intensiver Schutz Pflicht. Die gefährlichsten Stunden: 11:00–15:00 Uhr.",
  },
  {
    icon: Shirt,
    title: "Schutzkleidung tragen",
    desc: "Kleidung mit UV-Schutzfaktor (UPF 50+), breitkrempige Hüte und UV-Schutzbrillen reduzieren die Strahlung erheblich.",
  },
  {
    icon: Trees,
    title: "Schatten nutzen",
    desc: "Schatten allein schützt nicht vollständig – bis zu 50 % der UV-Strahlung kann reflektiert werden. Schatten + Sonnencreme kombinieren.",
  },
  {
    icon: Ban,
    title: "Solarien meiden",
    desc: "Solarienbesuche erhöhen das Melanomrisiko laut WHO um bis zu 75 %. Es gibt keine \"sichere\" künstliche Bräune.",
  },
];

// ABCDE self-check criteria for mole assessment.
// Rendered as an expandable Accordion so users can focus on one criterion at a time.
const abcdeItems = [
  {
    letter: "A",
    title: "Asymmetrie",
    desc: "Gutartige Muttermale sind meist symmetrisch. Wenn eine Hälfte nicht zur anderen passt, ist das ein Warnsignal.",
  },
  {
    letter: "B",
    title: "Begrenzung",
    desc: "Unregelmäßige, ausgefranste oder verschwommene Ränder können auf Melanome hinweisen.",
  },
  {
    letter: "C",
    title: "Colorierung / Farbe",
    desc: "Mehrere Farbtöne (Braun, Schwarz, Rot, Weiß, Blau) in einem Mal sind verdächtig.",
  },
  {
    letter: "D",
    title: "Durchmesser",
    desc: "Muttermale mit einem Durchmesser von mehr als 6 mm (Radiergummigröße) sollten ärztlich abgeklärt werden.",
  },
  {
    letter: "E",
    title: "Entwicklung / Veränderung",
    desc: "Jede Veränderung eines Mals – in Größe, Form, Farbe oder Oberfläche – sollte sofort untersucht werden.",
  },
];

// lifestyle tips that support skin health beyond UV protection
const lifestyleTips = [
  {
    icon: Apple,
    title: "Antioxidantienreiche Ernährung",
    desc: "Vitamin C, E und Beta-Carotin aus Obst und Gemüse stärken die Hautzellen von innen.",
  },
  {
    icon: Droplets,
    title: "Ausreichend trinken",
    desc: "Mindestens 1,5–2 Liter Wasser täglich halten die Haut elastisch und widerstandsfähig.",
  },
  {
    icon: CigaretteOff,
    title: "Nicht rauchen",
    desc: "Rauchen beschleunigt die Hautalterung und setzt die Haut zusätzlichen Karzinogenen aus.",
  },
  {
    icon: Stethoscope,
    title: "Jährliche Hautkrebs-Vorsorge",
    desc: "Ab 35 Jahren alle 2 Jahre vom Hautarzt prüfen lassen – bei erhöhtem Risiko jährlich.",
  },
  {
    icon: Brain,
    title: "Stress reduzieren",
    desc: "Chronischer Stress schwächt das Immunsystem, das auch Hautzellen überwacht und schützt.",
  },
  {
    icon: Smile,
    title: "Lippenpflege mit LSF",
    desc: "Die Lippen haben kaum schützende Melanine. Lippenbalsam mit LSF 20+ ist ein leicht vergessener Schutz.",
  },
];

// ── Page component ────────────────────────────────────────────────────────────
// Static server component (no "use client"), all interaction is handled by
// shadcn/ui primitives (Accordion) that manage their own client-side state.
export default function TipsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-20">

        {/* Hero */}
        <section className="text-center space-y-6">
          <Badge className="mb-4">Hautschutz</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Schütz deine Haut –{" "}
            <span className="text-primary">jetzt und für die Zukunft</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            DermaSense hilft dir, verdächtige Veränderungen frühzeitig zu erkennen.
            Doch der beste Schutz beginnt schon davor: mit dem richtigen Wissen über
            deine Haut und konsequenter Prävention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" asChild>
              <Link href="/camera">Jetzt analysieren</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/doctors">Dermatologen finden</Link>
            </Button>
          </div>
        </section>

        <Separator />

        {/* Fitzpatrick-Scale */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Kenne deinen Hauttyp</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Die Fitzpatrick-Skala teilt Hauttypen nach ihrer Reaktion auf UV-Strahlung ein.
              Jeder Hauttyp benötigt andere Schutzmaßnahmen – auch dunklere Haut ist nicht
              immun gegen Hautkrebs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {fitzpatrickTypes.map((t) => (
              <div key={t.type} className="rounded-xl border bg-card p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex-shrink-0 ${t.color}`} />
                  <div>
                    <p className="font-bold text-sm">{t.type}</p>
                    <p className="text-xs text-muted-foreground">{t.label}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.traits}</p>
                <p className={`text-xs font-medium leading-relaxed ${t.riskColor}`}>{t.risk}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Sunprotection Rules */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Die 6 Sonnenschutz-Regeln</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              UV-Strahlung ist der häufigste Auslöser von Hautkrebs – und vollständig vermeidbar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sunProtectionTips.map((tip) => (
              <div key={tip.title} className="space-y-2">
                <div className="flex items-center gap-3">
                  <tip.icon className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="font-bold">{tip.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-8">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Skin type-specific recommendations */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Tipps nach Hauttyp</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guter Schutz ist keine Einheitslösung – er hängt von deinem Hauttyp ab.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Light skin type */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Hellere Haut (Typ I–III)
              </h3>
              <ul className="space-y-3 pl-4 border-l-2 border-primary/30">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span className="text-sm">LSF 50+ täglich – auch im Winter und bei Bewölkung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span className="text-sm">Mittagssonne (11–15 Uhr) im Sommer komplett meiden</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span className="text-sm">Monatliche Selbstuntersuchung nach der ABCDE-Regel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span className="text-sm">Vitamin D lieber über Nahrungsergänzung aufnehmen als über ungeschützte Sonneneinstrahlung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span className="text-sm">Jährliche Hautkrebsvorsorge beim Dermatologen</span>
                </li>
              </ul>
            </div>

            {/* Darker skin type */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Dunklere Haut (Typ IV–VI)
              </h3>
              <ul className="space-y-3 pl-4 border-l-2 border-primary/30">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span className="text-sm">Melanome sind seltener, werden aber oft viel später erkannt – das macht sie gefährlicher</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span className="text-sm">Besonders auf nicht-sonnenexponierte Stellen achten: Fußsohlen, Handflächen, Nägel, Mundschleimhaut</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span className="text-sm">LSF 15–30 täglich – schützt auch vor UV-bedingter Hyperpigmentierung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span className="text-sm">Regelmäßige Selbst-Scans mit DermaSense, auch wenn die Haut sich gesund anfühlt</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span className="text-sm">Bewusstsein schärfen: „Dunkle Haut bekommt keinen Krebs" ist ein gefährlicher Mythos</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Separator />

        {/* ABCDE-Rules */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Die ABCDE-Regel</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mit diesen fünf Kriterien kannst du auffällige Muttermale selbst einschätzen –
              und weißt, wann du unbedingt zur Ärztin oder zum Arzt gehen solltest.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {abcdeItems.map((item) => (
              <AccordionItem key={item.letter} value={item.letter}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {item.letter}
                    </div>
                    <span className="font-semibold">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-14 text-muted-foreground leading-relaxed">
                  {item.desc}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="bg-primary/5 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-primary shrink-0" />
            <div className="text-center sm:text-left">
              <p className="font-semibold">Etwas Verdächtiges entdeckt?</p>
              <p className="text-sm text-muted-foreground">
                Analysiere den Bereich jetzt mit DermaSense – kostenlos, sicher und in Sekunden.
              </p>
            </div>
            <Button asChild className="shrink-0 sm:ml-auto">
              <Link href="/camera">Jetzt analysieren</Link>
            </Button>
          </div>
        </section>

        <Separator />

        {/* Lifestyle-Tips */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Gesunder Lifestyle für gesunde Haut</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schutz vor Hautkrebs beginnt nicht nur mit Sonnencreme – auch dein Alltag spielt eine große Rolle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {lifestyleTips.map((tip) => (
              <div key={tip.title} className="space-y-2 p-5 rounded-xl border bg-card">
                <div className="flex items-center gap-3">
                  <tip.icon className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="font-bold text-sm">{tip.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* How often should I scan? */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Wie oft sollte ich prüfen?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Regelmäßigkeit ist der Schlüssel. So bleibst du immer auf der sicheren Seite.
            </p>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              {
                icon: Camera,
                interval: "Monatlich",
                action: "Selbstuntersuchung mit der ABCDE-Regel und DermaSense-Scan deiner Muttermale",
                color: "bg-primary text-primary-foreground",
              },
              {
                icon: CalendarCheck,
                interval: "Jährlich",
                action: "Vollständige Ganzkörper-Untersuchung beim Dermatologen – ab 35 Jahren alle 2 Jahre gesetzlich versichert",
                color: "bg-primary/80 text-primary-foreground",
              },
              {
                icon: AlertTriangle,
                interval: "Sofort",
                action: "Bei jeder Veränderung eines Mals in Größe, Form oder Farbe – nicht abwarten",
                color: "bg-primary/60 text-primary-foreground",
              },
            ].map((step) => (
              <div key={step.interval} className="flex gap-5 items-start">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-bold text-xs text-center ${step.color}`}>
                  {step.interval}
                </div>
                <div className="flex-1 pt-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.action}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button size="lg" asChild>
              <Link href="/camera">Neue Analyse starten</Link>
            </Button>
          </div>
        </section>

        <Separator />

        {/* Disclaimer */}
        <section className="text-center">
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Diese Tipps dienen der allgemeinen Information und ersetzen keine medizinische Beratung.
            Bei Verdacht auf eine Hautveränderung immer einen Dermatologen aufsuchen.
          </p>
        </section>

      </div>
    </div>
  );
}
