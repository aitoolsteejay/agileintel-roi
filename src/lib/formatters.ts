import { CurrencyCode } from "./calculatorEngine";

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
};

export function getCurrencySymbol(code: CurrencyCode = "GBP"): string {
  return CURRENCY_SYMBOLS[code] || "£";
}

/**
 * Formats a monetary number into standard localized currency string (e.g. £45,000).
 */
export function formatCurrency(
  value: number | null | undefined,
  currency: CurrencyCode = "GBP",
  includeDecimals = false
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "Pending quote";
  }

  const symbol = getCurrencySymbol(currency);
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  const formatted = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(absValue);

  return `${isNegative ? "-" : ""}${symbol}${formatted}`;
}

/**
 * Formats a percentage number with 1 decimal place or integer.
 */
export function formatPercent(
  value: number | null | undefined,
  decimals = 1
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "—";
  }

  const isInteger = Math.abs(value % 1) < 0.01;
  const formatted = value.toFixed(isInteger ? 0 : decimals);
  return `${formatted}%`;
}

/**
 * Formats a generic count or number with thousands separator.
 */
export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "0";
  }
  return new Intl.NumberFormat("en-GB").format(value);
}
