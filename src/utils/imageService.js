import tokenService from './tokenService';
const baseURL = '/api/images';

function create(imgURL) {
    return fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(imgURL)
    }).then(response => {
        if (response.ok) return response.json();
        throw new Error('could not get classification or user not authorized');
    });
};

function index(){
    return fetch(baseURL + '/index',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(imgs => {
        if (imgs.ok) return imgs.json();
        throw new Error('Could not get images');
    });
}

export default  {
    create,
    index
};