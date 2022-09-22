const db = require('../src/database/models/index.js');
const { Car,User } = db;

const addCar = (req, res, next) => {
    Car.create(req.body)
        .then(car => res.status(201).send('Car Created'))
        .catch(err => next(err));
}

const getCars = (req,res,next) => {
    Car.findAll({include : User})
       .then(cars => res.status(200).send(cars))
       .catch(err => next(err))
}

const getCar = (req,res,next) => {
    const id = req.params.id;
    Car.findOne({where : {id}, include: User})
       .then(car => res.status(200).send(car))
       .catch(err => next(err))
}

const updateCar = (req, res, next) => {
    Car.update({
        brand: req.body.brand,
        speed: req.body.speed,
        userId: req.body.userId
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(car => res.status(200).send(car))
        .catch(err => next(err));
};

const deleteCar = (req, res, next) => {
    Car.destroy({
        where: {
            id: req.params.id
        }
    }).then(car => res.sendStatus(200).send(car))
        .catch(err => next(err));
};

module.exports = {
    addCar,
    getCars,
    getCar,
    updateCar,
    deleteCar
}