// src/routes/+layout.ts
import type { Database } from '$lib/database.types'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient<Database>({
    supabaseUrl: supabaseUrl,
    supabaseKey: supabaseAnonKey,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}