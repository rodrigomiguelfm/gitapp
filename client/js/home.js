import { getRefs, render } from './render.js';
import { getMonth } from './utils.js';
import movementService from './movement-service.js';
import donutChart from './donut-chart.js';
import barChart from './bar-chart.js';

let state = {
    movements: [],
};

let refs = getRefs(document.body);

/**
 * Obtiene todos los ultimos movimientos disponibles
 **/
async function getLastMovements() {
    return movementService.getLast();
}

/**
 * Renderiza los libros
 **/
function renderMovements(state) {
    render('movement-list.html', state, refs.movements);
}

/**
 * Inicializa la vista home
 **/
async function init() {
    let donutLabels = [];
    let donutData = [];
    let barLabels = [];
    let totalExpenses = [];
    let totalIncomes = [];

    state.movements = await getLastMovements();
    renderMovements(state);

    state.movements.forEach((m) => {
        const month = getMonth(m.date).toString();

        if (!barLabels.includes(month)) {
            barLabels.push(month);
            totalIncomes.push(0);
            totalExpenses.push(0);
        }

        if (m.type == 'expense') {
            if (donutLabels.includes(m.category)) {
                donutData[donutLabels.indexOf(m.category)] += m.amount;
            } else {
                donutLabels.push(m.category);
                donutData.push(m.amount);
            }

            totalExpenses[barLabels.indexOf(month)] -= m.amount;
        } else totalIncomes[barLabels.indexOf(month)] += m.amount;
    });

    const barData = [
        {
            label: 'Gastos',
            data: totalExpenses,
            borderColor: 'red',
            backgroundColor: 'red',
        },
        {
            label: 'Ingresos',
            data: totalIncomes,
            borderColor: 'green',
            backgroundColor: 'green',
        },
    ];

    console.log(barData);

    donutChart.init(donutLabels, donutData);
    barChart.init(barLabels, barData);
}

init();
