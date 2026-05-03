import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Dermatologen - DermaSense",
  description: "Finden Sie Dermatologen in Ihrer Nähe",
};

const doctors = [
  {
    name: "Dr. med. Sarah Schmidt",
    practice: "Dermatologie Zentrum Mannheim",
    address: "Augustaanlage 32, 68165 Mannheim",
    phone: "0621 123456",
    distance: "2,3 km",
    rating: "4.8",
    reviews: 127,
    specialisation: "Hautkrebsvorsorge, Dermatoskopie",
    waitRoutine: "2–3 Wochen",
    waitUrgent: "3 Tage",
  },
  {
    name: "Dr. med. Michael Weber",
    practice: "Hautarztpraxis Weber",
    address: "Planken 15, 68161 Mannheim",
    phone: "0621 789012",
    distance: "1,8 km",
    rating: "4.2",
    reviews: 89,
    specialisation: "Melanom-Diagnostik, Kinder-Dermatologie",
    waitRoutine: "4–5 Wochen",
    waitUrgent: "1 Woche",
  },
];

export default function DoctorsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="space-y-8">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dermatologen</h1>
          <p className="text-sm text-muted-foreground">
            Qualifizierte Hautärzte für eine professionelle Begutachtung
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="PLZ oder Ort..."
            defaultValue="68161 Mannheim"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button>Suchen</Button>
        </div>

        {/* Results */}
        <div className="space-y-0 divide-y">
          {doctors.map((doc) => (
            <div key={doc.name} className="py-6 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.practice}</p>
                </div>
                <span className="text-sm text-muted-foreground shrink-0">{doc.distance}</span>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>{doc.address} · {doc.phone}</p>
                <p>{doc.specialisation}</p>
                <p>
                  Wartezeit: {doc.waitRoutine} regulär · {doc.waitUrgent} bei Verdacht
                </p>
              </div>

              <div className="flex gap-2 pt-1">
                <Button size="sm">Termin anfragen</Button>
                <Button size="sm" variant="outline">Kontaktieren</Button>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Emergency */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Notfall</p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Ärztlicher Bereitschaftsdienst: <span className="text-foreground font-medium">116 117</span></p>
            <p>Dermatologie Uniklinik Mannheim: <span className="text-foreground font-medium">0621 383-2222</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}
