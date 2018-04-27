const HAND_ORDER = ['card1', 'card2'];
console.log('read file');
AFRAME.registerComponent("card-hand", {
    schema: {
      cards: {
        default: {
          card1: '2S',
          card2: '3S'
      },
      },
      visible: {default:true}
    },
  
    update: function() {
      const {cards, visible} = this.data;
      const el = this.el;
      // create card row
      HAND_ORDER.forEach((card, index)=>{
        let cardEntity = document.createElement('a-entity');
        cardEntity.setAttribute('id', card);
        cardEntity.setAttribute('name', card);
        cardEntity.setAttribute('position', {x: index + (index*0.5), y: 0, z: 0,});
        cardEntity.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        cardEntity.setAttribute("playcard", {name: cards[card]});
        this.el.appendChild(cardEntity);
      });
      const playerPosition = document.getElementById('player').getAttribute('position');
      this.el.setAttribute("look-at",{x: playerPosition.x, y: playerPosition.y +0.5, z: playerPosition.z});
      this.el.setAttribute('visible', visible);
    },
  });
  