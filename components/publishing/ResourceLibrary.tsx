"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { resources } from "@/lib/publication";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

const topics = [
  "All",
  "Start growing",
  "Small spaces",
  "Soil",
  "Pests",
  "Root crops",
] as const;

export function ResourceLibrary({ limit }: { limit?: number }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<(typeof topics)[number]>("All");

  const visible = useMemo(
    () =>
      resources
        .filter((resource) => {
          const matchesTopic = topic === "All" || resource.topic === topic;
          const haystack =
            `${resource.title} ${resource.publisher} ${resource.summary} ${resource.bestFor}`.toLowerCase();
          return matchesTopic && haystack.includes(query.toLowerCase());
        })
        .slice(0, limit),
    [query, topic, limit]
  );

  return (
    <div>
      {!limit && (
        <div className="mb-12 grid gap-5 border-y border-line py-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="flex items-center gap-3 text-ink">
            <Search className="h-4 w-4 shrink-0 text-bark" aria-hidden="true" />
            <span className="sr-only">Search resources</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search guides, topics, publishers…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-bark/70"
            />
          </label>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {topics.map((item) => (
              <button
                key={item}
                onClick={() => setTopic(item)}
                type="button"
                aria-pressed={topic === item}
                className={`rounded-sm border-b pb-0.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                  topic === item
                    ? "border-ink text-ink"
                    : "border-transparent text-bark hover:text-ink"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <StaggerGroup
        key={`${topic}-${query}`}
        className="grid gap-10 md:grid-cols-2 md:gap-x-8"
      >
        {visible.map((resource) => (
          <a
            key={resource.href}
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-[180px] flex-col border-t border-line pt-6 transition-colors hover:border-ink/40"
          >
            <div className="flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-bark">
              <span>{resource.topic}</span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-bark transition-transform motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>

            <h2 className="mt-5 font-heading text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-leaf">
              {resource.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-bark">
              {resource.summary}
            </p>

            <div className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-bark">
              <span>{resource.publisher}</span>
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              <span>{resource.type}</span>
            </div>
          </a>
        ))}
      </StaggerGroup>

      {!visible.length && (
        <p className="py-16 text-bark">No resources match that search yet.</p>
      )}
    </div>
  );
}
