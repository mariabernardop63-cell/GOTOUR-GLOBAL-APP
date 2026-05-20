const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const urlMatch = env.match(/VITE_SUPABASE_URL=([^\n]+)/);
const anonMatch = env.match(/VITE_SUPABASE_ANON_KEY=([^\n]+)/);
const sb = createClient(urlMatch[1].trim(), anonMatch[1].trim());

async function testAuth() {
    console.log('--- Testing Non-Existent Email (SignIn) ---');
    let { data, error } = await sb.auth.signInWithPassword({ email: 'fakeuser999X1@example.com', password: 'Password123!' });
    console.log('Non-existent SignIn Error:', error?.message);

    console.log('\n--- Testing Existing Email (SignIn) ---');
    // Just testing a random likely email format or relying on the previous probe's creation
    let res2 = await sb.auth.signInWithPassword({ email: 'test@example.com', password: 'Password123!' });
    console.log('Existing SignIn Error (wrong pass):', res2.error?.message);

    // Let's test signUp for the fake one we just didn't create
    let res3 = await sb.auth.signUp({ email: 'fakeuser999X2@example.com', password: 'Password123!' });
    console.log('New SignUp Data.user.identities:', res3.data?.user?.identities?.length);
    console.log('New SignUp Error:', res3.error?.message);

    let res4 = await sb.auth.signUp({ email: 'fakeuser999X2@example.com', password: 'Password123!' });
    console.log('Repeat SignUp Data.user.identities:', res4.data?.user?.identities?.length);
    console.log('Repeat SignUp Error:', res4.error?.message);
}

testAuth();
