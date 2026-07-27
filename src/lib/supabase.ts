import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Public anon-key client. Safe to import from client components.
//
// Built lazily (not at module load) so a missing env var only fails the
// request that needs it, instead of crashing the whole Next.js build
// during its page-data-collection step, which imports every route module.
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
    );
  }

  cached = createClient(supabaseUrl, supabaseAnonKey);
  return cached;
}
