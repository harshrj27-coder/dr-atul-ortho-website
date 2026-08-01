"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, BadgeCheck } from "lucide-react";
import { testimonials } from "@/data/testimonials";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  return (
    <section className="relative bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
            Patient Stories
          </span>
          <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
            Trusted Care, Real Recoveries
          </h2>
          <p className="mt-3 text-[#0b0f1a]/55">
            Sample testimonials shown below — replace with real, consented
            patient reviews and Google Reviews before launch.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name + t.procedure}>
              <div className="glass-card h-full rounded-2xl p-6">
                <div className="mb-3 flex items-center gap-1 text-[var(--gold)]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm italic text-[#0b0f1a]/70">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--lux-blue)] to-[var(--emerald)] font-display text-xs font-semibold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="flex items-center gap-1 text-sm font-semibold text-[#0b0f1a]">
                      {t.name} <BadgeCheck size={13} className="text-[var(--lux-blue)]" />
                    </p>
                    <p className="text-xs text-[#0b0f1a]/45">{t.procedure}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
