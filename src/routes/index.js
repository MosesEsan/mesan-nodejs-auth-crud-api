const auth = require('./auth');
const user = require('./user');
const admin = require('./admin/user');

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    //INDEX
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API. YOU CAN ACCESS ADMIN OR API"});
    });

    //ADMIN
    app.get('/admin', (req, res) => {
        res.status(200).send({ message: "Welcome to the ADMIN SECTION. Login to make changes"});
    });
    app.use('/admin/user', authenticate, admin);
    // app.use('/admin/article', authenticate, admin);
    // app.use('/admin/event', authenticate, admin);


    //API
    app.get('/api', (req, res) => {
        res.status(200).send({ message: "Welcome to the API SECTION. Register or Login to test Authentication."});
    });
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
};
