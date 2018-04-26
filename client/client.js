
const socket = io.connect('http://localhost');
const MOVE_TIMEOUT = 60;
const Player = {
    playerName: undefined,
    chips: undefined,
    folded: false,
    allIn: false,
    talked: true,
    // example for cards: [ '4H', '5S' ]
    cards: [Array],
    // for example: { action: 'bet', playerName: 'jane', amount: 50 }
    turnAction: { action: undefined, playerName: playerName, amount: undefined } }

const Table = {
        cardsOnTable: [Array],
        smallBlind: undefined,
        bigBlind: undefined,
        players: [Array],
        dealer: undefined,
        minBuyIn: undefined,
        maxBuyIn: undefined,
        turnBet: {action: undefined, playerName: undefined, amount: undefined},
        gameWinners: [Array],
        gameLosers: [Array],
        game:
         Game = {
           smallBlind: undefined,
           bigBlind: undefined,
           pot: undefined,
           roundName: undefined,
           betName: undefined,
           bets: [Array],
           roundBets: [Array],
           deck: [Array],
           board: [Array] },
        currentPlayer: undefined }

  // add player
  socket.on('startSession', function add_player(socket){
    const name = prompt("Please enter your name", "Write Here");
    Player.playerName = name;
    socket.emit("playerName", name); 
  });

  // start game, get all player details
  socket.on('startGame', function getPlayerDetails(socket, playerObject){
    // do things with player object- should contain :
    // cards array, num chips, other player names, cards on table, etc... 
    Player.chips = playerObject.chips
    Player.folded = playerObject.folded
    Player.allIn = playerObject.allIn;
    Player.talked = playerObject.talked;
    Player.cards = playerObject.cards;
  });

  // my turn
  socket.on('playerTurn', function turn(socket, playerTurn){
      Table = playerTurn.Table;
    if (playerTurn == myName){
        Table = playerTurn.Table;
      // set Player.turnAction with the turn
      socket.emit("turnAction", Player.turnAction)
    }
  });

  // show me the result of the turn
  socket.on('TurnResult', function turn(socket, TableObject){
    //parse the result of the turn
    Table = playerTurn.Table;

  });
