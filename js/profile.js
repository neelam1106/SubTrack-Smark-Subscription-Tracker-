// ===============================
// Profile Page Logic
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    window.location.href = '/';
    return;
  }

  // Populate text fields
  document.getElementById('firstName').value = user.firstName || '';
  document.getElementById('lastName').value = user.lastName || '';
  document.getElementById('email').value = user.email || '';

  // Load saved profile image (if exists)
  if (user.profileImage) {
    document.getElementById('profilePreview').src = user.profileImage;
  }
});


// ===============================
// Image Preview Logic
// ===============================

document.getElementById('profileImage').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {
    document.getElementById('profilePreview').src = reader.result;

    // Save image temporarily in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    user.profileImage = reader.result;
    localStorage.setItem('user', JSON.stringify(user));
  };

  reader.readAsDataURL(file);
});


// ===============================
// Update Profile (Frontend Demo)
// ===============================

document.getElementById('profileForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem('user'));

  const updatedUser = {
    ...user,
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value
  };

  localStorage.setItem('user', JSON.stringify(updatedUser));

  alert('Profile updated successfully!');
});
