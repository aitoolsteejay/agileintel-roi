import { SALARY_BENCHMARKS, SalaryBenchmark } from "../data/benchmarks";
import {
  AgileIntelPricingConfig,
  DEFAULT_PRICING_CONFIG,
  PricingMode,
} from "./pricingConfig";

export type HiringSituation = "new_team" | "replace_roles" | "move_tasks";
export type CurrencyCode = "GBP" | "USD" | "EUR";

export interface RoleInput {
  id: string;
  roleName: string;
  function: string;
  headcount: number;
  localAnnualSalary: number;
  isBenchmarkRole: boolean;
  benchmarkIndiaSalary?: number;
  customIndiaSalary?: number;
  isSalaryOverridden?: boolean;
  employerCostType: "percentage" | "fixed";
  employerCostValue: number; // e.g. 15 for 15% or £6,000 fixed
  annualOverheadPerPerson: number; // desk, software, equipment, HR admin
  recruitmentCostPerPerson: number; // one-time recruiter / agency fee
}

export interface AdditionalCostsInput {
  annualOffshoreManagementFee: number;
  otherAnnualOffshoreCosts: number;
  oneTimeOffshoreSetupCost: number;
  oneTimeTransitionCost: number;
  avoidLocalRecruitment: boolean;
}

export interface CalculatorState {
  country: string;
  currency: CurrencyCode;
  hiringSituation: HiringSituation;
  roles: RoleInput[];
  additionalCosts: AdditionalCostsInput;
  pricingConfig: AgileIntelPricingConfig;
}

export interface RoleCalculationResult {
  roleId: string;
  roleName: string;
  function: string;
  headcount: number;
  localAnnualSalaryPerPerson: number;
  localTotalBaseSalary: number;
  employerCost: number;
  overheadCost: number;
  totalLocalOperatingCost: number;
  localRecruitmentCost: number;
  indiaSalaryPerPerson: number;
  indiaTotalBaseSalary: number;
  salaryOnlySaving: number;
  salaryOnlySavingPercent: number;
}

export interface CalculationResult {
  totalHeadcount: number;
  currency: CurrencyCode;
  pricingMode: PricingMode;

  // Local Cost Breakdown
  totalLocalBaseSalaries: number;
  totalEmployerCosts: number;
  totalAnnualOverhead: number;
  currentAnnualOperatingCost: number;
  totalLocalRecruitmentCost: number;
  localFirstYearTotalCost: number;

  // India Salary-Only Benchmark Metrics
  totalIndiaBaseSalaries: number;
  salaryOnlyDifference: number;
  salaryOnlyReductionPercent: number;

  // Offshore Managed Team Metrics (when approved pricing mode is active)
  indiaEmployerCosts: number | null;
  indiaEmploymentCost: number | null;
  offshoreManagementFees: number | null;
  otherOffshoreAnnualCosts: number;
  agileIntelAnnualCost: number | null;

  // Savings & ROI
  annualSavings: number | null;
  costReductionPercent: number | null;
  totalOffshoreOneTimeCost: number;
  offshoreFirstYearTotalCost: number | null;
  firstYearNetSavings: number | null;
  costBasedROI: number | null;
  breakEvenMonths: number | null;
  breakEvenNote: string;

  // Role Breakdown Table
  roleBreakdowns: RoleCalculationResult[];

  // Validity and Status
  isEligibleForManagedCalculation: boolean;
  validationErrors: string[];
}

/**
 * Cleanly sanitizes and guards numeric inputs to prevent NaN and Infinity.
 */
export function sanitizeNumber(value: unknown, fallback = 0): number {
  if (value === null || value === undefined || value === "") return fallback;
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num) || !isFinite(num)) return fallback;
  return num;
}

/**
 * Creates a default role item based on a benchmark entry or defaults.
 */
export function createRoleFromBenchmark(
  benchmark?: SalaryBenchmark,
  id = `role-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
): RoleInput {
  if (benchmark) {
    return {
      id,
      roleName: benchmark.role,
      function: benchmark.function,
      headcount: 1,
      localAnnualSalary: benchmark.ukSalaryGBP,
      isBenchmarkRole: true,
      benchmarkIndiaSalary: benchmark.indiaSalaryGBP,
      customIndiaSalary: benchmark.indiaSalaryGBP,
      isSalaryOverridden: false,
      employerCostType: "percentage",
      employerCostValue: 15.0, // 15% default employer on-cost (NIC + pension)
      annualOverheadPerPerson: 4500, // Desk, IT, SaaS software seats
      recruitmentCostPerPerson: 5000, // One-time placement / agency fee
    };
  }

  return {
    id,
    roleName: "Custom Role",
    function: "Research & Data",
    headcount: 1,
    localAnnualSalary: 45000,
    isBenchmarkRole: false,
    benchmarkIndiaSalary: 22000,
    customIndiaSalary: 22000,
    isSalaryOverridden: false,
    employerCostType: "percentage",
    employerCostValue: 15.0,
    annualOverheadPerPerson: 4500,
    recruitmentCostPerPerson: 5000,
  };
}

export function createDefaultCalculatorState(): CalculatorState {
  const benchmark = SALARY_BENCHMARKS[0]; // Senior Accountant
  return {
    country: "United Kingdom",
    currency: "GBP",
    hiringSituation: "new_team",
    roles: [createRoleFromBenchmark(benchmark, "role-1")],
    additionalCosts: {
      annualOffshoreManagementFee: 0,
      otherAnnualOffshoreCosts: 0,
      oneTimeOffshoreSetupCost: 1500,
      oneTimeTransitionCost: 2500,
      avoidLocalRecruitment: true,
    },
    pricingConfig: { ...DEFAULT_PRICING_CONFIG },
  };
}

/**
 * Creates the illustrative Market Research Analysts demo fixture specified in Section 8:
 * - 3x Market Research Analysts
 * - UK base salary: £30,000
 * - India base salary: £18,000
 * - Total UK base salaries: £90,000
 * - Total India base salaries: £54,000
 * - Difference: £36,000 (40% reduction)
 */
export function createMarketResearchAnalystsDemo(): CalculatorState {
  const benchmark = SALARY_BENCHMARKS.find(
    (b) => b.role === "Market Research Analyst"
  );

  return {
    country: "United Kingdom",
    currency: "GBP",
    hiringSituation: "new_team",
    roles: [
      {
        id: "demo-role-1",
        roleName: benchmark ? benchmark.role : "Market Research Analyst",
        function: benchmark ? benchmark.function : "Research & Data",
        headcount: 3,
        localAnnualSalary: benchmark ? benchmark.ukSalaryGBP : 30000,
        isBenchmarkRole: true,
        benchmarkIndiaSalary: benchmark ? benchmark.indiaSalaryGBP : 18000,
        customIndiaSalary: benchmark ? benchmark.indiaSalaryGBP : 18000,
        isSalaryOverridden: false,
        employerCostType: "percentage",
        employerCostValue: 15.0,
        annualOverheadPerPerson: 4500,
        recruitmentCostPerPerson: 5000,
      },
    ],
    additionalCosts: {
      annualOffshoreManagementFee: 0,
      otherAnnualOffshoreCosts: 0,
      oneTimeOffshoreSetupCost: 4500,
      oneTimeTransitionCost: 2500,
      avoidLocalRecruitment: true,
    },
    pricingConfig: { ...DEFAULT_PRICING_CONFIG },
  };
}

/**
 * Core Financial Calculation Engine
 * Dedicated, testable, decimal-guarded module.
 */
export function calculateTeamEconomics(state: CalculatorState): CalculationResult {
  const validationErrors: string[] = [];

  if (!state.roles || state.roles.length === 0) {
    validationErrors.push("At least one role is required to calculate team economics.");
  }

  let totalHeadcount = 0;
  let totalLocalBaseSalaries = 0;
  let totalEmployerCosts = 0;
  let totalAnnualOverhead = 0;
  let totalLocalRecruitmentCost = 0;
  let totalIndiaBaseSalaries = 0;

  const roleBreakdowns: RoleCalculationResult[] = [];

  for (const role of state.roles) {
    const headcount = Math.max(0, sanitizeNumber(role.headcount, 0));
    const localSalary = Math.max(0, sanitizeNumber(role.localAnnualSalary, 0));
    const roleBase = headcount * localSalary;

    let roleEmployerCost = 0;
    if (role.employerCostType === "percentage") {
      const pct = Math.max(0, sanitizeNumber(role.employerCostValue, 0));
      roleEmployerCost = roleBase * (pct / 100);
    } else {
      const fixedPerPerson = Math.max(0, sanitizeNumber(role.employerCostValue, 0));
      roleEmployerCost = headcount * fixedPerPerson;
    }

    const overheadPerPerson = Math.max(
      0,
      sanitizeNumber(role.annualOverheadPerPerson, 0)
    );
    const roleOverhead = headcount * overheadPerPerson;
    const roleTotalLocalCost = roleBase + roleEmployerCost + roleOverhead;

    const recruitPerPerson = Math.max(
      0,
      sanitizeNumber(role.recruitmentCostPerPerson, 0)
    );
    const roleRecruitmentCost = headcount * recruitPerPerson;

    // India salary resolution
    const indiaSalaryPerPerson = Math.max(
      0,
      sanitizeNumber(
        role.customIndiaSalary ?? role.benchmarkIndiaSalary,
        0
      )
    );
    const roleIndiaBase = headcount * indiaSalaryPerPerson;

    const salaryOnlySaving = roleBase - roleIndiaBase;
    const salaryOnlySavingPercent =
      roleBase > 0 ? (salaryOnlySaving / roleBase) * 100 : 0;

    totalHeadcount += headcount;
    totalLocalBaseSalaries += roleBase;
    totalEmployerCosts += roleEmployerCost;
    totalAnnualOverhead += roleOverhead;
    totalLocalRecruitmentCost += roleRecruitmentCost;
    totalIndiaBaseSalaries += roleIndiaBase;

    roleBreakdowns.push({
      roleId: role.id,
      roleName: role.roleName,
      function: role.function,
      headcount,
      localAnnualSalaryPerPerson: localSalary,
      localTotalBaseSalary: roleBase,
      employerCost: roleEmployerCost,
      overheadCost: roleOverhead,
      totalLocalOperatingCost: roleTotalLocalCost,
      localRecruitmentCost: roleRecruitmentCost,
      indiaSalaryPerPerson,
      indiaTotalBaseSalary: roleIndiaBase,
      salaryOnlySaving,
      salaryOnlySavingPercent,
    });
  }

  // Operating costs
  const currentAnnualOperatingCost =
    totalLocalBaseSalaries + totalEmployerCosts + totalAnnualOverhead;

  const localFirstYearTotalCost =
    currentAnnualOperatingCost + totalLocalRecruitmentCost;

  // Salary-only benchmark metrics
  const salaryOnlyDifference = totalLocalBaseSalaries - totalIndiaBaseSalaries;
  const salaryOnlyReductionPercent =
    totalLocalBaseSalaries > 0
      ? (salaryOnlyDifference / totalLocalBaseSalaries) * 100
      : 0;

  // One-time offshore costs
  const setupPerPerson = sanitizeNumber(
    state.pricingConfig.setupFeePerPersonGBP,
    1500
  );
  const totalSetupCost =
    state.additionalCosts.oneTimeOffshoreSetupCost > 0
      ? state.additionalCosts.oneTimeOffshoreSetupCost
      : setupPerPerson * totalHeadcount;

  const totalTransitionCost =
    state.additionalCosts.oneTimeTransitionCost > 0
      ? state.additionalCosts.oneTimeTransitionCost
      : sanitizeNumber(state.pricingConfig.transitionFeeGBP, 2500);

  const totalOffshoreOneTimeCost = totalSetupCost + totalTransitionCost;

  // Check pricing mode eligibility
  const isApprovedPricing =
    state.pricingConfig.mode === "approved_managed_service" &&
    state.pricingConfig.annualManagementFeePerPersonGBP !== null;

  let indiaEmployerCosts: number | null = null;
  let indiaEmploymentCost: number | null = null;
  let offshoreManagementFees: number | null = null;
  const otherOffshoreAnnualCosts = Math.max(
    0,
    sanitizeNumber(state.additionalCosts.otherAnnualOffshoreCosts, 0)
  );
  let agileIntelAnnualCost: number | null = null;
  let annualSavings: number | null = null;
  let costReductionPercent: number | null = null;
  let offshoreFirstYearTotalCost: number | null = null;
  let firstYearNetSavings: number | null = null;
  let costBasedROI: number | null = null;
  let breakEvenMonths: number | null = null;
  let breakEvenNote = "";

  if (isApprovedPricing) {
    const indiaEmpCostPct = Math.max(
      0,
      sanitizeNumber(state.pricingConfig.indiaEmployerCostPercent, 0)
    );
    indiaEmployerCosts = totalIndiaBaseSalaries * (indiaEmpCostPct / 100);
    indiaEmploymentCost = totalIndiaBaseSalaries + indiaEmployerCosts;

    const baseMgmtFee =
      (state.pricingConfig.annualManagementFeePerPersonGBP ?? 0) *
      totalHeadcount;
    const additionalMgmtFee = Math.max(
      0,
      sanitizeNumber(state.additionalCosts.annualOffshoreManagementFee, 0)
    );
    offshoreManagementFees = baseMgmtFee + additionalMgmtFee;

    agileIntelAnnualCost =
      indiaEmploymentCost +
      offshoreManagementFees +
      otherOffshoreAnnualCosts;

    annualSavings = currentAnnualOperatingCost - agileIntelAnnualCost;

    if (currentAnnualOperatingCost > 0) {
      costReductionPercent =
        (annualSavings / currentAnnualOperatingCost) * 100;
    } else {
      costReductionPercent = null;
    }

    offshoreFirstYearTotalCost = agileIntelAnnualCost + totalOffshoreOneTimeCost;

    // First-year savings calculation
    const avoidsRecruitment =
      state.hiringSituation === "new_team" ||
      state.additionalCosts.avoidLocalRecruitment;

    if (avoidsRecruitment) {
      firstYearNetSavings =
        localFirstYearTotalCost - offshoreFirstYearTotalCost;
    } else {
      // Existing employees or task transfer: local recruitment fees were historical
      firstYearNetSavings = annualSavings - totalOffshoreOneTimeCost;
    }

    // Cost-based ROI: (Annual Savings / AgileIntel Annual Cost) * 100
    if (agileIntelAnnualCost > 0) {
      costBasedROI = (annualSavings / agileIntelAnnualCost) * 100;
    } else {
      costBasedROI = null;
    }

    // Break-even period
    if (annualSavings > 0) {
      const monthlySavings = annualSavings / 12;
      let netOneTimeInvestment = totalOffshoreOneTimeCost;
      if (avoidsRecruitment) {
        netOneTimeInvestment = Math.max(
          0,
          totalOffshoreOneTimeCost - totalLocalRecruitmentCost
        );
      }

      if (netOneTimeInvestment <= 0) {
        breakEvenMonths = 0; // Immediate savings in month 1
        breakEvenNote = "Immediate (avoided recruitment covers setup costs)";
      } else {
        const months = netOneTimeInvestment / monthlySavings;
        breakEvenMonths = Math.round(months * 10) / 10;
        breakEvenNote = `Estimated ${breakEvenMonths} months to amortise transition investment`;
      }
    } else {
      breakEvenMonths = null;
      breakEvenNote = "Break-even cannot be estimated under negative or zero annual savings";
    }
  } else {
    // Mode 2: Unapproved / Salary-only mode
    breakEvenNote =
      "Requires confirmed AgileIntel commercial quote to compute amortisation";
  }

  return {
    totalHeadcount,
    currency: state.currency,
    pricingMode: state.pricingConfig.mode,

    totalLocalBaseSalaries,
    totalEmployerCosts,
    totalAnnualOverhead,
    currentAnnualOperatingCost,
    totalLocalRecruitmentCost,
    localFirstYearTotalCost,

    totalIndiaBaseSalaries,
    salaryOnlyDifference,
    salaryOnlyReductionPercent,

    indiaEmployerCosts,
    indiaEmploymentCost,
    offshoreManagementFees,
    otherOffshoreAnnualCosts,
    agileIntelAnnualCost,

    annualSavings,
    costReductionPercent,
    totalOffshoreOneTimeCost,
    offshoreFirstYearTotalCost,
    firstYearNetSavings,
    costBasedROI,
    breakEvenMonths,
    breakEvenNote,

    roleBreakdowns,
    isEligibleForManagedCalculation: isApprovedPricing,
    validationErrors,
  };
}
