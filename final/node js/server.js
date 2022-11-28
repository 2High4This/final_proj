require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('./controllers/verifyToken');


const allowedOrigins = [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://localhost:3500',
    'http://localhost:3000',
];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

const corsOptions = {

    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

function connect() {
    mongoose.connect(process.env.URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
        (err) => {
            if (err) console.error(err)
            else console.log("connected");
        }
    );
}

//Set base app rules.
const app = express();
app.listen(5000, () => { console.log("Started on port 5000") });
app.use(cookieParser());
app.use(credentials);
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

//Define the different functions
app.use('/signUp', require('./routes/signUpRoute'));
app.use('/logIn', require('./routes/logInRoute'));
app.use('/refresh', require('./routes/refreshTokenRoute'));
app.use('/addTask', require('./routes/addTaskRoute'));

// Protected functions
app.use(jwt);
app.use('/logOut', require('./routes/logOutRoute'));
app.use('/getTasks', require('./routes/getTasksRoute'));



connect();