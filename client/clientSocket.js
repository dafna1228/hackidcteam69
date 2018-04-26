let socket = io('http://localhost');
socket.on("playerLogin", (data) =>{
    const playerManager = AFRAME.scenes[0].component.playerManager;
    playerManager.setPlayerName(data.playerName, data.playerId);
})
socket.on("removePlayer", (data) =>{
    const playerManager = AFRAME.scenes[0].component.playerManager;

    playerManager.removePlayer(data);
})
socket.on("addPlayer", (data) =>{
    const playerManager = AFRAME.scenes[0].component.playerManager;

    playerManager.addPlayer(data);
})
socket.on("updateGameData", (data) => {
    const playerManager = AFRAME.scenes[0].component.playerManager;

    playerManager.updateGameData(data.gameData);  
})
//TODO: Add a listener for player leaving