const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('.'));

let apiRouter = express.Router();
app.use('/api', apiRouter);

app.use((_req, res) => {
    res.sendFile('index.html', { root: '.' });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


let leaderboard = [ // get from db //TODO
    {username: 'medium baguete lord', emotesused: 32}, //placeholders for real players
    {username: 'big baguette lord', emotesused: 56}, 
    {username: 'aspiring baguette lord', emotesused: 3}
];
leaderboard.sort((a, b) => b.emotesused - a.emotesused);

function updateLeaderboard(scoreData, leaderboard){
    leaderboard.push(scoreData);
    leaderboard.sort((a, b) => b.emotesused - a.emotesused);
    return leaderboard;
}

apiRouter.get('/leaderboard', (req, res) => {
    res.send(leaderboard);
})

apiRouter.post('/leaderboard', (req, res) => {
    leaderboard = updateLeaderboard(req.body, leaderboard);
    res.send(leaderboard);
})