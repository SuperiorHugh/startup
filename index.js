const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./database.js');
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('.'));

app.set('trust proxy', true);

const usersRoute = require('./Site Files/JS/API/Back End/players-api');
app.use('/api/users', usersRoute);


//if visited unknown, goto homepage
app.use((req, res) => {
    res.sendFile('index.html', { root: '.' });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
