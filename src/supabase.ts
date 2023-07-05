import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;
// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Table = 'projects' | 'kanbanBoards' | 'tickets' | 'comments';

export const supabaseRoot = (table: Table) => {
	return supabase.from(table);
};
