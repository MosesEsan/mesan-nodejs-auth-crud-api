const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: 'uploads/'});

const User = require('../controllers/users');

router.route('/').get(User.index);
router.put('/update', upload.single('profileImage'), User.update);

module.exports = router;
