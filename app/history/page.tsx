import { redirect } from "next/navigation";

// History was merged into the Dashboard. This redirect keeps old bookmarks and
// navbar links pointing to /history working without a 404.
export default function HistoryPage() {
  redirect("/dashboard");
}
