const express = require('express');
const paginate = require('express-paginate');
const MovementModel = require('../models/movement');
const router = express.Router();

express().use(paginate.middleware(10, 50));

/**
 * Endpoint para obtener todos los movimientos.
 *
 */
router.get('/', function (req, res, next) {
    const limit = 'limit' in req.query && req.query.limit
        ? req.query.limit
        : 5

    const page = 'page' in req.query && req.query.page
        ? req.query.page
        : 1
    MovementModel.getAll(limit)
        .then(results => {
            const pageCount = Math.ceil(results.count / limit);

            const pages = paginate.getArrayPages(req)(3, pageCount, page)

            res.status(200).send({
                movements: results.rows,
                pages: pages,
                next: paginate.hasNextPages(req)(pageCount)
                    ? pages[page].url
                    : null
            })
        })
        .catch((_) => {
            console.log(_);
            res.status(500).send('Error al obtener los movimientos');
        });
});

module.exports = router;
