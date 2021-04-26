const server = require('../../../server/index.js');

module.exports = function (on) {
    let serverInstance;

    on('after:run', () => {
        serverInstance.close();
        return null;
    });

    on('task', {
        seed: () => {
            // TODO: seed db
            // serverManager.seed();
            return null;
        },
    });

    return server.start().then(instance => {
        serverInstance = instance;

        return {
            baseUrl: `http://localhost:${serverInstance.address().port}`,
        };
    });
};
