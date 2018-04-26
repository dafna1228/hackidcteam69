
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
    turnBet: { action: undefined, playerName: playerName, amount: undefined }, 
    table:
    Table = {
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
         }

  // add player
  socket.on('start session', function add_player(){
    const name = prompt("Please enter your name", "Write Here");
    Player.playerName = name;
    const data = {"playerName": name};
    socket.emit("add player", data); 
  });

  // tell player that he was added
  socket.on('player added', function player_added(player){
    console.log("Added new player " + player.playerName);
  });

  // start game, get all player details
  socket.on('start game', function getPlayerDetails(playerObject){
    // do things with player object- should contain :
    // cards array, num chips, other player names, cards on table, etc... 
    Player = playerObject
  });

  // my turn
  socket.on('player turn', function turn(TableObject){
      Player.Table = TableObject;
      // if it's my turn
    if (Player.Table.currentPlayer == Player.playerName){
        // if the player doesnt choose action in 60 secs, send "call" action to the server
        setTimeout(sendAction.bind(this, { action: 'call', playerName: Player.playerName}), TIMEOUT);
        // put player action in this json
        sendAction({ action: 'call', playerName: Player.playerName})
        }
    }
  );

  // function to send the turn action to the socket
  function sendAction(action_json){
    this.socket.emit("player action", action_json)

}

  // show me the result of the turn
  socket.on('TurnResult', function turn(PlayerObject){
    //parse the result of the turn
    Player = PlayerObject;

  });
