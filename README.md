# AgileIntel Offshore Team Savings & Capacity Calculator

A production-ready, responsive, source-backed B2B ROI and delivery capacity calculator built for **AgileIntel Research** in partnership with **The Maze**, specifically designed for conference and B2B event organisers across the UK, Europe, and the US.

The calculator answers the core commercial question:
> *"How much could my business save, and what additional delivery capacity could I gain, by moving selected work to an AgileIntel-managed team in India?"*

---

## 🚀 Key Features

- **Source-Backed Salary Benchmarks:** Pre-loaded with verified indicative base salaries across 24 B2B event, data, and marketing roles from the *AgileIntel Offshoring B2B Events Introduction 2026* presentation (Glassdoor review as of 31 August 2026).
- **Two Commercial Pricing Modes:**
  - *Salary-Only Benchmark (Source-Backed):* Compares base salaries only (excluding AgileIntel management fees and on-costs) and transparently prompts for a tailored pod quote.
  - *Indicative Managed Model:* Simulates an all-inclusive managed delivery team with 12% India employer statutory on-costs and £7,500/headcount/year management, HR, and QA fees.
- **Granular Cost Modeling:**
  - Customizable employer on-costs (% or fixed amount).
  - Configurable annual seat overheads (desk, IT, SaaS licenses).
  - Separate one-time local recruitment fees (avoided for new teams).
  - Setup and transition cost amortization.
- **Financial Metrics & Visualizations:**
  - Ongoing Annual Operating Cost Comparison.
  - Net Annual Savings (£ and %).
  - First-Year Net Savings.
  - Cost-Based ROI and Break-Even Horizon.
  - SVG comparison chart with authentic deck palette.
- **Deck-Backed Evidence Sections:**
  - 7 Event Lifecycle Capabilities + Data Science & IT Support deliverables.
  - Full Searchable 24-Role Benchmark Table with 1-click &ldquo;Add to Calculator&rdquo;.
  - Client Case Studies (1,200% download lift, 43% commercial growth, 10k+ companies tiered).
  - 90-Day Implementation Timeline & Governance Matrix.
  - Enterprise Data Security & Compliance Pillars (UK/EU GDPR & India DPDP).
- **Lead Generation & Booking:**
  - Tailored proposal request form pre-filled with the visitor's calculator scope.
  - Zero-friction Calendly integration support for instant scheduling.

---

## 🎨 Brand Design Tokens

Extracted directly from the presentation vector artwork:

- `--brand-primary`: `#0b2350` (Deep Midnight Navy)
- `--brand-secondary`: `#1f4fb4` (Vibrant Agile Royal Blue)
- `--brand-accent`: `#3d5a92` (Mid-Slate Blue)
- `--surface`: `#ffffff` (Crisp White)
- `--surface-muted`: `#f4f6fa` (Cool Grey-Blue Slide Surface)
- `--text-primary`: `#1b2433` (Charcoal Slate)
- `--text-secondary`: `#5b6577` (Muted Slate Grey)
- `--border`: `#d8dee9` (Subtle Divider Border)
- `--success`: `#0d8a56` (Solid Emerald)

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Testing:** Vitest (15 comprehensive financial engine tests)
- **Deployment:** Vercel

---

## 🚦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Automated Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## ☁️ Deploying to Vercel

This repository is optimized for zero-config Vercel deployment:

1. Push this repository to GitHub (`https://github.com/aitoolsteejay/agileintel-roi.git`).
2. Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the `agileintel-roi` repository.
4. Leave the default build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
5. *(Optional)* Add Environment Variables if you want to connect external tools:
   - `NEXT_PUBLIC_CALENDLY_URL` — Your team's Calendly booking link (e.g., `https://calendly.com/agileintel/30min`).
   - `LEAD_WEBHOOK_URL` — Webhook destination (e.g., Zapier, Make, or CRM webhook).
6. Click **Deploy**.

---

## 📄 License & Attribution

Based on *AgileIntel Offshoring B2B Events Introduction 2026*.  
Partnership: **AgileIntel Research** (Dev Mehta, Mumbai, India) & **The Maze** (Sandeep Saujani, Europe/UK/US).
