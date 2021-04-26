const nunjucks = require('nunjucks');

function init({ express, viewsPath }) {
    return nunjucks.configure(viewsPath, {
        autoescape: true,
        express,
    });
}

module.exports = {
    init,
};
