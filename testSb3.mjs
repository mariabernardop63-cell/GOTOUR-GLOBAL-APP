import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

let envContent = fs.readFileSync('c:\\Users\\MY PC\\OneDrive\\Desktop\\New folder\\.env', 'utf8');
const urlMatch = envContent.match(/VITE_SUPABASE_URL=([^\n\r]+)/);
const anonMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=([^\n\r]+)/);
const sb = createClient(urlMatch[1].trim(), anonMatch[1].trim());

async function run() {
    const { data, error } = await sb.auth.signInWithOtp({
        email: 'thisemaildefinitelydoesnotexist@gotour.com',
        options: { shouldCreateUser: false }
    });
    console.log('Result for non-existent:', error?.message);
}
run();
