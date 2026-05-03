import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Smartphone, AlertTriangle, CreditCard, Lock, Stethoscope, Settings, Mail, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Hilfe & FAQs - DermaSense",
  description: "Antworten auf häufig gestellte Fragen",
};

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Hilfe & FAQs</h1>
          <p className="text-lg text-muted-foreground">
            Häufig gestellte Fragen zur Nutzung von DermaSense
          </p>
        </div>

        <Separator />

        {/* App-Use */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Smartphone className="h-6 w-6 shrink-0" /> App-Nutzung</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="photos">
              <AccordionTrigger>Wie mache ich gute Fotos?</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div>
                  <p className="font-semibold mb-2">Beleuchtung:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Natürliches Tageslicht nutzen</li>
                    <li>Direkte Sonne vermeiden</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Aufnahme:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>10-15 cm Abstand zur Haut</li>
                    <li>Läsion füllt 50-80% des Bildes</li>
                    <li>Ruhige Hand, Fokus abwarten</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="results">
              <AccordionTrigger>Was bedeuten die Ergebnisse?</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="font-semibold mb-1 flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500 shrink-0" /> Niedrig-Risiko</p>
                  <p className="text-sm text-muted-foreground">Kontrolle in 3-6 Monaten</p>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <p className="font-semibold mb-1 flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" /> Mittel-Risiko</p>
                  <p className="text-sm text-muted-foreground">Dermatologe innerhalb 4 Wochen</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <p className="font-semibold mb-1 flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 shrink-0" /> Hoch-Risiko</p>
                  <p className="text-sm text-muted-foreground">Dringende ärztliche Abklärung</p>
                </div>
                <p className="text-sm text-muted-foreground italic mt-3">
                  <AlertTriangle className="h-4 w-4 inline mr-1" /> Die App ersetzt keine ärztliche Diagnose!
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="different-results">
              <AccordionTrigger>Warum unterschiedliche Ergebnisse beim selben Muttermal?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-2">Verschiedene Faktoren beeinflussen die Analyse:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                  <li>Beleuchtung und Kamera-Winkel</li>
                  <li>Bildqualität (Schärfe, Abstand)</li>
                  <li>KI lernt kontinuierlich dazu</li>
                </ul>
                <p className="text-sm mt-3">
                  Bei Unsicherheit → Dermatologen konsultieren
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="analyses-limit">
              <AccordionTrigger>Wie viele Analysen habe ich?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-2"><strong>Basic (kostenlos):</strong> 3 Analysen pro Monat</p>
                <p className="text-sm mb-3"><strong>Premium:</strong> Unbegrenzte Analysen</p>
                <Button size="sm" asChild>
                  <Link href="/premium">Zu Premium upgraden</Link>
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Premium */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><CreditCard className="h-6 w-6 shrink-0" /> Premium & Abrechnung</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="premium-cost">
              <AccordionTrigger>Was kostet Premium?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Monatlich:</strong> 9,99€/Monat (monatlich kündbar)</p>
                  <p><strong>Jährlich:</strong> 99€/Jahr (8,25€/Monat, 2 Monate gratis)</p>
                  <p className="text-muted-foreground mt-3">30 Tage Geld-zurück-Garantie</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancel">
              <AccordionTrigger>Kann ich jederzeit kündigen?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Ja, Premium ist monatlich kündbar ohne Angabe von Gründen. 
                  Bei jährlicher Zahlung zum Jahresende.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="premium-test">
              <AccordionTrigger>Kann ich Premium testen?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-3">
                  Ja! 7 Tage kostenlose Testphase mit allen Features. 
                  Automatische Kündigung bei Nicht-Gefallen.
                </p>
                <Button size="sm" asChild>
                  <Link href="/premium">Jetzt testen</Link>
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-after-cancel">
              <AccordionTrigger>Was passiert mit meinen Daten bei Kündigung?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Ihre Daten bleiben 2 Jahre verfügbar. Export jederzeit möglich. 
                  Sie können auch nach Kündigung auf historische Daten zugreifen.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Datasecurity */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Lock className="h-6 w-6 shrink-0" /> Datenschutz & Sicherheit</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="data-storage">
              <AccordionTrigger>Wo werden meine Daten gespeichert?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Ausschließlich deutsche Server (Frankfurt/Nürnberg)</li>
                  <li>Verschlüsselte Übertragung und Speicherung</li>
                  <li>100% DSGVO-konform</li>
                  <li>Keine Weitergabe an Dritte ohne Einwilligung</li>
                </ul>
                <Button variant="link" size="sm" className="px-0 mt-3" asChild>
                  <Link href="/privacy">Zur Datenschutzerklärung →</Link>
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-delete">
              <AccordionTrigger>Kann ich meine Daten löschen?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Ja, jederzeit vollständige Datenlöschung über die Account-Einstellungen möglich. 
                  Löschung erfolgt innerhalb von 72 Stunden.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-security">
              <AccordionTrigger>Wie sicher sind meine Gesundheitsdaten?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>TLS 1.3 Verschlüsselung bei Übertragung</li>
                  <li>AES-256 Verschlüsselung bei Speicherung</li>
                  <li>ISO 27001 zertifizierte Prozesse</li>
                  <li>Regelmäßige Sicherheitsaudits</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Medical Questions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Stethoscope className="h-6 w-6 shrink-0" /> Medizinische Fragen</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="replace-doctor">
              <AccordionTrigger>Ersetzt die App den Arztbesuch?</AccordionTrigger>
              <AccordionContent>
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Nein! DermaSense ist ein Hilfsmittel:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-amber-800 dark:text-amber-200">
                    <li>Früherkennung verdächtiger Veränderungen</li>
                    <li>Dokumentation von Hautveränderungen</li>
                    <li>Vorbereitung auf Arzttermine</li>
                  </ul>
                  <p className="text-sm mt-3 text-amber-800 dark:text-amber-200">
                    Finale Diagnose nur durch Dermatologen!
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="emergency">
              <AccordionTrigger>Wann sollte ich sofort zum Arzt?</AccordionTrigger>
              <AccordionContent>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
                    <AlertTriangle className="h-5 w-5 inline mr-1" /> Notfall-Symptome:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-red-800 dark:text-red-200">
                    <li>Blutende Hautstelle ohne Verletzung</li>
                    <li>Stark juckende neue Läsion</li>
                    <li>Schnell wachsende Veränderung</li>
                    <li>Schwarze Flecken unter Nägeln</li>
                  </ul>
                  <p className="text-sm mt-3 text-red-800 dark:text-red-200">
                    <strong>Hautarzt-Notdienst:</strong> 116 117
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="accuracy">
              <AccordionTrigger>Wie genau ist die KI-Analyse?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-2">
                  Unsere KI erreicht &quot;95% Genauigkeit bei der Melanom-Erkennung, 
                  validiert in klinischen Studien mit über 2.000 Patienten.
                </p>
                <p className="text-sm text-muted-foreground">
                  Die KI basiert auf 10.000+ medizinischen Bildern und wird 
                  kontinuierlich durch Expertenfeedback verbessert.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Technical Problems */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Settings className="h-6 w-6 shrink-0" /> Technische Probleme</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="app-not-working">
              <AccordionTrigger>Die App funktioniert nicht richtig</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-3">Versuchen Sie folgende Schritte:</p>
                <ol className="list-decimal pl-6 space-y-1 text-sm text-muted-foreground">
                  <li>App neu starten</li>
                  <li>Browser-Cache leeren</li>
                  <li>Auf Updates prüfen</li>
                  <li>Anderen Browser testen</li>
                </ol>
                <p className="text-sm mt-3">
                  Problem besteht weiter? → support@dermasense.de
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="camera-issues">
              <AccordionTrigger>Kamera funktioniert nicht</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                  <li>Kamera-Berechtigung in Browser-Einstellungen prüfen</li>
                  <li>Andere Apps schließen, die Kamera nutzen</li>
                  <li>Browser neustarten</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="export-failed">
              <AccordionTrigger>Export funktioniert nicht</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-2">
                  PDF-Export ist ein Premium-Feature. Bitte upgraden Sie auf Premium 
                  für erweiterte Export-Funktionen.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/premium">Zu Premium</Link>
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Support */}
        <section className="bg-primary/5 rounded-lg p-6 text-center space-y-4">
          <h3 className="text-xl font-bold">Weitere Fragen?</h3>
          <p className="text-muted-foreground">
            Unser Support-Team hilft Ihnen gerne weiter
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@dermasense.de"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" /> support@dermasense.de
            </a>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4" /> Live-Chat: Mo-Fr 9:00-17:00
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
