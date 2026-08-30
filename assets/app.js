let isSignUpMode = true;

function toggleAuthMode() {
  isSignUpMode = !isSignUpMode;
  const title = document.getElementById("authTitle");
  const fullNameGroup = document.getElementById("fullNameGroup");
  const mainBtn = document.getElementById("mainAuthBtn");
  const toggleBtn = document.getElementById("toggleAuthBtn");
  const msg = document.getElementById("authMsg");

  if (msg) msg.textContent = "";

  if (isSignUpMode) {
    if (title) title.textContent = "SIGN UP";
    if (fullNameGroup) fullNameGroup.style.display = "block";
    if (mainBtn) mainBtn.textContent = "Create account";
    if (toggleBtn) toggleBtn.textContent = "Log in instead";
  } else {
    if (title) title.textContent = "LOG IN";
    if (fullNameGroup) fullNameGroup.style.display = "none";
    if (mainBtn) mainBtn.textContent = "Log In";
    if (toggleBtn) toggleBtn.textContent = "Create an account instead";
  }
}

async function handleAuth() {
  if (isSignUpMode) {
    await doSignUp();
  } else {
    await doSignIn();
  }
}
