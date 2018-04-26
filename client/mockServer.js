
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80, () => console.log('listening on port 80'));

let gameData = {
    players: {}
};
let availablePlayers = {
    player1: false,
    player2: false,
    player3: false,
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
    gameData.players[newPlayerName] = playerId;
    console.log({playerName: newPlayerName, playerId});    
    socket.emit("playerLogin", {playerName: newPlayerName, playerId});
  })
  socket.on('my other event', function (data) {
    console.log(data);
  });
});