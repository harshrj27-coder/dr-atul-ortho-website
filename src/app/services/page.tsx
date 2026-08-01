import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SpecialityCards from "@/components/SpecialityCards";
import TechnologySection from "@/components/TechnologySection";

export const metadata: Metadata = {
  title: "Services & Specialities",
  description:
    "Robotic knee, hip & shoulder replacement, arthroscopy, sports injury, trauma care and more — Dr. Atul Rai Sharma, Jalandhar.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Orthopaedic & Joint Replacement Treatments"
        subtitle="Comprehensive, technology-led care across every stage of your recovery."
      />
      <SpecialityCards />
      <TechnologySection />
    </>
  );
}
