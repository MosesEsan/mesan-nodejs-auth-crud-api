const User = require('../models/user');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
    const users = await User.find({});
    res.status(200).json({users});
};

// @route POST services/admin/register
// @desc Add a new user
// @access Public
exports.create = async (req, res) => {
    try {
        const { email, role } = req.body;

        // Make sure this account doesn't already exist
        const user = await User.findOne({ email });

        if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account. You can change this users role instead.'});

        const newUser = new User({ email, password:"hhihihi", role: role || "staff" });

        const user_ = await newUser.save();

        sendEmail(user_, req, res);

    } catch (error) {
        res.status(500).json({success: false, message: err.message})
    }
};

// @route GET admin/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
    const users = await Admin.find({});
    res.status(200).json({users});

    try {
        const id = req.params.id;
        const user = await Admin.findById(id);

        if (!user) return res.status(401).json({message: 'User does not exist'});

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route DESTROY admin/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;

        await Admin.findByIdAndDelete(id);
        res.status(200).json({message: 'User has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


function sendEmail(user, req, res){
    //Generate and set password reset token
    user.generatePasswordReset();

    // Save the updated user object
    user.save()
        .then(user => {
            // send email
            let domain = "http://" + req.headers.host;

            let link = "http://" + req.headers.host + "/services/auth/reset/" + user.resetPasswordToken;
            const mailOptions = {
                to: user.email,
                from: process.env.FROM_EMAIL,
                subject: "New Account Created",
                text: `Hi ${user.username} \n 
                    A new account has been created for you on ${domain}. Please click on the following link ${link} to set your password and login. \n\n 
                    If you did not request this, please ignore this email.\n`,
            };

            sgMail.send(mailOptions, (error, result) => {
                if (error) return res.status(500).json({message: error.message});

                res.status(200).json({message: 'An email has been sent to ' + user.email + '.'});
            });
        })
        .catch(err => res.status(500).json({message: err.message}));
}