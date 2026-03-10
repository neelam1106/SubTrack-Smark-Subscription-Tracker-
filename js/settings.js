// Settings management
document.addEventListener('DOMContentLoaded', function() {

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
        return;
    }

    loadUserProfile();
    loadUserSettings();

    // Profile form submission
    document.getElementById('profileForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const profileData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email')
        };

        try {
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(profileData)
            });

            const result = await response.json();

            if (response.ok) {
                showAlert('profileAlert', 'Profile updated successfully!', 'success');
            } else {
                showAlert('profileAlert', result.message || 'Failed to update profile', 'error');
            }
        } catch (error) {
            showAlert('profileAlert', 'Network error occurred', 'error');
        }
    });

    // Settings form submission
    document.getElementById('settingsForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const settingsData = {
            emailNotifications: document.getElementById('emailNotifications').checked,
            reminderDays: parseInt(document.getElementById('reminderDays').value),
        };

        try {
            const response = await fetch('/api/user/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(settingsData)
            });

            const result = await response.json();

            if (response.ok) {
                showAlert('settingsAlert', 'Settings updated successfully!', 'success');
            } else {
                showAlert('settingsAlert', result.message || 'Failed to update settings', 'error');
            }
        } catch (error) {
            showAlert('settingsAlert', 'Network error occurred', 'error');
        }
    });
});

async function loadUserProfile() {
    try {
        const response = await fetch('/api/user/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
    }
}

async function loadUserSettings() {
    try {
        const response = await fetch('/api/user/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('emailNotifications').checked = user.settings.emailNotifications;
            document.getElementById('reminderDays').value = user.settings.reminderDays;
        }
    } catch (error) {
        console.error('Error loading user settings:', error);
    }
}

function showAlert(containerId, message, type) {
    const container = document.getElementById(containerId);
    const alertClass = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
    
    container.innerHTML = `
        <div class="${alertClass} border px-4 py-3 rounded-lg mb-4">
            ${message}
        </div>
    `;

    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}