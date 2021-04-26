/* global Chart */

import { getRandom } from './utils.js';

function init(labels, data, ctx) {
    const colors = data.map(() => {
        return (
            'rgb(' + getRandom() + ',' + getRandom() + ',' + getRandom() + ')'
        );
    });

    new Chart(ctx, {
        type: 'doughnut',

        options: {
            responsive: true,
            maintainAspectRatio: false
        },
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
