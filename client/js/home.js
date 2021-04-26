import { getRefs, render } from './render.js';
import movementService from './movement-service.js';

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

/**
 * Inicializa la vista home
 **/
async function init() {
    state.movements = await getLastMovements();
    renderMovements(state);
}

init();
