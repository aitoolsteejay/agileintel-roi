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
   * Default indicative statutory provision is typically ~12-15% in India.
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
  indiaEmployerCostPercent: 12.0,
  annualManagementFeePerPersonGBP: null, // Null indicates unapproved/pending custom quote
  setupFeePerPersonGBP: 1500,
  transitionFeeGBP: 2500,
  pricingVersion: "AgileIntel-B2B-Events-2026-v1.0",
  caveat:
    "Source-backed mode: Commercial pricing excludes AgileIntel management fee until a formal pod proposal is issued. Switch to 'Indicative Managed Model' to simulate a fully-managed delivery team.",
};

/**
 * Optional indicative managed service model preset (for clients who want to model
 * an all-inclusive estimated managed team cost).
 */
export const INDICATIVE_MANAGED_MODEL_PRESET: AgileIntelPricingConfig = {
  mode: "approved_managed_service",
  indiaEmployerCostPercent: 12.0,
  annualManagementFeePerPersonGBP: 7500, // Indicative AgileIntel management & QA fee (£625/mo per headcount)
  setupFeePerPersonGBP: 1500,
  transitionFeeGBP: 2500,
  pricingVersion: "AgileIntel-Indicative-Managed-2026",
  caveat:
    "Indicative pricing model: Includes estimated India employer statutory on-costs (12%) and an indicative AgileIntel management, QA, and operational fee (£7,500/headcount/year). Final pricing requires a scoping session.",
};
