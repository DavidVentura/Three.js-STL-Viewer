if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var loader = new THREE.STLLoader();
var last_added = undefined;

init();

var material = new THREE.MeshPhongMaterial( { color: 0x0e9945, specular: 0x111111, shininess: 20 } );
function init() {

  scene = new THREE.Scene();
  scene.add( new THREE.AmbientLight( 0x999999 ) );

  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

  // Z is up for objects intended to be 3D printed.

  camera.up.set( 0, 0, 1 );
  camera.position.set( 0, -9, 6 );

  camera.add( new THREE.PointLight( 0xffffff, 0.8 ) );

  scene.add( camera );

  var grid = new THREE.GridHelper( 25, 100, 0xffffff, 0x555555 );
  grid.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), 90 * ( Math.PI/180 ) );
  scene.add( grid );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xaaaaaa );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // Binary files

  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.target.set( 0, 1.2, 2 );
  controls.update();
  window.addEventListener( 'resize', onWindowResize, false );
  onWindowResize();
}

function load(model) {
  loader.load( 'models/' + model, function ( geometry ) {
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 0, 0, 0 );
    mesh.rotation.set( 0, 0, 0 );
    mesh.scale.set( .02, .02, .02 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    if (last_added)
        scene.remove(last_added);
    scene.add( mesh );
    last_added = mesh;
    render();
    document.title = model;
  });
}
function onWindowResize() {

  camera.aspect = window.innerWidth * 0.8 / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth * 0.8, window.innerHeight );

  render();

}

function render() {

  renderer.render( scene, camera );

}
