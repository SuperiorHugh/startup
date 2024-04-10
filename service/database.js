const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const dbUrl = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(dbUrl);
const db = client.db('startup');
const playerCollection = db.collection('player');

(async function testConnection() {
    await client.connect();
    await db.command({ping: 1});
})().catch((e) => {
    console.log(`unable to connect to database. ${e}`);
    process.exit(1);
});

function getPlayer(email){
    return playerCollection.findOne({email: email});
}

function getPlayerFromToken(token){
    return playerCollection.findOne({token: token});
}

const playerVals = [
    //settings
    ["visibleemojis", true],
    ["darkmode", false],
    ["autosleep", '100'],
    ["mutegame", false],
    ["mastervolume", '100'],
    ["emojivolume", '100'],
    ["bobblehead", false],

    //data
    ["emotesused", 0],
    ["purchased", []],
    ["testing", 0],

    //updating
    ["accountver", 2], //change val in user_handler.js if updating accountver
];

async function createPlayer(email, username, password){
    const passwordHash = await bcrypt.hash(password, 10);

    const player = {
        //credentials
        email: email, 
        username: username, 
        password: passwordHash,
        token: uuid.v4(),
    };
    playerVals.forEach((val, i) => {
        player[val[0]] = val[1];
    });

    await playerCollection.insertOne(player);
    return player;
}

function getTopPlayers(amt){
    const query = {};
    const options = {
        sort: {emotesused: -1},
        limit: amt,
    };
    const cursor = playerCollection.find(query, options);
    return cursor.toArray();
}

function editSetting(email, setting, newval) {
    playerCollection.updateOne(
        { email: email },
        {$set: {[setting]: newval }},
    );
}

function addEmote(email, amt){
    playerCollection.updateOne(
        {email: email},
        {$inc: {emotesused: amt}},
    );
}

function purchasedEmote(email, emote){
    playerCollection.updateOne(
        {email: email},
        {$push: {purchased: emote}},
    );
}

async function updatePlayer(user){
    for (const val of playerVals) {
        if(user[val[0]] === undefined || val[0] === 'accountver'){
            await playerCollection.updateOne(
                {email: user.email},
                {$set: {[val[0]]: val[1]}},
                {upsert: true}
            );
        }
    }
}

module.exports = {
    getPlayer,
    getPlayerFromToken,
    createPlayer,
    getTopPlayers,
    editSetting,
    addEmote,
    purchasedEmote,
    updatePlayer,
};
