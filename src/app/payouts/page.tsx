import type { Metadata } from "next";
import { PayoutWorkspace } from "@/components/payout-workspace";

export const metadata: Metadata = {
  title: "Payout dashboard",
  description: "Create and track clearly labelled simulated cross-border payouts.",
};

export default function PayoutsPage() {
  return <PayoutWorkspace />;
}
