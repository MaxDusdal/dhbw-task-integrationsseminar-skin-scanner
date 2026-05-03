import { Button } from "@/components/ui/button";
import { Gem, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata = {
  title: "Premium - DermaSense",
  description: "Upgrade auf Premium für erweiterte Funktionen",
};

export default function PremiumPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <Badge className="mb-4 inline-flex items-center gap-1"><Gem className="h-3.5 w-3.5" /> Premium</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            DermaSense Premium
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unbegrenzte Analysen und erweiterte Funktionen für optimale Hautgesundheit
          </p>
        </div>

        {/* Feature-Comparison */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-semibold">Feature</th>
                <th className="text-center py-4 px-4 font-semibold">Basic</th>
                <th className="text-center py-4 px-4 font-semibold bg-primary/5">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-4">Analysen pro Monat</td>
                <td className="text-center py-4 px-4 text-muted-foreground">3</td>
                <td className="text-center py-4 px-4 bg-primary/5 font-semibold"><span className="flex items-center justify-center gap-1.5"><Check className="h-4 w-4 text-primary" /> Unbegrenzt</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4">Risikoanalyse</td>
                <td className="text-center py-4 px-4 text-muted-foreground">Basis</td>
                <td className="text-center py-4 px-4 bg-primary/5 font-semibold"><span className="flex items-center justify-center gap-1.5"><Check className="h-4 w-4 text-primary" /> Detailliert</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4">Verlauf</td>
                <td className="text-center py-4 px-4 text-muted-foreground">12 Monate</td>
                <td className="text-center py-4 px-4 bg-primary/5 font-semibold"><span className="flex items-center justify-center gap-1.5"><Check className="h-4 w-4 text-primary" /> Unbegrenzt</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4">Trend-Analyse</td>
                <td className="text-center py-4 px-4 text-muted-foreground">-</td>
                <td className="text-center py-4 px-4 bg-primary/5 font-semibold"><Check className="h-4 w-4 text-primary mx-auto" /></td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4">Export (PDF/DICOM)</td>
                <td className="text-center py-4 px-4 text-muted-foreground">Basis-PDF</td>
                <td className="text-center py-4 px-4 bg-primary/5 font-semibold"><span className="flex items-center justify-center gap-1.5"><Check className="h-4 w-4 text-primary" /> Erweitert</span></td>
              </tr>
              <tr>
                <td className="py-4 px-4">Familienkonten</td>
                <td className="text-center py-4 px-4 text-muted-foreground">-</td>
                <td className="text-center py-4 px-4 bg-primary/5 font-semibold"><span className="flex items-center justify-center gap-1.5"><Check className="h-4 w-4 text-primary" /> Bis 5 Profile</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <Separator />

        {/* Pricing Options */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Preisoptionen</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="border rounded-lg p-6 text-center space-y-4">
              <Badge variant="outline">Monatlich</Badge>
              <div>
                <p className="text-4xl font-bold">9,99€</p>
                <p className="text-sm text-muted-foreground">pro Monat</p>
              </div>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Monatlich kündbar</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>30 Tage Geld-zurück</span>
                </li>
              </ul>
              <Button className="w-full" size="lg">Jetzt starten</Button>
            </div>

            <div className="border-2 border-primary rounded-lg p-6 text-center space-y-4 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Beliebt</Badge>
              <Badge variant="outline">Jährlich</Badge>
              <div>
                <p className="text-4xl font-bold">99€</p>
                <p className="text-sm text-muted-foreground">8,25€/Monat - 2 Monate gratis</p>
              </div>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Spare 20%</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>30 Tage Geld-zurück</span>
                </li>
              </ul>
              <Button className="w-full" size="lg">Jetzt sparen</Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Häufige Fragen</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cancel">
              <AccordionTrigger>Kann ich jederzeit kündigen?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Ja, monatliche Kündigung ohne Angabe von Gründen möglich. 
                  Bei jährlicher Zahlung ist eine vorzeitige Kündigung ebenfalls möglich.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data">
              <AccordionTrigger>Was passiert mit meinen Daten bei Kündigung?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Ihre Daten bleiben 2 Jahre verfügbar. Export jederzeit möglich. 
                  Sie können auch nach der Kündigung auf Ihre historischen Daten zugreifen.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="trial">
              <AccordionTrigger>Kann ich Premium testen?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-3">
                  Ja! 7 Tage kostenlose Testphase mit allen Premium-Features. 
                  Automatische Kündigung bei Nicht-Gefallen ohne zusätzliche Kosten.
                </p>
                <Button size="sm">Jetzt testen</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment">
              <AccordionTrigger>Welche Zahlungsmethoden werden akzeptiert?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Kreditkarte (Visa, MasterCard)</li>
                  <li>PayPal</li>
                  <li>SEPA-Lastschrift</li>
                  <li>Apple Pay / Google Pay</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="family">
              <AccordionTrigger>Wie funktionieren Familienkonten?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Mit Premium können Sie bis zu 5 Familienprofile anlegen. 
                  Jedes Profil hat eigene Analysen und Verlaufsdaten. 
                  Perfekt für die ganze Familie.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="difference">
              <AccordionTrigger>Was ist der Unterschied zwischen Basic und Premium?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-2">
                  Premium bietet unbegrenzte Analysen statt nur 3 pro Monat, 
                  detaillierte Risikoanalysen mit Confidence Score, unbegrenzten Verlauf, 
                  Trend-Analysen und erweiterte Export-Funktionen.
                </p>
                <p className="text-sm text-muted-foreground">
                  Ideal für regelmäßige Kontrollen und Familien.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Separator />

        {/* CTA */}
        <div className="bg-primary/5 rounded-lg p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Bereit für Premium?</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Starten Sie noch heute und nutzen Sie alle Vorteile von DermaSense Premium
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg">Premium aktivieren</Button>
            <Button size="lg" variant="outline">7 Tage testen</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
