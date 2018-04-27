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
    position: {x:2.5,y: 0.5,z: 0},
    rotation: '0 90 0'
  },
  player2: {
    position: {x:1.9,y: 0.5,z: -1.6},
    rotation: '0 135 0'
  },
  player3: {
    position:{x:0,y: 0.5,z: -2.5},
    rotation: '0 180 0'
  },
  player4: {
    position: {x:-1.9,y: 0.5,z: -1.6},
    rotation: '0 225 0'
  },
  player5: {
    position: {x:-2.5,y: 0.5,z: 0},
    rotation: '0 270 0'
  },
  player6: {
    position: {x:-1.9,y: 0.5,z: 1.6},
    rotation: '0 315 0'
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
      let positionWithOffset = playerPositions[playerName].position;
      positionWithOffset.y+=1.6;
      console.log(positionWithOffset);
      newPlayerRig.setAttribute('id', playerName);
      newPlayerRig.setAttribute('name', playerName);
      newPlayerRig.setAttribute('position', positionWithOffset);
      newPlayerRig.setAttribute('rotation', playerPositions[playerName].rotation);
      let newPlayer = document.createElement('a-obj-model');
      newPlayer.setAttribute('id', playerId);
      newPlayer.setAttribute('rotation', newPlayer.rotation);
      newPlayer.setAttribute('scale', '5 5 5');
      newPlayer.setAttribute('src', '#racoon-obj');
      newPlayer.setAttribute('mtl', '#racoon-mtl');
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
  },

  dealCards: function (data){
    let cards = document.createElement('a-entity');
    AFRAME.utils.entity.setComponentProperty(cards, "cardHand",)

  },

  showTableCenter: function (data){

  },

  showTurn: function (data){

  },

  showRiver: function (data){

  },

  runTurn: function(data){
    // socket.emit("playerAction", data);
    // Data should be a json that contains: 
    // * action (the options are: bet, check, fold, call, allin
    // * playerName
    // * amount (amount to bet - should be undefined in every action but the bet action)
  },
});