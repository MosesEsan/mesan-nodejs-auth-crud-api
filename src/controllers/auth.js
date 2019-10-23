const User = require('../models/user');
const {validationResult} = require('express-validator');

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const error = checkValidation(req);
    if (error) return res.status(422).json({ error });

    // Make sure this account doesn't already exist
    User.findOne({email: req.body.email})
        .then(user => {

            if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account.'});

            // Create and save the user
            const newUser = new User(req.body);
            newUser.save()
                .then(user => res.status(200).json({token: user.generateJWT(), user: user}))
                .catch(err => {
                    let message = err.message;
                    if (err.code === 11000) message = "This email address is linked to another account.";

                    res.status(500).json({message});
                });
        })
        .catch(err => res.status(500).json({success: false, message:err.message}));
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const error = checkValidation(req);
    if (error) return res.status(422).json({ error });


    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) return res.status(401).json({ msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

            //validate password
            if (!user.comparePassword(req.body.password)) return res.status(401).json({message:'Invalid email or password'});

            // Login successful, write token, and send back user
            res.status(200).json({token: user.generateJWT(), user: user});
        })
        .catch(err => res.status(500).json({message:err.message}));
};


function checkValidation(req){
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (errors.isEmpty()) return null;

    let error = {};
    errors.array().map((err) => error[err.param] = err.msg);

    return error;
}