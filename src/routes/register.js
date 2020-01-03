const express = require('express');
const router = express.Router();
const registerController = require('./../controllers/registerController');
const loginController = require('./../controllers/loginController');
const {
    createUser
} = require('./../Helpers/validators/register');
const {
    authLogin
} = require('./../Helpers/validators/authLogin');

router.post('/register', createUser, registerController.store);
router.post('/login', authLogin, loginController.login);

module.exports = router;