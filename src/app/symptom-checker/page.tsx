import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SymptomChecker from "@/components/SymptomChecker";

export const metadata: Metadata = {
  title: "AI Symptom Checker",
  description: "Answer a few questions to get instant, personalised orthopedic guidance.",
};

export default function SymptomCheckerPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Symptom Checker"
        title="Not Sure What's Wrong?"
        subtitle="A quick, rule-based triage assistant — not a diagnosis."
      />
      <section className="bg-[var(--ice-blue)]/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SymptomChecker />
        </div>
      </section>
    </>
  );
}
