import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null | undefined;
let warnedMissingConfig = false;

export function getSupabaseAdminClient() {
  if (cachedClient !== undefined) return cachedClient;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    if (!warnedMissingConfig) {
      console.warn("Supabase no configurado para actividad.");
      warnedMissingConfig = true;
    }
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedClient;
}
