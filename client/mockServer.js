
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80, () => console.log('listening on port 80'));

let gameData = {
    players: {
        player1: {
            playerId: undefined,
            rotation:undefined,
            otherData:undefined
        },
        player2: {
            playerId: undefined,
            rotation: undefined,
            otherData: undefined
        },
        player3: {
            playerId: undefined,
            rotation: undefined,
            otherData: undefined
        },
        player4: {
            playerId: undefined,
            rotation: undefined,
            otherData: undefined
        },
        player5: {
            playerId: undefined,
            rotation: undefined,
            otherData: undefined
        },
        player6: {
            playerId: undefined,
            rotation: undefined,
            otherData: undefined
        }
    },
};
let availablePlayers = {
    player1: false,
    player2: false,
    player3: false,
    player4: false,
    player5: false,
    player6: false,
}

const findPlayer = () => {
    for(playerName in availablePlayers){
        if(!availablePlayers[playerName]){
            availablePlayers[playerName] = true;
            return playerName;            
        }
    }
}

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('newPlayer', function (data) {
    let newPlayerName = findPlayer();
    let playerId = data.playerId;
    console.log('added player', newPlayerName);
    gameData.players[newPlayerName].playerId = playerId;
    socket.broadcast.emit("playerLogin", {playerName: newPlayerName, playerId, players: gameData.players});
    socket.emit("playerLogin", {playerName: newPlayerName, playerId, players: gameData.players});
    
  });
  socket.on('updateRotation', function (data) {
    const {playerId, playerName, rotation} =  data;
    gameData.players[playerName].rotation = rotation;    
    socket.broadcast.emit("updatePlayerRotation", {playerId, rotation});
  })
});