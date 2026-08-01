import { MapPin, Phone, Mail, Clock, Car } from "lucide-react";

const info = [
  { icon: MapPin, label: "Location", value: "Jalandhar, Punjab, India — full address to be added" },
  { icon: Phone, label: "Phone", value: "To be added" },
  { icon: Mail, label: "Email", value: "To be added" },
  { icon: Clock, label: "Consultation Hours", value: "To be added" },
  { icon: Car, label: "Parking", value: "On-site parking available" },
];

export default function ContactSection() {
  return (
    <section className="relative bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
            Visit Us
          </span>
          <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
            Reach the Clinic
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {info.map((item) => (
              <div key={item.label} className="glass-card flex items-start gap-4 rounded-2xl p-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--lux-blue)]/10 text-[var(--lux-blue)]">
                  <item.icon size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0b0f1a]">{item.label}</p>
                  <p className="text-sm text-[#0b0f1a]/55">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card overflow-hidden rounded-3xl">
            <iframe
              src="https://www.google.com/maps?q=Jalandhar,Punjab,India&output=embed"
              loading="lazy"
              title="Clinic location map — Jalandhar"
              className="h-full min-h-[380px] w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
