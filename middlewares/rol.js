const jwt = require('jsonwebtoken');
const authConfig = require('../src/database/config/auth')
const { User } = require('../src/database/models/index')

const checkRol = (req, res, next) => {
    console.log(req.user.role);
    if (req.user.role != 'admin')
        res.status(401).json({ msg: "No tienes permisos" })
    else {
        next();
    }

}

module.exports = {
    checkRol,
}