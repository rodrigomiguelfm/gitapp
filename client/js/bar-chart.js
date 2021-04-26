function init(labels, data, ctx) {
    new window.Chart(ctx, {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false
        },
        data: {
            labels: labels,
            datasets: data,
        }
    });
}

export default {
    init,
};
