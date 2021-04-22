const Sequelize = require('sequelize');

const db = require('../db.js');


/**
 * Modelo de movimiento.
 *
 *
 */
const Movement = db.define(
    'Movement',
    {
        // Atributos
        date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        amount: {
            type: Sequelize.NUMBER,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    { tableName: 'Movement' }
);

/**
 * Obtener todos los movimientos de la base de datos.
 *
 */
const getAllMovements = () => {
    return Movement.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        }
    });
};

/**
 * Crear un movimiento nuevo.
 * Parámetro data: JSON con los atributos a crear.
 *
 */
const createMovement = (data) => {
    return Movement.create(data);
};


const MovementModel = {
    Movement: Movement,
    getAll: getAllMovements,
    create: createMovement,
};

module.exports = MovementModel;
