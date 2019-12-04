const express = require('express');
const {check} = require('express-validator');

const User = require('../controllers/user');

const router = express.Router();

const validate = require('../middlewares/validate');

//INDEX
router.get('/', User.index);

//STORE
router.post('/', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('username').not().isEmpty().withMessage('You username is required'),
    check('firstName').not().isEmpty().withMessage('You first name is required'),
    check('lastName').not().isEmpty().withMessage('You last name is required')
], validate, User.store);

//SHOW
router.get('/:id',  User.show);

//UPDATE
router.put('/:id',  User.update);

//DELETE
router.delete('/:id', User.destroy);

//UPLOAD
router.post('/upload', User.upload);

module.exports = router;


