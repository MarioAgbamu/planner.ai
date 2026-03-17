# 📐 Assignment Planner

A modern, mobile-friendly web app that helps students break assignments into achievable, step-by-step schedules — for Students fighting Procrastination.

---

## ✨ Features

- **4 assignment types** — Essay, Research Paper, Presentation, Project
- **Smart phase breakdown** — Weighted time allocation per phase
- **Urgency indicator** — Green / Yellow / Red based on days remaining
- **Segmented progress bar** — Visual timeline overview
- **Expandable task cards** — Tips for each phase
- **📅 Export to .ics** — Add your schedule directly to Google Calendar, Apple Calendar, etc.
- **Fully responsive** — Works great on mobile

---

## 🏗 Project Structure

```
assignment-calculator/
├── app/
│   ├── globals.css          # Global styles, CSS variables, Google Fonts
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page (form ↔ result state machine)
│
├── components/
│   ├── AssignmentForm.tsx   # Input form with validation
│   ├── TimelineGenerator.tsx # Output view (header + actions)
│   ├── TaskList.tsx         # Expandable phase cards
│   ├── ProgressBar.tsx      # Segmented visual timeline bar
│   └── UrgencyIndicator.tsx # Green/yellow/red status pill
│
├── lib/
│   └── timeline.ts          # Core logic: phase definitions, timeline generation, ICS export
│
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ ([download](https://nodejs.org))
- **npm** v9+ (comes with Node)

### Installation

```bash
# 1. Clone or unzip the project
cd assignment-calculator

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

Or deploy instantly to [Vercel](https://vercel.com):

```bash
npx vercel
```

---

## 🧩 Extending the App

### Adding a new assignment type

1. Open `lib/timeline.ts`
2. Add your type to `AssignmentType`:
   ```ts
   export type AssignmentType = 'essay' | 'research_paper' | 'presentation' | 'project' | 'lab_report'
   ```
3. Add phases to the `PHASES` object with `name`, `percentage`, `description`, `icon`, and `tips`
4. Add the new type option in `components/AssignmentForm.tsx` in the `ASSIGNMENT_TYPES` array

### Customizing colors / theme

All design tokens are in `app/globals.css` under `:root` and `tailwind.config.js` under `theme.extend.colors`.

### Adding a database

For persistence, you can integrate:
- **Supabase** (Postgres + auth) — great free tier
- **PlanetScale** (MySQL serverless)
- **Upstash Redis** — for simple key/value storage

Add a `POST /api/save` route in `app/api/` using Next.js Route Handlers.

---

## 🛠 Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Framework | Next.js 14 (App Router)   |
| UI        | React 18                  |
| Styling   | Tailwind CSS 3            |
| Language  | TypeScript                |
| Fonts     | DM Serif Display + DM Sans (Google Fonts) |
| Export    | RFC 5545 iCalendar (.ics) |

---

## 📄 License

MIT — feel free to use, modify, and extend.
