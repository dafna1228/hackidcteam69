let socket = io('http://localhost');
let gameTable;
socket.on("playerLogin", (data) =>{
    let playerManager = AFRAME.scenes[0].components['player-manager'];
    while(!playerManager){
        playerManager = AFRAME.scenes[0].components['player-manager'];
    }
    playerManager.addPlayer(data);
    playerManager.setPlayerName(data);
})
socket.on("startGame", (data) => {
    // Lock Add Players
    // Add Spectators?
    gameTable = data;
    playerManager.dealCards(gameTable);
    console.log("Started game on client");
});
socket.on("startRound", (data) => {
  
   
})
socket.on("playerTurn", (data)=> {
    playerManager.updateChips(data);
    playerManager.runTurn(data);
})
ocket.on("revealFlop", (data) => {
    playerManager.revealTableCenter('flop'); 
});
socket.on("revealTurn", (data) => {
    playerManager.revealTableCenter('turn');
});
socket.on("revealRiver", (data) => {
    playerManager.revealTableCenter('river');
});
socket.on("endRound", (data) => {
    playerManager.showWinner(data);
    playerManager.discardCards(data);
    playerManager.updateChips(data);
})
socket.on("removePlayer", (data) =>{
    const playerManager = AFRAME.scenes[0].components['player-manager'];
    playerManager.removePlayer(data);
})
socket.on("updatePlayerRotation", (data) => {
    const playerManager = AFRAME.scenes[0].components['player-manager'];
    playerManager.updatePlayerRotation(data);  
})
