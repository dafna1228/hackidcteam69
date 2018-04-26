let socket = io('http://localhost');
socket.on("playerLogin", (data) =>{
    const playerManager = AFRAME.scenes[0].components['player-manager'];
    playerManager.addPlayer(data);
    playerManager.setPlayerName(data);
})
socket.on("removePlayer", (data) =>{
    const playerManager = AFRAME.scenes[0].components['player-manager'];

    playerManager.removePlayer(data);
})
socket.on("updatePlayerRotation", (data) => {
    const playerManager = AFRAME.scenes[0].components['player-manager'];
    playerManager.updatePlayerRotation(data);  
})
//TODO: Add a listener for player leaving