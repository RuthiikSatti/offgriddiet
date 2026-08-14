"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { resources } from "@/lib/publication";

const topics = ["All", "Start growing", "Small spaces", "Soil", "Pests", "Root crops"] as const;

export function ResourceLibrary({ limit }: { limit?: number }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<(typeof topics)[number]>("All");
  const visible = useMemo(() => resources.filter((resource) => {
    const matchesTopic = topic === "All" || resource.topic === topic;
    const haystack = `${resource.title} ${resource.publisher} ${resource.summary} ${resource.bestFor}`.toLowerCase();
    return matchesTopic && haystack.includes(query.toLowerCase());
  }).slice(0, limit), [query, topic, limit]);

  return (
    <div>
      {!limit && <div className="mb-8 grid gap-4 border-y border-forest/15 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="flex items-center gap-3 border-b border-forest/25 pb-2 text-forest focus-within:border-sprout">
          <Search className="h-4 w-4 text-sprout" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guides, topics, publishers…" className="w-full bg-transparent text-sm outline-none placeholder:text-stone" />
        </label>
        <div className="flex flex-wrap gap-2">
          {topics.map((item) => <button key={item} onClick={() => setTopic(item)} type="button" className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${topic === item ? "border-forest bg-forest text-cream" : "border-forest/20 text-forest hover:border-sprout"}`}>{item}</button>)}
        </div>
      </div>}
      <motion.div layout className="grid gap-4 md:grid-cols-2">
        {visible.map((resource, index) => <motion.a layout key={resource.href} href={resource.href} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.045 }} whileHover={{ y: -4 }} className="group flex min-h-[220px] flex-col border border-forest/15 bg-white p-5 shadow-soft transition-shadow hover:shadow-lift">
          <div className="flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-stone"><span>{resource.topic}</span><ArrowUpRight className="h-4 w-4 shrink-0 text-sprout" /></div>
          <h2 className="mt-7 font-heading text-2xl font-extrabold uppercase leading-[0.98] text-forest">{resource.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone">{resource.summary}</p>
          <div className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-forest/65"><span>{resource.publisher}</span><span className="mx-2 text-sprout">·</span><span>{resource.type}</span></div>
        </motion.a>)}
      </motion.div>
      {!visible.length && <p className="py-16 text-center text-stone">No resources match that search yet.</p>}
    </div>
  );
}
