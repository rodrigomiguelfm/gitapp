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
 * Renderiza los movimientos
 **/
function renderMovements(state) {
    render('movement-list.html', state, refs.movements);
}

function generateExpenseData(movements) {
    let labels = [];
    let data = [];

    movements.forEach((m) => {
        const month = getMonth(m.date).toString();

        if (m.type == 'expense') {
            if (labels.includes(m.category)) {
                data[labels.indexOf(m.category)] += m.amount;
            } else {
                labels.push(m.category);
                data.push(m.amount);
            }
        }
    });

    return {
        labels,
        data
    };
}

function generateBalanceData(movements) {
    let labels = [];
    let totalExpenses = [];
    let totalIncomes = [];

    movements.forEach((m) => {
        const month = getMonth(m.date).toString();

        if (!labels.includes(month)) {
            labels.push(month);
            totalIncomes.push(0);
            totalExpenses.push(0);
        }

        if (m.type == 'expense') {
            totalExpenses[labels.indexOf(month)] -= m.amount;
        } else {
            totalIncomes[labels.indexOf(month)] += m.amount;
        }
    });

    const data = [
        {
            label: 'Gastos',
            data: totalExpenses,
            borderColor: '#f14668',
            backgroundColor: '#f14668',
        },
        {
            label: 'Ingresos',
            data: totalIncomes,
            borderColor: '#48c774',
            backgroundColor: '#48c774',
        },
    ];

    return {
        labels,
        data
    }
}

/**
 * Inicializa la vista home
 **/
async function init() {
    state.movements = await getLastMovements();
    renderMovements(state);

    const balance = generateBalanceData(state.movements)
    const expense = generateExpenseData(state.movements)

    donutChart.init(expense.labels, expense.data, refs.monthExpenses);
    barChart.init(balance.labels, balance.data, refs.monthBalance);
}

init();
