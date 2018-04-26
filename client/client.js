
const socket = io.connect('http://localhost');
const MOVE_TIMEOUT = 60;
const Player = {
    playerName: undefined,
    chips: undefined,
    folded: false,
    allIn: false,
    talked: true,
    // example for cards: [ '4H', '5S' ]
    cards: [],
    // for example: { action: 'bet', playerName: 'jane', amount: 50 }
    turnBet: { action: undefined, playerName: undefined, amount: undefined }, 
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

/*
//============================================
//                 player logic
//============================================
function fold()
{
  player.folded = true;
  player.talked = false;
  player.allIn= false; //from wikipedia, a fold can be done even after an all in
  player.turnBet={action: "folded", playerName: playerName, amount: 0};//TODO: make sure this is correct
  player.chips= player.chips//amount stays the same 

 //TODO:Send to server?

}



//takes from the server the max bet,   and removes the amount from the players cach
function call(maxBet) //TODO: needs to recive MaxBet from the server first
{

  player.talked=true;
  
  player.turnBet={action:"call", playerName: player.playerName, amount: maxBet};

  player.chips -= maxBet;


  //TODO:Send to server?
}


//will answer if the call button needs to be rendered
function CanPlayerCall(maxBet)
{
  if(player.allIn || player.folded)
  {return false;}

  if(player.chips < maxBet)
  {
    return false;
  }

  
  return true;

}


function allIn()
{
  player.allIn = true;
  palyer.talked= ture; //acroding to node-poker.js line 1050
  
  player.turnBet={action:"allin" , playerName: player.playerName, amount: player.chips};
  player.chips=0;

  //TODO:Send to server?
}





*/

//===========================================
//                 sockets
//===========================================

//things that need reciving:      getMaxBet





  // add player
  socket.on('start session', function add_player(){
    console.log("started session");
    const name = prompt("Please enter your name", "Write Here");
    Player.playerName = name;
    const data = {"playerName": name};
    socket.emit("add player", data); 
  });

  // tell player that he was added
  socket.on('player added', function player_added(player){
    console.log("Added new player " + Player.playerName);
  });

  // start game, get all player details
  socket.on('start game', function getPlayerDetails(playerObject){
    // do things with player object- should contain :
    // cards array, num chips, other player names, cards on table, etc... 
    Player = playerObject
  });

  // my turn
  socket.on('player turn', function turn(tableJSON){
      // if it's my turn
    if (tableJSON.currentPlayer == Player.playerName){
        // if the player doesnt choose action in 60 secs, send "call" action to the server
        //setTimeout(sendAction.bind(this, { action: 'call', playerName: Player.playerName}), TIMEOUT);
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
