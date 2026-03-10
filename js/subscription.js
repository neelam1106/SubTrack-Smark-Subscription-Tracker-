// Subscription management JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
        return;
    }

    // Handle Add Subscription form
    const subscriptionForm = document.getElementById('subscriptionForm');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', handleAddSubscription);
    }

    // Handle Edit Subscription form
    const editSubscriptionForm = document.getElementById('editSubscriptionForm');
    if (editSubscriptionForm) {
        loadSubscriptionForEdit();
        editSubscriptionForm.addEventListener('submit', handleEditSubscription);
    }

    // Set minimum date to today
    const dateInput = document.getElementById('renewalDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Auto update renewal date when frequency changes
    const frequencySelect = document.getElementById('frequency');
    const renewalInput = document.getElementById('renewalDate');

    if (frequencySelect && renewalInput) {
        frequencySelect.addEventListener('change', () => {
            if (!renewalInput.value) return;

            renewalInput.value = calculateNextRenewalDate(
                renewalInput.value,
                frequencySelect.value
            );
        });
    }
});

/* -----------------------------
   Helper: Calculate Renewal Date
------------------------------ */
function calculateNextRenewalDate(startDate, frequency) {
    const date = new Date(startDate);

    switch (frequency) {
        case 'Monthly':
            date.setMonth(date.getMonth() + 1);
            break;
        case 'Quarterly':
            date.setMonth(date.getMonth() + 3);
            break;
        case 'Yearly':
            date.setFullYear(date.getFullYear() + 1);
            break;
    }

    return date.toISOString().split('T')[0];
}

/* -----------------------------
   Add Subscription
------------------------------ */
async function handleAddSubscription(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const subscriptionData = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        renewalDate: formData.get('renewalDate'),
        frequency: formData.get('frequency')
    };

    const allowedFrequencies = ['Monthly', 'Quarterly', 'Yearly'];
    if (!allowedFrequencies.includes(subscriptionData.frequency)) {
        showAlert('Invalid billing frequency selected', 'error');
        return;
    }

    try {
        const response = await fetch('/api/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(subscriptionData)
        });

        const result = await response.json();

        if (response.ok) {
            showAlert('Subscription added successfully!', 'success');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } else {
            showAlert(result.message || 'Failed to add subscription', 'error');
        }
    } catch (error) {
        showAlert('Network error occurred', 'error');
    }
}

/* -----------------------------
   Load Subscription for Edit
------------------------------ */
async function loadSubscriptionForEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const subscriptionId = urlParams.get('id');

    if (!subscriptionId) {
        window.location.href = '/dashboard';
        return;
    }

    try {
        const response = await fetch('/api/subscriptions', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const subscriptions = await response.json();
            const subscription = subscriptions.find(sub => sub._id === subscriptionId);

            if (!subscription) {
                window.location.href = '/dashboard';
                return;
            }

            document.getElementById('name').value = subscription.name;
            document.getElementById('category').value = subscription.category;
            document.getElementById('price').value = subscription.price;
            document.getElementById('frequency').value = subscription.frequency;

            const renewalDate = new Date(subscription.renewalDate);
            document.getElementById('renewalDate').value =
                renewalDate.toISOString().split('T')[0];

            document
                .getElementById('editSubscriptionForm')
                .dataset.subscriptionId = subscriptionId;
        }
    } catch (error) {
        console.error('Error loading subscription:', error);
        window.location.href = '/dashboard';
    }
}

/* -----------------------------
   Edit Subscription
------------------------------ */
async function handleEditSubscription(e) {
    e.preventDefault();

    const subscriptionId = e.target.dataset.subscriptionId;
    const formData = new FormData(e.target);

    const subscriptionData = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        renewalDate: formData.get('renewalDate'),
        frequency: formData.get('frequency')
    };

    const allowedFrequencies = ['Monthly', 'Quarterly', 'Yearly'];
    if (!allowedFrequencies.includes(subscriptionData.frequency)) {
        showAlert('Invalid billing frequency selected', 'error');
        return;
    }

    try {
        const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(subscriptionData)
        });

        const result = await response.json();

        if (response.ok) {
            showAlert('Subscription updated successfully!', 'success');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } else {
            showAlert(result.message || 'Failed to update subscription', 'error');
        }
    } catch (error) {
        showAlert('Network error occurred', 'error');
    }
}

/* -----------------------------
   Alert UI
------------------------------ */
function showAlert(message, type) {
    const container = document.getElementById('alertContainer');
    if (!container) return;

    const alertClass =
        type === 'success'
            ? 'bg-green-100 border-green-400 text-green-700'
            : 'bg-red-100 border-red-400 text-red-700';

    container.innerHTML = `
        <div class="${alertClass} border px-4 py-3 rounded-lg mb-4">
            <div class="flex">
                <div class="flex-shrink-0">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                </div>
                <div class="ml-3">
                    <p class="text-sm">${message}</p>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}  