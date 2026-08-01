import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HealthLibrary from "@/components/HealthLibrary";

export const metadata: Metadata = {
  title: "Health Library",
  description: "Recovery guides, exercises, bone health and lifestyle tips.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Health Library"
        title="Guides for a Healthier, Stronger You"
      />
      <HealthLibrary />
    </>
  );
}
