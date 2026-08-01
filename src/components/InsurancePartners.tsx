"use client";

// Text badges, not fake logos — swap for real insurer/TPA logos once
// partnerships are confirmed.
const partners = [
  "Cashless Network Hospitals",
  "Corporate TPAs",
  "Ayushman Bharat",
  "CGHS Empanelled",
  "Star Health",
  "HDFC ERGO",
  "ICICI Lombard",
  "Niva Bupa",
];

export default function InsurancePartners() {
  const loop = [...partners, ...partners];

  return (
    <section className="relative overflow-hidden border-y border-[#0b0f1a]/5 bg-white py-14">
      <div className="mx-auto mb-8 max-w-7xl px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[3px] text-[#0b0f1a]/40">
          Insurance &amp; Cashless Partners
        </span>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex animate-[marquee_28s_linear_infinite] gap-10 pr-10">
          {loop.map((p, i) => (
            <span
              key={i}
              className="glass-card whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium text-[#0b0f1a]/60"
            >
              {p}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
