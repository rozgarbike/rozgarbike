function pkr(n) {
  return "Rs " + Math.round(n).toLocaleString("en-PK");
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.style.display = "block";
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => (el.style.display = "none"), 2400);
}

function gaugeSVG(pct, size = 90, tone = "#E8A33D") {
  const clamped = Math.max(0, Math.min(100, pct));
  const r = size / 2 - 9;
  const cx = size / 2, cy = size / 2;
  const startAngle = 210, sweep = 240;
  const toXY = (deg) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const angle = (d) => startAngle + (sweep * d) / 100;
  const arcPath = (fromPct, toPct) => {
    const [x1, y1] = toXY(angle(fromPct));
    const [x2, y2] = toXY(angle(toPct));
    const large = toPct - fromPct > 50 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  const [nx, ny] = toXY(angle(clamped) - 0.001);
  return `
    <svg width="${size}" height="${size * 0.8}" viewBox="0 0 ${size} ${size}">
      <path d="${arcPath(0, 100)}" stroke="#DCD5C4" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="${arcPath(0, clamped)}" stroke="${tone}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="#1B2420" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="4" fill="#1B2420"/>
      <text x="${cx}" y="${cy + r + 14}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="13" font-weight="600" fill="#1B2420">${Math.round(clamped)}%</text>
    </svg>`;
}

async function requireSession(requireAdmin = false) {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    window.location.href = "index.html";
    return null;
  }
  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();
  if (error || !profile) {
    window.location.href = "index.html";
    return null;
  }
  if (requireAdmin && profile.role !== "admin") {
    document.body.innerHTML = "<div class='wrap'><p>This page is admin-only.</p><a href='dashboard.html'>Go to your dashboard</a></div>";
    return null;
  }
  return profile;
}

function getReferralCodeFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("ref");
}
