import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Service-role client: bypasses Row Level Security. Server-only — never
// import this from client components or leak SUPABASE_SERVICE_ROLE_KEY
// to the browser.
//
// Built lazily (not at module load) so a missing env var only fails the
// request that needs it, instead of crashing the whole Next.js build
// during its page-data-collection step, which imports every route module.
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.'
    );
  }

  cached = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
  return cached;
}
