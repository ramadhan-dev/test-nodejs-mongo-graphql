const express = require("express")
const router = express.Router()
const registerController = require("./../controllers/registerController")
const Register = require("./../models/register")
const {
    check,
} = require('express-validator/check');


// router.post('/', [createUser], registerController.store);

router.post('/', [
    check('username').custom(value => {
        return Register.findOne({
            'username': value
        }).then(user => {
            if (user) {
                return Promise.reject('xx');
            }
        });
    }),
    check('password').custom((value, {
        req
    }) => {
        if (value !== req.body.passwordConfirmation) {
            throw new Error('Password confirmation is incorrect');
        }
    })
], registerController.store);

module.exports = router
