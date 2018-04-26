AFRAME.registerComponent("card-deck", {
    
    init: function() {
      let data = this.data;
      let el = this.el;
  
      this.geometry = new THREE.BoxGeometry(1.05,1.6,0.5,1,1,1);
  

      this.textureBack = new THREE.TextureLoader().load(
        "./Assets/cards-svg/Back.svg",
      );
  
      this.materials = new THREE.MeshBasicMaterial({
          map: this.textureBack,
          side: THREE.FrontSide,
        });
        
  
      var playcard = new THREE.Object3D();
      var mesh = new THREE.Mesh(this.geometry, new THREE.MeshBasicMaterial(this.materials));
      playcard.add(mesh);
  
      el.setObject3D("mesh", playcard);
    },
  });
  