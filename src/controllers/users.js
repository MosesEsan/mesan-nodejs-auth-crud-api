const User = require('../models/user');
const cloudinary = require('../config/cloudinary');

//get all Users
exports.index = function (req, res) {
    console.log("we")
}

//Read
exports.show = function (req, res) {
    const {id} = req.params;

    User.forge({id})
        .fetch()
        .then((user) => {
            if (!user) res.status(404).json({success: false, error: {message: "User does not exist!"}});

            res.status(200).json({success: true, data: {user}});
        })
        .catch((error) => res.status(500).json({message: error.message}));
}

//Update
exports.update = function (req, res, info) {
    const {id} = req.user;
    let update = {...req.body};

    if (req.file) {
        let image = req.file.path;
        cloudinary.uploader.upload(image, (error, result) => {
            if (error) res.status(500).json({message: error.message})

            update = {...update, profileImage:result.url};

            User.findByIdAndUpdate(id, {$set: update}, {new: true})
                .then(user =>  res.status(200).send({success: true, user}))
                .catch((error) => res.status(500).json({message: error.message}));
        });
    }else {
        User.findByIdAndUpdate(id, {$set: update}, {new: true})
            .then(user =>  res.status(200).send({success: true, user}))
            .catch((error) => res.status(500).json({message: error.message}));
    }
};

//Update
exports.upload = function (req, res) {
    console.log("in here")

    const {id} = req.user;
    const image = req.files[0];

    console.log(image['path'])

    cloudinary.uploader.upload(image['path'], (error, result) => {
        console.log(result)
        const update = {profileImage:result.url};

        User.findByIdAndUpdate(id, {$set: update}, {new: true})
            .then(user => {
                res.status(200).send({success: true, user})
            })
            .catch((error) => {
                res.status(500).json({message: error.message})
            });
    });
};


//Delete
exports.destroy = function (req, res) {
    const {id} = req.params;

    User.forge({id})
        .fetch({require: true})
        .then(function (user) {
            user.destroy()
                .then(() => res.status(200).json({success: true, data: {message: 'User successfully deleted'}}))
                .catch((error) => res.status(500).json({success: false, error: {message: error.message}}));
        })
        .catch((error) => res.status(500).json({success: false, error: {message: error.message}}));
}
