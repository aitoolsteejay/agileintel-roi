/**
 * AgileIntel Salary Benchmark Dataset
 * Source: Glassdoor salary review as of 31 August 2026 and AgileIntel recruitment experience over 10 years.
 * Stated in AgileIntel Offshoring B2B Events Introduction 2026 presentation (Slide 4).
 * Indicative annual base salaries in GBP; excludes AgileIntel management fee and employer on-costs.
 */

export interface SalaryBenchmark {
  role: string;
  function: string;
  ukSalaryGBP: number;
  indiaSalaryGBP: number;
  statedSavingPercent: number;
  source: string;
  notes?: string;
}

export const SALARY_BENCHMARKS_SOURCE_NOTE =
  "Source: Glassdoor salary review as of 31 August 2026 and AgileIntel recruitment experience over 10 years. Indicative annual base salaries in GBP; excludes AgileIntel management fee and employer on-costs.";

export const SALARY_BENCHMARKS: SalaryBenchmark[] = [
  // Finance & Administration
  {
    role: "Senior Accountant",
    function: "Finance & Administration",
    ukSalaryGBP: 46355,
    indiaSalaryGBP: 20000,
    statedSavingPercent: 57,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Accounts Specialist",
    function: "Finance & Administration",
    ukSalaryGBP: 38000,
    indiaSalaryGBP: 19000,
    statedSavingPercent: 50,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Financial Analyst",
    function: "Finance & Administration",
    ukSalaryGBP: 43572,
    indiaSalaryGBP: 19000,
    statedSavingPercent: 56,
    source: "AgileIntel Offshoring B2B Events Introduction 2026 (Slide 4)",
    notes:
      "Present in the original 24-role benchmark table in Slide 4. Verified against deck average figures (£47,590 UK / £24,460 India).",
  },

  // Marketing Operations
  {
    role: "Marketing Ops Manager",
    function: "Marketing Operations",
    ukSalaryGBP: 53200,
    indiaSalaryGBP: 25000,
    statedSavingPercent: 53,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Digital Marketing Specialist",
    function: "Marketing Operations",
    ukSalaryGBP: 44000,
    indiaSalaryGBP: 20000,
    statedSavingPercent: 55,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Content Marketing Specialist",
    function: "Content & Creative",
    ukSalaryGBP: 35000,
    indiaSalaryGBP: 18000,
    statedSavingPercent: 49,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Social Media Manager",
    function: "Marketing Operations",
    ukSalaryGBP: 42000,
    indiaSalaryGBP: 21000,
    statedSavingPercent: 50,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Marketing Automation Specialist",
    function: "Marketing Operations",
    ukSalaryGBP: 42000,
    indiaSalaryGBP: 18000,
    statedSavingPercent: 57,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },

  // Event Operations
  {
    role: "Registration Specialist",
    function: "Event Operations",
    ukSalaryGBP: 40000,
    indiaSalaryGBP: 20000,
    statedSavingPercent: 50,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Operations Coordinator",
    function: "Event Operations",
    ukSalaryGBP: 32000,
    indiaSalaryGBP: 18000,
    statedSavingPercent: 44,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },

  // Sales & CRM
  {
    role: "Sales Operations Manager",
    function: "Sales & CRM",
    ukSalaryGBP: 60000,
    indiaSalaryGBP: 30000,
    statedSavingPercent: 50,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "CRM Administrator, SDR",
    function: "Sales & CRM",
    ukSalaryGBP: 30000,
    indiaSalaryGBP: 22000,
    statedSavingPercent: 27,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Lead Qualification Specialist",
    function: "Sales & CRM",
    ukSalaryGBP: 28000,
    indiaSalaryGBP: 19000,
    statedSavingPercent: 32,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },

  // Research & Data
  {
    role: "Senior Report Writer",
    function: "Research & Data",
    ukSalaryGBP: 95000,
    indiaSalaryGBP: 43000,
    statedSavingPercent: 55,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Senior Data Analyst",
    function: "Research & Data",
    ukSalaryGBP: 52000,
    indiaSalaryGBP: 30000,
    statedSavingPercent: 42,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "BI Analyst",
    function: "Data Science & Analytics",
    ukSalaryGBP: 40000,
    indiaSalaryGBP: 20000,
    statedSavingPercent: 50,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Market Research Analyst",
    function: "Research & Data",
    ukSalaryGBP: 30000,
    indiaSalaryGBP: 18000,
    statedSavingPercent: 40,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },

  // Data Science & Analytics
  {
    role: "Senior Data Scientist",
    function: "Data Science & Analytics",
    ukSalaryGBP: 120000,
    indiaSalaryGBP: 65000,
    statedSavingPercent: 46,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Data Engineer",
    function: "Data Science & Analytics",
    ukSalaryGBP: 90000,
    indiaSalaryGBP: 48000,
    statedSavingPercent: 47,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },

  // Content & Creative
  {
    role: "Senior Copywriter",
    function: "Content & Creative",
    ukSalaryGBP: 51000,
    indiaSalaryGBP: 20000,
    statedSavingPercent: 61,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Graphic Designer",
    function: "Content & Creative",
    ukSalaryGBP: 32000,
    indiaSalaryGBP: 18000,
    statedSavingPercent: 44,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Video Editor",
    function: "Content & Creative",
    ukSalaryGBP: 32000,
    indiaSalaryGBP: 18000,
    statedSavingPercent: 44,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },

  // IT Support
  {
    role: "IT Systems Administrator",
    function: "IT Support",
    ukSalaryGBP: 36000,
    indiaSalaryGBP: 20000,
    statedSavingPercent: 44,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
  {
    role: "Technical Support Specialist",
    function: "IT Support",
    ukSalaryGBP: 30000,
    indiaSalaryGBP: 18000,
    statedSavingPercent: 40,
    source: "AgileIntel Offshoring B2B Events Introduction 2026",
  },
];

export const FUNCTION_CATEGORIES = [
  "Research & Data",
  "Marketing Operations",
  "Acquisition",
  "Sales & CRM",
  "Event Operations",
  "Content & Creative",
  "Finance & Administration",
  "Data Science & Analytics",
  "IT Support",
] as const;

export type FunctionCategory = (typeof FUNCTION_CATEGORIES)[number];
