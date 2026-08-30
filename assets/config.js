// Supabase Project Credentials
const SUPABASE_URL = "https://iqwknfpmwekxdpmaykse.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Q4q2sgleePgGeoevraRKTw_UqNuvhV_";

// Global Exposure
window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

// Auto Client Initialization
(function initSupabase() {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase connected successfully!");
  }
})();
