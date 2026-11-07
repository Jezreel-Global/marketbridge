"use client";

import Link from "next/link";
import { useState } from "react";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import {
  calculatePayoutEstimate,
  payoutCurrencies,
  validatePayoutAmount,
  type PayoutCurrency,
} from "@/lib/payout-mock";

const money = (amount: number, currency: PayoutCurrency) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);

export function LandingEstimateCard() {
  const [amount, setAmount] = useState("1000000");
  const [sourceCurrency, setSourceCurrency] = useState<PayoutCurrency>("NGN");
  const [destinationCurrency, setDestinationCurrency] = useState<PayoutCurrency>("GBP");
  const numericAmount = Number(amount);
  const error = amount ? validatePayoutAmount(numericAmount) : "Enter a payout amount.";
  const estimate = calculatePayoutEstimate(
    Number.isFinite(numericAmount) ? numericAmount : 0,
    sourceCurrency,
    destinationCurrency,
  );

  return (
    <section
      aria-labelledby="estimate-title"
      className="rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-[0_18px_45px_-34px_rgba(15,61,50,.55)] backdrop-blur-sm sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="estimate-title" className="text-lg font-bold text-slate-950 sm:text-xl">
            Transfer estimate
          </h2>
          <p className="mt-1 text-xs text-slate-500">Preview a cross-border payout</p>
        </div>
        <span className="inline-flex min-h-7 items-center rounded-full bg-amber-50 px-2.5 text-[10px] font-bold uppercase tracking-wide text-amber-900 ring-1 ring-amber-200">
          Illustrative only
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="landing-source-currency" className="mb-1.5 block text-xs font-semibold text-slate-700">
            Send from
          </label>
          <select
            id="landing-source-currency"
            value={sourceCurrency}
            onChange={(event) => setSourceCurrency(event.target.value as PayoutCurrency)}
            className="focus-ring min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900"
          >
            {payoutCurrencies.map((currency) => <option key={currency}>{currency}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="landing-destination-currency" className="mb-1.5 block text-xs font-semibold text-slate-700">
            Recipient gets
          </label>
          <select
            id="landing-destination-currency"
            value={destinationCurrency}
            onChange={(event) => setDestinationCurrency(event.target.value as PayoutCurrency)}
            className="focus-ring min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900"
          >
            {payoutCurrencies.map((currency) => <option key={currency}>{currency}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="landing-amount" className="mb-1.5 block text-xs font-semibold text-slate-700">
          Amount to send
        </label>
        <div className="flex min-h-12 items-center rounded-lg border border-slate-300 bg-white px-3 focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-100">
          <span className="mr-2 text-sm font-semibold text-slate-500">{sourceCurrency}</span>
          <input
            id="landing-amount"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "landing-amount-error landing-estimate-note" : "landing-estimate-note"}
            inputMode="decimal"
            type="number"
            min="100"
            max="100000000"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="min-w-0 flex-1 bg-transparent py-2 text-base font-semibold tabular-nums text-slate-950 outline-none"
          />
        </div>
        {error && (
          <p id="landing-amount-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-800">
            {error}
          </p>
        )}
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-600">
        <InformationCircleIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald-800" />
        <span id="landing-estimate-note">
          1 {sourceCurrency} = {estimate.rate.toLocaleString("en", { maximumFractionDigits: 4 })} {destinationCurrency} · Sample rate, not a live quote.
        </span>
      </p>

      <dl className="mt-4 space-y-2.5 border-b border-slate-200 pb-4 text-sm">
        <div className="flex items-center justify-between gap-3 text-slate-600">
          <dt>Illustrative transfer fee · 1.5%</dt>
          <dd className="font-medium tabular-nums text-slate-800">{money(estimate.fee, sourceCurrency)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3 pt-1">
          <dt className="font-semibold text-slate-800">Estimated recipient gets</dt>
          <dd className="text-lg font-bold tabular-nums text-[#0d4935]">
            {money(error ? 0 : estimate.recipientAmount, destinationCurrency)}
          </dd>
        </div>
      </dl>

      <Link
        href="/payouts"
        className="focus-ring mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0d4935] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0a3d2d]"
      >
        Review simulated payout
        <ArrowRightIcon aria-hidden="true" className="size-4" />
      </Link>
      <p className="mt-2 text-center text-[11px] leading-5 text-slate-500">
        Sample estimate · no provider is contacted · no funds move
      </p>
    </section>
  );
}
