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
  
    // Creating the layout for every child
    convertLayout: function() {
      let margC = 0.3;
      this.aframeLayout = this.data.layout.map(function(child) {
        return {
          x: child.x + 0.5 * 1 + margC * child.x,
          y: 0,
          card: child.card,
        };
      });
    },
  
    putCards: function() {
      const self = this;
      let margC = 0.3;
      this.aframeLayout.map(function(child) {
        let childEntity = document.createElement("a-entity");
        childEntity.setAttribute("id", child.x);
  
        AFRAME.utils.entity.setComponentProperty(childEntity, "position", {
          x: child.x - (1 + margC), // Adding the math to center it (with margin)
          y: 1, // There is 12/2 column and 11/2 margin needed to shift
          z: 1, // Fixing the curve radius
        });
  
        AFRAME.utils.entity.setComponentProperty(childEntity, "playcard", {
          name: child.card,
        });
    
        self.el.appendChild(childEntity);
      });
    },
  
    removeTiles: function() {
      while (this.el.firstChild) {
        this.el.removeChild(this.el.firstChild);
      }
    },
  
    remove: function() {
      this.curve = null;
      if (this.el.getObject3D("clones")) {
        this.el.removeObject3D("clones");
      }
    },
  });
  