import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env manually
const envPath = './.env';
let envContent = '';
try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
    console.error('No .env file found');
    process.exit(1);
}

const urlMatch = envContent.match(/VITE_SUPABASE_URL=([^\n\r]+)/);
const anonMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=([^\n\r]+)/);

if (!urlMatch || !anonMatch) {
    console.error('Supabase vars not found');
    process.exit(1);
}

const supabase = createClient(urlMatch[1].trim(), anonMatch[1].trim());

async function testExistence(email) {
    console.log(`\n--- Testing ${email} ---`);
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: false,
        },
    });
    console.log('Error:', error?.message || 'None');
    console.log('Data:', data);
}

async function run() {
    await testExistence('doesnotexist_abc123456@test.com');
    // I will test with an email that might exist, or just see the error.
    // We can use the user's testing email if we knew it.
}

run();
