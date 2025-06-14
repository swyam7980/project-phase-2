function mainToggleTheme() {
  const body = document.body;
  body.classList.toggle("dark");
  body.classList.toggle("light");
}

function openAuthModal() {
  document.getElementById('main-auth-modal').style.display = 'block';
  document.getElementById('main-login-form').style.display = 'block';
  document.getElementById('main-signup-form').style.display = 'none';
  document.getElementById('authModalTitle').textContent = 'Log In';
}

function closeAuthModal() {
  document.getElementById('main-auth-modal').style.display = 'none';
}

document.getElementById('showSignup').onclick = function(e) {
  e.preventDefault();
  document.getElementById('main-login-form').style.display = 'none';
  document.getElementById('main-signup-form').style.display = 'block';
  document.getElementById('authModalTitle').textContent = 'Sign Up';
};

document.getElementById('showLogin').onclick = function(e) {
  e.preventDefault();
  document.getElementById('main-login-form').style.display = 'block';
  document.getElementById('main-signup-form').style.display = 'none';
  document.getElementById('authModalTitle').textContent = 'Log In';
};

window.onclick = function(event) {
  const modal = document.getElementById("main-auth-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function signup(username, password) {
    const users = getUsers();
    if (users.find(u => u.username === username)) {
        return { success: false, error: 'Username already exists' };
    }
    users.push({ username, password });
    saveUsers(users);
    localStorage.setItem('username', username);
    return { success: true };
}
function login(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('username', username);
        return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
}

function redirectToForum() {
    window.location.href = 'interface.html';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const result = login(username, password);
    if (result.success) {
        localStorage.setItem('username', username);
        redirectToForum();
    } else {
        showLoginError(result.error);
    }
}
function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value;
    const result = signup(username, password);
    if (result.success) {
        localStorage.setItem('username', username);
        redirectToForum();
    } else {
        showSignupError(result.error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').onsubmit = handleLogin;
    }
    if (document.getElementById('signup-form')) {
        document.getElementById('signup-form').onsubmit = handleSignup;
    }
});