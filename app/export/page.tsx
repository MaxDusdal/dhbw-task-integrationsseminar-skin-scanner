import { FileText, BarChart2, ClipboardList } from "lucide-react";

export const metadata = {
  title: "Bericht exportieren - DermaSense",
  description: "Erstellen Sie einen Bericht für Ihren Arzt",
};

export default function ExportPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Ärztlichen Bericht erstellen
          </h1>
          <p className="text-muted-foreground">
            Exportieren Sie Ihre Analysedaten für Ihren Arzttermin
          </p>
        </div>

        <div className="bg-muted rounded-lg p-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-24 w-24 mx-auto mb-4 text-muted-foreground"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Export-Funktionen</h3>
          <p className="text-muted-foreground mb-6">
            Hier können Sie verschiedene Berichtstypen auswählen und exportieren
          </p>
          
          <div className="space-y-4 text-left max-w-md mx-auto">
            <div className="bg-background rounded-lg p-4 border">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><FileText className="h-4 w-4" /> Einzelne Analyse</h4>
              <p className="text-sm text-muted-foreground">
                Exportieren Sie eine spezifische Analyse für Ihren Arzttermin
              </p>
            </div>
            <div className="bg-background rounded-lg p-4 border">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><BarChart2 className="h-4 w-4" /> Verlaufsbericht</h4>
              <p className="text-sm text-muted-foreground">
                Dokumentation der letzten 6 Monate mit Trend-Analyse
              </p>
            </div>
            <div className="bg-background rounded-lg p-4 border">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><ClipboardList className="h-4 w-4" /> Gesamtdokumentation</h4>
              <p className="text-sm text-muted-foreground">
                Vollständige Historie aller Analysen
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
