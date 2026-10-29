import { describe, it, expect } from "vitest";
import {
  calculateBusinessImpact,
  calculateTeamEconomics,
  createMarketResearchAnalystsDemo,
  createRoleFromBenchmark,
  CalculatorState,
  deriveIndiaSalary,
  sanitizeNumber,
} from "./calculatorEngine";
import { SALARY_BENCHMARKS } from "../data/benchmarks";
import {
  DEFAULT_PRICING_CONFIG,
  INDICATIVE_MANAGED_MODEL_PRESET,
} from "./pricingConfig";

describe("AgileIntel Calculator Engine Unit Tests", () => {
  // Test 1: Three UK Market Research Analysts using the deck's benchmark figures
  it("Scenario 1: computes 3x UK Market Research Analysts salary-only benchmark correctly", () => {
    const demo = createMarketResearchAnalystsDemo();
    const result = calculateTeamEconomics(demo);

    // Deck figures: UK £30,000, India £18,000, 3 headcount
    expect(result.totalHeadcount).toBe(3);
    expect(result.totalLocalBaseSalaries).toBe(90000);
    expect(result.totalIndiaBaseSalaries).toBe(54000);
    expect(result.salaryOnlyDifference).toBe(36000);
    expect(result.salaryOnlyReductionPercent).toBe(40);
  });

  // Test 2: Multiple roles with different salaries
  it("Scenario 2: correctly aggregates multiple roles with distinct salaries", () => {
    const state: CalculatorState = {
      country: "United Kingdom",
      currency: "GBP",
      hiringSituation: "new_team",
      roles: [
        {
          id: "role-1",
          roleName: "Senior Report Writer",
          function: "Research & Data",
          headcount: 1,
          localAnnualSalary: 95000,
          isBenchmarkRole: true,
          benchmarkIndiaSalary: 43000,
          employerCostType: "percentage",
          employerCostValue: 15.0,
          annualOverheadPerPerson: 4000,
          recruitmentCostPerPerson: 5000,
        },
        {
          id: "role-2",
          roleName: "Graphic Designer",
          function: "Content & Creative",
          headcount: 2,
          localAnnualSalary: 32000,
          isBenchmarkRole: true,
          benchmarkIndiaSalary: 18000,
          employerCostType: "percentage",
          employerCostValue: 15.0,
          annualOverheadPerPerson: 3000,
          recruitmentCostPerPerson: 4000,
        },
      ],
      additionalCosts: {
        annualOffshoreManagementFee: 0,
        otherAnnualOffshoreCosts: 0,
        oneTimeOffshoreSetupCost: 0,
        oneTimeTransitionCost: 0,
        avoidLocalRecruitment: true,
      },
      pricingConfig: { ...DEFAULT_PRICING_CONFIG },
    };

    const result = calculateTeamEconomics(state);
    expect(result.totalHeadcount).toBe(3);
    // UK base: 95,000 + (2 * 32,000) = 159,000
    expect(result.totalLocalBaseSalaries).toBe(159000);
    // India base: 43,000 + (2 * 18,000) = 79,000
    expect(result.totalIndiaBaseSalaries).toBe(79000);
    // Salary diff: 159,000 - 79,000 = 80,000
    expect(result.salaryOnlyDifference).toBe(80000);
  });

  // Test 3: Custom salaries overriding benchmarks
  it("Scenario 3: handles custom salary overrides over benchmark figures", () => {
    const state: CalculatorState = {
      country: "United Kingdom",
      currency: "GBP",
      hiringSituation: "new_team",
      roles: [
        {
          id: "role-1",
          roleName: "Market Research Analyst",
          function: "Research & Data",
          headcount: 1,
          localAnnualSalary: 38000, // Overriding benchmark 30k
          isBenchmarkRole: true,
          benchmarkIndiaSalary: 18000,
          customIndiaSalary: 21000, // Custom India salary
          isSalaryOverridden: true,
          employerCostType: "percentage",
          employerCostValue: 15.0,
          annualOverheadPerPerson: 4000,
          recruitmentCostPerPerson: 5000,
        },
      ],
      additionalCosts: {
        annualOffshoreManagementFee: 0,
        otherAnnualOffshoreCosts: 0,
        oneTimeOffshoreSetupCost: 0,
        oneTimeTransitionCost: 0,
        avoidLocalRecruitment: true,
      },
      pricingConfig: { ...DEFAULT_PRICING_CONFIG },
    };

    const result = calculateTeamEconomics(state);
    expect(result.totalLocalBaseSalaries).toBe(38000);
    expect(result.totalIndiaBaseSalaries).toBe(21000);
    expect(result.salaryOnlyDifference).toBe(17000);
  });

  // Test 4: Employer costs entered as a percentage
  it("Scenario 4: calculates employer costs as a percentage correctly", () => {
    const state: CalculatorState = {
      country: "United Kingdom",
      currency: "GBP",
      hiringSituation: "new_team",
      roles: [
        {
          id: "role-1",
          roleName: "Operations Coordinator",
          function: "Event Operations",
          headcount: 2,
          localAnnualSalary: 32000,
          isBenchmarkRole: true,
          benchmarkIndiaSalary: 18000,
          employerCostType: "percentage",
          employerCostValue: 14.5, // 14.5%
          annualOverheadPerPerson: 0,
          recruitmentCostPerPerson: 0,
        },
      ],
      additionalCosts: {
        annualOffshoreManagementFee: 0,
        otherAnnualOffshoreCosts: 0,
        oneTimeOffshoreSetupCost: 0,
        oneTimeTransitionCost: 0,
        avoidLocalRecruitment: true,
      },
      pricingConfig: { ...DEFAULT_PRICING_CONFIG },
    };

    const result = calculateTeamEconomics(state);
    // Base: 64,000. 14.5% of 64,000 = 9,280
    expect(result.totalEmployerCosts).toBe(9280);
    expect(result.currentAnnualOperatingCost).toBe(64000 + 9280);
  });

  // Test 5: Employer costs entered as a fixed amount
  it("Scenario 5: calculates employer costs entered as an explicit fixed amount", () => {
    const state: CalculatorState = {
      country: "United Kingdom",
      currency: "GBP",
      hiringSituation: "new_team",
      roles: [
        {
          id: "role-1",
          roleName: "Operations Coordinator",
          function: "Event Operations",
          headcount: 2,
          localAnnualSalary: 32000,
          isBenchmarkRole: true,
          benchmarkIndiaSalary: 18000,
          employerCostType: "fixed",
          employerCostValue: 5500, // £5,500 fixed per person
          annualOverheadPerPerson: 0,
          recruitmentCostPerPerson: 0,
        },
      ],
      additionalCosts: {
        annualOffshoreManagementFee: 0,
        otherAnnualOffshoreCosts: 0,
        oneTimeOffshoreSetupCost: 0,
        oneTimeTransitionCost: 0,
        avoidLocalRecruitment: true,
      },
      pricingConfig: { ...DEFAULT_PRICING_CONFIG },
    };

    const result = calculateTeamEconomics(state);
    // Headcount 2 * 5500 = 11,000
    expect(result.totalEmployerCosts).toBe(11000);
    expect(result.currentAnnualOperatingCost).toBe(64000 + 11000);
  });

  // Test 6: One-time recruitment costs kept separate from annual costs
  it("Scenario 6: keeps one-time recruitment costs isolated from annual operating costs", () => {
    const demo = createMarketResearchAnalystsDemo();
    const result = calculateTeamEconomics(demo);

    // 3 headcount * £5,000 = £15,000
    expect(result.totalLocalRecruitmentCost).toBe(15000);
    // Annual operating cost must NOT contain recruitment fees:
    // Base 90,000 + 15% employer cost (13,500) + 3*4,500 overhead (13,500) = 117,000
    expect(result.currentAnnualOperatingCost).toBe(117000);
    expect(result.localFirstYearTotalCost).toBe(117000 + 15000);
  });

  // Test 7: Setup and transition costs included in first-year results
  it("Scenario 7: factors setup and transition costs into first-year net savings under managed pricing", () => {
    const demo = createMarketResearchAnalystsDemo();
    demo.pricingConfig = { ...INDICATIVE_MANAGED_MODEL_PRESET };
    const result = calculateTeamEconomics(demo);

    expect(result.isEligibleForManagedCalculation).toBe(true);
    expect(result.agileIntelAnnualCost).not.toBeNull();
    // India base: 54,000. 12% employer cost: 6,480. Management fee: 3 * 7500 = 22,500. Total annual: 82,980.
    expect(result.agileIntelAnnualCost).toBe(82980);
    // Annual savings: 117,000 - 82,980 = 34,020.
    expect(result.annualSavings).toBe(34020);

    // First year:
    // localFirstYearCost = 117,000 + 15,000 = 132,000
    // offshoreFirstYearCost = 82,980 + 4,500 setup + 2,500 transition = 89,980
    // firstYearNetSavings = 132,000 - 89,980 = 42,020
    expect(result.firstYearNetSavings).toBe(42020);
  });

  // Test 8: Negative savings displayed correctly without clamping
  it("Scenario 8: displays negative savings truthfully when offshore model costs more", () => {
    const state: CalculatorState = {
      country: "United Kingdom",
      currency: "GBP",
      hiringSituation: "new_team",
      roles: [
        {
          id: "low-cost-local",
          roleName: "Junior Helper",
          function: "Finance & Administration",
          headcount: 1,
          localAnnualSalary: 15000,
          isBenchmarkRole: false,
          benchmarkIndiaSalary: 25000, // Higher India salary
          customIndiaSalary: 25000,
          employerCostType: "percentage",
          employerCostValue: 10.0,
          annualOverheadPerPerson: 1000,
          recruitmentCostPerPerson: 0,
        },
      ],
      additionalCosts: {
        annualOffshoreManagementFee: 5000,
        otherAnnualOffshoreCosts: 2000,
        oneTimeOffshoreSetupCost: 1500,
        oneTimeTransitionCost: 2000,
        avoidLocalRecruitment: false,
      },
      pricingConfig: { ...INDICATIVE_MANAGED_MODEL_PRESET },
    };

    const result = calculateTeamEconomics(state);
    // Local annual: 15000 + 1500 + 1000 = 17500
    // Offshore annual: 25000 + 12% (3000) + 7500 (mgmt) + 5000 (add mgmt) + 2000 (other) = 42500
    // Savings: 17500 - 42500 = -25000
    expect(result.annualSavings).toBe(-25000);
    expect(result.annualSavings).toBeLessThan(0);
    // Cost reduction percent is negative
    expect(result.costReductionPercent).toBeCloseTo(-142.857, 1);
    // Break-even must not be calculated under negative savings
    expect(result.breakEvenMonths).toBeNull();
  });

  // Test 9: Zero or missing current costs
  it("Scenario 9: guards against zero or missing current costs gracefully", () => {
    const state: CalculatorState = {
      country: "United Kingdom",
      currency: "GBP",
      hiringSituation: "new_team",
      roles: [],
      additionalCosts: {
        annualOffshoreManagementFee: 0,
        otherAnnualOffshoreCosts: 0,
        oneTimeOffshoreSetupCost: 0,
        oneTimeTransitionCost: 0,
        avoidLocalRecruitment: false,
      },
      pricingConfig: { ...INDICATIVE_MANAGED_MODEL_PRESET },
    };

    const result = calculateTeamEconomics(state);
    expect(result.currentAnnualOperatingCost).toBe(0);
    expect(result.costReductionPercent).toBeNull();
    expect(result.validationErrors.length).toBeGreaterThan(0);
  });

  // Test 10: Missing AgileIntel pricing (Mode 2)
  it("Scenario 10: shows local costs and salary-only comparison when pricing is unapproved", () => {
    const demo = createMarketResearchAnalystsDemo();
    // Default config has mode: 'salary_only' and annualManagementFeePerPersonGBP: null
    demo.pricingConfig = { ...DEFAULT_PRICING_CONFIG };
    const result = calculateTeamEconomics(demo);

    expect(result.isEligibleForManagedCalculation).toBe(false);
    expect(result.agileIntelAnnualCost).toBeNull();
    expect(result.annualSavings).toBeNull();
    expect(result.costReductionPercent).toBeNull();
    // Local costs and salary-only metrics must remain fully calculated
    expect(result.currentAnnualOperatingCost).toBe(117000);
    expect(result.salaryOnlyDifference).toBe(36000);
    expect(result.salaryOnlyReductionPercent).toBe(40);
  });

  // Test 11: Division-by-zero protection on ROI and break-even
  it("Scenario 11: protects against division-by-zero when offshore costs or savings are zero", () => {
    const state: CalculatorState = {
      country: "United Kingdom",
      currency: "GBP",
      hiringSituation: "new_team",
      roles: [
        {
          id: "zero-role",
          roleName: "Zero Cost Role",
          function: "Finance & Administration",
          headcount: 1,
          localAnnualSalary: 0,
          isBenchmarkRole: false,
          benchmarkIndiaSalary: 0,
          customIndiaSalary: 0,
          employerCostType: "percentage",
          employerCostValue: 0,
          annualOverheadPerPerson: 0,
          recruitmentCostPerPerson: 0,
        },
      ],
      additionalCosts: {
        annualOffshoreManagementFee: 0,
        otherAnnualOffshoreCosts: 0,
        oneTimeOffshoreSetupCost: 0,
        oneTimeTransitionCost: 0,
        avoidLocalRecruitment: false,
      },
      pricingConfig: {
        ...INDICATIVE_MANAGED_MODEL_PRESET,
        annualManagementFeePerPersonGBP: 0,
        indiaEmployerCostPercent: 0,
      },
    };

    const result = calculateTeamEconomics(state);
    // AgileIntel cost is 0, so costBasedROI must be null, not NaN or Infinity
    expect(result.agileIntelAnnualCost).toBe(0);
    expect(result.costBasedROI).toBeNull();
    expect(result.breakEvenMonths).toBeNull();
  });

  // Test 12: Negative, invalid, or blank numeric input sanitization
  it("Scenario 12: robustly sanitizes negative or NaN inputs", () => {
    expect(sanitizeNumber(-10, 0)).toBe(-10);
    expect(sanitizeNumber("abc", 0)).toBe(0);
    expect(sanitizeNumber(undefined, 5)).toBe(5);
    expect(sanitizeNumber(null, 10)).toBe(10);
    expect(sanitizeNumber(NaN, 0)).toBe(0);
    expect(sanitizeNumber(Infinity, 0)).toBe(0);
  });

  // Test 13: Currency consistency
  it("Scenario 13: preserves currency code throughout results", () => {
    const demo = createMarketResearchAnalystsDemo();
    demo.currency = "USD";
    const result = calculateTeamEconomics(demo);
    expect(result.currency).toBe("USD");
  });

  // Test 14: Adding and removing roles
  it("Scenario 14: dynamically recalculates when roles are added or removed", () => {
    const state = createMarketResearchAnalystsDemo();
    let result = calculateTeamEconomics(state);
    expect(result.totalHeadcount).toBe(3);

    // Add another role
    const newRole = createRoleFromBenchmark(
      SALARY_BENCHMARKS.find((b) => b.role === "Senior Accountant")
    );
    state.roles.push(newRole);
    result = calculateTeamEconomics(state);
    expect(result.totalHeadcount).toBe(4);
    expect(result.totalLocalBaseSalaries).toBe(90000 + 46355);

    // Remove the added role
    state.roles.pop();
    result = calculateTeamEconomics(state);
    expect(result.totalHeadcount).toBe(3);
    expect(result.totalLocalBaseSalaries).toBe(90000);
  });

  // Test 15: Switching between new-hire and existing-team scenarios
  it("Scenario 15: differentiates first-year net savings between new hires and existing team transitions", () => {
    const state = createMarketResearchAnalystsDemo();
    state.pricingConfig = { ...INDICATIVE_MANAGED_MODEL_PRESET };

    // New team (avoids local recruitment fees £15k)
    state.hiringSituation = "new_team";
    state.additionalCosts.avoidLocalRecruitment = true;
    const newTeamResult = calculateTeamEconomics(state);

    // Existing team (historical recruitment fees were already paid, not avoided)
    state.hiringSituation = "replace_roles";
    state.additionalCosts.avoidLocalRecruitment = false;
    const replaceResult = calculateTeamEconomics(state);

    // Difference in first-year net savings should be exactly the £15,000 local recruitment fee
    expect(newTeamResult.firstYearNetSavings).not.toBeNull();
    expect(replaceResult.firstYearNetSavings).not.toBeNull();
    expect(
      (newTeamResult.firstYearNetSavings ?? 0) -
        (replaceResult.firstYearNetSavings ?? 0)
    ).toBe(15000);
  });

  // Test 16: India salary follows the current salary at the deck's saving
  it("Scenario 16: derives the India salary from the deck's per-role saving", () => {
    // At the deck's UK salary, every role returns the deck's India salary
    for (const bm of SALARY_BENCHMARKS) {
      expect(deriveIndiaSalary(bm.ukSalaryGBP, bm)).toBe(bm.indiaSalaryGBP);
    }

    // Marketing Automation Specialist: £42,000 -> £18,000, so £70,000 -> £30,000
    const mas = SALARY_BENCHMARKS.find((b) => b.role === "Marketing Automation Specialist");
    expect(deriveIndiaSalary(70000, mas)).toBe(30000);

    // Custom roles use the deck-wide average (£24,460 / £47,590), rounded to 100
    expect(deriveIndiaSalary(47590)).toBe(24500);
    expect(deriveIndiaSalary(0)).toBe(0);
  });

  // Test 17: Business impact in salary-only mode
  it("Scenario 17: summarises profit, three-year and capacity impact on salaries only", () => {
    const result = calculateTeamEconomics(createMarketResearchAnalystsDemo());
    const impact = calculateBusinessImpact(result);

    // 3 analysts: £90,000 UK vs £54,000 India
    expect(impact.annualSaving).toBe(36000);
    expect(impact.projections.map((p) => p.years)).toEqual([1, 3, 5]);
    expect(impact.projections[2]).toEqual({
      years: 5,
      currentCost: 450000,
      indiaCost: 270000,
      saving: 180000,
    });
    expect(impact.capacityMultiple).toBeCloseTo(90000 / 54000);
    expect(impact.indiaHeadcountForSameSpend).toBe(5);
  });

  // Test 18: Business impact in full-cost mode nets off the one-time setup
  it("Scenario 18: multi-year projections carry setup and recruiter fees in year one", () => {
    const state = createMarketResearchAnalystsDemo();
    state.pricingConfig = { ...INDICATIVE_MANAGED_MODEL_PRESET };
    const result = calculateTeamEconomics(state);
    const impact = calculateBusinessImpact(result);
    const [oneYear, threeYears] = impact.projections;

    expect(impact.annualSaving).toBe(result.annualSavings);
    // Year one matches the engine's first-year totals on both sides
    expect(oneYear.currentCost).toBeCloseTo(
      state.hiringSituation === "new_team" || state.additionalCosts.avoidLocalRecruitment
        ? result.localFirstYearTotalCost
        : result.currentAnnualOperatingCost
    );
    expect(oneYear.indiaCost).toBeCloseTo(result.offshoreFirstYearTotalCost ?? 0);
    expect(oneYear.saving).toBeCloseTo(result.firstYearNetSavings ?? 0);
    // Later years add the running yearly costs only
    expect(threeYears.currentCost - oneYear.currentCost).toBeCloseTo(
      2 * result.currentAnnualOperatingCost
    );
    expect(threeYears.saving).toBeCloseTo(
      (result.firstYearNetSavings ?? 0) + 2 * (result.annualSavings ?? 0)
    );
    expect(impact.capacityMultiple).toBeCloseTo(
      result.currentAnnualOperatingCost / (result.agileIntelAnnualCost ?? 1)
    );
  });
});
