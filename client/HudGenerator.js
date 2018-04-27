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

    let HUDFrame = document.createElement('a-plane');
    HUDFrame.setAttribute('id', 'playerHUD');
    HUDFrame.setAttribute('color', '#777');
    HUDFrame.setAttribute('material', 'opacity:0.6');
    HUDFrame.setAttribute('position', '-2 0.4 -1');
    HUDFrame.setAttribute('scale', '1 1 1');
    this.el.appendChild(HUDFrame);
    let chipsTextLabel=document.createElement('a-text');
        chipsTextLabel.setAttribute("id","chipsLabel");
        chipsTextLabel.setAttribute("value","It's over 9000");
        chipsTextLabel.setAttribute("color","black");
        chipsTextLabel.setAttribute("position","0 0 0");
        //chipsTextLabel.setAttribute("rotation","6.31 ")
    //     chipsTextLabel.setAttribute("width","10");
        HUDFrame.appendChild(chipsTextLabel);
        

    //     let currentBidTextLabel=document.createElement('a-text');
    //     currentBidTextLabel.setAttribute("id","currentBitLabel");
    //     currentBidTextLabel.setAttribute("value",data.currentBid);//TODO  the current bid
    //     currentBidTextLabel.setAttribute("color","white");
    //     currentBidTextLabel.setAttribute("position","0.93 3.12 -3.76");
    //    // currentBidTextLabel.setAttribute("rotation","30 -36 0");
    //     currentBidTextLabel.setAttribute("width","10");
    //     //AFRAME.scenes[0].appendChild(textLabel);
    //     this.el.appendChild(currentBidTextLabel);
    let actionHUD = document.createElement('a-plane');
    actionHUD.setAttribute('id', 'actionHUD');
    actionHUD.setAttribute('color', '#777');
    actionHUD.setAttribute('material', 'opacity:0.6');
    actionHUD.setAttribute('position', '0 -0.4 -1');
    actionHUD.setAttribute('scale', '2 0.3 0');
    this.el.appendChild(actionHUD);    
    let call = document.createElement('a-plane');
    call.setAttribute('id', 'call');
    call.setAttribute('color', '#A00');
    call.setAttribute('material', 'opacity:0.6');
    call.setAttribute('position', '-0.8 -0.4 -0.9');
    call.setAttribute('scale', '0.2 0.1 0.1');
    call.setAttribute('text', `value: Hello World`);
    this.el.appendChild(call);        


    },

    update: function () {
        let data = this.data;
      
        // chipsTextLabel= document.getElementById("chipsLabel");
        // chipsTextLabel.setAttribute("value",data.chips);
        // currentBidTextLabel =  document.getElementById("currentBitLabel");
        // chipsTextLabel.setAttribute("value",data.currentBid);
      //  textLabel.setAttribute("value",data.chipsCount);

    }



  });