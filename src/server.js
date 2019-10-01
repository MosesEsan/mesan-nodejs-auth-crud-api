require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");

const auth = require('./routes/auth');

// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 3000;

// Creating express app and configuring middleware needed for authentication
let app = createApp();

// Connect to MongoDB
initializeDB(connUri);

// Passport middleware
app.use(passport.initialize());
require("./middleware/jwt")(passport);

//Configure Routes
app = initializeRoutes(app);

// start the server
app.listen(PORT, () => console.log('Server running on http://localhost:'+PORT+'/'));

//=== HELPER METHODS BELOW


//HELPERS
function createApp(){
    // Creating express app and configuring middleware needed for authentication
    const app = express();

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false })); // initialize body-parser to parse incoming parameters requests to req.body
    app.use(bodyParser.json());

    return app;
}

function initializeRoutes(app){
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTddsHENTICATION API. Register or Login to test Authentication."});
    });

    app.use('/api/auth', auth);

    return app;
}

function initializeDB(connUri){
//Configure mongoose's promise to global promise
    mongoose.promise = global.Promise;
    mongoose.connect(connUri, { useNewUrlParser: true , useCreateIndex: true});
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('MongoDB --  database connection established successfully!');
    });

    connection.on('error', (err) => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        process.exit();
    });
}


