const { WebSocketServer } = require('ws');
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(express.static('./public'));

app.set('trust proxy', true);

const usersRoute = require('./public/Site Files/JS/API/Back End/players-api');
app.use('/api/users', usersRoute);

//if visited unknown, goto homepage
app.use((req, res) => {
    res.sendFile('Site Files/HTML/index.html', { root: './public' });
});

let server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


/*-- websocket setup --*/
const connections = [];

const wss = new WebSocketServer({noServer: true});
server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, function done(ws, req) {
        wss.emit('connection', ws, req);
    });
});

wss.on('connection', (ws, req) => {
    console.log('connection approved');
    connections.push({ws, x: 32, y: 32});

    ws.on('message', (data) => {
        data = JSON.parse(data);
        console.log(`recieved event: ${data.event}`);
    });

    ws.on('close', () => {
        console.log(`connection closed`);
    });

    ws.send('whats up');
});

