// Supabase Auth and Global Utility Functions

// 1. Requirement & Session Check
async function requireSession(adminOnly = false) {
  if (!supabaseClient) {
    console.error("Supabase client is not initialized.");
    return null;
  }

  const { data: { session }, error } = await supabaseClient.auth.getSession();

  if (error || !session) {
    window.location.href = "index.html";
    return null;
  }

  // User Profile fetch karein
  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (profileError || !profile) {
    console.error("Profile load error:", profileError);
    return null;
  }

  // Agar admin page hai aur user admin nahi hai
  if (adminOnly && profile.role !== "admin") {
    alert("Access denied: Admin privileges required.");
    window.location.href = "dashboard.html";
    return null;
  }

  return profile;
}

// 2. Fixed Logout Function
async function logout() {
  try {
    if (window.supabaseClient) {
      await supabaseClient.auth.signOut();
    }
  } catch (err) {
    console.error("Signout error:", err);
  } finally {
    // Local storage aur Session storage saaf karke login page par bhej dein
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
