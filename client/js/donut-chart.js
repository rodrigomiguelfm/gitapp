/* global Chart */

import { getRandom } from './utils.js';

function init(labels, data) {
    const colors = data.map(() => {
        return (
            'rgb(' + getRandom() + ',' + getRandom() + ',' + getRandom() + ')'
        );
    });
    const ctx = document.getElementById('month_expenses');

    new Chart(ctx, {
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
