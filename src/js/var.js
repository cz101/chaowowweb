/*var mycanvaswidth, mycanvasheight;

mycanvaswidth = window.getComputedStyle(document.documentElement).getPropertyValue('--canvaswidth');
mycanvasheight = window.getComputedStyle(document.documentElement).getPropertyValue('--canvasheight');



console.log("the C.W value is :" + mycanvaswidth + "the C.H value is :"+mycanvasheight);


//var mycanvas1 = document.getElementById('canvas');

//var head = document.getElementsByTagName('canvas')[0];
console.log("the value is :" +  document.getElementById('canvas'));

var mycanvas = this.document.documentElement.style.getPropertyValue('--cwidth');
//var errorColor = document.documentElement.style.getPropertyValue('--errorColor');
console.log("the value is :" + this.document.documentElement.style.getPropertyValue('--cwidth') );

//mycanvaswidth  = mycanvas.width.val();
//mycanvasheight =  mycanvas.height.val();
//var elem = document.getElementById("canvas");
//console.log( "hhh " + window.getComputedStyle(elem,null).getPropertyValue("---main-color")); 

//var elem = document.querySelector(".test");
//var theCSSprop = window.getComputedStyle(elem, null).getPropertyValue("background-color");

let c = document.documentElement.style.getPropertyValue('--myVariable');
*/





// Three.js ray.intersects with offset canvas

var container, camera, scene, renderer, mesh,

    mouse = { x: 0, y: 0 },
    objects = [],
    
    count = 0,

    CANVAS_WIDTH = 500,
    CANVAS_HEIGHT = 500;

// info
/*
info = document.createElement( 'div' );
info.style.position = 'absolute';
info.style.top = '30px';
info.style.width = '100%';
info.style.textAlign = 'center';
info.style.color = '#f00';
info.style.backgroundColor = 'transparent';
info.style.zIndex = '1';
info.style.fontFamily = 'Monospace';
info.innerHTML = 'INTERSECT Count: ' + count;
info.style.userSelect = "none";
info.style.webkitUserSelect = "none";
info.style.MozUserSelect = "none";
document.body.appendChild( info );
*/

container = document.getElementById( 'canvas' );
document.body.appendChild( container );

renderer = new THREE.WebGLRenderer();
renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
container.appendChild( renderer.domElement );

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 50, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000 );
camera.position.y = 150;
camera.position.z = 500;
camera.lookAt( scene.position );

mesh = new THREE.Mesh( 
    new THREE.BoxGeometry( 200, 200, 200, 1, 1, 1 ), 
    new THREE.MeshBasicMaterial( { color : 0xff0000, wireframe: true } 
) );
scene.add( mesh );
objects.push( mesh );

// find intersections
var vector = new THREE.Vector3();
var raycaster = new THREE.Raycaster();

// mouse listener
document.addEventListener( 'mousedown', function( event ) {
    
    // For the following method to work correctly, set the canvas position *static*; margin > 0 and padding > 0 are OK
    mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.width ) * 2 - 1;
    mouse.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.height ) * 2 + 1;
    
    // For this alternate method, set the canvas position *fixed*; set top > 0, set left > 0; padding must be 0; margin > 0 is OK
    //mouse.x = ( ( event.clientX - container.offsetLeft ) / container.clientWidth ) * 2 - 1;
    //mouse.y = - ( ( event.clientY - container.offsetTop ) / container.clientHeight ) * 2 + 1;

    vector.set( mouse.x, mouse.y, 0.5 );
    vector.unproject( camera );

    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

    intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {
        
        info.innerHTML = 'INTERSECT Count: ' + ++count;
        
    }

}, false );

function render() {

    mesh.rotation.y += 0.08;
    
    renderer.render( scene, camera );

}

(function animate() {

    requestAnimationFrame( animate );

    render();

})();

