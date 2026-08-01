import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Dr. Atul Rai Sharma's clinic in Jalandhar, Punjab.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in Touch" />
      <ContactSection />
    </>
  );
}
