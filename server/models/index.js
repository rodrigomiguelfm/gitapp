const MovementModel = require('./movement.js');

async function createTables() {
    return MovementModel.Movement.sync()
}

module.exports = {
    createTables
};
