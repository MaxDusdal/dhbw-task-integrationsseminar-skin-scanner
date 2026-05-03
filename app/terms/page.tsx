import { Separator } from "@/components/ui/separator";
import { Mail, Phone, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Allgemeine Geschäftsbedingungen - DermaSense",
  description: "AGB der DermaSense GmbH",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Allgemeine Geschäftsbedingungen (AGB)</h1>
        <p className="text-muted-foreground mb-8">
          Stand: 17. Februar 2025
        </p>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 1 Geltungsbereich und Vertragspartner</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">1.1 Anbieter</h3>
            <p className="font-semibold mb-1">DermaSense GmbH</p>
            <p>Augustaanlage 32, 68165 Mannheim</p>
            <p>Amtsgericht Mannheim, HRB 735842</p>
            <p>Geschäftsführer: Dr. med. Fey Schreier, Alexander Kott</p>
            <p>USt-IdNr.: DE736252438</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">1.2 Geltungsbereich</h3>
            <p>
              Diese AGB gelten für alle Leistungen der DermaSense-App und -Website gegenüber 
              Verbrauchern im Sinne des § 13 BGB.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 2 Leistungsbeschreibung</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">2.1 DermaSense App</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>KI-gestützte Analyse</strong> von Hautläsionen-Fotografien</li>
              <li><strong>Risikoeinschätzung</strong> in drei Kategorien (niedrig/mittel/hoch)</li>
              <li><strong>Verlaufsdokumentation</strong> und Tracking-Funktionen</li>
              <li><strong>Informationsdienst</strong> zu Hautgesundheit und Prävention</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">2.2 Wichtiger Hinweis</h3>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                <AlertTriangle className="h-4 w-4 inline mr-1" /> DermaSense ersetzt keine ärztliche Diagnose oder Behandlung!
              </p>
              <p className="text-amber-800 dark:text-amber-200">
                Die App dient ausschließlich als Hilfsmittel zur Früherkennung und Dokumentation.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">2.3 Verfügbare Versionen</h3>
            <p className="mb-3"><strong>Basic (kostenlos):</strong></p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>3 Analysen pro Monat</li>
              <li>Basis-Risikoeinschätzung</li>
              <li>12 Monate Verlaufsspeicherung</li>
            </ul>
            
            <p className="mb-3"><strong>Premium (9,99€/Monat):</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Unbegrenzte Analysen</li>
              <li>Detaillierte Risikobewertung</li>
              <li>Unbegrenzte Verlaufsspeicherung</li>
              <li>Familienkonten (bis 5 Profile)</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 3 Vertragsschluss und Laufzeit</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">3.1 Premium-Abonnement</h3>
            <p className="mb-2"><strong>Monatlich:</strong> 9,99€ pro Monat, monatlich kündbar</p>
            <p><strong>Jährlich:</strong> 99,00€ pro Jahr (entspricht 8,25€/Monat)</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">3.2 Mindestlaufzeit</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Basic: Keine Mindestlaufzeit</li>
              <li>Premium monatlich: 1 Monat</li>
              <li>Premium jährlich: 12 Monate</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 4 Preise und Zahlungsbedingungen</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">4.1 Preise</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Alle Preise verstehen sich inkl. gesetzlicher MwSt.</li>
              <li>Preisänderungen werden mindestens 30 Tage vorab angekündigt</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">4.2 Zahlungsmethoden</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kreditkarte (Visa, MasterCard)</li>
              <li>PayPal</li>
              <li>SEPA-Lastschrift</li>
              <li>Apple Pay / Google Pay (in Apps)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">4.3 Zahlungstermine</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Premium monatlich: Abbuchung am Monatsanfang</li>
              <li>Premium jährlich: Abbuchung zum Jahrestag der Registrierung</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 5 Widerrufsrecht</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">5.1 Widerrufsbelehrung für Verbraucher</h3>
            <div className="border rounded-lg p-6 bg-blue-50 dark:bg-blue-950/20">
              <p className="font-semibold mb-3">Widerrufsrecht</p>
              <p className="mb-4">
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag 
                zu widerrufen.
              </p>
              
              <p className="font-semibold mb-3">Widerrufsfrist</p>
              <p className="mb-4">
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
              </p>
              
              <p className="font-semibold mb-3">Ausübung des Widerrufsrechts</p>
              <p className="mb-4">
                Zur Ausübung des Widerrufsrechts müssen Sie uns mittels einer eindeutigen Erklärung 
                (z.B. E-Mail an widerruf@dermasense.de) über Ihren Entschluss, diesen Vertrag zu 
                widerrufen, informieren.
              </p>
              
              <p className="font-semibold mb-3">Folgen des Widerrufs</p>
              <p>
                Bei wirksamen Widerruf erstatten wir bereits geleistete Zahlungen innerhalb von 
                14 Tagen zurück.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">5.2 Vorzeitiger Erlöschens des Widerrufsrechts</h3>
            <p>
              Das Widerrufsrecht erlischt vorzeitig, wenn Sie ausdrücklich zugestimmt haben, dass 
              wir vor Ende der Widerrufsfrist mit der Vertragserfüllung beginnen.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 6 Kündigung</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">6.1 Ordentliche Kündigung</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Basic:</strong> Jederzeit durch Account-Löschung</li>
              <li><strong>Premium monatlich:</strong> Zum Monatsende mit 7 Tagen Frist</li>
              <li><strong>Premium jährlich:</strong> Zum Jahresende mit 30 Tagen Frist</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">6.2 Kündigung durch DermaSense</h3>
            <p className="mb-2">Wir können Verträge mit 30 Tagen Frist kündigen bei:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Einstellung des Dienstes</li>
              <li>Schwerwiegenden Vertragsverletzungen</li>
              <li>Missbrauch der Plattform</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">6.3 Außerordentliche Kündigung</h3>
            <p>Bleibt für beide Parteien bei wichtigem Grund unbenommen.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 7 Verfügbarkeit und Haftung</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">7.1 Verfügbarkeit</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Angestrebte Verfügbarkeit: 99,5%</li>
              <li>Wartungsarbeiten werden vorab angekündigt</li>
              <li>Keine Garantie für ununterbrochene Verfügbarkeit</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">7.2 Haftungsausschluss</h3>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Wichtiger Hinweis:
              </p>
              <p className="text-amber-800 dark:text-amber-200 mb-2">
                DermaSense übernimmt keine Haftung für:
              </p>
              <ul className="list-disc pl-6 text-amber-800 dark:text-amber-200 space-y-1">
                <li>Fehlinterpretation der KI-Analyse durch Nutzer</li>
                <li>Verzögerung oder Ausbleiben von Arztbesuchen</li>
                <li>Gesundheitliche Schäden durch Verlassen auf App-Ergebnisse</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">7.3 Haftungsbeschränkung</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Haftung nur bei Vorsatz und grober Fahrlässigkeit</li>
              <li>Bei leichter Fahrlässigkeit nur bei Verletzung wesentlicher Vertragspflichten</li>
              <li>Haftung für Personenschäden bleibt unberührt</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 8 Nutzungspflichten</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">8.1 Ordnungsgemäße Nutzung</h3>
            <p className="mb-2">Der Nutzer verpflichtet sich:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Wahrheitsgemäße Angaben bei der Registrierung</li>
              <li>Keine missbräuchliche Nutzung der App</li>
              <li>Schutz der Zugangsdaten vor unbefugten Dritten</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">8.2 Verbotene Nutzungen</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Upload von Bildern anderer Personen ohne Einwilligung</li>
              <li>Reverse Engineering der KI-Algorithmen</li>
              <li>Automatisierte Zugriffe (Bots, Scraping)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">8.3 Folgen von Vertragsverletzungen</h3>
            <p className="mb-2">Bei Verstößen gegen Nutzungspflichten:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Abmahnung und Fristsetzung</li>
              <li>Temporäre oder dauerhafte Sperrung</li>
              <li>Schadensersatzforderungen</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 9 Geistiges Eigentum</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">9.1 Urheberrechte DermaSense</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>App, Website und KI-Algorithmen sind urheberrechtlich geschützt</li>
              <li>Nutzer erhalten lediglich einfaches Nutzungsrecht</li>
              <li>Keine Weitergabe oder kommerzielle Nutzung erlaubt</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">9.2 Nutzergenerierte Inhalte</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nutzer räumen DermaSense Nutzungsrecht an hochgeladenen Bildern ein</li>
              <li>Nur zur Erbringung der vereinbarten Leistungen</li>
              <li>Keine Weitergabe an Dritte ohne Einwilligung</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 10 Datenschutz</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">10.1 Datenverarbeitung</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Verarbeitung nach DSGVO und Datenschutzerklärung</li>
              <li>Besonderer Schutz von Gesundheitsdaten</li>
              <li>Nutzer haben umfassende Betroffenenrechte</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">10.2 Einwilligung Gesundheitsdaten</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ausdrückliche Einwilligung vor erster Nutzung erforderlich</li>
              <li>Widerruf der Einwilligung jederzeit möglich</li>
              <li>Bei Widerruf: Löschung aller Gesundheitsdaten</li>
            </ul>
          </div>

          <div>
            <p>
              Details finden Sie in unserer{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Datenschutzerklärung
              </a>
              .
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">§ 11 Schlussbestimmungen</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">11.1 Anwendbares Recht</h3>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">11.2 Gerichtsstand</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Für Vollkaufleute: Mannheim</li>
              <li>Für Verbraucher: Wohnort des Verbrauchers oder Mannheim</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">11.3 Salvatorische Klausel</h3>
            <p>
              Sollten einzelne Bestimmungen unwirksam sein, berührt dies die Wirksamkeit der 
              übrigen Bestimmungen nicht.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">11.4 Streitbeilegung</h3>
            <p>
              Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle 
              sind wir nicht verpflichtet und nicht bereit.
            </p>
          </div>
        </section>

        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">Kontakt für rechtliche Fragen:</h3>
          <p className="mb-1 flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> recht@dermasense.de</p>
          <p className="mb-4 flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +49 621 123 4567</p>
          <p className="text-sm text-muted-foreground italic">
            Diese AGB wurden erstmals am 01.01.2025 veröffentlicht.
          </p>
        </div>
      </div>
    </div>
  );
}
