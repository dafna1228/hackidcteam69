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
    position: '5 0 -5',
    rotation: '0 90 0'
  },
}

AFRAME.registerComponent('player-manager', {
  schema: {
    radius: {type: 'number', default: 1}
  },

  init: function() {
    this.player = document.getElementById('player');
    this.playerId = makeid();
    this.gameData = {};
    this.rotation = new THREE.Vector3();
    this.bindMethods();
    socket.emit('newPlayer', {playerId: this.playerId});
  },

  bindMethods: function () {
    this.setPlayerName = bind(this.setPlayerName, this);
    this.addPlayer = bind(this.addPlayer, this);
    this.removePlayer = bind(this.removePlayer, this);
    this.updatePlayerRotation = bind(this.updatePlayerRotation, this);
    this.updateRotation = bind(this.updateRotation, this);
  },

  setPlayerName: function (data) {
    const {playerName, playerId, players} = data;
    if(playerId === this.playerId) {
      this.playerName = playerName;
      this.player.setAttribute('position', playerPositions[this.playerName].position);
      this.player.setAttribute('rotation', playerPositions[this.playerName].rotation);
      for(let player in players){
        const playerData = players[player];
        if(playerData.playerId && playerData.playerId !== playerId){
          this.addPlayer({playerName: player, playerId: playerData.playerId});
        }
      }
      setInterval(this.updateRotation, 24);
    }
  },

  addPlayer: function (newPlayer){
    const {playerName, playerId} = newPlayer;
    if(this.playerId !== playerId) {
      let newPlayerRig = document.createElement('a-entity');
      newPlayerRig.setAttribute('id', playerName);
      newPlayerRig.setAttribute('name', playerName);
      newPlayerRig.setAttribute('position', playerPositions[playerName].position);
      newPlayerRig.setAttribute('rotation', playerPositions[playerName].rotation);
      let newPlayer = document.createElement('a-box');
      newPlayer.setAttribute('id', playerId);
      newPlayer.setAttribute('rotation', newPlayer.rotation);
      newPlayer.setAttribute('material', 'color: red');
      newPlayerRig.appendChild(newPlayer);
      this.el.appendChild(newPlayerRig);
    }
  },

  removePlayer: function (player){
    if(this.playerId !== player.playerName) {
      let playerEntity = document.getElementById(player.playerName);
      this.el.removeChild(playerEntity);
    }
  },

  updatePlayerRotation: function (data) {
    const {playerId, rotation} = data;
    let playerEntity = document.getElementById(playerId);
    if(this.playerId !== playerId)
      if(playerEntity){
        playerEntity.setAttribute('rotation',rotation);
      }
    },

  updateRotation: function (){
    let camera = document.getElementById('camera');
    const newRotation = camera.getAttribute('rotation');
    if(this.playerId && this.playerName){
      socket.emit('updateRotation',{playerId: this.playerId, rotation: newRotation, playerName: this.playerName});
    }
  }
});