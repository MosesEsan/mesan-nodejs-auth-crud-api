const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) return done(null, user);
                    return done(null, false);
                })
                .catch(err => {
                    return done(err, false, {message: 'Server Error'});
                });
        })
    );
};