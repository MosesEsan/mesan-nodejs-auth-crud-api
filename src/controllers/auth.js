const User = require('../models/user');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Token = require('../models/token');

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
    // Make sure this account doesn't already exist
    User.findOne({email: req.body.email})
        .then(user => {

            if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account.'});

            // Create and save the user
            const newUser = new User(req.body);
            newUser.save()
                .then(user => sendEmail(user, req, res))
                .catch(err => res.status(500).json({message:err.message}));
        })
        .catch(err => res.status(500).json({success: false, message: err.message}));
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) return res.status(401).json({msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

            //validate password
            if (!user.comparePassword(req.body.password)) return res.status(401).json({message: 'Invalid email or password'});

            // Make sure the user has been verified
            if (!user.isVerified) return res.status(401).json({ type: 'not-verified', message: 'Your account has not been verified.' });

            // Login successful, write token, and send back user
            res.status(200).json({token: user.generateJWT(), user: user});
        })
        .catch(err => res.status(500).json({message: err.message}));
};

// ===EMAIL VERFIFCATION
/**
 * GET /verify/:token
 */
exports.verify = function (req, res, next) {
    if(!req.params.token) return res.status(400).json({message: "We were unable to find a user for this token."});

    // Find a matching token
    Token.findOne({ token: req.params.token }, (err, token) => {
        if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token.userId }, (err, user) => {
            if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });

            if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) return res.status(500).json({message:err.message});

                res.status(200).send("The account has been verified. Please log in.");
            });
        });

    });
};

/**
 * POST /resend
 */
exports.resendToken = function (req, res, next) {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

        if (user.isVerified) return res.status(400).json({ message: 'This account has already been verified. Please log in.'});

        sendEmail(user, req, res);
    });
};


function sendEmail(user, req, res){
    const token = user.generateVerificationToken();

    // Save the verification token
    token.save(function (err) {
        if (err) return res.status(500).json({ message: err.message });

        let link="http://"+req.headers.host+"/api/auth/verify/"+token.token;

        const mailOptions = {
            to: user.email,
            from: process.env.FROM_EMAIL,
            subject: 'Account Verification Token',
            text: `Hi ${user.username} \n 
                    Please click on the following link ${link} to verify your account. \n\n 
                    If you did not request this, please ignore this email.\n`,
        };

        sgMail.send(mailOptions, (error, result) => {
            if (error) return res.status(500).json({ message: error.message });

            res.status(200).json({message: 'A verification email has been sent to ' + user.email + '.'});
        });
    });
}