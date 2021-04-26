/* global Chart */

function init(labels, data) {
    const ctx = document.getElementById('month_balance');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: data,
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        },
    });
}

export default {
    init,
};
