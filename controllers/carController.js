const db = require('../src/database/models/index.js');
const { Car, User } = db;

const addCar = async (req, res, next) => {
    try {
        let { brand, speed, userId } = req.body;

        await Car.create({
            brand,
            speed,
            userId
        });
        res.status(201).json({ msg: "Car Created" })
    } catch (err) {
        return next(err);
    }
}


const getCars = async (req, res, next) => {
    try {
        let cars = await Car.findAll({ include: User });

        if (cars.length === 0) {
            res.status(400).json({ msg: "No cars founded" })
        } else {
            res.status(200).json(cars);
        }
        console.log(cars);
    } catch (err) {
        return next(err);
    }
}

const getCar = async (req, res, next) => {
    try {
        let id = req.params.id;
        let car = await Car.findOne({ where: { id }, include: User })
        if (car === null) {
            res.status(400).send("Not Found");
        } else {
            res.status(201).json(car);
        }
    } catch (err) {
        return next(err)
    }
}

const updateCar = async (req, res, next) => {
    try {
        let id = req.params.id
        let { brand, speed, userId } = req.body;
        await Car.update({
            brand,
            speed,
            userId
        }, {
            where: { id }
        })
        res.status(200).json({ msg: `Car ${id} updated` })
    } catch (err) {
        return next(err);
    }
}

const deleteCar = async (req, res, next) => {
    try {
        let id = req.params.id;

        await Car.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: `Car ${id} deleted` })
    } catch (err) {
        return next(err);
    }

};

module.exports = {
    addCar,
    getCars,
    getCar,
    updateCar,
    deleteCar
}