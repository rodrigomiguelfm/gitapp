const server = require('../../../server/index.js');
const fixture = require('../../../scripts/fixture.js');

module.exports = function (on) {
    let serverInstance;

    on('after:run', () => {
        serverInstance.close();
        return null;
    });

    on('task', {
        seed: () => {
            return fixture.init();
        },
    });

    return server.start().then(instance => {
        serverInstance = instance;

        return {
            baseUrl: `http://localhost:${serverInstance.address().port}`,
        };
    });
};
