const baseURL = '/api/images';

function create(imgURL) {
    return fetch(baseURL, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(imgURL)
    }).then(response => {
        if (response.ok) return response.json();
        throw new Error('could not get classification');
    });
};

module.exports = {
    create
}