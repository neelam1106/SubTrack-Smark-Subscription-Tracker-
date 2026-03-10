
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
        return;
    }

    loadDashboardData();
});


async function loadDashboardData() {
    try {
        const response = await fetch('/api/subscriptions', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const subscriptions = await response.json();
            calculateAnalytics(subscriptions);
            displaySubscriptions(subscriptions);
        }
    } catch (error) {
        console.error('Dashboard load error:', error);
    }
}


// ANALYTICS CALCULATION 

function calculateAnalytics(subscriptions) {
    let monthlyTotal = 0;
    let yearlyTotal = 0;
    let activeCount = 0;

    const today = moment();

    subscriptions.forEach(sub => {
        const renewalDate = moment(sub.renewalDate);
        const daysAfterExpiry = today.diff(renewalDate, 'days');

        // 🔹 Status handling
        if (renewalDate.isBefore(today)) {
            if (daysAfterExpiry <= 3) {
                sub.status = 'grace'; // within 3-day grace
            } else {
                sub.status = 'expired'; // should be auto-deleted later (backend)
            }
        } else {
            sub.status = 'active';
        }

        //  Do not count expired subscriptions
        if (sub.status === 'expired') return;

        activeCount++;

        //   CALCULATION
        if (sub.frequency === 'Monthly') {
            monthlyTotal += sub.price;
        }

        if (sub.frequency === 'Yearly') {
            yearlyTotal += sub.price;
        }
    });

    document.getElementById('monthlyTotal').textContent = `₹${monthlyTotal.toFixed(2)}`;
    document.getElementById('yearlyTotal').textContent = `₹${yearlyTotal.toFixed(2)}`;
    document.getElementById('totalSubscriptions').textContent = activeCount;
}



// DISPLAY SUBSCRIPTIONS

function displaySubscriptions(subscriptions) {
    const container = document.getElementById('subscriptionsList');

    if (!subscriptions || subscriptions.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-credit-card text-gray-300 text-6xl mb-4"></i>
                <h3 class="text-lg font-medium text-gray-800 mb-2">No subscriptions yet</h3>
                <p class="text-gray-600 mb-4">Start tracking your subscriptions.</p>
                <a href="/add-subscription" class="bg-blue-500 text-white px-6 py-2 rounded-lg">
                    Add Subscription
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = subscriptions.map(subscription => {
        const renewalDate = moment(subscription.renewalDate);
        const today = moment();
        const daysDiff = renewalDate.diff(today, 'days');

        let statusText = 'Active';
        let statusColor = 'text-green-600';

        if (subscription.status === 'grace') {
            statusText = 'Expired (Grace Period)';
            statusColor = 'text-orange-500';
        }

        if (subscription.status === 'expired') {
            statusText = 'Expired';
            statusColor = 'text-red-600';
        }

        const categoryIcons = {
            Education: 'fa-graduation-cap',
            Streaming: 'fa-play-circle',
            TV: 'fa-tv',
            Entertainment: 'fa-gamepad',
            Music: 'fa-music',
            Others: 'fa-star'
        };

        const urgencyClass =
            daysDiff <= 3 ? 'text-red-500' :
            daysDiff <= 7 ? 'text-yellow-500' :
            'text-green-500';

        return `
            <div class="border rounded-lg p-6 ${subscription.status === 'expired' ? 'opacity-60' : ''}">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold">${subscription.name}</h3>
                        <p class="text-sm text-gray-500">${subscription.category}</p>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                            <div>
                                <p class="text-gray-500">Price</p>
                                <p class="font-semibold">₹${subscription.price}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">Frequency</p>
                                <p class="font-semibold">${subscription.frequency}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">Renewal</p>
                                <p class="font-semibold">${renewalDate.format('DD MMM YYYY')}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">Status</p>
                                <p class="font-semibold ${statusColor}">${statusText}</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <button onclick="editSubscription('${subscription._id}')" class="text-blue-600">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteSubscription('${subscription._id}')" class="text-red-600">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}



function editSubscription(id) {
    window.location.href = `/edit-subscription?id=${id}`;
}

async function deleteSubscription(id) {
    if (!confirm('Delete this subscription?')) return;

    try {
        const response = await fetch(`/api/subscriptions/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            loadDashboardData();
        } else {
            alert('Delete failed');
        }
    } catch (err) {
        alert('Error deleting subscription');
    }
}
