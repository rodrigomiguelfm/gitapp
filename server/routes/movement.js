const express = require('express');
const paginate = require('express-paginate');
const MovementModel = require('../models/movement');
const router = express.Router();

/**
 * Endpoint para obtener todos los movimientos.
 *
 */
router.get('/', function (req, res) {
    MovementModel.getAll(req.query.limit, req.skip, req.query.type)
        .then((results) => {
            const pageCount = Math.ceil(results.count / req.query.limit);

            const pages = paginate.getArrayPages(req)(
                3,
                pageCount,
                req.query.page
            );

            res.status(200).send({
                movements: results.rows,
                pages: pages,
                next: paginate.hasNextPages(req)(pageCount)
                    ? pages[req.query.page].url
                    : null,
            });
        })
        .catch((_) => {
            console.log(_);
            res.status(500).send('Error al obtener los movimientos');
        });
});

/**
 * Endpoint para crear un movimiento.
 * Recibe los datos del movimiento en body.
 *
 */
router.post('/', function (req, res) {
    MovementModel.create(req.body)
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((_) => {
            console.log(_);
            res.status(500).send('Error al crear movimiento');
        })
});

/**
 * Endpoint para editar un movimiento.
 * Recibe el id en req.params.id
 *
 */
router.put('/:id', function (req, res) {
    MovementModel.update(req.params.id, req.body)
        .then((movement) => {
            if (movement == null) {
                res.status(404).send(
                    'El movimiento ' + req.params.id + ' no fue encontrado'
                );
            } else res.status(200).send(movement);
        })
        .catch(() => res.status(500).send('Error al obtener movimiento'));
});

module.exports = router;
