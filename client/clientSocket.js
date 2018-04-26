let socket = io('http://localhost');
socket.on("playerLogin", (data) =>{
    const playerManager = AFRAME.scenes[0].components['player-manager'];
    playerManager.addPlayer(data);
    playerManager.setPlayerName(data.playerName, data.playerId);
})
socket.on("removePlayer", (data) =>{
    const playerManager = AFRAME.scenes[0].components['player-manager'];

    playerManager.removePlayer(data);
})
socket.on("updateGameData", (data) => {
    const playerManager = AFRAME.scenes[0].components['player-manager'];

    playerManager.updateGameData(data.gameData);  
})
//TODO: Add a listener for player leaving