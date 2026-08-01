import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import DoctorProfile from "@/components/DoctorProfile";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "About Dr. Atul Rai Sharma",
  description:
    "Consultant Orthopaedics & Joint Replacement Surgeon — education, fellowships and 11+ years of clinical excellence.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Dr. Atul Rai Sharma"
        subtitle="Consultant Orthopaedics & Joint Replacement Surgeon"
      />
      <DoctorProfile />
      <Timeline />
    </>
  );
}
