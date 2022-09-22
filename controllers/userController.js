const db = require('../src/database/models/index.js');
const { User, Car } = db;

const addUser = (req, res, next) => {
    User.create(req.body)
        .then(user => res.status(201).send('User Created'))
        .catch(err => next(err));
}
const getUser = (req, res, next) => {
    const id = req.params.id;
    User.findOne({where :{id}, include: Car})
        .then(user => res.status(200).send(user))
        .catch(err => next(err));
}

const getUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).send(users))
        .catch(err => next(err));
}

const updateUser = (req, res, next) => {
    User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(user => res.status(200).send(user))
        .catch(err => next(err));
};

const deleteUser = (req, res, next) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(user => res.sendStatus(200).send(user))
        .catch(err => next(err));
};

module.exports = {
    getUsers,
    addUser,
    getUser,
    updateUser,
    deleteUser
}