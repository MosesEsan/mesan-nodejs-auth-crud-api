const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');
const sgMail = require('@sendgrid/mail');

const User = require('../models/user');
const cloudinary = require('../config/cloudinary');

multer_upload = multer().single('profileImage');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
    const users = await User.find({});
    res.status(200).json({users});
};

// @route POST api/user
// @desc Add a new user
// @access Public
exports.store = async (req, res) => {
    try {
        const { email } = req.body;

        // Make sure this account doesn't already exist
        const user = await User.findOne({ email });

        if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account. You can change this users role instead.'});

        const password = '_' + Math.random().toString(36).substr(2, 9); //generate a random password
        const newUser = new User({...req.body, password});

        const user_ = await newUser.save();

        sendEmail(user_, req, res);

    } catch (error) {
        res.status(500).json({success: false, message: err.message})
    }
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) return res.status(401).json({message: 'User does not exist'});

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.user.id;

        const user = await User.findByIdAndUpdate(id, {$set: update}, {new: true});

        res.status(200).json({user, message: 'User has been updated'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;

        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'User has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


//Upload
exports.upload = function (req, res) {
    multer_upload(req, res, function (err) {
        if (err) return res.status(500).json({message: err.message});

        const {id} = req.user;
        const dUri = new Datauri();
        let image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

        cloudinary.uploader.upload(image.content)
            .then((result) => User.findByIdAndUpdate(id, {$set: {profileImage: result.url}}, {new: true}))
            .then(user => res.status(200).json({user}))
            .catch((error) => res.status(500).json({message: error.message}))
    })
};

function sendEmail(user, req, res){
    //Generate and set password reset token
    user.generatePasswordReset();

    // Save the updated user object
    user.save()
        .then(user => {
            // send email
            let domain = "http://" + req.headers.host;

            let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
            const mailOptions = {
                to: user.email,
                from: process.env.FROM_EMAIL,
                subject: "New Account Created",
                text: `Hi ${user.username} \n 
                    A new account has been created for you on ${domain}. Please click on the following link ${link} to set your password and login. \n\n 
                    If you did not request this, please ignore this email.\n`,
            };

            sgMail.send(mailOptions, (error, result) => {
                if (error) return res.status(500).json({message: error.message});

                res.status(200).json({message: 'An email has been sent to ' + user.email + '.'});
            });
        })
        .catch(err => res.status(500).json({message: err.message}));
}