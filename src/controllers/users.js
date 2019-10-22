const User = require('../models/user');
const cloudinary = require('../config/cloudinary');

//Update
exports.index = function (req, res, info) {
    const {id} = req.user;

    return User.findById(id)
        .then((user) => {
            if (!user) return res.status(400).json({message: "User not found"});

            res.status(200).json({token: user.generateJWT(), user: user});
        });
};

//Update
exports.update = function (req, res) {
    if (req.file) upload(req, res);
    else {
        console.log("no file in the bosdy!");

        const {id} = req.user;
        let update = {...req.body};

        User.findByIdAndUpdate(id, {$set: update}, {new: true})
            .then(user =>  res.status(200).json({user}))
            .catch((error) => res.status(500).json({message: error.message}));
    }
};

//Upload
const upload = function (req, res) {
    console.log("I was called")
    const {id} = req.user;
    let update = {...req.body};

    let image = req.file.path;
    cloudinary.uploader.upload(image, (error, result) => {
        if (error) return res.status(500).json({message: error.message});

        update = {...update, profileImage:result.url};

        User.findByIdAndUpdate(id, {$set: update}, {new: true})
            .then(user =>  res.status(200).json({user}))
            .catch((error) => res.status(500).json({message: error.message}));
    });
};