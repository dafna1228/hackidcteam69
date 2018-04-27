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
const MAXPLAYERS = 4;
const MINBUYIN = 100;
const MAXBUYIN = 2000;
let table = new poker.Table(SMALLBLIND, BIGBLIND, MINPLAYERS, MAXPLAYERS, MINBUYIN, MAXBUYIN);
let playerIndex = 0;
let numOfPlayers = 0;
server.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

app.get('/', function (req, res) {
  res.status(200).send("OK");
  self.send_header('Access-Control-Allow-Origin', '*')
});

function startGame(socket){
    socket.broadcast.emit('start game');
    socket.emit('start game');
    table.StartGame();
    console.log("started game on server");
    socket.broadcast.emit('player turn', tableToJSON(table));
    socket.emit('player turn', tableToJSON(table));
    console.log("It's " + table.currentPlayer + "'s turn");
}

io.on('connection', function (socket) {
  console.log("can make connection");
  socket.emit('start session', {});
  socket.on('add player', function (data) {
    const name = data.playerName;
    table.AddPlayer(name, CHIPS);
    socket.broadcast.emit('player added');
    socket.emit('player added');
    console.log("server added player");
    numOfPlayers++;
    // if (numOfPlayers == table.minPlayers){
    //     setTimeout(startGame.bind(this), TIMEOUT);
    // }
    if (numOfPlayers == table.maxPlayers){
        //clearTimeout(startGame);
        startGame(socket);
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
    if (!table.gameOver){
        socket.broadcast.emit('player turn', tableToJSON(table));
        socket.emit('player turn', tableToJSON(table));
    } else {
        socket.broadcast.emit('game over', tableToJSON(table));
        socket.emit('game over', tableToJSON(table));
    }
  })
});

function tableToJSON(table){
    tableJSON = {};
    playersJSON = {};
    for (let i = 0; i < table.players.length; i++) {
        playerJSON = {"playerName":table.players[i].playerName,
                      "chips":table.players[i].chips,
                      "folded":table.players[i].folded,
                      "allIn":table.players[i].allIn,
                      "talked":table.players[i].talked,
                      "cards":table.players[i].cards,
                      "turnBet":table.players[i].turnBet};
       playersJSON[i] = playerJSON;
    }   
     tableJSON["players"] = playersJSON;
     gameJSON = {"smallBlind":table.game.smallBlind,
                 "bigBlind":table.game.bigBlind,
                 "pot":table.game.pot,
                 "roundName":table.game.roundName,
                 "betName":table.game.betName,
                 "bets":table.game.bets,
                 "roundBets":table.game.roundBets,
                 "deck":table.game.deck,
                 "board":table.game.board
                }
    tableJSON["game"] = gameJSON;
    tableJSON["currentPlayer"] = table.currentPlayer;          
    tableJSON["minPlayers"] = table.minPlayers;
    tableJSON["maxPlayers"] = table.maxPlayers;
    tableJSON["dealer"] = table.dealer;
    tableJSON["minBuyIn"] = table.minBuyIn;
    tableJSON["maxBuyIn"] = table.maxBuyIn;
    tableJSON["gameWinners"] = table.gameWinners;
    tableJSON["gameLosers"] = table.gameLosers;
    tableJSON["gameOver"] = table.gameOver;
    return tableJSON;
    }


