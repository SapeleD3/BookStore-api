const express = require("express");
const router = express.Router();
const passport = require('passport');
const passportConf = require('../passport')
const AuthRoute = require('../config/AuthRoute')

const userController = require('../controllers/users');

router.get('/', userController.getUsers);
// router.get('/:id', userController.getUserByid);
router.delete('/:id', userController.deleteUserById)
router.get('/me',  AuthRoute, userController.getOwnCredentials)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUsers);
router.post('/auth/google', passport.authenticate('googleToken', { session: false }), userController.googleOauth);

module.exports = router