import { getRefs, render } from './render.js';
import movementService from './movement-service.js';

let state = {
    movements: [],
    movement: {},
    hasEdit: true
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


// Event Listeners

/**
 * Agrega un movimiento a edicion
 **/
window.editMovement = function (movement) {
    state.movement = movement;
    render('movement-form.html', state, refs.form);
};

/**
 * Cancela una edicion o creación
 **/
window.onCancel = function () {
    state.movement = {};
    render('movement-form.html', state, refs.form);
};

/**
 * Elimina un movimiento
 **/
window.onRemove = async function () {
    await movementService.update(state.movement);
    state.movement = {};
    render('movement-form.html', state, refs.form);
};

/**
 * Guarda un movimiento
 **/
window.onSave = async function (e) {
    e.stopPropagation();
    e.preventDefault();

    if (state.movement.id) {
        await movementService.update(state.movement);
    } else {
        await movementService.create(state.movement);
    }

    state.movement = {};
    render('movement-form.html', state, refs.form);
};

init();
