import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://acfzjkqvdakwhnhqfcxz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZnpqa3F2ZGFrd2huaHFmY3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTgxNzEsImV4cCI6MjA4NjczNDE3MX0.f_QH7X8Ao9n169bzndaI9RmnH4SqqKKKc5sE8torMjI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    }
});

export const SUPABASE_URL = supabaseUrl;
export const STORAGE_URL = `${supabaseUrl}/storage/v1/object/public`;
