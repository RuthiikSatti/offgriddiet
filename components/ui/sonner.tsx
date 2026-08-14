"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "rounded-md border border-line bg-paper text-ink shadow-soft font-sans",
          title: "font-medium text-ink",
          description: "text-bark",
        },
      }}
    />
  );
}
