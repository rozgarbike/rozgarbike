// Supabase Auth and Global Utility Functions

// 1. Requirement & Session Check (Updated with Error Handling)
async function requireSession(adminOnly = false) {
  if (!window.supabaseClient) {
    console.error("Supabase client is not initialized.");
    return null;
  }

  const { data: { session }, error } = await supabaseClient.auth.getSession();

  if (error || !session) {
    window.location.href = "index.html";
    return null;
  }

  // User Profile fetch (using maybeSingle to prevent crash)
  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .maybeSingle();

  // Agar profile table mein na mile to basic fallback object banayein
  const userProfile = profile || {
    id: session.user.id,
    full_name: session.user.user_metadata?.full_name || "Investor",
    role: "admin", // Admin access granted
    referral_code: session.user.id.substring(0, 8)
  };

  if (adminOnly && userProfile.role !== "admin") {
    alert("Access denied: Admin privileges required.");
    window.location.href = "dashboard.html";
    return null;
  }

  return userProfile;
}

// 2. Direct Logout Function
async function logout() {
  try {
    if (window.supabaseClient) {
      await supabaseClient.auth.signOut();
    }
  } catch (err) {
    console.error("Signout error:", err);
  } finally {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "index.html";
  }
}

// 3. PKR Currency Formatter
function pkr(amount) {
  const num = Number(amount || 0);
  return "Rs " + num.toLocaleString("en-PK");
}

// 4. Toast Notification System
function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => {
    t.classList.remove("show");
  }, 3000);
}
