"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  calculatePayoutEstimate,
  nextPayoutStatus,
  payoutCurrencies,
  validatePayoutAmount,
  type PayoutCurrency,
  type PayoutStatus,
} from "@/lib/payout-mock";

type Currency = PayoutCurrency;
type Payout = {
  id: string; recipient: string; country: string; amount: number; currency: Currency;
  destinationCurrency: Currency; rate: number; fee: number; received: number;
  status: PayoutStatus; createdAt: string; timeline: { label: string; at: string; note: string }[];
};

const STORAGE_KEY = "marketbridge.mock-payouts.v1";
const createPayoutId = () => `MB-${globalThis.crypto.randomUUID().slice(0, 8).toUpperCase()}`;
const recipients = [
  { name: "Amara Okafor", country: "Nigeria", currency: "NGN" as Currency },
  { name: "Tunde Adebayo", country: "United Kingdom", currency: "GBP" as Currency },
  { name: "Zainab Bello", country: "United States", currency: "USD" as Currency },
  { name: "Kemi Adeyemi", country: "Germany", currency: "EUR" as Currency },
];
const destinationCountries = ["Nigeria", "United Kingdom", "United States", "Germany", "France", "Canada"];
const money = (amount: number, currency: Currency) => new Intl.NumberFormat("en", {
  style: "currency", currency, maximumFractionDigits: 2,
}).format(amount);
const timestamp = (value: string) => new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos",
}).format(new Date(value));

export function PayoutWorkspace() {
  const [items, setItems] = useState<Payout[]>([]);
  const [recipient, setRecipient] = useState(recipients[1].name);
  const [destinationCountry, setDestinationCountry] = useState("United Kingdom");
  const [amount, setAmount] = useState("250000");
  const [sourceCurrency, setSourceCurrency] = useState<Currency>("NGN");
  const [destinationCurrency, setDestinationCurrency] = useState<Currency>("GBP");
  const [selected, setSelected] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Payout[];
        setItems(saved);
      } catch { setItems([]); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const numericAmount = Number(amount);
  const { rate, fee, recipientAmount: received } = calculatePayoutEstimate(
    numericAmount,
    sourceCurrency,
    destinationCurrency,
  );
  const active = items.find((item) => item.id === selected) ?? null;
  const summary = useMemo(() => ({
    pending: items.filter((item) => item.status === "Queued" || item.status === "Processing").length,
    completed: items.filter((item) => item.status === "Completed").length,
  }), [items]);

  function persist(next: Payout[]) {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function createPayout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const amountError = validatePayoutAmount(numericAmount);
    if (amountError) {
      setNotice(amountError);
      return;
    }
    setReviewing(true);
  }

  function confirmPayout() {
    const now = new Date().toISOString();
    const payout: Payout = {
      id: createPayoutId(), recipient, country: destinationCountry,
      amount: numericAmount, currency: sourceCurrency, destinationCurrency, rate, fee, received,
      status: "Queued", createdAt: now,
      timeline: [{ label: "Payout created", at: now, note: "Mock payout queued locally. No provider was contacted." }],
    };
    persist([payout, ...items]);
    setSelected(payout.id);
    setReviewing(false);
    setNotice("Mock payout created and saved in this browser.");
  }

  function advance(item: Payout) {
    const nextStatus = nextPayoutStatus(item.status);
    if (nextStatus === item.status) return;
    const now = new Date().toISOString();
    const label = nextStatus === "Processing" ? "Processing started" : "Marked completed";
    const updated = { ...item, status: nextStatus, timeline: [...item.timeline, { label, at: now, note: "Demonstration status only. No funds moved." }] };
    persist(items.map((entry) => entry.id === item.id ? updated : entry));
  }

  return (
    <main className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-7 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-800">GDG Ilorin × Blaaiz Buildathon</p><h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Payout operations</h1><p className="mt-1 text-sm text-slate-500">Manage cross-border seller payouts from one clear workspace.</p></div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900"><span className="h-2 w-2 rounded-full bg-amber-500" /> DEMO MODE · SIMULATED</span>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <Metric label="Payouts created" value={String(items.length)} foot="In this browser" />
          <Metric label="In progress" value={String(summary.pending)} foot="Queued or processing" />
          <Metric label="Completed" value={String(summary.completed)} foot="Mock statuses only" />
        </div>

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(350px,.82fr)_minmax(0,1.4fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5"><p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">New transfer</p><h2 className="mt-1 text-xl font-bold">Create a payout</h2><p className="mt-1 text-sm text-slate-500">Review the illustrative conversion before confirming.</p></div>
            <form onSubmit={createPayout} className="space-y-4">
              <div><label className="mb-1.5 block text-sm font-semibold" htmlFor="recipient">Seller / recipient</label><select id="recipient" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100" value={recipient} onChange={(event) => { const value = recipients.find((entry) => entry.name === event.target.value)!; setRecipient(value.name); setDestinationCountry(value.country); setDestinationCurrency(value.currency); }}>{recipients.map((entry) => <option key={entry.name} value={entry.name}>{entry.name} · {entry.country}</option>)}</select></div>
              <div className="grid grid-cols-[1fr_120px] gap-3"><div><label className="mb-1.5 block text-sm font-semibold" htmlFor="amount">Transfer amount</label><input id="amount" type="number" min="100" max="100000000" step="0.01" required value={amount} onChange={(event) => setAmount(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100" /></div><div><label className="mb-1.5 block text-sm font-semibold" htmlFor="source-currency">Currency</label><select id="source-currency" value={sourceCurrency} onChange={(event) => setSourceCurrency(event.target.value as Currency)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">{payoutCurrencies.map((currency) => <option key={currency}>{currency}</option>)}</select></div></div>
              <div><label className="mb-1.5 block text-sm font-semibold" htmlFor="destination-country">Destination country / currency</label><div className="grid grid-cols-[1fr_100px] gap-3"><select id="destination-country" value={destinationCountry} onChange={(event) => setDestinationCountry(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">{destinationCountries.map((country) => <option key={country}>{country}</option>)}</select><select aria-label="Destination currency" value={destinationCurrency} onChange={(event) => setDestinationCurrency(event.target.value as Currency)} className="w-full rounded-lg border border-slate-300 bg-white px-2 py-2.5 text-sm">{payoutCurrencies.map((currency) => <option key={currency}>{currency}</option>)}</select></div></div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold">Transfer estimate</h3><span className="rounded bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-900">Illustrative only</span></div><Line label="Indicative FX rate" value={`1 ${sourceCurrency} = ${rate.toLocaleString("en", { maximumFractionDigits: 4 })} ${destinationCurrency}`} /><Line label="Transfer fee · 1.5%" value={money(fee || 0, sourceCurrency)} /><div className="my-3 border-t border-slate-200" /><Line label="Estimated recipient gets" value={money(received || 0, destinationCurrency)} strong /></div>
              <p className="text-xs leading-5 text-slate-500">Rates and fees are sample values for this demo and are not live quotes or Blaaiz pricing.</p>
              {notice && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">{notice}</p>}
              {reviewing ? <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4"><p className="text-sm font-bold text-emerald-950">Confirm simulated payout</p><p className="mt-1 text-sm leading-5 text-emerald-900">Send {money(numericAmount || 0, sourceCurrency)} for {recipient}? The estimated recipient amount is {money(received || 0, destinationCurrency)}. This only creates a browser-local mock record; no transfer will be sent.</p><div className="mt-3 flex gap-2"><button type="button" onClick={confirmPayout} className="flex-1 rounded-lg bg-emerald-800 px-3 py-2.5 text-sm font-bold text-white hover:bg-emerald-900">Confirm mock payout</button><button type="button" onClick={() => setReviewing(false)} className="rounded-lg border border-emerald-800 px-3 py-2.5 text-sm font-semibold text-emerald-950">Edit</button></div></div> : <button type="submit" className="w-full rounded-lg bg-emerald-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">Review payout</button>}
              <p className="text-center text-[11px] text-slate-500">No real funds move · No Blaaiz credentials or API calls used</p>
            </form>
          </section>

          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 py-5"><div><h2 className="text-lg font-bold">Transaction tracker</h2><p className="mt-0.5 text-sm text-slate-500">Select a payout to inspect its details and timeline.</p></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{items.length} total</span></div>
            {items.length === 0 ? <div className="px-5 py-16 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-xl text-emerald-800">↗</div><h3 className="mt-4 font-bold">No payouts yet</h3><p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">Create a simulated payout to see its status and transaction timeline here.</p></div> : <div className="divide-y divide-slate-100">{items.map((item) => <button key={item.id} onClick={() => setSelected(item.id)} className={`grid w-full grid-cols-[1fr_auto] items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-50 sm:grid-cols-[minmax(110px,1fr)_minmax(90px,.8fr)_minmax(90px,.7fr)_auto] ${selected === item.id ? "bg-emerald-50/70" : ""}`}><span><span className="block truncate text-sm font-bold">{item.recipient}</span><span className="mt-1 block text-xs text-slate-500">{item.id}</span></span><span className="hidden text-sm text-slate-600 sm:block">{item.country}</span><span className="text-sm font-semibold tabular-nums">{money(item.amount, item.currency)}</span><Status status={item.status} /></button>)}</div>}

            {active && <div className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Payout details</p><h3 className="mt-1 text-lg font-bold">{active.id}</h3><p className="mt-1 text-sm text-slate-500">Created {timestamp(active.createdAt)}</p></div><Status status={active.status} /></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><Detail label="Recipient" value={active.recipient} /><Detail label="Destination" value={`${active.country} · ${active.destinationCurrency}`} /><Detail label="Transfer amount" value={money(active.amount, active.currency)} /><Detail label="Estimated recipient amount" value={money(active.received, active.destinationCurrency)} /><Detail label="Illustrative FX rate" value={`1 ${active.currency} = ${active.rate} ${active.destinationCurrency}`} /><Detail label="Illustrative fee" value={money(active.fee, active.currency)} /></div><div className="mt-6"><h4 className="text-sm font-bold">Status timeline</h4><ol className="mt-3 space-y-3">{active.timeline.map((entry, index) => <li key={`${entry.at}-${entry.label}`} className="flex gap-3"><span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${index === active.timeline.length - 1 ? "bg-emerald-700" : "bg-slate-300"}`} /><div><p className="text-sm font-semibold">{entry.label}<span className="ml-2 font-normal text-slate-500">{timestamp(entry.at)}</span></p><p className="mt-0.5 text-xs text-slate-500">{entry.note}</p></div></li>)}</ol></div>{(active.status === "Queued" || active.status === "Processing") && <button onClick={() => advance(active)} className="mt-5 rounded-lg border border-emerald-800 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50">{active.status === "Queued" ? "Simulate processing" : "Simulate completion"}</button>}<p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">Mock transaction · Stored in this browser only · No provider contacted · No funds moved</p></div>}
          </section>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-xs text-slate-500"><span>MarketBridge · GDG Ilorin × Blaaiz Buildathon</span><span>Illustrative demo environment · Not a live payout service</span></div>
      </div>
    </main>
  );
}

function Metric({ label, value, foot }: { label: string; value: string; foot: string }) { return <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold tabular-nums">{value}</p><p className="mt-1 text-xs text-slate-500">{foot}</p></div>; }
function Line({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) { return <div className={`flex items-center justify-between gap-3 ${strong ? "text-sm font-bold text-slate-900" : "text-xs text-slate-600"}`}><span>{label}</span><span className="text-right tabular-nums">{value}</span></div>; }
function Detail({ label, value }: { label: string; value: string }) { return <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 break-words text-sm font-semibold">{value}</p></div>; }
function Status({ status }: { status: PayoutStatus }) { const styles: Record<PayoutStatus, string> = { Queued: "bg-amber-100 text-amber-900", Processing: "bg-blue-100 text-blue-900", Completed: "bg-emerald-100 text-emerald-900", Failed: "bg-rose-100 text-rose-900" }; return <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${styles[status]}`}>{status}</span>; }
