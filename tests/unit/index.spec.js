const MovementModel = require('../../server/models/movement.js');
const MovementType = require('../../server/models/movementType.js');

const { monefy } = require('../../client/js/utils.js');

test('Should convert 1000 into "1.000"', async () => {
    expect(monefy(1000)).toBe('1.000');
});

test('Should convert 100 into "100"', async () => {
    expect(monefy(100)).toBe('100');
});

test('Should convert undefined into ""', async () => {
    expect(monefy(undefined)).toBe('');
});

beforeEach(async () => {
    await MovementModel.Movement.sync({ force: true });
});

test('Crear movimiento', async () => {
    const movementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos el movimiento
    const movement = await MovementModel.create(movementData);

    expect(new Date(movement.date)).toStrictEqual(new Date(movementData.date));
    expect(movement.amount).toBe(movementData.amount);
    expect(movement.type).toBe(movementData.type);
    expect(movement.category).toBe(movementData.category);
});

test('Crear movimiento sin tipo', async () => {
    const movementData = {
        date: '01/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    // Creamos el movimiento
    const movement = await MovementModel.create(movementData);

    expect(new Date(movement.date)).toStrictEqual(new Date(movementData.date));
    expect(movement.amount).toBe(movementData.amount);
    expect(movement.type).toBe(MovementType.EXPENSE);
    expect(movement.category).toBe(movementData.category);
});

test('Crear movimiento sin fecha', async () => {
    const movementData = {
        amount: 1000.0,
        category: 'Supermercado',
    };

    try {
        await MovementModel.create(movementData);
    } catch (e) {
        expect(e.name).toBe('SequelizeDatabaseError');
    }
});
