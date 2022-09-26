const e = require('express');
const db = require('../src/database/models/index.js');
const { User, Car } = db;
const bcrypt = require("bcrypt");

const addUser = async (req, res, next) => {
    try {
        let { nombre, email, password, role } = req.body;

        await User.create({
            nombre,
            email,
            password,
            role
        })
        res.status(201).json({ msg: "User Created" })
    } catch (err) {
        return next(err);
    }
}



const getUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await User.findOne({
            include: Car,
            where: { id }
        })
        if (user === null) {
            res.status(400).json({ msg: "User not Found" })
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        return next(err);
    }
}


const getUsers = async (req, res, next) => {
    let users = await User.findAll();
    try {
        if (users.length === 0) {
            res.status(400).json({ msg: "No users founded" })
        } else {
            res.status(200).json(users);
        }
    }
    catch (err) {
        return next(err);
    }
}


const updateUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let { nombre, email, role } = req.body;

        await User.update({
            nombre,
            email,
            role
        }),
        {
            where: { id }
        };
        res.status(201).json({ msg: "User Updated" })
    } catch (err) {
        return next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        let id = req.params.id;

        await User.destroy({
            where: { id }
        });
        res.status(202).json({ msg: "User Deleted" })
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getUsers,
    addUser,
    getUser,
    updateUser,
    deleteUser
}   