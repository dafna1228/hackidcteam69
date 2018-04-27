AFRAME.registerComponent("card-hand", {
    schema: {
      layout: {
        type: "array",
        default: [
          {x: 0, card: "2S"},
          {x: 1, card: "3S"},
        ],
      },
    },
  
    init: function() {
      this.convertLayout = AFRAME.utils.bind(this.convertLayout, this);
      this.putCards = AFRAME.utils.bind(this.putCards, this);
    },
  
    update: function() {
      this.removeTiles();
      this.convertLayout();
      this.putCards();
    },
  
    // Creating the layout for every card
    convertLayout: function() {
      let margC = 0.3;
      this.aframeLayout = this.data.layout.map(function(card) {
        return {
          x: card.x + 0.5 * 1 + margC * card.x,
          y: 0,
          card: card.card,
        };
      });
    },
  
    putCards: function() {
      const self = this;
      let margC = 0.3;
      this.aframeLayout.map(function(card) {
        let cardEntity = document.createElement("a-entity");
        cardEntity.setAttribute("id", card.x);
  
        AFRAME.utils.entity.setComponentProperty(cardEntity, "position", {
          x: card.x - (1 + margC), // Adding the math to center it (with margin)
          y: 1, // There is 12/2 column and 11/2 margin needed to shift
          z: 1, // Fixing the curve radius
        });
  
        AFRAME.utils.entity.setComponentProperty(cardEntity, "playcard", {
          name: card.card,
        });
    
        self.el.appendChild(cardEntity);
      });
    },
  
    remove: function() {
      this.curve = null;
      if (this.el.getObject3D("clones")) {
        this.el.removeObject3D("clones");
      }
    },
  });
  