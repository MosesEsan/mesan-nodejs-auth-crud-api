require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");

// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 3000;


//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());


//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true , useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});


//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middleware/jwt")(passport);


//=== 4 - CONFIGURE ROUTES
//Configure Route
require('./routes/index')(app);


//=== 5 - CONFIGURE ROUTES
app.listen(PORT, () => console.log('Server running on http://localhost:'+PORT+'/'));

