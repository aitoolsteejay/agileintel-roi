export interface KpiMetric {
  category: "Financial" | "Operational" | "People" | "Quality";
  metric: string;
  value: string;
  notes: string;
}

export const KPI_METRICS: KpiMetric[] = [
  {
    category: "Financial",
    metric: "Cost saving vs UK",
    value: "45%+",
    notes: "Across standard full-time operational roles",
  },
  {
    category: "Financial",
    metric: "Cost-based ROI",
    value: ">100% (Y2)",
    notes: "Achieved by year two of pod deployment",
  },
  {
    category: "Operational",
    metric: "SLA adherence",
    value: ">95%",
    notes: "Contractually tracked monthly",
  },
  {
    category: "Operational",
    metric: "Error / rework rate",
    value: "<2%",
    notes: "Rigorous two-tier QA review",
  },
  {
    category: "People",
    metric: "Annual retention rate",
    value: "85–90%",
    notes: "Industry benchmark is ~65-70%",
  },
  {
    category: "People",
    metric: "Time to hire",
    value: "<45 days",
    notes: "Typical India timeline: 28–39 days vs 36–44 days in UK",
  },
  {
    category: "Quality",
    metric: "First time right",
    value: "95%+",
    notes: "Deliverables approved on initial submission",
  },
  {
    category: "Quality",
    metric: "Client complaints",
    value: "<1%",
    notes: "Escalation rate across all client pods",
  },
];

export const KPI_CAVEAT =
  "KPIs stated in AgileIntel's presentation; confirm whether each is a target, achieved result, or contractual commitment before public use.";

export interface TimelineMilestone {
  stage: string;
  timeframe: string;
  title: string;
  description: string;
  activities: string[];
}

export const IMPLEMENTATION_TIMELINE: TimelineMilestone[] = [
  {
    stage: "1",
    timeframe: "Day 0",
    title: "Kick-off & Scoping",
    description: "Map where delivery pressure sits across your event lifecycle and select one or two pilot functions.",
    activities: [
      "Operational workload & bottleneck mapping",
      "Function prioritisation (e.g. Research, Marketing Ops)",
      "Role profile & skill requirements definition",
    ],
  },
  {
    stage: "2",
    timeframe: "Week 2",
    title: "Design Signed Off",
    description: "Finalise roles, SLAs, KPIs, and side-by-side UK vs India cost comparisons for your team.",
    activities: [
      "Pod structure & reporting line sign-off",
      "SLAs, quality benchmarks & communication cadence agreed",
      "Candidate shortlisting and hiring kick-off",
    ],
  },
  {
    stage: "3",
    timeframe: "Week 6",
    title: "Team Live",
    description: "AgileIntel deploys the team in India, onboarded directly into your systems and workflows.",
    activities: [
      "System access (SSO/VPN), software provisioning & security sign-off",
      "Induction into event guidelines and templates",
      "First operational tasks initiated under AgileIntel QA lead",
    ],
  },
  {
    stage: "4",
    timeframe: "Day 90",
    title: "Review & Scale",
    description: "Formal 90-day performance review to measure efficiency gains, SLA achievement, and scale decisions.",
    activities: [
      "Comprehensive delivery & ROI review against baseline",
      "Process optimization & documentation handoff",
      "Decision on expanding into adjacent event functions",
    ],
  },
];

export const WHY_INDIA_STATS = [
  { value: "5.67M", label: "IT-BPM workforce", detail: "Deepest tech and operational talent pool in the world" },
  { value: "1.5M", label: "Engineering graduates/year", detail: "Continuous pipeline of technical and analytical talent" },
  { value: "265M", label: "English speakers", detail: "Second-largest English-speaking population globally" },
  { value: "2,100+", label: "Global Capability Centres (GCCs)", detail: "Employing 2.36M professionals for Fortune 500s" },
  { value: "<7 hours", label: "Daily overlap with UK/EU", detail: "Real-time collaboration across morning and afternoon" },
  { value: "28–39 days", label: "Average time to hire", detail: "Vs 36–44 days in the UK market" },
];

export const GOVERNANCE_MATRIX = {
  youOwn: [
    "Priorities, strategy and commercial direction",
    "Task prioritisation and domain briefings",
    "Acceptance criteria and final sign-off",
    "Systems of record, platform access & permissions",
  ],
  agileIntelOwns: [
    "Team leadership, daily management and HR",
    "Employment contracts, benefits, compliance and payroll",
    "Internal QA, capacity planning and corrective action",
    "Endpoint security, access controls and infrastructure",
  ],
  together: [
    "Weekly delivery reviews and sprint pacing",
    "Monthly KPI and SLA adherence scorecard reviews",
    "Quarterly capability planning and skill upgrades",
    "Annual strategic partnership reviews",
  ],
};

export const DATA_SECURITY_PILLARS = [
  {
    title: "Identity & Access",
    items: ["Multi-Factor Authentication (MFA)", "Least-privilege role segregation", "Single Sign-On (SSO) integration"],
  },
  {
    title: "Network & Endpoint",
    items: ["Secure VPN tunneling", "Encrypted corporate devices", "Remote wipe & endpoint threat protection"],
  },
  {
    title: "Data Protection",
    items: ["End-to-end data encryption in transit & rest", "Zero local data storage policy", "Logical tenant segregation"],
  },
  {
    title: "People & Process",
    items: ["Rigorous NDAs and background checks", "IP assignment clauses", "Continuous security & GDPR training"],
  },
  {
    title: "Operational Resilience",
    items: ["Daily encrypted backups", "Documented business continuity plan", "Independent periodic security audits"],
  },
  {
    title: "Regulatory Compliance",
    items: ["UK / EU GDPR compliance standards", "India DPDP Act alignment", "Audit trails and activity logging"],
  },
];
