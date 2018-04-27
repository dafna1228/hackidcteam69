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
    playerManager.dealCards(hands);
    console.log("Started game on client");
});
//socket.on("startRound", (data) => {

//})
socket.on("playerTurn", (data)=> {
    playerManager.updateChips(data);
    playerManager.runTurn(data);
})
socket.on("changedRound", (data) => {
    playerManager.revealTableCenter(data); 
});
socket.on("gameOver", (data) => {
    playerManager.showWinner(data);
    playerManager.discardCards(data);
    playerManager.updateChips(data); // Should show the pot going to the winner
})
socket.on("removePlayer", (data) =>{
    const playerManager = AFRAME.scenes[0].components['player-manager'];
    playerManager.removePlayer(data);
})
socket.on("updatePlayerRotation", (data) => {
    const playerManager = AFRAME.scenes[0].components['player-manager'];
    playerManager.updatePlayerRotation(data);  
})
