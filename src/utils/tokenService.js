
function setToken(token) {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

function getUserFromToken() {
    const token = getToken();
    console.log('toke1',token===true);
    return token ? JSON.parse(atob(token.split('.')[1])).u : null;
}

function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
        // Check if expired, remove if it is
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('payload tokenservice',payload);
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            console.log('token removed from getToken');
            token = null;
        }
    } 
    return token;
}

function removeToken() {
    localStorage.removeItem('token');
}

export default {
    setToken,
    getUserFromToken,
    getToken,
    removeToken
};