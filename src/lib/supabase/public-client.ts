import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co";
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "demo-key";
const supabaseFetchTimeoutMs = 4000;

export const hasSupabaseEnv =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

export const supabase = createClient(supabaseUrl, publishableKey, {
  auth: { persistSession: false },
  global: {
    fetch: async (input, init) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), supabaseFetchTimeoutMs);

      try {
        return await fetch(input, {
          ...init,
          signal: controller.signal
        });
      } finally {
        clearTimeout(timeout);
      }
    }
  }
});
