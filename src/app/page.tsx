import type { Metadata } from "next";
import { KojaLandingPage } from "@/components/marketbridge-landing-page";

export const metadata: Metadata = {
  title: "KOJA — Move value across borders",
  description:
    "See how KOJA helps marketplace teams create and track simulated cross-border seller payouts.",
};

export default function HomePage() {
  return <KojaLandingPage />;
}
