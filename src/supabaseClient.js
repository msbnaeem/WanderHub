import { createClient } from '@supabase/supabase-js';

// In Vite, we use import.meta.env instead of process.env
const URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_KEY;

// console.log("Supabase URL:", URL); 
// console.log("Supabase Key:", API_KEY);

export const supabase = createClient(URL, API_KEY);