const jwt = require('jsonwebtoken');
const authConfig = require('../src/database/config/auth')
const { User } = require('../src/database/models/index')

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ msg: "Acceso no autorizado" });
    } else {
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, authConfig.secret, (err, decoded) => {

            if (err) {
                res.status(500).json({ msg: "Ha ocurrido un problema al decodificar el token", err });
            } else {
                console.log(decoded.user);

                User.findByPk(decoded.user.id).then(user => {

                    req.user = user;   
                    next();
                    
                })              
            }
        })
    }
};


module.exports = {
    auth,
}