let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let poker = require('./node-poker');
const PORT = process.env.PORT || 3000;
const TIMEOUT = 60000;
const CHIPS = 1000;
const SMALLBLIND = 50;
const BIGBLIND = 100;
const MINPLAYERS = 2;
const MAXPLAYERS = 6;
const MINBUYIN = 100;
const MAXBUYIN = 200;
let table = new poker.Table(SMALLBLIND, BIGBLIND, MINPLAYERS, MAXPLAYERS, MINBUYIN, MAXBUYIN);
let playerIndex = 0;
let numOfPlayers = 0;
server.listen(PORT);

app.get('/', function (req, res) {
  res.status(200).send("OK");
});

function startGame(){
    this.socket.broadcast.emit('start game');
    table.StartGame();
    socket.broadcast.emit('player turn', table);
}

io.on('connection', function (socket) {
  socket.emit('start session', {});
  socket.on('add player', function (data) {
    const name = data.playerName;
    table.AddPlayer(name, CHIPS);
    socket.broadcast.emit('player added');
    numOfPlayers++;
    if (numOfPlayers == table.minPlayers){
        setTimeout(startGame.bind(this), TIMEOUT);
    }
    if (numOfPlayers == table.maxPlayers){
        clearTimeout(startGame);
        startGame();
    }
  });
  socket.on('player action', function (data){
    const {action, playerName, amount} = data;
    switch(action) {
        case "bet":
            table.bet(playerName, amount);
            break;
        case "check":
            table.check(playerName);
            break;
        case "fold":
            table.fold(playerName);
        case "call":
            table.call(playerName);
            break;
        case "allin":
        if (playerName === this.players[table.currentPlayer].playerName){
            table.players[table.currentPlayer].AllIn();
        } 
    }
    socket.broadcast.emit('player turn', table);
  })
});