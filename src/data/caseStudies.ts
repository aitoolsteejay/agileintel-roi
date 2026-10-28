export interface CaseStudy {
  id: string;
  badge: string;
  title: string;
  clientType: string;
  heroMetrics: { label: string; value: string }[];
  challenge: string;
  whatWeDelivered: string[];
  teamSize: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-study-1",
    badge: "CASE STUDY 1",
    title: "Global B2B Events & Conference Organiser",
    clientType: "Legal services, large enterprise portfolio",
    heroMetrics: [
      { value: "1,200%", label: "Increase in report & dashboard downloads" },
      { value: "43%", label: "Commercial growth supported" },
      { value: "5", label: "Dedicated AgileIntel team members" },
    ],
    challenge:
      "Needed event-specific reports and interactive dashboards of consistent quality across multiple portfolios, with limited internal bandwidth.",
    whatWeDelivered: [
      "70+ research reports and 30+ Tableau dashboards per year",
      "Coverage across 15+ practice areas",
      "Full cycle: primary and secondary research, analysis, insight, reporting and dashboards",
      "A scalable research and analytics delivery model",
    ],
    teamSize: "5 dedicated AgileIntel specialists",
  },
  {
    id: "case-study-2",
    badge: "CASE STUDY 2",
    title: "Global B2B Events & Conference Organiser",
    clientType: "Small to mid-sized growth organiser",
    heroMetrics: [
      { value: "20%", label: "Increase in positive reply rates" },
      { value: "115K+", label: "LinkedIn impressions (9,000+ clicks)" },
      { value: "6", label: "Dedicated AgileIntel team members" },
    ],
    challenge:
      "Needed SDR and sales-intelligence support, high volumes of event design, and consistent LinkedIn content to lift visibility.",
    whatWeDelivered: [
      "10,000+ companies tiered and 50,000+ contacts enriched",
      "500+ LinkedIn posts in four months; 20–22% engagement; following grown to 7,000+",
      "2,000+ graphic designs and 300+ executive presentations",
      "10% increase in discovery calls booked",
    ],
    teamSize: "6 dedicated AgileIntel specialists",
  },
];

export const CASE_STUDY_CAVEAT =
  "Metrics reported directly from AgileIntel Research Offshoring B2B Events Introduction 2026 presentation (Slide 6). Results reflect specific client implementations; actual outcomes vary depending on portfolio size and operational scope.";
