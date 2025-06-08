function mainToggleTheme() {
  const body = document.body;
  body.classList.toggle("dark");
  body.classList.toggle("light");
}

// Open the unified auth modal
function openAuthModal() {
  document.getElementById('main-auth-modal').style.display = 'block';
  document.getElementById('main-login-form').style.display = 'block';
  document.getElementById('main-signup-form').style.display = 'none';
  document.getElementById('authModalTitle').textContent = 'Log In';
}

// Close the unified auth modal
function closeAuthModal() {
  document.getElementById('main-auth-modal').style.display = 'none';
}

// Switch to signup form
document.getElementById('showSignup').onclick = function(e) {
  e.preventDefault();
  document.getElementById('main-login-form').style.display = 'none';
  document.getElementById('main-signup-form').style.display = 'block';
  document.getElementById('authModalTitle').textContent = 'Sign Up';
};

// Switch to login form
document.getElementById('showLogin').onclick = function(e) {
  e.preventDefault();
  document.getElementById('main-login-form').style.display = 'block';
  document.getElementById('main-signup-form').style.display = 'none';
  document.getElementById('authModalTitle').textContent = 'Log In';
};

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById("main-auth-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Prevent form submission (demo only)
document.getElementById('main-login-form').onsubmit = e => e.preventDefault();
document.getElementById('main-signup-form').onsubmit = e => e.preventDefault();