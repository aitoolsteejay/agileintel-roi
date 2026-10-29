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

/** Average base salaries across the 24 benchmarked roles, as stated in the deck. */
export const DECK_AVERAGE_UK_SALARY = 47590;
export const DECK_AVERAGE_INDIA_SALARY = 24460;

/** India-to-UK salary ratio across all benchmark roles (deck: £24,460 / £47,590). */
const AVERAGE_INDIA_SALARY_RATIO =
  SALARY_BENCHMARKS.reduce((sum, b) => sum + b.indiaSalaryGBP, 0) /
  SALARY_BENCHMARKS.reduce((sum, b) => sum + b.ukSalaryGBP, 0);

/**
 * India salary for a role at the given current salary, keeping the deck's
 * percentage saving for that role (or the deck-wide average for custom roles).
 * Rounded to the nearest 100.
 */
export function deriveIndiaSalary(localSalary: number, benchmark?: SalaryBenchmark): number {
  const ratio = benchmark
    ? benchmark.indiaSalaryGBP / benchmark.ukSalaryGBP
    : AVERAGE_INDIA_SALARY_RATIO;
  return Math.round((localSalary * ratio) / 100) * 100;
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
      // Local cost extras aren't in the deck, so none are assumed
      employerCostType: "percentage",
      employerCostValue: 0,
      annualOverheadPerPerson: 0,
      recruitmentCostPerPerson: 0,
    };
  }

  return {
    id,
    roleName: "Custom Role",
    function: "Research & Data",
    headcount: 1,
    // Deck averages across the 24 benchmarked roles
    localAnnualSalary: DECK_AVERAGE_UK_SALARY,
    isBenchmarkRole: false,
    benchmarkIndiaSalary: DECK_AVERAGE_INDIA_SALARY,
    customIndiaSalary: DECK_AVERAGE_INDIA_SALARY,
    isSalaryOverridden: false,
    employerCostType: "percentage",
    employerCostValue: 0,
    annualOverheadPerPerson: 0,
    recruitmentCostPerPerson: 0,
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
      oneTimeOffshoreSetupCost: 0,
      oneTimeTransitionCost: 0,
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
    0
  );
  const totalSetupCost =
    state.additionalCosts.oneTimeOffshoreSetupCost > 0
      ? state.additionalCosts.oneTimeOffshoreSetupCost
      : setupPerPerson * totalHeadcount;

  const totalTransitionCost =
    state.additionalCosts.oneTimeTransitionCost > 0
      ? state.additionalCosts.oneTimeTransitionCost
      : sanitizeNumber(state.pricingConfig.transitionFeeGBP, 0);

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

export interface CostProjection {
  years: number;
  /** Total cost of keeping the current team over the period. */
  currentCost: number;
  /** Total cost of the India team, including one-time setup in full-cost mode. */
  indiaCost: number;
  saving: number;
}

export const PROJECTION_YEARS = [1, 3, 5];

/**
 * Cumulative cost of each option over a number of years, holding today's
 * salaries flat. In full-cost mode the first year carries the one-time setup
 * and any recruiter fees avoided, exactly as the first-year saving does.
 */
export function projectCosts(results: CalculationResult, years: number): CostProjection {
  const isManaged =
    results.isEligibleForManagedCalculation &&
    results.agileIntelAnnualCost !== null &&
    results.annualSavings !== null;

  if (!isManaged) {
    const currentCost = results.totalLocalBaseSalaries * years;
    const indiaCost = results.totalIndiaBaseSalaries * years;
    return { years, currentCost, indiaCost, saving: currentCost - indiaCost };
  }

  const indiaCost =
    (results.agileIntelAnnualCost ?? 0) * years + results.totalOffshoreOneTimeCost;
  const saving =
    (results.firstYearNetSavings ?? 0) + (years - 1) * (results.annualSavings ?? 0);
  return { years, currentCost: indiaCost + saving, indiaCost, saving };
}

export interface BusinessImpact {
  /** Yearly saving, which adds straight to profit. */
  annualSaving: number;
  /** How many times over today's yearly spend would pay for the India team. */
  capacityMultiple: number | null;
  /** Whole people today's yearly spend would fund in India. */
  indiaHeadcountForSameSpend: number | null;
  /** Cumulative costs at 1, 3 and 5 years. */
  projections: CostProjection[];
}

/**
 * What the estimate means for the business: profit added, how much more team
 * the current budget would buy in India, and costs over time.
 */
export function calculateBusinessImpact(results: CalculationResult): BusinessImpact {
  const isManaged =
    results.isEligibleForManagedCalculation &&
    results.agileIntelAnnualCost !== null &&
    results.annualSavings !== null;

  const currentCost = isManaged
    ? results.currentAnnualOperatingCost
    : results.totalLocalBaseSalaries;
  const indiaCost = isManaged
    ? (results.agileIntelAnnualCost ?? 0)
    : results.totalIndiaBaseSalaries;
  const annualSaving = isManaged
    ? (results.annualSavings ?? 0)
    : results.salaryOnlyDifference;

  const capacityMultiple = indiaCost > 0 ? currentCost / indiaCost : null;
  const indiaHeadcountForSameSpend =
    capacityMultiple !== null
      ? Math.floor(results.totalHeadcount * capacityMultiple + 1e-9)
      : null;

  return {
    annualSaving,
    capacityMultiple,
    indiaHeadcountForSameSpend,
    projections: PROJECTION_YEARS.map((years) => projectCosts(results, years)),
  };
}
