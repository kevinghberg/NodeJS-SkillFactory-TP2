const express = require ('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const usersControllers = require('./controllers/userController.js')
const carsControllers = require('./controllers/carController.js')
const authControllers = require('./controllers/authController.js')
const checkRol = require('./middlewares/rol')
const errorHandler = require('./middlewares/errorHandler.js')
const bodyParser = require('body-parser')
const auth = require('./middlewares/auth.js')

router.use(express.json());
router.use(express.urlencoded({extended: true}))

//LOGIN REGISTER

router.post('/signin',authControllers.signIn);
router.post('/signup',authControllers.signUp);

//USER
router.get('/users',auth.auth,checkRol.checkRol,usersControllers.getUsers)
router.get('/user/:id',auth.auth,usersControllers.getUser)
router.post('/user',usersControllers.addUser)
router.put('/user/:id',auth.auth,usersControllers.updateUser)
router.delete('/user/:id',auth.auth,usersControllers.deleteUser)

//CARS
router.get('/cars',auth.auth,carsControllers.getCars)
router.get('/car/:id',auth.auth,carsControllers.getCar)
router.post('/car',auth.auth,carsControllers.addCar)
router.put('/car/:id',auth.auth,carsControllers.updateCar)
router.delete('/car/:id',auth.auth,carsControllers.deleteCar)

router.use(errorHandler.errorParser);

module.exports = router;