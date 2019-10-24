const express = require('express');

const {check} = require('express-validator');

const router = express.Router();

const Auth = require('../controllers/auth');

router.get('/', (req, res) => {
    res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});

router.post('/register', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('username').not().isEmpty().withMessage('You username is required'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('firstName').not().isEmpty().withMessage('You first name is required'),
    check('lastName').not().isEmpty().withMessage('You last name is required')
], Auth.register);

router.post("/login", [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], Auth.login);

module.exports = router;