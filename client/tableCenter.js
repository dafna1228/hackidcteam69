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
    },
    visible:{default: true}
  },

  init: function() {
  },

  update: function() {
    const el = this.el;
    const {cards, visible} = this.data;
    CARD_ORDER.forEach((card, index)=>{
      let cardEntity = document.createElement('a-entity');
      cardEntity.setAttribute('id', card);
      cardEntity.setAttribute('name', card);
      cardEntity.setAttribute('position', {x: index -3 + (index*0.5), y: 0, z: 0,});
      cardEntity.setAttribute("rotation", cards[card].turned ? { x: 90, y: 0, z: 0 } : { x: -90, y: 0, z: 0 });
      cardEntity.setAttribute("playcard", {name: cards[card].card});
      this.el.appendChild(cardEntity);
      const playerPosition = document.getElementById('player').getAttribute('position');
    });
    const playerPosition = document.getElementById('player').getAttribute('position');    
    this.el.setAttribute("look-at",{x: playerPosition.x, y: playerPosition.y + 0.5, z: playerPosition.z});
    this.el.setAttribute('visible', visible);
  }
});