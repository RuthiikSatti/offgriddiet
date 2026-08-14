"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { subscribeSchema, type SubscribeValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Email capture for the weekly letter.
 *
 * There is no product and no waitlist behind this — don't reintroduce that
 * framing. The POST target, schema, honeypot and provider plumbing are
 * unchanged from the original implementation.
 */

type Props = {
  source?: string;
  className?: string;
  cta?: string;
  /** Stack the field above the button — for narrow columns like the footer. */
  stacked?: boolean;
};

export function FollowForm({
  source = "unknown",
  className,
  cta = "Subscribe",
  stacked = false,
}: Props) {
  const [done, setDone] = useState(false);

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
      toast.success("You're subscribed. First letter lands this week.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not subscribe — please retry."
      );
    }
  }

  if (done) {
    return (
      <div
        className={cn("flex items-start gap-3", className)}
        role="status"
        data-follow-form
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf text-paper">
          <Check className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="font-medium text-ink">You&apos;re subscribed.</p>
          <p className="mt-1 text-sm text-bark">
            First letter lands this week. Reply to any issue — we read them.
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
      data-follow-form
    >
      <div className={cn("flex gap-2.5", stacked ? "flex-col" : "flex-col sm:flex-row")}>
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

        <input
          type="email"
          placeholder="you@email.com"
          aria-label="Email address"
          aria-invalid={errors.email ? "true" : "false"}
          className={cn(
            "h-11 flex-1 rounded-md border bg-paper px-3.5 text-sm text-ink outline-none transition-colors",
            "placeholder:text-bark/70 focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
            errors.email ? "border-beet" : "border-line hover:border-ink/30"
          )}
          {...register("email")}
        />

        <Button type="submit" variant="solid" disabled={isSubmitting} className="shrink-0">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Subscribing…" : cta}
        </Button>
      </div>

      {errors.email && (
        <p className="mt-2 text-sm text-beet">{errors.email.message}</p>
      )}
      <p className="mt-2.5 text-xs text-bark">
        One email a week. Unsubscribe in a click.
      </p>
    </form>
  );
}
