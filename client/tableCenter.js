AFRAME.registerComponent("table-center", {
  schema: {
    layout: {
      type: "array",
      default: [
        { i: "a", x: 0, y: 0, w: 1, card: "2S", turned: false },
        { i: "b", x: 1, y: 0, w: 1, card: "3S", turned: false },
        { i: "c", x: 2, y: 0, w: 1, card: "4S", turned: true },
        { i: "d", x: 3, y: 0, w: 1, card: "5S", turned: false },
        { i: "e", x: 4, y: 0, w: 1, card: "6S", turned: false },
      ],
    },
    marginColumn: { default: 0.3, min: 0, max: 1 },
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
    let margC = this.data.marginColumn;
    this.aframeLayout = this.data.layout.map(function(child) {
      return {
        i: child.i,
        x: child.x + 0.5 * child.w + margC * child.x,
        y: child.y,
        card: child.card,
        turned: child.turned,
      };
    });
  },

  putCards: function() {
    const self = this;
    let margC = this.data.marginColumn;
    this.aframeLayout.map(function(child) {
      let childEntity = document.createElement("a-entity");
      childEntity.setAttribute("id", child.i);

      AFRAME.utils.entity.setComponentProperty(childEntity, "position", {
        x: child.x - (2.5 + 2 * margC), // Adding the math to center it (with margin)
        y: child.y, // There is 12/2 column and 11/2 margin needed to shift
        z: 1, // Fixing the curve radius
      });

      AFRAME.utils.entity.setComponentProperty(childEntity, "playcard", {
        name: child.card,
      });

      childEntity.setAttribute("rotation", child.turned ? { x: 90, y: 0, z: 0 } : { x: -90, y: 0, z: 0 });

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