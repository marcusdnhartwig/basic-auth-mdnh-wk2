'use strict';

const jwt = require('jsonwebtoken');
const SECRET = process.envAPI_SECRET || 'ThisIsMySecret';

let user = {
    username: 'tester',
    password: 'pass123',
};

function generateToken(userToHash) {
    return jwt.sign(userToHash, SECRET, { expiresIn: '8640000'});
}

let token = generateToken(user);
console.log(AuthString: '')

//this needes to talk to bearAuthTest