AFRAME.registerComponent('playcard', {
    schema: {
    name: {type: 'string', default: '3C'}
    },

    getFront: function (name) {
        return;
    },
  
    init: function () {
      
        let data = this.data;
        let el = this.el;
    
        this.geometryFront = new THREE.PlaneGeometry( 90, 110, 1, 1 );            
        this.geometryBack = new THREE.PlaneGeometry( 90, 110, 1, 1 );            
        this.geometryBack.applyMatrix( new THREE.Matrix4().makeRotationY( Math.PI ) );
        this.textureFront = new THREE.ImageUtils.loadTexture( getFront(this.data.name) );    
        this.textureBack = new THREE.ImageUtils.loadTexture( './Assets/cards-svg/Back.svg' );      
  
        let playcard = new.THREE.Object3D();
        var meshFront = new THREE.Mesh( this.geometryFront, this.materialFront );
        playcard.add(meshFront);
        var meshBack = new THREE.Mesh( geometry2, material2 );
        playcard.add(meshBack);

        el.setObject3D('mesh', this.mesh);
    }
  });