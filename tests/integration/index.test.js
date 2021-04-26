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
    const body = await req.json();

    expect(req.status).toBe(200);
    expect(body.movements.length).toBe(0);
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
    const body = await req.json();

    expect(req.status).toBe(200);
    expect(body.movements.length).toBe(1);
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
    const body = await req.json();

    expect(req.status).toBe(200);
    expect(body.movements.length).toBe(1);
    expect(firstMovement.id).toBe(body.movements[0].id);
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
    const body = await req.json();

    expect(req.status).toBe(200);
    expect(body.movements.length).toBe(2);
});

test('Crear movimiento por api', async () => {
    const movementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    const URL = `${baseURL}/movements`;
    const req = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movementData),
    });
    const movements = await MovementModel.getAll();

    expect(req.status).toBe(201);
    expect(movements.rows.length).toBe(1);
    expect(movements.rows[0].amount).toBe(movementData.amount);
    expect(movements.rows[0].type).toBe(movementData.type);
    expect(movements.rows[0].category).toBe(movementData.category);
});
