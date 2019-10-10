const User = require('../models/user');
const validation = require('../utils/validation');

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
    // Form validation
    let {error, success} = validation(req.body, true);

    // Check validation
    if (!success){
        return res.status(400).json({
            success: false,
            error,
            message: "Please fill in all required fields."
        });
    }
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication failed. User already exists.'
                });
            } else {
                const newUser = new User(req.body);

                newUser.save()
                    .then(user => {
                        // create a token
                        const token = user.generateJWT();
                        res.status(200).send({success: true, token: token, user: user});
                    })
                    .catch(err => {
                        let message = err.message;
                        if (err.code === 11000) message = "This email address is linked to another account.";

                        return res.status(500).json({success: false, message});
                    });
            }
        })
        .catch(err => {
            return res.status(500).json({success: false, message:err.message});
        });
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
    // Form validation
    let {error, success} = validation(req.body);

    // Check validation
    if (!success)
        return res.status(400).json({
            success: false,
             error, message: "Please fill in all required fields."
        });

    User.findOne({email: req.body.email})
        .then(user => {
            if (!user)
                return res.status(401).json({success: false, message:'Authentication failed. User not found.'});

            //validate password
            if (!user.comparePassword(req.body.password))
                return res.status(401).send({success: false, message:'Authentication failed. Wrong password.'});

            const token = user.generateJWT();
            res.status(200).send({success: true, token: token, user: user});
        })
        .catch(err => {
            return res.status(500).json({success: false, message:err.message});
        });
};

exports.protected = (req, res) => {
    const {user: {id}} = req;
    return User.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({user: user.toAuthJSON()});
        });
};