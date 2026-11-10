import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import BeakerIcon from "@heroicons/react/24/outline/BeakerIcon";
import CalculatorIcon from "@heroicons/react/24/outline/CalculatorIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import ClockIcon from "@heroicons/react/24/outline/ClockIcon";
import PaperAirplaneIcon from "@heroicons/react/24/outline/PaperAirplaneIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import { LandingEstimateCard } from "@/components/landing-estimate-card";

const steps = [
  {
    number: "01",
    title: "Get a clear estimate",
    body: "Enter an amount and destination to see an illustrative rate, fee, and recipient amount.",
    Icon: CalculatorIcon,
  },
  {
    number: "02",
    title: "Review and confirm",
    body: "Check the payout details before creating a clearly labelled simulated transfer.",
    Icon: PaperAirplaneIcon,
  },
  {
    number: "03",
    title: "Follow its status",
    body: "Inspect the payout record and see each example status in its timeline.",
    Icon: QueueListIcon,
  },
];

export function KojaLandingPage() {
  return (
    <div className="landing-page min-h-screen bg-[#f8faf7] text-[#15231d]">
      <section
        id="product"
        aria-labelledby="landing-title"
        className="relative overflow-hidden"
      >
        <div className="mx-auto grid max-w-[1380px] items-center gap-8 px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:min-h-[660px] lg:grid-cols-[minmax(0,.88fr)_minmax(0,1.12fr)] lg:gap-6 lg:px-12 lg:pb-16 lg:pt-12">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[.12em] text-emerald-900 sm:text-sm">
              KOJA · GDG Ilorin × Blaaiz Buildathon
            </p>
            <h1
              id="landing-title"
              className="max-w-[13ch] text-[2.75rem] font-bold leading-[1.04] tracking-[-.045em] text-[#103d2d] sm:text-6xl lg:text-[4.15rem]"
            >
              Pay sellers across borders, with clarity.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Enter an amount, see an illustrative exchange rate and fee, preview
              what the recipient may get, then follow a simulated payout from
              creation to completion.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/payouts"
                className="focus-ring inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-[#0d4935] px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-[#0a3d2d]"
              >
                Explore the payout demo
                <ArrowRightIcon aria-hidden="true" className="size-5" />
              </Link>
              <Link
                href="#how-it-works"
                className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-[#174b38] underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-emerald-950"
              >
                See how it works
              </Link>
            </div>
            <p className="mt-5 flex max-w-lg items-start gap-2 text-sm leading-6 text-slate-600">
              <BeakerIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-emerald-800" />
              <span>
                Demo mode only. The builder has Blaaiz development dashboard
                access, but this page uses sample values and does not move money.
              </span>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-3xl lg:min-h-[540px]">
            <Image
              src="/images/marketbridge-route-illustration.png"
              alt=""
              aria-hidden="true"
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="pointer-events-none absolute -right-8 -top-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] object-contain object-right opacity-75 sm:-right-12 sm:-top-10"
            />
            <div className="relative z-10 grid items-center gap-4 pt-5 sm:pt-8 lg:min-h-[540px] lg:grid-cols-[minmax(0,1.45fr)_minmax(205px,.88fr)] lg:gap-3 lg:pt-16">
              <LandingEstimateCard />
              <ExampleTimeline />
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="journey-title"
        className="scroll-mt-24 border-t border-[#dce7e0] bg-white/75"
      >
        <div className="mx-auto grid max-w-[1380px] gap-9 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1.7fr)_minmax(290px,.9fr)] lg:gap-12 lg:px-12 lg:py-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.13em] text-emerald-800">
              The payout journey
            </p>
            <h2
              id="journey-title"
              className="mt-2 max-w-xl text-2xl font-bold tracking-tight text-[#103d2d] sm:text-3xl"
            >
              Three steps. One clearer payout workflow.
            </h2>
            <ol className="mt-8 grid gap-7 sm:grid-cols-3 sm:gap-5">
              {steps.map(({ number, title, body, Icon }) => (
                <li key={number} className="relative flex gap-4 sm:block">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#e8f5ed] text-[#12603f] sm:mb-4">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[.12em] text-emerald-800">
                      Step {number}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside
            aria-labelledby="demo-mode-title"
            className="self-center rounded-2xl border border-emerald-100 bg-[#f1f8f2] p-5 sm:p-6"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-emerald-800">
                <BeakerIcon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 id="demo-mode-title" className="text-lg font-bold text-[#103d2d]">
                  Safe to explore in demo mode
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Sample FX and fees are illustrative, not live quotes or Blaaiz
                  pricing. Payouts are saved in this browser only. No provider is
                  contacted and no funds move.
                </p>
                <Link
                  href="/payouts"
                  className="focus-ring mt-4 inline-flex min-h-10 items-center gap-2 rounded-md font-semibold text-emerald-900 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
                >
                  Try the simulated flow
                  <ArrowRightIcon aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function ExampleTimeline() {
  const stages = ["Payout created", "Processing", "Completed"];

  return (
    <section
      aria-labelledby="timeline-title"
      className="rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-[0_14px_36px_-30px_rgba(15,61,50,.55)] backdrop-blur-sm sm:p-5 lg:mt-20 lg:px-4 lg:py-5"
    >
      <p className="text-[10px] font-bold uppercase tracking-[.12em] text-emerald-800">
        Example only
      </p>
      <h2 id="timeline-title" className="mt-1 text-base font-bold text-slate-900">
        Payout status
      </h2>
      <ol className="mt-5 space-y-4">
        {stages.map((stage, index) => (
          <li key={stage} className="flex gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border ${index === 0 ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-300 bg-white text-slate-400"}`}
            >
              {index === 0
                ? <CheckCircleIcon aria-hidden="true" className="size-5" />
                : <ClockIcon aria-hidden="true" className="size-4" />}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-slate-800">{stage}</span>
              <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                {index === 0
                  ? "A mock request is created locally."
                  : "Shown as an example status only."}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <Link
        href="/payouts"
        className="focus-ring mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-emerald-900 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
      >
        Open payout tracker
        <ArrowRightIcon aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
