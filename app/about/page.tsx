import { Badge } from "@/components/ui/badge";
import { Brain, Microscope, ShieldCheck, Trophy, Building2, Cloud, GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Über uns - DermaSense",
  description: "Erfahren Sie mehr über DermaSense und unser Team",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <Badge className="mb-4">Über DermaSense</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Unsere Mission
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-primary max-w-3xl mx-auto">
            "Hautkrebs-Früherkennung für alle zugänglich machen"
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Mit über 300.000 jährlichen Neuerkrankungen ist Hautkrebs die häufigste Krebsart in Deutschland. 
            Früh erkannt liegt die Heilungschance bei 99% - doch oft wird wertvolle Zeit verloren.
          </p>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            DermaSense demokratisiert den Zugang zu hochwertiger Hautanalyse durch künstliche Intelligenz 
            und macht Früherkennung so selbstverständlich wie das tägliche Zähneputzen.
          </p>
        </section>

        {/* Statistics */}
        <section className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-5xl font-bold text-primary mb-3">8.000+</div>
            <p className="text-sm font-medium">Zufriedene Nutzer</p>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-5xl font-bold text-primary mb-3">95%+</div>
            <p className="text-sm font-medium">Genauigkeit bei Melanom-Erkennung</p>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-5xl font-bold text-primary mb-3">10.000+</div>
            <p className="text-sm font-medium">Medizinische Trainingsdaten</p>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-5xl font-bold text-primary mb-3">100%</div>
            <p className="text-sm font-medium">DSGVO-konform</p>
          </div>
        </section>

        <Separator />

        {/* Team */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Das Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ein interdisziplinäres Team aus Medizin, Technologie und Business
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { initials: "FS", name: "Dr. med. Fey Schreier", role: "CEO & Gründerin" },
              { initials: "AK", name: "Alexander Kott", role: "CTO & Co-Gründer" },
              { initials: "MD", name: "Maximilian Dusdal", role: "CMO" },
              { initials: "CG", name: "Christian Groß", role: "Medical Data Scientist" },
              { initials: "SF", name: "Stefanie Fast", role: "UX/UI Design" },
              { initials: "FW", name: "Fabian Weber", role: "Regulatory Affairs" },
            ].map((member) => (
              <div key={member.initials} className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  {member.initials}
                </div>
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Technology */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Unsere Technologie</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Modernste KI-Algorithmen für präzise Hautanalyse
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Brain className="h-6 w-6 text-primary shrink-0" />
                <h3 className="text-lg font-bold">KI-gestützte Analyse</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unser Modell wurde auf einem großen Datensatz klinisch validierter dermatoskopischer
                Aufnahmen trainiert und erkennt verschiedene Arten von Hautläsionen zuverlässig.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Microscope className="h-6 w-6 text-primary shrink-0" />
                <h3 className="text-lg font-bold">Wissenschaftliche Validierung</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Die Algorithmen wurden in Zusammenarbeit mit klinischen Partnern entwickelt
                und werden kontinuierlich durch medizinisches Expertenfeedback verbessert.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Certifications */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Zertifizierungen & Auszeichnungen</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Zertifizierungen</h3>
              <ul className="space-y-3">
                {[
                  "CE-Kennzeichnung Klasse IIa nach MDR",
                  "DiGA-Listung beim BfArM",
                  "ISO 13485 Qualitätsmanagement",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Auszeichnungen</h3>
              <ul className="space-y-3">
                {[
                  "Health Innovation Award 2024",
                  "Digital Health Pioneer – E-Health Summit 2024",
                  "Startup des Jahres – MedTech Germany Awards 2024",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Separator />

        {/* Partner */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Kooperationspartner</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Starke Partner für innovative Lösungen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Medizinische Partner
              </h3>
              
              <div className="space-y-4 pl-4 border-l-2 border-primary/30">
                <div>
                  <p className="font-semibold">Charité Berlin</p>
                  <p className="text-sm text-muted-foreground">Klinische Validierung und Studienpartner</p>
                </div>

                <div>
                  <p className="font-semibold">Universitätsklinikum Mannheim</p>
                  <p className="text-sm text-muted-foreground">Forschungskooperation im Bereich Dermatologie</p>
                </div>

                <div>
                  <p className="font-semibold">Deutsche Dermatologische Gesellschaft</p>
                  <p className="text-sm text-muted-foreground">Fachliche Beratung und Qualitätssicherung</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Cloud className="h-6 w-6" />
                Technologie-Partner
              </h3>
              
              <div className="space-y-4 pl-4 border-l-2 border-primary/30">
                <div>
                  <p className="font-semibold">Google Cloud Health</p>
                  <p className="text-sm text-muted-foreground">
                    DSGVO-konforme Cloud-Infrastruktur und Datensicherheit
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Fraunhofer IAIS</p>
                  <p className="text-sm text-muted-foreground">
                    KI-Forschung & Entwicklung im Bereich medizinische Bildverarbeitung
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Financials */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Investoren & Förderung</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unterstützt von führenden Investoren und Förderprogrammen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">800.000€</div>
              <p className="font-semibold mb-1">Seed-Finanzierung</p>
              <p className="text-sm text-muted-foreground">2025</p>
            </div>

            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <div className="text-3xl mb-2">🇩🇪</div>
              <p className="font-semibold mb-1">EXIST-Gründerstipendium</p>
              <p className="text-sm text-muted-foreground">Bundeswirtschaftsministerium</p>
            </div>

            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <div className="text-3xl mb-2">🇪🇺</div>
              <p className="font-semibold mb-1">Horizon Europe</p>
              <p className="text-sm text-muted-foreground">EU-Gesundheitsforschung</p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Engagement */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Gesellschaftliches Engagement</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wir übernehmen Verantwortung für die Gesellschaft
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                Aufklärungs-Kampagnen
              </h3>
              <ul className="space-y-3 pl-4 border-l-2 border-primary/30">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">Kostenlose Hautkrebs-Screenings in unterversorgten Regionen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">Aufklärungs-Workshops an Schulen und Universitäten</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">Zusammenarbeit mit Krebshilfe Deutschland</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Microscope className="h-6 w-6" />
                Forschungs-Beitrag
              </h3>
              <ul className="space-y-3 pl-4 border-l-2 border-primary/30">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">Open-Source-Beiträge zur medizinischen KI-Forschung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">Anonymisierte Daten für wissenschaftliche Studien</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">Nachwuchsförderung durch Praktika und Abschlussarbeiten</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Separator />

        {/* Vision & Roadmap */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <Badge className="text-lg px-4 py-2">Vision 2030</Badge>
            <h2 className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto">
              "Hautkrebs-bedingte Todesfälle um 50% reduzieren durch flächendeckende 
              KI-gestützte Früherkennung"
            </h2>
          </div>

          <div className="space-y-8 max-w-2xl mx-auto">
            {[
              { year: "2025", title: "100.000 aktive Nutzer", desc: "Etablierung in Deutschland als führende Hautanalyse-App" },
              { year: "2026", title: "DACH-Expansion", desc: "Rollout in Österreich und Schweiz mit lokalisierten Versionen" },
              { year: "2027", title: "EU-weite Verfügbarkeit", desc: "Launch in allen EU-Ländern mit mehrsprachigem Support" },
              { year: "2028", title: "Integration in Screening-Programme", desc: "Partnerschaft mit nationalen Gesundheitssystemen" }
            ].map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                  {milestone.year}
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="text-xl font-bold mb-2">{milestone.title}</h4>
                  <p className="text-muted-foreground">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* CTA Section */}
        <section className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Werden Sie Teil unserer Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Helfen Sie uns, Hautkrebs-Früherkennung für alle zugänglich zu machen
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/camera">Jetzt kostenlos testen</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/premium">Premium upgraden</Link>
            </Button>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center space-y-8 pt-8">
          <h2 className="text-3xl font-bold">Kontakt</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-2">
              <Mail className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <p className="font-semibold">E-Mail</p>
              <p className="text-sm text-muted-foreground">info@dermasense.de</p>
            </div>

            <div className="space-y-2">
              <Phone className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <p className="font-semibold">Telefon</p>
              <p className="text-sm text-muted-foreground">+49 621 123 4567</p>
            </div>

            <div className="space-y-2">
              <MapPin className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <p className="font-semibold">Adresse</p>
              <p className="text-sm text-muted-foreground">
                Augustaanlage 32<br />
                68165 Mannheim<br />
                Deutschland
              </p>
            </div>
          </div>

          <div className="pt-6">
            <p className="text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-primary transition-colors">AGB</Link>
              {" · "}
              <Link href="/privacy" className="hover:text-primary transition-colors">Datenschutz</Link>
              {" · "}
              <Link href="/help" className="hover:text-primary transition-colors">Hilfe</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
