const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('.'));

const leaderboardRoute = require('./Site Files/JS/API/Back End/leaderboard-api');
app.use('/api/leaderboard', leaderboardRoute);


//if visited unknown, goto homepage
app.use((_req, res) => {
    res.sendFile('index.html', { root: '.' });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});



