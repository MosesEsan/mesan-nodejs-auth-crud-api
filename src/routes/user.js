const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })

const User = require('../controllers/users');

router.route('/').get(User.index); //fetch all users
router.put('/update', upload.single('profileImage'), User.update);


// router.route('/:id')
//     .get(User.show) //fetch user
//     .put(User.update) //update user
//     .delete(User.destroy); //delete user

module.exports = router;
