const CARD_ORDER = ['flopA','flopB','flopC','turn','river'];
AFRAME.registerComponent("table-center", {
  schema: {
    cards:{
      default:{
        flopA: {x: 0, card: "2S", turned: true },
        flopB: {x: 0, card: "3S", turned: true },
        flopC: {x: 0, card: "4S", turned: false },
        turn: {x: 0, card: "5S", turned: false },
        river: {x: 0, card: "6S", turned: false },
      }
    }
  },

  init: function() {
    // this.putCards = AFRAME.utils.bind(this.putCards, this);
    const data = this.data;
    const el = this.el;
    // create card row
    CARD_ORDER.forEach((card, index)=>{
      let cardEntity = document.createElement('a-entity');
      cardEntity.setAttribute('id', card);
      cardEntity.setAttribute('name', card);
      cardEntity.setAttribute('position', {x: index -3 + (index*0.5), y: 0, z: 0,});
      // console.log('turned card', this.data.cards[card].turned ? { x: 90, y: 0, z: 0 } : { x: -90, y: 0, z: 0 });
      cardEntity.setAttribute("rotation", this.data.cards[card].turned ? { x: 90, y: 0, z: 0 } : { x: -90, y: 0, z: 0 });
      cardEntity.setAttribute("playcard", {name: this.data.cards[card].card});
      this.el.appendChild(cardEntity);
      const playerPosition = document.getElementById('player').getAttribute('position');
      this.el.setAttribute("look-at",{x: playerPosition.x, y: playerPosition.y + 0.5, z: playerPosition.z});
    });
  },

  update: function() {
    // CARD_ORDER.forEach((card, index)=>{
    //   let cardEntity = document.getElementById(card);
    //   if(card){
    //     cardEntity.setAttribute("rotation", card.turned ? { x: 90, y: 0, z: 0 } : { x: -90, y: 0, z: 0 });
    //   }
    // });;
  }
});