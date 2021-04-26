const { monefy } = require('../../client/js/utils.js');

test('Should convert 1000 into "1.000"', async () => {
    expect(monefy(1000)).toBe('1.000');
});

test('Should convert 100 into "100"', async () => {
    expect(monefy(100)).toBe('100');
});

test('Should convert undefined into ""', async () => {
    expect(monefy(undefined)).toBe('');
});

