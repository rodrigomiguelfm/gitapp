import { getRefs, addListeners, render } from './render.js';
import movementService from './movement-service.js';

let state = {
    movements: [],
    movement: {}
};

let refs = getRefs(document.body);

/**
 * Obtiene todos los ultimos movimientos disponibles
 **/
async function getIncomes() {
    return movementService.getIncomes();
}

/**
 * Renderiza los libros
 **/
function renderIncomes(state) {
    render('movement-list.html', state, refs.incomes);
}

/**
 * Inicializa la vista income
 **/
async function init() {
    state.movements = await getIncomes();
    renderIncomes(state);
}


init();
