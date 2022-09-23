require('dotenv').config();
const { User } = require('../src/database/models/index.js')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const authConfig = require('../src/database/config/auth');
const user = require('../src/database/models/user.js');


const signIn = (req, res) => {
    let { email, password } = req.body;
    // Buscar usuario
    User.findOne({
        where: {
            email: email
        } 
    }).then(user => {
        if (!user) {
            res.status(404).json({ msg: "Usuario con este correo no encontrado" });
        } else {
            if (bcrypt.compareSync(password, user.password)) {

                // Creamos el token
                let token = jwt.sign({ user: user }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                res.json({
                    user: user,
                    token: token
                })
            } else {
                res.status(401).json({ msg: "Contraseña incorrecta" })
            }
        }
    }).catch(err => {
        res.status(500).json(err);
    })

}

const signUp = (req, res) => {

    const salt = bcrypt.genSaltSync(Number.parseInt(authConfig.rounds));
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Crear un usuario
    User.create({
        nombre: req.body.nombre,
        email: req.body.email,
        password: hash,
        role: req.body.role
    }).then(user => {

        // Creamos el token
        let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires
        });

        res.json({
            user: user,
            token: token
        });

    }).catch(err => {
        res.status(500).json(err);
    });

}

module.exports = {
    signIn,
    signUp
}