const express = require ('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const usersControllers = require('./controllers/userController.js')
const carsControllers = require('./controllers/carController.js')
const authControllers = require('./controllers/authController.js')
const errorHandler = require('./middlewares/errorHandler.js')
const bodyParser = require('body-parser')
const auth = require('./middlewares/auth.js')



router.use(express.json());
router.use(express.urlencoded({extended: true}))


//LOGIN REGISTER

router.post('/signin',auth.auth,authControllers.signIn);
router.post('/signup',authControllers.signUp);

//USER
router.get('/users',auth.auth,usersControllers.getUsers)
router.get('/user/:id',usersControllers.getUser)
router.post('/user',usersControllers.addUser)
router.put('/user/:id',usersControllers.updateUser)
router.delete('/user/:id',usersControllers.deleteUser)

//CARS
router.get('/cars',carsControllers.getCars)
router.get('/car/:id',carsControllers.getCar)
router.post('/car',carsControllers.addCar)
router.put('/car/:id',carsControllers.updateCar)
router.delete('/car/:id',carsControllers.deleteCar)

router.use(errorHandler.notFound);



module.exports = router;