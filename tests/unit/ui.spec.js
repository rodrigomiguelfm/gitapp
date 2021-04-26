const render = require('../nunjucks-util.js');

const { getByText, getByTestId } = require('@testing-library/dom');
require('@testing-library/jest-dom');

test('Deberia renderizar correctamente un movimiento del tipo income', () => {
    const $movement = render('movement', {
        movement: {
            type: 'income',
            date: '01/01/2021',
            amount: 1000.0,
            category: 'Supermercado',
        },
    });

    getByText($movement, 'Supermercado');
    expect(getByTestId($movement, 'movement-icon')).toHaveAttribute(
        'src',
        expect.stringContaining('income')
    );
    expect(getByText($movement, '$')).toHaveClass('has-text-success');
});
