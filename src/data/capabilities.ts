export interface DeliveryCapability {
  id: string;
  number: string;
  title: string;
  lifecycleStage: string;
  description: string;
  deliverables: string[];
  isQuickWin?: boolean;
}

export const DELIVERY_CAPABILITIES: DeliveryCapability[] = [
  {
    id: "research-data",
    number: "01",
    title: "Research & Data",
    lifecycleStage: "PLAN",
    description: "Deep research foundations powering market relevance and qualified audience reach.",
    deliverables: [
      "Market & event research",
      "Database build & enrichment",
      "Sponsor prospect research",
      "Competitive benchmarking",
    ],
    isQuickWin: true,
  },
  {
    id: "marketing-ops",
    number: "02",
    title: "Marketing Ops",
    lifecycleStage: "PROMOTE",
    description: "High-throughput campaign operations, email automation, and multi-channel asset distribution.",
    deliverables: [
      "Email campaign execution",
      "Marketing automation workflows",
      "Landing pages & social publishing",
      "Campaign QA and tracking",
    ],
    isQuickWin: true,
  },
  {
    id: "acquisition",
    number: "03",
    title: "Acquisition",
    lifecycleStage: "ACQUIRE",
    description: "Systematic prospect discovery, outreach execution, and attendee acquisition pacing.",
    deliverables: [
      "Prospect research & target leads",
      "Outreach sequencing & follow-up",
      "Automated communications pacing",
      "Delegate qualification",
    ],
    isQuickWin: true,
  },
  {
    id: "crm",
    number: "04",
    title: "CRM & Sales Operations",
    lifecycleStage: "CONVERT",
    description: "Clean data pipeline, automated lead routing, and SDR pipeline support.",
    deliverables: [
      "CRM data hygiene & deduplication",
      "Audience segmentation & scoring",
      "Lead qualification & routing to sales",
      "Pipeline tracking & SDR support",
    ],
    isQuickWin: true,
  },
  {
    id: "event-ops",
    number: "05",
    title: "Event Operations",
    lifecycleStage: "DELIVER",
    description: "Flawless backstage operational coordination for attendees, speakers, and sponsors.",
    deliverables: [
      "Registration management & ticketing",
      "Speaker & sponsor coordination",
      "Attendee communication & logistical support",
      "Post-event surveys & analytics",
    ],
    isQuickWin: true,
  },
  {
    id: "content-creative",
    number: "06",
    title: "Content & Creative",
    lifecycleStage: "ENGAGE",
    description: "High-volume visual collateral, slide decks, video editing, and social promo assets.",
    deliverables: [
      "Event collateral & signage design",
      "Executive presentation design",
      "Social creatives & video snippets",
      "Brochures and agenda packs",
    ],
    isQuickWin: true,
  },
  {
    id: "finance-admin",
    number: "07",
    title: "Finance & Admin",
    lifecycleStage: "ANALYSE",
    description: "Operational bookkeeping, revenue pacing, AP/AR processing, and vendor reconciliations.",
    deliverables: [
      "Accounts Receivable (AR) & Accounts Payable (AP) processing",
      "Sales pacing & revenue tracking",
      "Management accounts preparation",
      "Vendor invoice reconciliation",
    ],
    isQuickWin: false,
  },
  {
    id: "data-science",
    number: "08",
    title: "Data Science & Analytics",
    lifecycleStage: "INTELLIGENCE",
    description: "Predictive attendee modeling, BI dashboard development, and commercial insights.",
    deliverables: [
      "Tableau & PowerBI interactive dashboards",
      "Audience engagement predictive analytics",
      "Pricing elasticity and attendance pacing",
      "Executive data pipelines",
    ],
    isQuickWin: false,
  },
  {
    id: "it-support",
    number: "09",
    title: "IT Support & Systems",
    lifecycleStage: "INFRASTRUCTURE",
    description: "Dedicated systems administration, event platform integrations, and helpdesk.",
    deliverables: [
      "Event tech stack integrations (Cvent, Swapcard, HubSpot)",
      "Technical support & user management",
      "System uptime & webhook monitoring",
      "Information security compliance",
    ],
    isQuickWin: false,
  },
];
