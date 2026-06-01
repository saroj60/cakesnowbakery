import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hqiiodgbrajwzbqfvfrx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_r4RUixrVRBhXYP9EMzcGjA_XIn9W15g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
