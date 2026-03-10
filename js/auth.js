
// Authentication 


document.addEventListener('DOMContentLoaded', function () {

    // Attach login handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Attach register handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});



// LOGIN

async function handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    const button = document.getElementById('loginBtn');

    try {
        button.disabled = true;
        button.textContent = 'Signing In...';

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = '/dashboard';
        } else {
            showAlert(result.message || 'Login failed', 'error');
        }

    } catch (error) {
        showAlert('Network error. Try again.', 'error');
    } finally {
        button.disabled = false;
        button.textContent = 'Sign In';
    }
}



// REGISTER

async function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const registerData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    const button = document.getElementById('registerBtn');

    try {
        button.disabled = true;
        button.textContent = 'Creating Account...';

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData)
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = '/dashboard';
        } else {
            showAlert(result.message || 'Registration failed', 'error');
        }

    } catch (error) {
        showAlert('Network error. Try again.', 'error');
    } finally {
        button.disabled = false;
        button.textContent = 'Create Account';
    }
}



// ALERT

function showAlert(message, type) {
    const container = document.getElementById('alertContainer');
    if (!container) return;

    const alertClass =
        type === 'success'
            ? 'bg-green-100 border-green-400 text-green-700'
            : 'bg-red-100 border-red-400 text-red-700';

    container.innerHTML = `
        <div class="${alertClass} border px-4 py-3 rounded-lg mb-4">
            <p class="text-sm">${message}</p>
        </div>
    `;

    setTimeout(() => container.innerHTML = '', 4000);
}


// LOGOUT 

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}
