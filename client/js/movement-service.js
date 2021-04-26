const BASE_URL = '/api/v1';

async function getLast() {
    const resp = await fetch(`${BASE_URL}/movements`);
    const { movements } = await resp.json();
    return movements;
}

async function getIncomes() {
    return new Promise(resolve => {
        resolve([
            {
                id: 3,
                date: '2021-04-01T03:00:00.000Z',
                amount: 50000,
                type: 'income',
                category: 'Sueldo',
            },
            {
                id: 4,
                date: '2021-05-01T03:00:00.000Z',
                amount: 10000,
                type: 'income',
                category: 'Plazo Fijo',
            },
        ]);
    });
}

async function update(movement) {
    console.log('update:', movement);
    return new Promise(resolve => {
        resolve();
    });
}

async function create(movement) {
    console.log('create:', movement);
    return new Promise(resolve => {
        resolve();
    });
}

async function remove(movement) {
    console.log('delete:', movement);
    return new Promise(resolve => {
        resolve();
    });
}

export default {
    create,
    update,
    remove,
    getLast,
    getIncomes,
};
