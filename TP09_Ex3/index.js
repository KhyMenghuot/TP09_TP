const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
var session = require('express-session')

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'my-secret',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    name: 'access_token',
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, 
        sameSite: true,
        secure: false,
    }
}))

require('./config/db')();
app.use(require('./routes'));

app.listen(process.env.PORT || 3001, () => {
    console.log('Running on http://localhost:3001');
});