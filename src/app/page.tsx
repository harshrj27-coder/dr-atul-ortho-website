import Hero from "@/components/Hero";
import DoctorProfile from "@/components/DoctorProfile";
import Timeline from "@/components/Timeline";
import SpecialityCards from "@/components/SpecialityCards";
import TechnologySection from "@/components/TechnologySection";
import PatientJourney from "@/components/PatientJourney";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import VirtualTour from "@/components/VirtualTour";
import Testimonials from "@/components/Testimonials";
import StatsCounter from "@/components/StatsCounter";
import InsurancePartners from "@/components/InsurancePartners";
import ContactSection from "@/components/ContactSection";
import SymptomChecker from "@/components/SymptomChecker";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="relative bg-[var(--ice-blue)]/40 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
              AI Symptom Checker
            </span>
            <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
              Not Sure What&apos;s Wrong?
            </h2>
            <p className="mt-3 text-[#0b0f1a]/55">
              Answer a few questions and get instant, personalised guidance.
            </p>
          </div>
          <SymptomChecker />
        </div>
      </section>

      <DoctorProfile />
      <Timeline />
      <SpecialityCards />
      <TechnologySection />
      <PatientJourney />
      <BeforeAfterSlider />
      <VirtualTour />
      <Testimonials />
      <StatsCounter />
      <InsurancePartners />

      <section className="relative bg-[var(--ice-blue)]/40 py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
            Ready When You Are
          </span>
          <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
            Book Your Consultation Today
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#0b0f1a]/55">
            Get a personalised treatment plan from Dr. Atul Rai Sharma.
          </p>
          <Link
            href="/appointment"
            className="mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-[var(--lux-blue)] to-[var(--emerald)] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-glow-blue transition hover:brightness-110"
          >
            Book Appointment
          </Link>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
