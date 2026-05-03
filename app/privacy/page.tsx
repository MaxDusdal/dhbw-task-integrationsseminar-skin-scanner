import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Printer } from "lucide-react";

export const metadata = {
  title: "Datenschutzerklärung - DermaSense",
  description: "Datenschutzerklärung der DermaSense GmbH",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Datenschutzerklärung</h1>
        <p className="text-muted-foreground mb-8">
          Letzte Aktualisierung: 17. Februar 2025
        </p>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">1. Verantwortlicher</h2>
          
          <div className="mb-6">
            <p className="font-semibold mb-1">DermaSense GmbH</p>
            <p className="text-muted-foreground">Augustaanlage 32, 68165 Mannheim</p>
            <p className="text-muted-foreground">E-Mail: datenschutz@dermasense.de</p>
            <p className="text-muted-foreground">Telefon: +49 621 123 4567</p>
          </div>

          <div>
            <p className="font-semibold mb-1">Datenschutzbeauftragter:</p>
            <p className="text-muted-foreground">Dr. Julia Weber</p>
            <p className="text-muted-foreground">E-Mail: dsb@dermasense.de</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">2.1 Hautanalyse-Daten</h3>
            <p className="mb-2"><strong>Verarbeitete Daten:</strong></p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Fotografien von Hautläsionen</li>
              <li>Analyseergebnisse der KI</li>
              <li>Zeitstempel der Aufnahmen</li>
              <li>Körperstellen-Angaben</li>
              <li>Notizen des Nutzers</li>
            </ul>
            <p className="mb-2">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), 
              Art. 9 Abs. 2 lit. a DSGVO (Einwilligung Gesundheitsdaten)
            </p>
            <p>
              <strong>Zweck:</strong> Bereitstellung der Hautanalyse, Verlaufsdokumentation
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">2.2 Technische Daten</h3>
            <p className="mb-2"><strong>Automatisch erhobene Daten:</strong></p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>IP-Adresse (anonymisiert nach 7 Tagen)</li>
              <li>Geräte-Informationen (Betriebssystem, App-Version)</li>
              <li>Nutzungsstatistiken (aggregiert und anonymisiert)</li>
            </ul>
            <p className="mb-2">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
            </p>
            <p>
              <strong>Zweck:</strong> Technische Bereitstellung der App, Sicherheit, Verbesserung
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">3. Datenverarbeitung und -speicherung</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">3.1 Speicherort</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ausschließlich deutsche Rechenzentren (Hetzner, Frankfurt/Nürnberg)</li>
              <li>Keine Datenübertragung in Drittländer</li>
              <li>DSGVO-konforme Infrastruktur</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">3.2 Verschlüsselung</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Transport:</strong> TLS 1.3 Verschlüsselung</li>
              <li><strong>Speicherung:</strong> AES-256 Verschlüsselung</li>
              <li><strong>Bilder:</strong> Separate verschlüsselte Speicherung</li>
              <li><strong>Backups:</strong> Verschlüsselt mit separaten Schlüsseln</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">3.3 Speicherdauer</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 pr-4">Datentyp</th>
                    <th className="text-left py-3 pr-4">Speicherdauer</th>
                    <th className="text-left py-3">Begründung</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 pr-4">Account-Daten</td>
                    <td className="py-3 pr-4">Bis zur Löschung</td>
                    <td className="py-3">Vertragliche Notwendigkeit</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4">Hautanalyse-Bilder</td>
                    <td className="py-3 pr-4">2 Jahre</td>
                    <td className="py-3">Med. Verlaufsdokumentation</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4">Analyseergebnisse</td>
                    <td className="py-3 pr-4">2 Jahre</td>
                    <td className="py-3">Verlaufsbeobachtung</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Technische Logs</td>
                    <td className="py-3 pr-4">30 Tage</td>
                    <td className="py-3">Sicherheit und Fehleranalyse</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">4. Datenübermittlung</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">4.1 Keine Weitergabe an Dritte</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Gesundheitsdaten werden <strong>niemals</strong> an Dritte weitergegeben</li>
              <li>Keine Verkäufe von Nutzerdaten</li>
              <li>Keine Weitergabe zu Werbezwecken</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">4.2 Ausnahmen (nur mit Ihrer Zustimmung)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Export für Ihren behandelnden Arzt</li>
              <li>Anonymisierte Daten für medizinische Forschung</li>
              <li>Technische Dienstleister (Auftragsverarbeiter nach Art. 28 DSGVO)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">4.3 Auftragsverarbeiter</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 pr-4">Dienstleister</th>
                    <th className="text-left py-3 pr-4">Zweck</th>
                    <th className="text-left py-3">Standort</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 pr-4">Hetzner Online GmbH</td>
                    <td className="py-3 pr-4">Server-Hosting</td>
                    <td className="py-3">Deutschland</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Stripe Payments Europe</td>
                    <td className="py-3 pr-4">Zahlungsabwicklung</td>
                    <td className="py-3">Irland (EU)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">5. Ihre Rechte</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">5.1 Auskunftsrecht (Art. 15 DSGVO)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Vollständige Übersicht aller gespeicherten Daten</li>
              <li>Anfrage per E-Mail an datenschutz@dermasense.de</li>
              <li>Antwort innerhalb von 30 Tagen</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">5.2 Berichtigungsrecht (Art. 16 DSGVO)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Korrektur unrichtiger Daten jederzeit möglich</li>
              <li>Über Account-Einstellungen oder Support-Anfrage</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">5.3 Löschungsrecht (Art. 17 DSGVO)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Vollständige Datenlöschung jederzeit möglich</li>
              <li>Account-Löschung über Einstellungen</li>
              <li>Automatische Löschung nach 2 Jahren Inaktivität</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">5.4 Datenportabilität (Art. 20 DSGVO)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Export aller Daten in maschinenlesbarem Format</li>
              <li>Download über Account-Einstellungen</li>
              <li>Übertragung an anderen Anbieter möglich</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">5.5 Widerspruchsrecht (Art. 21 DSGVO)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Widerspruch gegen Verarbeitung auf Basis berechtigter Interessen</li>
              <li>E-Mail an datenschutz@dermasense.de</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">6. Besondere Kategorien personenbezogener Daten (Gesundheitsdaten)</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">6.1 Einwilligung</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Ausdrückliche Einwilligung</strong> vor erster Nutzung</li>
              <li>Detaillierte Information über Datenverarbeitung</li>
              <li><strong>Widerruf jederzeit möglich</strong> ohne Nachteile</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">6.2 Zweckbindung</h3>
            <p className="mb-2">Gesundheitsdaten werden ausschließlich verwendet für:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Hautanalyse durch KI-Algorithmus</li>
              <li>Verlaufsdokumentation für Sie</li>
              <li>Verbesserung der Analysealgorithmen (anonymisiert)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">6.3 Besondere Schutzmaßnahmen</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Getrennte Speicherung von Identitäts- und Gesundheitsdaten</li>
              <li>Zusätzliche Verschlüsselungsebene</li>
              <li>Beschränkter Zugang nur für autorisierte Mitarbeiter</li>
              <li>Regelmäßige Sicherheitsaudits</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">7. Cookies und Tracking</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">7.1 Notwendige Cookies</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Session-Management (Login-Status)</li>
              <li>Sicherheits-Token (CSRF-Schutz)</li>
              <li><strong>Keine Tracking-Cookies oder Werbung</strong></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">7.2 Analyse (optional)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Anonymisierte Nutzungsstatistiken</li>
              <li>Keine Profilerstellung</li>
              <li>Opt-out jederzeit möglich</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">8. Datensicherheit</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">8.1 Technische Maßnahmen</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>ISO 27001 zertifizierte Sicherheitsprozesse</li>
              <li>Regelmäßige Penetrationstests</li>
              <li>24/7 Sicherheitsmonitoring</li>
              <li>Incident Response Plan</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">8.2 Organisatorische Maßnahmen</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Schulungen aller Mitarbeiter</li>
              <li>Rollenbasierte Zugriffskontrolle</li>
              <li>Dokumentierte Sicherheitsrichtlinien</li>
              <li>Regelmäßige Sicherheitsaudits</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">9. Kontakt und Beschwerden</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Datenschutz-Team:</h3>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> datenschutz@dermasense.de</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +49 621 123 4567</p>
            <p className="flex items-center gap-2"><Printer className="h-4 w-4 shrink-0" /> +49 621 123 4568</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Aufsichtsbehörde:</h3>
            <p className="mb-1">
              Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg
            </p>
            <p>Lautenschlagerstraße 20, 70173 Stuttgart</p>
            <p>E-Mail: poststelle@lfdi.bwl.de</p>
          </div>
        </section>
      </div>
    </div>
  );
}
