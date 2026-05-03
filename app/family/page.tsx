import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

export const metadata = {
  title: "Familienkonto - DermaSense",
  description: "Verwalten Sie Ihre Familienprofile",
};

export default function FamilyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Familienkonto
          </h1>
          <p className="text-muted-foreground">
            Verwalten Sie bis zu 5 Familienprofile
          </p>
        </div>

        {/* Main Profile */}
        <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Hauptkonto</h2>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <p className="font-semibold">Max Mustermann</p>
          <p className="text-sm text-muted-foreground">max@beispiel.de</p>
        </div>

        <Separator />

        {/* Family Profiles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Familienmitglieder</h2>
            <Badge variant="outline">4/5</Badge>
          </div>

          <div className="space-y-3">
            {/* Lisa */}
            <div className="border rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-sm text-primary">
                  LM
                </div>
                <div>
                  <p className="font-semibold">Lisa Mustermann</p>
                  <p className="text-sm text-muted-foreground">Ehefrau • 42 Jahre</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">Verwalten</Button>
              </div>
            </div>

            {/* Tom */}
            <div className="border rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-sm text-primary">
                  TM
                </div>
                <div>
                  <p className="font-semibold">Tom Mustermann</p>
                  <p className="text-sm text-muted-foreground">Sohn • 16 Jahre</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">Verwalten</Button>
              </div>
            </div>

            {/* Emma */}
            <div className="border rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-sm text-primary">
                  EM
                </div>
                <div>
                  <p className="font-semibold">Emma Mustermann</p>
                  <p className="text-sm text-muted-foreground">Tochter • 14 Jahre</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">Verwalten</Button>
              </div>
            </div>

            {/* Hans */}
            <div className="border rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-sm text-primary">
                  HM
                </div>
                <div>
                  <p className="font-semibold">Hans Mustermann</p>
                  <p className="text-sm text-muted-foreground">Vater • 68 Jahre</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">Verwalten</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Add a new family member */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Familienmitglied hinzufügen</h2>
            <Badge variant="outline" className="text-xs">1 Platz verfügbar</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">E-Mail-Adresse</label>
              <input
                type="email"
                placeholder="familie@beispiel.de"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Verwandtschaftsgrad</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="">Bitte wählen...</option>
                <option value="partner">Ehepartner/Partner</option>
                <option value="child">Kind</option>
                <option value="parent">Elternteil</option>
                <option value="sibling">Geschwister</option>
                <option value="other">Sonstiges</option>
              </select>
            </div>

            <Button className="w-full">Einladung senden</Button>
          </div>
        </div>

        <Separator />

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Datenschutz & Privatsphäre</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Jedes Familienmitglied hat ein eigenes, privates Profil</li>
            <li>• Analyseergebnisse werden nicht geteilt</li>
            <li>• Eltern haben Zugriff auf Profile von Kindern unter 16 Jahren</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
