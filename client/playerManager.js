const bind = AFRAME.utils.bind;

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const playerPositions = {
  player1: {
    position: '1 1 1',
    rotation: '0 0 0'
  },
  player2: {
    position: '-1 -1 -1',
    rotation: '0 90 0'
  },
}

AFRAME.registerComponent('playerManager', {
  schema: {
    radius: {type: 'number', default: 1}
  },

  init: function() {
    this.player = document.getElementById('player');
    this.playerId = makeid();
    this.bindMethods();
    socket.emit('newPlayer', {id: playerId});
  },

  bindMethods: function () {
    this.setPlayerId = bind(this.setPlayerName, this);
    this.addPlayer = bind(this.addPlayer, this);
    this.removePlayer = bind(this.removePlayer, this);
    this.updateGameData = bind(this.updateGameData, this);
    this.getPlayerData = bind(this.removePlayer, this);
  },

  setPlayerName: function (playerName, id) {
    if(id === this.playerId) {
      this.playerName = playerName;
      this.player.setAttribute('position', playerPositions[this.playerName].position);
      this.player.setAttribute('rotation', playerPositions[this.playerName].rotation);
      let playerData = getPlayerData();
      if(playerData){
        emit('updatePlayerData', playerData);
      }
    }
  },

  addPlayer: function (newPlayer){
    if(this.playerId !== newPlayer.playerId) {
      let newPlayerRig = document.createElement('a-entity');
      newPlayerRig.setAttribute('id', newPlayer.playerName);
      newPlayerRig.setAttribute('name', newPlayer.playerName);
      newPlayerRig.setAttribute('position', playerPositions[playerName].position);
      newPlayerRig.setAttribute('rotation', playerPositions[this.playerName].rotation);
      let newPlayer = document.createElement('a-box');
      newPlayerRig.setAttribute('id', newPlayer.playerId);
      newPlayer.setAttribute('rotation', newPlayer.rotation);
      this.newPlayerRig.appendChild(newPlayer);
      this.el.appendChild(newPlayer);
    }
  },

  removePlayer: function (player){
    if(this.playerId !== player.playerName) {
      let playerEntity = document.getElementById(player.playerName);
      this.el.removeChild(playerEntity);
    }
  },

  updateGameData: function (gameData) {
    this.gameData = gameData;
  },

  tick: function (){
    //update positions
    
    const playerTransforms = this.gameData.playerTransforms;
    for(let player in playerTransforms){
      const playerData = playerTransforms[player];
      let playerEntity = document.getElementById(playerData.playerId);
      playerEntity.setAttribute('rotation',playerData.rotation)
    }

    // update all player game data (money, whatever)

    // update game state (who's turn)
    },

  getPlayerData: function (){
    let camera = document.getElementById('camera');
    let newRotation = camera.getAttribute('rotation');
    if(this.rotation !== newRotation){
      this.position = newPosition;
      this.rotation = newRotation;
      return {playerId: this.playerId, newRotation};
    }
    return null;
  }
});