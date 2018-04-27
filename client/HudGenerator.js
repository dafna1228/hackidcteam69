//const bind = AFRAME.utils.bind;


AFRAME.registerComponent('hudgenerator', {
    schema: { 
        name: {default: 'hello'}
    },


    getChipsString: function(chips){
        return "Chips: "+chips;
    },
    getBidString: function (currentBid) {
        return "Current bid: "+ currentBid;
    },
  
    init: function () {
        let el= this.el;
        let data = this.data;


    let chipsTextLabel=document.createElement('a-text');
        chipsTextLabel.setAttribute("id","chipsLabel");
        chipsTextLabel.setAttribute("value",data.chips);//TODO: your chips
        chipsTextLabel.setAttribute("color","white");
        chipsTextLabel.setAttribute("position","-4.556 3.15 -3.76");
        //chipsTextLabel.setAttribute("rotation","6.31 ")
        chipsTextLabel.setAttribute("width","10");
        //AFRAME.scenes[0].appendChild(textLabel);
        this.el.appendChild(chipsTextLabel);
        

        let currentBidTextLabel=document.createElement('a-text');
        currentBidTextLabel.setAttribute("id","currentBitLabel");
        currentBidTextLabel.setAttribute("value",data.currentBid);//TODO  the current bid
        currentBidTextLabel.setAttribute("color","white");
        currentBidTextLabel.setAttribute("position","0.93 3.12 -3.76");
       // currentBidTextLabel.setAttribute("rotation","30 -36 0");
        currentBidTextLabel.setAttribute("width","10");
        //AFRAME.scenes[0].appendChild(textLabel);
        this.el.appendChild(currentBidTextLabel);
    
    
    },


    update: function(){
        let data = this.data;
      
        chipsTextLabel= document.getElementById("chipsLabel");
        chipsTextLabel.setAttribute("value",data.chips);
        currentBidTextLabel =  document.getElementById("currentBitLabel");
        chipsTextLabel.setAttribute("value",data.currentBid);
      //  textLabel.setAttribute("value",data.chipsCount);

    }



  });