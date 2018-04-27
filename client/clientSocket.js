let socket = io('http://localhost');
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
});
socket.on("startRound", (data) => {
    playerManager.dealCards(data);
    playerManager.revealTableCenter('flop');    
})
socket.on("playerTurn", (data)=> {
    player.updateChips(data);
    playerManager.runTurn(data);
})
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
