const { start } = require('../../server/index.js');
const MovementModel = require('../../server/models/movement.js');
const MovementType = require('../../server/models/movementType.js');

const fetch = require('node-fetch');

let server, baseURL;

beforeAll(async () => {
    server = await start();
    baseURL = `http://localhost:${server.address().port}/api/v1`;
});

afterAll(() => {
    server.close();
});

beforeEach(async () => {
    await MovementModel.Movement.sync({ force: true });
});

test('Se debería iniciar la aplicación sin movimientos', async () => {
    const URL = `${baseURL}/movements`;
    const req = await fetch(URL);
    const response = await req.json();

    expect(response.movements.length).toBe(0);
});

test('Obtener movimientos por api', async () => {
    const movementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos el movimiento
    await MovementModel.create(movementData);

    const URL = `${baseURL}/movements`;
    const req = await fetch(URL);
    const response = await req.json();

    expect(response.movements.length).toBe(1);
});

test('Buscar movimientos por api con un resultado', async () => {
    const firstMovementData = {
        date: '01/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    const secondMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos los movimientos
    const firstMovement = await MovementModel.create(firstMovementData);
    await MovementModel.create(secondMovementData);

    const URL = `${baseURL}/movements?limit=1`;
    const req = await fetch(URL);
    const response = await req.json();

    expect(response.movements.length).toBe(1);
    expect(firstMovement.id).toBe(response.movements[0].id);
});

test('Buscar movimientos por api con offset', async () => {
    const firstMovementData = {
        date: '01/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    const secondMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos los movimientos
    await MovementModel.create(firstMovementData);
    const secondMovement = await MovementModel.create(secondMovementData);

    const URL = `${baseURL}/movements?limit=1&page=2`;
    const req = await fetch(URL);
    const response = await req.json();

    expect(response.movements.length).toBe(1);
    expect(secondMovement.id).toBe(response.movements[0].id);
});

test('Buscar movimientos por api filtrando por tipo income', async () => {
    const firstMovementData = {
        date: '01/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    const secondMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos los movimientos
    await MovementModel.create(firstMovementData);
    const secondMovement = await MovementModel.create(secondMovementData);

    const URL = `${baseURL}/movements?type=${MovementType.INCOME}`;
    const req = await fetch(URL);
    const response = await req.json();

    expect(response.movements.length).toBe(1);
    expect(secondMovement.id).toBe(response.movements[0].id);
});

test('Buscar movimientos por api filtrando por tipo expense', async () => {
    const firstMovementData = {
        date: '01/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    const secondMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos los movimientos
    const firstMovement = await MovementModel.create(firstMovementData);
    await MovementModel.create(secondMovementData);

    const URL = `${baseURL}/movements?type=${MovementType.EXPENSE}`;
    const req = await fetch(URL);
    const response = await req.json();

    expect(response.movements.length).toBe(1);
    expect(firstMovement.id).toBe(response.movements[0].id);
});

test('Buscar movimientos por api filtrando por tipo inexistente', async () => {
    const firstMovementData = {
        date: '01/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    const secondMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos los movimientos
    await MovementModel.create(firstMovementData);
    await MovementModel.create(secondMovementData);

    const URL = `${baseURL}/movements?type=fake`;
    const req = await fetch(URL);
    const response = await req.json();

    expect(response.movements.length).toBe(0);
});

test('Buscar movimientos por api con más de un resultado', async () => {
    const firstMovementData = {
        date: '01/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    const secondMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos los movimientos
    await MovementModel.create(firstMovementData);
    await MovementModel.create(secondMovementData);

    const URL = `${baseURL}/movements`;
    const req = await fetch(URL);
    const response = await req.json();

    expect(response.movements.length).toBe(2);
});
