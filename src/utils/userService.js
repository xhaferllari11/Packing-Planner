import tokenService  from './tokenService.js';

const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email, or database collapsed.
    throw new Error('Email already taken!');
  })
  .then((token) => {
      console.log('token',token);
    tokenService.setToken(token.token)
  });
};

function getUser(){
  return tokenService.getUserFromToken();
};

function signout(){
  tokenService.removeToken();
}

function signin(creds) {
  return fetch(BASE_URL + 'signin', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    console.log('serversigned in', res.ok)
    // Valid signin if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

export default {
  signup,
  getUser,
  signout,
  signin
};