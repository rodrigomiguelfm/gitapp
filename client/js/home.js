import { getRefs, render } from './render.js';
import movementService from './movement-service.js';
import donutChart from './donut-chart.js';

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
    let labels = [];
    let data = [];

    state.movements = await getLastMovements();
    renderMovements(state);

    state.movements.forEach((m) => {
        if (m.type == 'expense') {
            if (labels.includes(m.category)) {
                data[labels.indexOf(m.category)] += m.amount;
            } else {
                labels.push(m.category);
                data.push(m.amount);
            }
        }
    });
    donutChart.init(labels, data);
}

init();
