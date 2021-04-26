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
        );
};

if (require.main === module) {
    init();
}

module.exports = {
    init,
};
