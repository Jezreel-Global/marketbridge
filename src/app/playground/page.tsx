import type { Metadata } from "next";
import { DemoStudio } from "@/components/demo-studio";

export const metadata: Metadata = {
  title: "Legacy marketplace demo studio",
  description: "Explore a simulated marketplace payment dashboard with NGN and USD examples.",
};

export default function PlaygroundPage() {
  return <DemoStudio />;
}
