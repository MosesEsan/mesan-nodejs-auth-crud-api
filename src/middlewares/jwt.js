const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const id = jwt_payload.id;
                const user = await User.findById(id);

                if (!user) return done(null, false);

                return done(null, user);

            } catch (error) {
                return done(error, false, {message: 'Server Error'});
            }
        })
    );
};