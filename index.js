const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('.'));

const leaderboardRoute = require('./Site Files/JS/API/Back End/leaderboard-api');
app.use('/api/leaderboard', leaderboardRoute);
const usersRoute = require('./Site Files/JS/API/Back End/players-api');
app.use('/api/users', usersRoute);


//if visited unknown, goto homepage
app.use((req, res) => {
    res.sendFile('index.html', { root: '.' });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});



