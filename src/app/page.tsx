import type { Metadata } from "next";
import { MarketBridgeLandingPage } from "@/components/marketbridge-landing-page";

export const metadata: Metadata = {
  title: "Cross-border payouts, made clear",
  description:
    "See how MarketBridge helps marketplace teams create and track simulated cross-border seller payouts.",
};

export default function HomePage() {
  return <MarketBridgeLandingPage />;
}
