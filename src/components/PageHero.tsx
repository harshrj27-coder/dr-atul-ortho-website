export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#05070c] pb-20 pt-40 text-center text-white">
      <div className="aurora-bg opacity-50">
        <div className="aurora-blob left-[10%] top-[-10%] h-[360px] w-[360px] bg-[var(--lux-blue)]" />
        <div className="aurora-blob bottom-[-20%] right-[10%] h-[360px] w-[360px] bg-[var(--gold)]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6">
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--gold)]">
          {eyebrow}
        </span>
        <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 text-white/55">{subtitle}</p>}
      </div>
    </section>
  );
}
