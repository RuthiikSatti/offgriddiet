"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sprout, Check } from "lucide-react";
import { toast } from "sonner";
import { subscribeSchema, type SubscribeValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  source?: string;
  /** "light" for use on dark/forest backgrounds. */
  variant?: "default" | "light";
  className?: string;
  cta?: string;
};

export function WaitlistForm({
  source = "unknown",
  variant = "default",
  className,
  cta = "Join the waitlist",
}: Props) {
  const [done, setDone] = useState(false);
  const light = variant === "light";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { source },
  });

  async function onSubmit(values: SubscribeValues) {
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");
      setDone(true);
      toast.success("Seed planted! Your first harvest lands soon 🌱");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not sign up — please retry."
      );
    }
  }

  if (done) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border px-5 py-4",
          light
            ? "border-cream/20 bg-cream/10 text-cream"
            : "border-sprout/40 bg-sprout/10 text-forest",
          className
        )}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sprout text-forest-900">
          <Check className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold">You&apos;re in the seed bank.</p>
          <p className={cn("text-sm", light ? "text-cream/70" : "text-stone")}>
            Watch for your first Harvest — a fresh gardening read — this week.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("w-full", className)}
      noValidate
    >
      <div className="flex flex-col gap-2.5 sm:flex-row">
        {/* Honeypot (hidden from users) */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          {...register("company")}
        />
        <input type="hidden" {...register("source")} />

        <div className="relative flex-1">
          <Sprout
            className={cn(
              "pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2",
              light ? "text-cream/60" : "text-sprout"
            )}
          />
          <input
            type="email"
            placeholder="you@email.com"
            aria-label="Email address"
            className={cn(
              "h-12 w-full rounded-lg border pl-11 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-ring",
              light
                ? "border-cream/25 bg-cream/10 text-cream placeholder:text-cream/50"
                : "border-input bg-white text-ink placeholder:text-stone"
            )}
            {...register("email")}
          />
        </div>
        <Button
          type="submit"
          variant={light ? "sprout" : "forest"}
          size="lg"
          disabled={isSubmitting}
          className="shrink-0"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Joining…" : cta}
        </Button>
      </div>
      {errors.email && (
        <p
          className={cn(
            "mt-2 text-sm",
            light ? "text-sun" : "text-red-600"
          )}
        >
          {errors.email.message}
        </p>
      )}
      <p
        className={cn(
          "mt-2 text-xs",
          light ? "text-cream/60" : "text-stone"
        )}
      >
        No weeds — just the good stuff. Unsubscribe anytime.
      </p>
    </form>
  );
}
