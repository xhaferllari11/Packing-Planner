const User = require('../models/user');
const jwt = require('jsonwebtoken');


function signup(req, res) {
    console.log('came in here');
    let user = new User(req.body);
    // save user then send jwt
    user.save(function (e, u) {
        if (e) {
            res.status(401).json(e);
        }
        let token = getJwtToken(u);
        console.log('oa', token);
        res.json({ token });
    })
}

function signin(req, res) {
    let user = User.findOne({ email: req.body.email }, function (e, u) {
        if (e) { res.status(401).json(e); }
        //compare pass
        u.comparePassword(req.body.pw, function (e, isMatch) {
            if (e) {
                res.status(401).json(e);
            }
            if (isMatch) {
                let token = getJwtToken(u);
                console.log('cleared', token);
                res.json({ token });
            } else {
                res.status(401).json(e);
            }
        });
    });
}

function getJwtToken(u) {
    return jwt.sign(
        { u },
        process.env.SECRET,
        { expiresIn: '7 days' }
    );
};

module.exports = {
    signup,
    signin
}