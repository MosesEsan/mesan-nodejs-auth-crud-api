const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const User = require('../models/user');
const cloudinary = require('../config/cloudinary');

multer_upload = multer().single('profileImage');

//Index
exports.index = async (req, res) => {
    const {id} = req.user;

    let user = await User.findById(id);
    if (!user) return res.status(400).json({message: "User not found"});
    res.status(200).json({user});
};

// @route PUT api/user/
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
