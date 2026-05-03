# DermaSense – KI-gestützte Hautkrebs-Früherkennung

DermaSense is a web application that lets users photograph a skin lesion, classify it with an AI model, and track changes over time.

---

## Features

| Feature | Description |
|---|---|
| **AI skin analysis** | Photograph or upload a lesion; a Python ML service returns a 7-class classification with confidence scores |
| **Plain-language explanation** | GPT-4o-mini generates a patient-friendly German summary of every result |
| **Lesion tracking** | Named lesions can be observed over multiple analyses with a timeline view |
| **AI risk trend** | When ≥ 2 analyses exist for a lesion, GPT-4o-mini evaluates the longitudinal trend (improvement / stable / deterioration) |
| **History & dashboard** | All analyses are persisted in `localStorage` and shown in the dashboard |
| **Dermatologist directory** | Static list of nearby specialists with contact details |
| **Premium page** | Pricing and feature comparison (UI only, no real payment) |
| **Family account** | Manage up to 5 family profiles (UI only) |
| **Export** | Report generation overview (UI only) |
| **Skin-care tips** | Fitzpatrick scale, ABCDE rule, sun-protection guide |
| **Help / FAQ** | Accordion-based FAQ covering app usage, data privacy, and medical context |
| **Legal pages** | Privacy policy and Terms & Conditions |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| UI components | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| Styling | Tailwind CSS v4 |
| Icons | [Lucide React](https://lucide.dev/) |
| AI text generation | OpenAI SDK (`gpt-4o-mini`) |
| ML inference | External Python prediction service (REST) |
| Persistence | Browser `localStorage` (no backend database) |
| Package manager | pnpm 9 |

---

## Project Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout: fonts, Shell wrapper
│   ├── page.tsx                # Landing page
│   ├── login/                  # PoC cookie-based login
│   ├── dashboard/              # Analysis history + tracking overview
│   ├── camera/                 # Live camera capture & image upload
│   ├── analysis-result/        # Result display, notes, lesion linking
│   ├── tracking/[id]/          # Longitudinal view for a single lesion
│   ├── doctors/                # Dermatologist directory
│   ├── export/                 # Report export overview
│   ├── family/                 # Family account management
│   ├── premium/                # Pricing & feature comparison
│   ├── tips/                   # Skin-protection guide
│   ├── help/                   # FAQ
│   ├── about/                  # Company info, team, roadmap
│   ├── privacy/                # Privacy policy (GDPR)
│   ├── terms/                  # Terms & Conditions
│   └── api/
│       ├── predict/            # Proxy → Python ML service
│       ├── explain/            # OpenAI: result explanation
│       └── risk-trend/         # OpenAI: longitudinal risk trend
├── components/
│   ├── layout/                 # Shell, Navbar, Footer, UserMenu
│   └── ui/                     # shadcn/ui primitives
├── lib/
│   ├── history.ts              # localStorage CRUD for analyses & lesions
│   └── utils.ts                # Tailwind class merge helper
└── middleware.ts               # Cookie-based route guard
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 (`npm install -g pnpm`)
- A running Python prediction service (see below)
- An OpenAI API key (optional, the app degrades gracefully without it)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
# URL of the Python ML prediction service (must expose POST /predict)
PREDICTION_SERVICE_URL=http://localhost:8000

# Optional: enables AI explanations and risk-trend analysis
OPENAI_API_KEY=sk-...
```

### 3. Start the development server

```bash
pnpm dev
```

The app is available at [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
pnpm build
pnpm start
```

---

## Python Prediction Service

The `/api/predict` route is a proxy that forwards images to an external service. The service must accept:

```
POST /predict
Content-Type: multipart/form-data

file   image file (JPEG/PNG)
tta    "true" | "false"   (test-time augmentation)
```

And return JSON:

```json
{
  "top_class": "mel",
  "top_name": "Melanom",
  "confidence": 0.87,
  "high_risk": true,
  "probabilities": {
    "mel": 0.87,
    "nv": 0.06,
    ...
  },
  "tta": false
}
```

The seven supported classes are:

| Code | Label |
|---|---|
| `mel` | Melanom |
| `bcc` | Basalzellkarzinom |
| `akiec` | Aktinische Keratose / Intraepith. Karzinom |
| `nv` | Melanozytischer Nävus |
| `bkl` | Benigne Keratose |
| `df` | Dermatofibrom |
| `vasc` | Vaskuläre Läsion |

---

## API Routes

### `POST /api/predict`

Proxies a multipart image to `PREDICTION_SERVICE_URL/predict`. Keeps the service URL server-side to avoid CORS issues.

### `POST /api/explain`

Calls GPT-4o-mini to generate a 3–5 sentence German explanation of a classification result. Returns `{ explanation: string }`. Falls back to a static message when `OPENAI_API_KEY` is not set.

**Request body:**

```json
{
  "top_class": "mel",
  "top_name": "Melanom",
  "confidence": 0.87,
  "high_risk": true,
  "probabilities": { ... }
}
```

### `POST /api/risk-trend`

Calls GPT-4o-mini to evaluate the longitudinal risk trajectory of a tracked lesion. Requires at least 2 analyses. Returns `{ trend: "Verbesserung" | "Stabil" | "Verschlechterung", explanation: string }`.

**Request body:**

```json
{
  "lesionName": "Muttermal Rücken",
  "analyses": [
    { "date": "01.01.2025", "risk_level": "Niedrig-Risiko", "confidence": 0.82, "top_class": "nv" },
    { "date": "01.04.2025", "risk_level": "Hoch-Risiko",   "confidence": 0.91, "top_class": "mel" }
  ]
}
```

---

## Authentication

Authentication is a **proof-of-concept only**. Entering any name on the login page writes a `dermasense_user` cookie valid for one year. The Next.js middleware (`middleware.ts`) checks for this cookie and redirects unauthenticated requests to `/login`.

Public routes (no login required): `/`, `/login`, `/about`, `/help`, `/privacy`, `/terms`, `/tips`.

**There is no real user database, password hashing, or session management.**

---

## Data Persistence

All user data is stored exclusively in the browser's `localStorage` under two keys:

| Key | Contents |
|---|---|
| `dermasense_history` | Array of `SavedAnalysis` objects (results, images, notes) |
| `dermasense_tracking` | Array of `TrackedLesion` objects (named lesions being monitored) |

Images are stored as base64 data URLs. If a write exceeds the storage quota, the image is automatically stripped and the result is retried without it.

Data does not leave the device unless the `/api/explain` or `/api/risk-trend` endpoints are called, which send anonymised classification metadata (no images) to OpenAI.

---

## Medical Disclaimer

DermaSense is a **proof-of-concept application built for academic purposes**. It is not a certified medical device and does not replace professional dermatological diagnosis. Always consult a qualified dermatologist for medical advice.

---

## Team

| Name |
|---|
| Fey Schreier |
| Alexander Kott |
| Maximilian Dusdal |
| Stefanie Fast |
| Fabian Weber |