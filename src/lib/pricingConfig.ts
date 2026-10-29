/**
 * AgileIntel Commercial Pricing Configuration
 *
 * Mode 1: APPROVED_PRICING - When AgileIntel provides an approved rate card or pricing formula.
 * Mode 2: SALARY_ONLY_BENCHMARK - When approved commercial pricing is pending formal quote.
 *
 * To avoid hardcoding speculative prices into production logic, this configuration is isolated,
 * strongly typed, and transparently disclosed to prospective clients.
 */

export type PricingMode = "salary_only" | "approved_managed_service";

export interface AgileIntelPricingConfig {
  mode: PricingMode;
  /**
   * India statutory employer costs (Provident Fund, Gratuity, Health Insurance, etc.)
   * Not stated in the deck, so 0 until AgileIntel confirms pricing.
   */
  indiaEmployerCostPercent: number;
  /**
   * AgileIntel annual management & operational fee per person (GBP).
   * Covers HR, recruitment, facilities, IT, line management, and continuous QA.
   * If null, pricing is considered unapproved/pending quote.
   */
  annualManagementFeePerPersonGBP: number | null;
  /**
   * One-time setup fee per person (workstation, software licensing, security audit).
   */
  setupFeePerPersonGBP: number;
  /**
   * One-time transition and knowledge transfer fee per team/pod.
   */
  transitionFeeGBP: number;
  /**
   * Pricing version label for auditability.
   */
  pricingVersion: string;
  /**
   * Explanatory caveat displayed to prospective clients.
   */
  caveat: string;
}

export const DEFAULT_PRICING_CONFIG: AgileIntelPricingConfig = {
  mode: "salary_only",
  // The deck's salary benchmarks exclude AgileIntel's fee and employer on-costs,
  // and it states no setup or transition fees, so none are assumed here.
  indiaEmployerCostPercent: 0,
  annualManagementFeePerPersonGBP: null, // Null indicates unapproved/pending custom quote
  setupFeePerPersonGBP: 0,
  transitionFeeGBP: 0,
  pricingVersion: "AgileIntel-B2B-Events-2026-v1.0",
  caveat:
    "Base salaries from AgileIntel's 2026 benchmarks (Glassdoor, 31 August 2026). Excludes AgileIntel's management fee and employer on-costs, which a costed proposal confirms.",
};
