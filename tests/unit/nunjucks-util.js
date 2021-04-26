const path = require('path');

const { init } = require('../../server/utils/nunjucks.js');
const viewsPath = path.resolve(
    __dirname,
    '..',
    '..',
    'client',
    'views',
    'components'
);

const env = init({ viewsPath });
env.addFilter('monefy', () => {});

function render(component, context) {
    const div = document.createElement('div');
    div.innerHTML = env.render(`${component}.html`, context);
    return div;
}

module.exports = render;
