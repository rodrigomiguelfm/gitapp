const BASE_URL = '/api/v1';

const FAKE = [
    {
        date: '05/01/2021',
        amount: 10000.0,
        type: 'income',
        category: 'Plazo Fijo',
    },
    {
        date: '05/01/2021',
        amount: 10000.0,
        type: 'income',
        category: 'Plazo Fijo',
    },
    {
        date: '05/01/2021',
        amount: 10000.0,
        type: 'expense',
        category: 'Plazo Fijo',
    },
    {
        date: '05/01/2021',
        amount: 10000.0,
        type: 'income',
        category: 'Plazo Fijo',
    },
    {
        date: '05/01/2021',
        amount: 10000.0,
        type: 'expense',
        category: 'Plazo Fijo',
    },
];

async function getLast(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(FAKE);
        }, 300);
    });
    //const resp = await fetch(`${BASE_URL}/movements`);
    //return resp.json();
}

export default {
    getLast,
};
