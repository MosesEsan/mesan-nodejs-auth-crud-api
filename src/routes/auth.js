const express = require('express');
const passport = require("passport");

const router = express.Router();

const Auth = require('../controllers/auth');

router.get('/', (req, res) => {
    res.status(200).send({ message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});
//
router.post('/register', Auth.register);
router.post("/login", Auth.login);

router.get('/data1', passport.authenticate('jwt', { session: false }), Auth.protected);


module.exports = router;
