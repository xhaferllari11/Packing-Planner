import tokenService from './tokenService';

const BASE_URL = '/api/weather/';

function getWeather(lat, lon) {
    return fetch(BASE_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify({lat:lat,lon:lon})
    }).then(w => {
        if (w.ok) return w.json();
        throw new Error('Could not get images');
    });
}



export default {
    getWeather
}