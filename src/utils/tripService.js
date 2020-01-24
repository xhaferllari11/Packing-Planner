import tokenService from './tokenService';
const baseURL = '/api/trips';

function create(tripData) {
    return fetch(baseURL + '/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(tripData)
    }).then(response => {
        if (response.ok) return response.json();
        throw new Error('could not save trip');
    });
};

function index(){
    return fetch(baseURL + '/index',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(trips => {
        if (trips.ok) return trips.json();
        throw new Error('Could not get trips');
    });
}

export default {
    create,
    index
}