import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Public anon-key client. Safe to import from client components.
//
// Built lazily (not at module load) so a missing env var only fails the
// request that needs it, rather than surfacing as a confusing error the
// moment any module happens to import this file.
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables.'
    );
  }

  cached = createClient(supabaseUrl, supabaseAnonKey);
  return cached;
}
