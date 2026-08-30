// Supabase Configuration
const SUPABASE_URL = "YOUR_SUPABASE_URL"; // Example: https://xyz.supabase.co
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // Example: eyJhbGciOiJIUzI1NiI...

// Initialize Supabase Client
if (typeof supabase !== 'undefined') {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error("Supabase SDK not loaded. Make sure the CDN script is included before config.js");
}
