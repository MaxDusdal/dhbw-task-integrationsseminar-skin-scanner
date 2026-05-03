import Link from "next/link";
import { Smartphone, Brain, BarChart2, Stethoscope, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Main landing page component for DermaSense
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-primary font-medium">KI-gestützte Hautanalyse</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Früher erkennen.
            <br />
            <span className="text-primary">Besser verstehen.</span>
            <br />
            Gesünder leben.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            KI-gestützte Hautkrebs-Früherkennung mit 95%+ Genauigkeit. 
            Schnell, sicher und DSGVO-konform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/camera">Jetzt analysieren</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Mehr erfahren</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* ── How It Works Section ── 4-step numbered process cards ──────────────── */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Wie DermaSense funktioniert</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unsere KI-gestützte Analyse macht Hautkrebs-Früherkennung so einfach wie nie zuvor
            </p>
          </div>

          {/* Step 1: Take a photo */}
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-2">
                  <span className="text-2xl">1</span>
                </div>
                <CardTitle>Foto aufnehmen</CardTitle>
                <CardDescription>
                  Nutzen Sie Ihre Smartphone-Kamera für eine hochwertige Aufnahme
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 2: AI analysis */}
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-2">
                  <span className="text-2xl">2</span>
                </div>
                <CardTitle>KI-Analyse</CardTitle>
                <CardDescription>
                  Unsere KI analysiert das Bild in nur 2-3 Sekunden
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 3: Risk assessment result */}
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-2">
                  <span className="text-2xl">3</span>
                </div>
                <CardTitle>Risiko-Assessment</CardTitle>
                <CardDescription>
                  Erhalten Sie sofort eine Risikoeinschätzung mit Handlungsempfehlung
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 4: Book a dermatologist appointment if needed */}
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-2">
                  <span className="text-2xl">4</span>
                </div>
                <CardTitle>Dermatologe kontaktieren</CardTitle>
                <CardDescription>
                  Bei Bedarf direkt Termin bei einem Spezialisten vereinbaren
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Warum DermaSense?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature: Smartphone camera, no extra hardware needed */}
            <Card>
              <CardHeader>
                <Smartphone className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>Smartphone-Kamera-Analyse</CardTitle>
                <CardDescription>
                  Professionelle Hautanalyse direkt mit Ihrem Smartphone. 
                  Keine zusätzliche Hardware erforderlich.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature: AI model trained on 10,000+ medical images */}
            <Card>
              <CardHeader>
                <Brain className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>KI-Technologie</CardTitle>
                <CardDescription>
                  Basierend auf 10.000+ medizinischen Bildern mit 95%+ Genauigkeit 
                  bei der Melanom-Erkennung.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature: Longitudinal tracking of skin changes over time */}
            <Card>
              <CardHeader>
                <BarChart2 className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>Verlaufsdokumentation</CardTitle>
                <CardDescription>
                  Verfolgen Sie Hautveränderungen über Zeit und erkennen Sie 
                  Trends frühzeitig.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature: Direct access to nearby dermatologists with online booking */}
            <Card>
              <CardHeader>
                <Stethoscope className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>Dermatologen-Zugang</CardTitle>
                <CardDescription>
                  Direkter Zugang zu qualifizierten Dermatologen in Ihrer Nähe 
                  mit Online-Terminbuchung.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature: GDPR-compliant, data stored exclusively on German servers */}
            <Card>
              <CardHeader>
                <Lock className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>DSGVO-konform</CardTitle>
                <CardDescription>
                  Ihre Daten werden ausschließlich auf deutschen Servern gespeichert. 
                  Maximaler Datenschutz garantiert.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature: CE Class IIa certified medical device, validated by German clinics */}
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>Medizinisch validiert</CardTitle>
                <CardDescription>
                  CE-Kennzeichnung Klasse IIa. Validiert von führenden 
                  deutschen Hautkliniken.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Vertrauen durch Qualität</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%+</div>
                <p className="text-sm text-muted-foreground">Genauigkeit bei Melanom-Erkennung</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">8.000+</div>
                <p className="text-sm text-muted-foreground">Zufriedene Nutzer</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">CE IIa</div>
                <p className="text-sm text-muted-foreground">Medizinprodukt-Zertifizierung</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">DSGVO-konform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Starten Sie jetzt Ihre erste Hautanalyse
          </h2>
          <p className="text-xl text-muted-foreground">
            Ihre Gesundheit liegt uns am Herzen.
          </p>
          <Button size="lg" asChild>
            <Link href="/camera">Jetzt analysieren</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
