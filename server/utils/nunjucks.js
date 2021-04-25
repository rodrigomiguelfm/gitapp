const nunjucks = require('nunjucks');

function init({ express, viewsPath }) {
    const env = nunjucks.configure(viewsPath, {
        autoescape: true,
        express,
    });
}

module.exports = {
    init,
};
