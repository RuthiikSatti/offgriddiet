import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email"),
  // Honeypot field — real users leave this empty; bots often fill it.
  company: z.string().optional().or(z.literal("")),
  // Optional: where on the page they signed up (for your own analytics).
  source: z.string().optional().or(z.literal("")),
});

export type SubscribeValues = z.infer<typeof subscribeSchema>;
