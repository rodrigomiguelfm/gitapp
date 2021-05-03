module.exports = {
    test: process.env.NODE_ENV === 'test' || process.env.CYPRESS_INTERNAL_ENV
}
