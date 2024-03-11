const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api')

