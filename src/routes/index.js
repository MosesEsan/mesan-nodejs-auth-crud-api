const auth = require('./auth');
const user = require('./user');
const passport = require("passport");

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
    });

    app.use('/api/auth', auth);
    app.use('/api/user', authenticateJwt, user);
};

function authenticateJwt(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
        if (err) return next(err);

        if (!user) return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});

        req.user = user;

        next();

    })(req, res, next);
}
