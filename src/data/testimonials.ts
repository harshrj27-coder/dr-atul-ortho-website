// NOTE: All entries below are clearly-labeled sample placeholders.
// Replace with real, consented patient reviews before launch.
export type Testimonial = {
  name: string;
  procedure: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Placeholder Patient",
    procedure: "Robotic Knee Replacement",
    quote:
      "Sample testimonial — replace with a real patient review. The care and attention to recovery made all the difference.",
    rating: 5,
  },
  {
    name: "Placeholder Patient",
    procedure: "ACL Reconstruction",
    quote:
      "Sample testimonial — replace with a real patient review. Back on the field faster than I expected.",
    rating: 5,
  },
  {
    name: "Placeholder Patient",
    procedure: "Hip Replacement",
    quote:
      "Sample testimonial — replace with a real patient review. Walking pain-free again within weeks.",
    rating: 5,
  },
  {
    name: "Placeholder Patient",
    procedure: "Trauma Surgery",
    quote:
      "Sample testimonial — replace with a real patient review. Prompt, precise trauma care after my accident.",
    rating: 5,
  },
];
