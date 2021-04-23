const express = require('express');
const paginate = require('express-paginate');
const MovementModel = require('../models/movement');
const router = express.Router();


/**
 * Endpoint para obtener todos los movimientos.
 *
 */
router.get('/', function (req, res, next) {
    let limit = 5

    let page = 1

    if ('page' in req.query && req.query.page) {
        page = req.query.page
    } else {
        req.query.page = page
    }

    if ('limit' in req.query && req.query.limit) {
        limit = req.query.limit
    } else {
        req.query.limit = limit
    }

    MovementModel.getAll(limit, req.skip)
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
