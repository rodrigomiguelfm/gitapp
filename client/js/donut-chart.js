import { getRandom } from './utils.js';

function init(labels, data) {
    const colors = data.map((item) => {
        return (
            'rgb(' + getRandom() + ',' + getRandom() + ',' + getRandom() + ')'
        );
    });
    const ctx = document.getElementById('month_expenses');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors,
                    hoverOffset: 4,
                },
            ],
        },
    });
}

export default {
    init,
};
