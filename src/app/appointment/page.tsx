import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AppointmentBooking from "@/components/AppointmentBooking";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Book your consultation with Dr. Atul Rai Sharma — luxury calendar, instant confirmation.",
};

export default function AppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointment"
        title="Book Your Consultation"
        subtitle="Select a date and time that works for you."
      />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AppointmentBooking />
        </div>
      </section>
    </>
  );
}
