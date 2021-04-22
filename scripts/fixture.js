const MovementModel = require('../server/models/movement.js');

const MovementType = require('../server/models/movementType.js');


const init = () => {
    return MovementModel.Movement.sync({ force: true })
        .then(() =>
            MovementModel.Movement.create({
                date: '01/01/2021',
                amount: 1000.00,
                type: MovementType.EXPENSE,
                category: 'Supermercado'
            })
        )
        .then(() =>
            MovementModel.Movement.create({
                date: '04/01/2021',
                amount: 587.50,
                type: MovementType.EXPENSE,
                category: 'Librería'
            })
        )
        .then(() =>
            MovementModel.Movement.create({
                date: '04/01/2021',
                amount: 50000.00,
                type: MovementType.INCOME,
                category: 'Sueldo'
            })
        )
        .then(() =>
            MovementModel.Movement.create({
                date: '05/01/2021',
                amount: 10000.00,
                type: MovementType.INCOME,
                category: 'Plazo Fijo'
            })
        )
        .then(() =>
            MovementModel.Movement.create({
                date: '10/01/2021',
                amount: 2500.00,
                type: MovementType.EXPENSE,
                category: 'Reparación Celular'
            })
        )
};

if (require.main === module) {
    init();
}

module.exports = {
    init,
};
