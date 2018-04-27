AFRAME.registerComponent("playcard", {
  schema: {
    name: { type: "string", default: "3C" },
  },

  getFront: function(name) {
    let prefix = "./Assets/card-png/";
    let result = prefix.concat(name);
    let sufix = ".png";
    return result.concat(sufix);
  },

  init: function() {
    let data = this.data;
    let el = this.el;

    this.geometry = new THREE.PlaneGeometry(1.05,1.6,1,1);

    this.textureFront = new THREE.TextureLoader().load(
      this.getFront(this.data.name),
    );
    this.textureBack = new THREE.TextureLoader().load(
      "./Assets/card-png/Back.png",
    );

    this.materials = [
      new THREE.MeshBasicMaterial({
        map: this.textureFront,
        side: THREE.FrontSide,
      }),
      new THREE.MeshBasicMaterial({
        map: this.textureBack,
        side: THREE.BackSide,
      }),
    ];

    for (var i = 0, len = this.geometry.faces.length; i < len; i++) {
      var face = this.geometry.faces[i].clone();
      face.materialIndex = 1;
      this.geometry.faces.push(face);
      this.geometry.faceVertexUvs[0].push(this.geometry.faceVertexUvs[0][i].slice(0));
    }

    var playcard = new THREE.Object3D();
    var mesh = new THREE.Mesh(this.geometry, new THREE.MeshFaceMaterial(this.materials));
    playcard.add(mesh);

    el.setObject3D("mesh", playcard);
  },
});
