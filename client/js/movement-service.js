const BASE_URL = '/api/v1';

async function getLast(id) {
    const resp = await fetch(`${BASE_URL}/movements`);
    const { movements } = await resp.json();
    return movements;
}

export default {
    getLast,
};
