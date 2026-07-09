"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast: "rounded-xl border border-border bg-white text-ink shadow-soft",
          title: "font-semibold text-forest",
          description: "text-stone",
        },
      }}
    />
  );
}
