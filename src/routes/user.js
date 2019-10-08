const express = require('express');
const router = express.Router();

const User = require('../controllers/users');

router.route('/').get(User.index); //fetch all users
router.route('/update').get(User.update); //fetch all users

// router.route('/:id')
//     .get(User.show) //fetch user
//     .put(User.update) //update user
//     .delete(User.destroy); //delete user

module.exports = router;
