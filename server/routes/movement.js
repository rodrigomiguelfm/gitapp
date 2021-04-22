const express = require('express');
const MovementModel = require('../models/movement');
const router = express.Router();

/**
 * Endpoint para obtener todos los movimientos.
 *
 */
router.get('/', function (req, res) {
    MovementModel.getAll()
        .then((movements) => res.status(200).send(movements))
        .catch((_) => {
            console.log(_);
            res.status(500).send('Error al obtener los movimientos');
        });
});

module.exports = router;