const init = () => {
    // TODO: add instances to database
    return Promise.resolve();
};

if (require.main === module) {
    init();
}

module.exports = {
    init,
};
