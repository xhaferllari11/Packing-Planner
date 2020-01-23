// verifies token and adds user to req.user

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
    console.log('ent');
  // Check for the token, also checks body and query for token
  let token = req.get('Authorization') || req.query.token || req.body.token;
  console.log('token',token);
  console.log('token1',token.replace('Bearer ', ''));
  console.log('token2',typeof(token.replace('Bearer ', '')));

  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid and not expired
    console.log('replace',token);
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        console.log('err',err);
        next(err);
      } else {
        // It's a valid token, so add user to req
        console.log('this happened');
        console.log('decoded', decoded.u)
        req.user = decoded.u;    
        next();
      }
    });
  } else {
    next();
  }
};