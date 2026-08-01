"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, ArrowUpRight } from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/blog-posts";

const categories: Array<BlogPost["category"] | "All"> = [
  "All",
  "Recovery Guides",
  "Bone Health",
  "Exercises",
  "Lifestyle Tips",
  "Nutrition",
];

export default function HealthLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section className="relative bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
            Health Library
          </span>
          <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
            Guides for a Healthier, Stronger You
          </h2>
        </div>

        <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0b0f1a]/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-full border border-[#0b0f1a]/10 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[var(--lux-blue)]"
            />
          </div>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                category === c
                  ? "bg-[var(--lux-blue)] text-white"
                  : "bg-[#0b0f1a]/5 text-[#0b0f1a]/60 hover:bg-[#0b0f1a]/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card group cursor-pointer rounded-2xl p-6"
            >
              <span className="inline-block rounded-full bg-[var(--emerald)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--emerald)]">
                {post.category}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[#0b0f1a] transition-colors group-hover:text-[var(--lux-blue)]">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-[#0b0f1a]/55">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-[#0b0f1a]/40">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.readTime}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-[var(--lux-blue)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </motion.article>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-sm text-[#0b0f1a]/40">
              No articles match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
