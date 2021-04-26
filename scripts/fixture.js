const MovementModel = require('../server/models/movement.js');

const MovementType = require('../server/models/movementType.js');

const init = () => {
    return MovementModel.Movement.sync({ force: true })
        .then(() =>
            MovementModel.create({
                date: '01/01/2021',
                amount: 1000.0,
                category: 'Supermercado',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '04/01/2021',
                amount: 587.5,
                category: 'Librería',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '04/01/2021',
                amount: 50000.0,
                type: MovementType.INCOME,
                category: 'Sueldo',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '04/01/2021',
                amount: 233.0,
                category: 'Supermercado',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '05/01/2021',
                amount: 10000.0,
                type: MovementType.INCOME,
                category: 'Plazo Fijo',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '07/01/2021',
                amount: 847.0,
                category: 'Supermercado',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '08/01/2021',
                amount: 751.0,
                category: 'Supermercado',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '10/01/2021',
                amount: 2500.0,
                category: 'Reparación Celular',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '14/01/2021',
                amount: 1432.0,
                category: 'Supermercado',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '15/01/2021',
                amount: 2300.0,
                category: 'Librería',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '20/01/2021',
                amount: 4877.0,
                category: 'Regalos',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '21/01/2021',
                amount: 2900.0,
                category: 'Regalos',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '04/02/2021',
                amount: 50000.0,
                type: MovementType.INCOME,
                category: 'Sueldo',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '05/02/2021',
                amount: 11000.0,
                type: MovementType.INCOME,
                category: 'Plazo Fijo',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '07/02/2021',
                amount: 2100.0,
                category: 'Supermercado',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '08/02/2021',
                amount: 876.0,
                category: 'Supermercado',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '10/02/2021',
                amount: 1398.0,
                category: 'Supermercado',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '15/02/2021',
                amount: 3456.0,
                category: 'Supermercado',
            })
        )
        .then(() =>
            MovementModel.create({
                date: '20/02/2021',
                amount: 1498.0,
                category: 'Supermercado',
            })
        );
};

if (require.main === module) {
    init();
}

module.exports = {
    init,
};
