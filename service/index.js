const { WebSocketServer } = require('ws');
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(express.static('../'));

app.set('trust proxy', true);

const usersRoute = require('./players-api');
app.use('/api/users', usersRoute);

// serve static
app.use(express.static('public'));

//if visited unknown, goto homepage
app.use((req, res) => {
    res.sendFile('index.html', { root: 'public' });
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
            case "connect"://args: email, name, x, y, bobblehead
                if(data.name === 'GUEST'){
                    guestCount++;
                    data.name += '-' + guestCount;
                    ws.send(JSON.stringify({event: 'guest-data', name: data.name}));
                }

                let testIndex = connections.findIndex(player => {return player.email === data.email});
                if(testIndex !== -1)
                    sendToConnections('', {event: "disconnect", email: data.email});
                sendToConnections(data.email, {event: "connect", email: data.email, name: data.name, x: data.x, y: data.y, bobblehead: data.bobblehead});
                const noncircularConnections = connections.map((val, i) => {
                    return {
                        email: val.email,
                        name: val.name,
                        x: val.x,
                        y: val.y,
                        moving: val.moving,
                        sitting: val.sitting,
                        orientation: val.orientation,
                        sleeping: val.sleeping,
                        bobblehead: val.bobblehead,
                    };
                });
                ws.send(JSON.stringify({event: "init-connect", connections: noncircularConnections}));
                
                connections.push({ws, email: data.email, name: data.name, x: data.x, y: data.y, moving: false, bobblehead: data.bobblehead});
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
                sendToConnections(data.email, {event: "emote", email: data.email, emoji: data.emoji});
                break;
            case "sit"://args: email, sitting, orientation
                player = connections.find(player => {return player.email === data.email});
                player.sitting = data.sitting;
                player.orientation = data.orientation;
                sendToConnections(data.email, {event: "sit", email: data.email, sitting: data.sitting, orientation: data.orientation});
                break;
            case "sleep"://args: email
                player = connections.find(player => {return player.email === data.email});
                player.sleeping = data.sleeping;
                sendToConnections(data.email, {event: "sleep", email: data.email, sleeping: data.sleeping});
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
