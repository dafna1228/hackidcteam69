
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// load the poker funcions
let poker = require('./node-poker');
// init poker game
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
  self.send_header('Access-Control-Allow-Origin', '*')

});

function startGame(socket){
    socket.broadcast.emit('startGame');
    socket.emit('startGame');
    table.StartGame();
    console.log("started game on server");
    socket.broadcast.emit('playerTurn', tableToJSON(table));
    socket.emit('playerTurn', tableToJSON(table));
    console.log("It's " + table.currentPlayer + "'s turn");
}

io.on('connection', function (socket) {
  console.log("can make connection");
  socket.emit('start session', {});
  socket.on('newPlayer', function (data) {
    let newPlayerName = findPlayer();
    let playerId = data.playerId;
    console.log('added player', newPlayerName);
    gameData.players[newPlayerName].playerId = playerId;
    // add the player to the game
    table.AddPlayer(playerName, CHIPS);
    socket.broadcast.emit("playerLogin", {playerName: newPlayerName, playerId, players: gameData.players});
    socket.emit("playerLogin", {playerName: newPlayerName, playerId, players: gameData.players});
    // start game of there are 4 players
    numOfPlayers++;
    if (numOfPlayers == table.maxPlayers){
        startGame(socket);
    }
  });
  if (poker.checkForEndOfRound(table)) {
    socket.broadcast.emit("endRound")
    socket.emit("changedRound", {tableCards: table.game.board, round: table.gameLosers.roundName});
    } else if (table.roundStarted) {
        socket.broadcast.emit("startRound")
        table.roundStarted = false;
    }
  socket.on('updateRotation', function (data) {
    const {playerId, playerName, rotation} =  data;
    gameData.players[playerName].rotation = rotation;    
    socket.broadcast.emit("updatePlayerRotation", {playerId, rotation});
  })
});

io.on('playerAction', function (data){
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
            socket.emit('removePlayer', table);
        case "call":
            table.call(playerName);
            break;
        case "allin":
        if (playerName === this.players[table.currentPlayer].playerName){
            table.players[table.currentPlayer].AllIn();
        } 
    }
    if (!table.gameOver){
        socket.broadcast.emit('playerTurn', tableToJSON(table));
        socket.emit('playerTurn', tableToJSON(table));
    } else {
        socket.broadcast.emit('gameOver', tableToJSON(table));
        socket.emit('gameOver', tableToJSON(table));
    }
  })


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
    tableJSON["roundStarted"] = table.roundStarted;
    return tableJSON;
    }
