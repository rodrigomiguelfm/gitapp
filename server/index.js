const path = require('path');

const morgan = require('morgan');
const express = require('express');
const paginate = require('express-paginate');
const bodyParser = require('body-parser');

const detectPort = process.env.HEROKU ? port => port : require('detect-port');

const nunjucks = require('./utils/nunjucks.js');
const env = require('./utils/env.js');

// Modelos
const models = require('./models/index.js');

// Rutas
const movementRouter = require('./routes/movement.js');
const viewRouter = require('./routes/view.js');

const client = path.resolve(__dirname, '..', 'client');

const inTest = env.test;
const views = path.resolve(client, 'views');

async function startServer(port = process.env.PORT) {
    port = port || (await detectPort(3000));
    await models.createTables();

    const app = express();

    if (!inTest) {
        app.use(morgan('dev'));
    }

    app.use(bodyParser.json());
    app.use(express.static(client));
    app.use(paginate.middleware(5, 50));
    app.set('views', views);
    app.set('view engine', 'html');

    nunjucks.init({
        express: app,
        viewsPath: path.resolve(client, 'views'),
    });

    // rutas de la vista
    app.use('/', viewRouter);

    // Rutas de la api
    app.use('/api/v1/movements', movementRouter);

    return new Promise(function (resolve) {
        const server = app.listen(port, function () {
            if (!inTest) {
                console.log(`Server started on http://localhost:${port}`);
            }

            const originalClose = server.close.bind(server);
            server.close = async () => {
                return new Promise(resolveClose => {
                    originalClose(resolveClose);
                });
            };

            resolve(server);
        });
    });
}

if (require.main === module) {
    startServer();
}

module.exports = {
    start: startServer,
};
