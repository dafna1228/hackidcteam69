//const bind = AFRAME.utils.bind;


AFRAME.registerComponent('hud', {
    schema: { 
        chips: {default: 1000}
    },


    getChipsString: function(chips){
        return "Chips: "+chips;
    },
    getBidString: function (currentBid) {
        return "Current bid: "+ currentBid;
    },
  
    init: function () {
    let el= this.el;
    const {chips, currentBid} = this.data;

    // info
    let HUDFrame = document.createElement('a-plane');
    HUDFrame.setAttribute('id', 'playerHUD');
    HUDFrame.setAttribute('color', '#777');
    HUDFrame.setAttribute('material', 'opacity:0.8');
    HUDFrame.setAttribute('position', '-2.5 1 -2');
    HUDFrame.setAttribute('scale', '1 1 1');
    this.el.appendChild(HUDFrame);
    let chipsTextLabel=document.createElement('a-text');
        chipsTextLabel.setAttribute("id","chipsLabel");
        chipsTextLabel.setAttribute("value",this.getChipsString(chips));
        chipsTextLabel.setAttribute("width","3");
        chipsTextLabel.setAttribute("color","black");
        chipsTextLabel.setAttribute("position","-.5 .4 0");
        HUDFrame.appendChild(chipsTextLabel);
    let bindTextLabel=document.createElement('a-text');
    bindTextLabel.setAttribute("id","bidLabel");
    bindTextLabel.setAttribute("value",this.getBidString(currentBid));
    bindTextLabel.setAttribute("width","3");
    bindTextLabel.setAttribute("color","black");
    bindTextLabel.setAttribute("position","-.5 .2 0");
        HUDFrame.appendChild(bindTextLabel);


    // Make Action Buttons

    let callFrame = document.createElement('a-plane');
    callFrame.setAttribute('id', 'callFrame');
    callFrame.setAttribute('color', '#600');
    callFrame.setAttribute('material', 'opacity:1');
    callFrame.setAttribute('position', '-3.5 -1 -2');
    callFrame.setAttribute('scale', '0.5 0.5 0');
    this.el.appendChild(callFrame);
    let callLabel=document.createElement('a-text');
    callLabel.setAttribute("id","chipsLabel");
    callLabel.setAttribute("value","Call");
    callLabel.setAttribute("width","7");
    callLabel.setAttribute("color","black");
    callLabel.setAttribute("position","-.3 0 0");
    callFrame.appendChild(callLabel); 
    callFrame.addEventListener('click', () => socket.emit("playerAction",{action: 'call', playerName: this.getPlayerName(), amount: undefined}));

    
    let foldFrame = document.createElement('a-plane');
    foldFrame.setAttribute('id', 'foldFrame');
    foldFrame.setAttribute('color', '#00F');
    foldFrame.setAttribute('material', 'opacity:1');
    foldFrame.setAttribute('position', '-3 -1 -2');
    foldFrame.setAttribute('scale', '0.5 0.5 0');
    this.el.appendChild(foldFrame);
    let foldLabel=document.createElement('a-text');
    foldLabel.setAttribute("id","foldLabel");
    foldLabel.setAttribute("value","Fold");
    foldLabel.setAttribute("width","7");
    foldLabel.setAttribute("color","black");
    foldLabel.setAttribute("position","-.4 0 0");
    foldFrame.appendChild(foldLabel); 
    foldFrame.addEventListener('click', () => socket.emit("playerAction",{action: 'fold', playerName: this.getPlayerName(), amount: undefined}));

    let checkFrame = document.createElement('a-plane');
    checkFrame.setAttribute('id', 'checkFrame');
    checkFrame.setAttribute('color', '#0D0');
    checkFrame.setAttribute('material', 'opacity:1');
    checkFrame.setAttribute('position', '-3.5 -0.5 -2');
    checkFrame.setAttribute('scale', '0.5 0.5 0');
    this.el.appendChild(checkFrame);
    let checkLabel=document.createElement('a-text');
    checkLabel.setAttribute("id","checkLabel");
    checkLabel.setAttribute("value","Check");
    checkLabel.setAttribute("width","7");
    checkLabel.setAttribute("color","black");
    checkLabel.setAttribute("position","-.4 0 0");
    checkFrame.appendChild(checkLabel); 
    checkFrame.addEventListener('click', () => socket.emit("playerAction",{action: 'check', playerName: this.getPlayerName(), amount: undefined}));

    let betFrame = document.createElement('a-plane');
    betFrame.setAttribute('id', 'betFrame');
    betFrame.setAttribute('color', '#DD0');
    betFrame.setAttribute('material', 'opacity:1');
    betFrame.setAttribute('position', '-3 -0.5 -2');
    betFrame.setAttribute('scale', '0.5 0.5 0');
    this.el.appendChild(betFrame);
    let betLabel=document.createElement('a-text');
    betLabel.setAttribute("id","betLabel");
    betLabel.setAttribute("value","Bet");
    betLabel.setAttribute("width","7");
    betLabel.setAttribute("color","black");
    betLabel.setAttribute("position","-.4 0 0");
    betFrame.appendChild(betLabel); 
    betFrame.addEventListener('click', () => {
        socket.emit("playerAction",{action: 'bet', playerName: this.getPlayerName(), amount: 50})});
    },

    getPlayerName: function() {
        return AFRAME.scenes[0].components['player-manager'].playerName;
    },

    update: function () {
        let data = this.data;

    }



  });