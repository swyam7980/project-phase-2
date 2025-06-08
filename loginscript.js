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
document.getElementById('main-login-form').onsubmit = async function(e) {
  e.preventDefault();
  const username = document.getElementById('main-username').value.trim();
  const password = document.getElementById('main-password').value;
  const loginBtn = this.querySelector('button[type="submit"]');
  loginBtn.disabled = true;
  loginBtn.textContent = 'Logging in...';
  try {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('username', username);
      loginBtn.textContent = 'Success! Redirecting...';
      setTimeout(() => { window.location.href = 'interface.html'; }, 700);
    } else {
      alert(data.error || 'Login failed');
      loginBtn.textContent = 'Login';
      loginBtn.disabled = false;
    }
  } catch (err) {
    alert('Network error');
    loginBtn.textContent = 'Login';
    loginBtn.disabled = false;
  }
};

document.getElementById('main-signup-form').onsubmit = async function(e) {
  e.preventDefault();
  const username = document.getElementById('main-new-username').value.trim();
  const password = document.getElementById('main-new-password').value;
  const confirm = document.getElementById('main-confirm-password').value;
  const signupBtn = this.querySelector('button[type="submit"]');
  signupBtn.disabled = true;
  signupBtn.textContent = 'Signing up...';
  if (password !== confirm) {
    alert('Passwords do not match');
    signupBtn.textContent = 'Sign Up';
    signupBtn.disabled = false;
    return;
  }
  try {
    const res = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      alert('Signup successful! Please log in.');
      document.getElementById('main-login-form').style.display = 'block';
      document.getElementById('main-signup-form').style.display = 'none';
      document.getElementById('authModalTitle').textContent = 'Log In';
    } else {
      alert(data.error || 'Signup failed');
    }
    signupBtn.textContent = 'Sign Up';
    signupBtn.disabled = false;
  } catch (err) {
    alert('Network error');
    signupBtn.textContent = 'Sign Up';
    signupBtn.disabled = false;
  }
};