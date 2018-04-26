let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
require('node-poker');
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
server.listen(80);

app.get('/', function (req, res) {
  res.status(200).send("OK");
});

function startGame(){
    this.socket.emit('start game');
    table.StartGame();
    socket.emit('playerTurn', { name: table.players[playerIndex % numOfPlayers].playerName});
    
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('add player', function (data) {
    const name = data.playerName;
    table.addPlayer(playerName, CHIPS);
    socket.emit('player added');
    numOfPlayers++;
    if (numOfPlayers == table.minPlayers){
        setTimeout(startGame.bind(this), TIMEOUT);
    }
    if (numOfPlayers == table.maxPlayers){
        clearTimeout(startGame);
        startGame();
    }
  });
  socket.on('playerAction', function (data){
    
  })
  socket.emit('playerTurn', { name: table.players[playerIndex % numOfPlayers].playerName });
  playerIndex++;
  // switch case for Check(), Fold(), Bet(bet), Call(), AllIn()
  // emit table after the action
  // timeout 
});