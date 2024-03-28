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
let guestCount = 0;

const wss = new WebSocketServer({noServer: true});
server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, function done(ws, req) {
        wss.emit('connection', ws, req);
    });
});

wss.on('connection', (ws, req) => {
    let email;

    ws.on('message', (data) => {
        data = JSON.parse(data);
        let player;
        switch(data.event){
            case "connect"://args: email, name, x, y
                if(data.name === 'GUEST'){
                    guestCount++;
                    data.name += '-' + guestCount;
                    ws.send(JSON.stringify({event: 'guest-data', name: data.name}));
                }

                let testIndex = connections.findIndex(player => {return player.email === data.email});
                if(testIndex !== -1)
                    sendToConnections('', {event: "disconnect", email: data.email});
                sendToConnections(data.email, {event: "connect", email: data.email, name: data.name, x: data.x, y: data.y});
                
                const noncircularConnections = connections.map((val, i) => {
                    return {
                        email: val.email,
                        name: val.name,
                        x: val.x,
                        y: val.y,
                        moving: val.moving,
                    };
                });
                ws.send(JSON.stringify({event: "init-connect", connections: noncircularConnections}));
                
                connections.push({ws, email: data.email, name: data.name, x: data.x, y: data.y, moving: false});
                email = data.email;
                break;
            case "movement"://args: email, x, y, moving
                player = connections.find(player => {return player.email === data.email});
                player.x = data.x;
                player.y = data.y;
                player.moving = data.moving;

                sendToConnections(data.email, {event: "movement", email: data.email, x: data.x, y: data.y, moving: data.moving});
                break;
            case "emote"://args: email, emoji
                player = connections.find(player => {return player.email === data.email});
                sendToConnections(data.email, {event: "emote", email: data.email, emoji: data.emoji});
                break;
        }
    });

    ws.on('close', () => {
        if(!email)
            return;
        
        sendToConnections(email, {event: "disconnect", email: email});
        connections.splice(connections.findIndex(player => {return player.email === email}), 1);//TODO
    });
});

function sendToConnections(email, data) {
    connections.forEach((player, i) => {
        if(player.email === email)
            return;
        
        player.ws.send(JSON.stringify(data));
    });
}

function isGuest(data){
    return data.name.toLowerCase().includes('guest');
}