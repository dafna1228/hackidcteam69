let socket = io('http://localhost');
socket.on("playerLogin", (data) =>{
    let playerManager = AFRAME.scenes[0].components['player-manager'];
    while(!playerManager){
        playerManager = AFRAME.scenes[0].components['player-manager'];
    }
    playerManager.addPlayer(data);
    playerManager.setPlayerName(data);
})
socket.on("startGame", (table) => {
    // Lock Add Players
    // Add Spectators?
    let playerManager = AFRAME.scenes[0].components['player-manager'];
    while(!playerManager){
        playerManager = AFRAME.scenes[0].components['player-manager'];
    }
    //console.log(hands);
    playerManager.dealCards(table);
    console.log("Started game on client");
});

socket.on("playerTurn", (data)=> {
    let playerManager = AFRAME.scenes[0].components['player-manager'];
    while(!playerManager){
        playerManager = AFRAME.scenes[0].components['player-manager'];
    }
    // playerManager.updateChips(data);
    // playerManager.runTurn(data);
})
socket.on("changedRound", (data) => {
    let playerManager = AFRAME.scenes[0].components['player-manager'];
    while(!playerManager){
        playerManager = AFRAME.scenes[0].components['player-manager'];
    }
    playerManager.revealTableCenter(data); 
});
socket.on("gameOver", (data) => {
    let playerManager = AFRAME.scenes[0].components['player-manager'];
    while(!playerManager){
        playerManager = AFRAME.scenes[0].components['player-manager'];
    }
    playerManager.showWinner(data);
    playerManager.discardCards(data);
    playerManager.updateChips(data); // Should show the pot going to the winner
})
socket.on("removePlayer", (data) =>{
    let playerManager = AFRAME.scenes[0].components['player-manager'];
    while(!playerManager){
        playerManager = AFRAME.scenes[0].components['player-manager'];
    }    playerManager.removePlayer(data);
})
socket.on("updatePlayerRotation", (data) => {
    let playerManager = AFRAME.scenes[0].components['player-manager'];
    while(!playerManager){
        playerManager = AFRAME.scenes[0].components['player-manager'];
    }    playerManager.updatePlayerRotation(data);  
})
