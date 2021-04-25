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

module.exports = router;
