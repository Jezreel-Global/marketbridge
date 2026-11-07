export const payoutCurrencies = ["NGN", "USD", "GBP", "EUR"] as const;
export type PayoutCurrency = (typeof payoutCurrencies)[number];
export type PayoutStatus = "Queued" | "Processing" | "Completed" | "Failed";

/** Fixed sample values for the local demo. These are not live FX quotes. */
export const illustrativeRates: Record<PayoutCurrency, Record<PayoutCurrency, number>> = {
  NGN: { NGN: 1, USD: 0.00065, GBP: 0.00051, EUR: 0.0006 },
  USD: { NGN: 1540, USD: 1, GBP: 0.79, EUR: 0.92 },
  GBP: { NGN: 1950, USD: 1.27, GBP: 1, EUR: 1.17 },
  EUR: { NGN: 1670, USD: 1.09, GBP: 0.85, EUR: 1 },
};

export function validatePayoutAmount(amount: number): string | undefined {
  if (!Number.isFinite(amount) || amount < 100 || amount > 100_000_000) {
    return "Enter an amount between 100 and 100,000,000.";
  }
  return undefined;
}

export function calculatePayoutEstimate(
  amount: number,
  sourceCurrency: PayoutCurrency,
  destinationCurrency: PayoutCurrency,
) {
  const rate = illustrativeRates[sourceCurrency][destinationCurrency];
  const fee = Math.round(amount * 0.015 * 100) / 100;
  const recipientAmount = Math.round(Math.max(0, amount - fee) * rate * 100) / 100;
  return { rate, fee, recipientAmount };
}

export function nextPayoutStatus(status: PayoutStatus): PayoutStatus {
  if (status === "Queued") return "Processing";
  if (status === "Processing") return "Completed";
  return status;
}
