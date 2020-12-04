// GLOBALS - ALLOCATE THESE OUTSIDE OF THE RENDER LOOP - CHANGED
var cubes = [], marker;
var matrix = new THREE.Matrix4();
var up = new THREE.Vector3( 0, 1, 0 );
var axis = new THREE.Vector3( );
var pt, radians, axis, tangent, path;

var mycanvaswidth = 1500;
var mycanvasheight = 1000;

// the getPoint starting variable - !important
var t = 0;
var m = 10;

//This function generates the object and chooses a random color for it 
//on intial load.


function getSimulatedObj(){

    var geometry = new THREE.SphereGeometry( 1, 32, 32);
    var material = new THREE.MeshBasicMaterial( {color:  0x00ff00, wireframe: true}  );
    var material4 = [ 

        new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/dv4k.jpg'), side:THREE.DoubleSide}),
    ]
   
    var simulteobj = new THREE.Mesh( geometry, material4) ;

    return simulteobj;
}

function getSimulatedObj2(){

    var geometry = new THREE.SphereGeometry( 1, 32, 32);
    var material = new THREE.MeshBasicMaterial( {color:  0xff0000, wireframe: true} );
  
    var material3 = [ 

         new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/dvscketh2.jpg'), side:THREE.DoubleSide}),
     ]

    var simulteobj2 = new THREE.Mesh( geometry, material3) ;

    return simulteobj2;
}

function getSimulatedObj3(){

    var geometry = new THREE.SphereGeometry( 1,32,32);

  
    var material3 = [ 

         new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/dvscketh2.jpg'), side:THREE.DoubleSide}),
     ]

    var simulteobj3 = new THREE.Mesh( geometry, material3) ;

    return simulteobj3;
}

// Ellipse class, which extends the virtual base class Curve
function Ellipse( xRadius, yRadius ) {
		THREE.Curve.call( this );
		// add radius as a property
		this.xRadius = xRadius;
		this.yRadius = yRadius;

}

Ellipse.prototype = Object.create( THREE.Curve.prototype );
Ellipse.prototype.constructor = Ellipse;

// define the getPoint function for the subClass
Ellipse.prototype.getPoint = function ( t ) {

	var radians = 2 * Math.PI * t;

	return new THREE.Vector3( this.xRadius * Math.cos( radians ),
							  this.yRadius * Math.sin( radians ),
							  0);

};

function init() { 
    container = document.getElementById( 'canvas' );

    renderer = new THREE.WebGLRenderer();
    //renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setSize( mycanvaswidth, mycanvasheight );
    //document.body.appendChild( renderer.domElement );
    container.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();
    
    // camera
    //camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    
    camera = new THREE.PerspectiveCamera( 45, mycanvaswidth / mycanvasheight, 1, 1000 );
    camera.position.set( 5, 10, 50 );
    
    // controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
   // controls.addEventListener( 'change', render ); // use if there is no animation loop
   // controls.minDistance = 10;
   // controls.maxDistance = 50;
    
    // light
    var light = new THREE.PointLight( 0xffffff, 0.7 );
    camera.add( light );
    scene.add( camera ); // add to scene only because the camera  has a child
    
    // axes
    // scene.add( new THREE.AxisHelper( 5,20, 50 ) );
    ////////////////////////////////////////
    //      Create the cube               //
    ////////////////////////////////////////
    
    marker = getSimulatedObj();
    marker2 = getSimulatedObj2();
    marker3 = getSimulatedObj3();
    marker.position.set(0,0,0);
    marker2.position.set(0,10,0);
    marker3.position.set(0,30,0);
  
    scene.add(marker);
    scene.add(marker2);
    scene.add(marker3);
    
    
    ////////////////////////////////////////
    //      Create an Extruded shape      //
    ////////////////////////////////////////

    // path by which the marker will move
    path = new Ellipse( 2, 10 );

    path2 = new Ellipse( 6, 20 );

    // params
    var pathSegments = 200;      // the curve of the elipise , the degree of smoothes
    var tubeRadius = 0.0001;        // the size of tube of clipse , the trajory of 
    var radiusSegments = 30;
    var closed = true;

    var geometry = new THREE.TubeBufferGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
    
    // material
    var material = new THREE.MeshPhongMaterial( {color: 0x000000, } ); // 0x0080ff green

    var geometry2 = new THREE.TubeBufferGeometry( path2, pathSegments, tubeRadius, radiusSegments, closed );
    
    
    // material
    var material2 = new THREE.MeshPhongMaterial( {color: 0x000000, } ); //0xff0000 red
    
    // mesh the trajory of marker is going to follow 
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    mesh2 = new THREE.Mesh( geometry2, material2 );
    scene.add( mesh2 );

    var curve = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        5, 20,            // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );

    //defines the amount of points the path will have
    //var path2 = new THREE.Path( curve.getPoints( 100) );
    //geometrycirc = path2.createPointsGeometry( 1);   
 
     var geometrycirc = new THREE.BufferGeometry().setFromPoints( 100 );

   // var materialcirc = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    var materialcirc = new THREE.LineBasicMaterial( { color : 0x000000 } ); 
    // Create the final object to add to the scene
    var ellipse = new THREE.Line( geometrycirc, materialcirc );
    ellipse.position.set(0,0,0);
    //scene.add( ellipse );
    //ellipse.add(mesh);
    //ellipse.add(marker);
    //scene.add(ellipse);


}

function animate() {
    requestAnimationFrame(animate);
  
    render();
}

function render() {

    // set the marker position
    pt = path.getPoint( t );
    pt2 = path2.getPoint( t );

     //set the marker position

    marker.position.set( pt.x, pt.y, pt.z );
    marker2.position.set( pt2.x, pt2.y, pt2.z );
    marker3.position.set( 0, 0, 0 );
    //console.log ("the mark      x is :" + pt.x +" y is :" + pt.y+ " z is :"  + pt.z);
    //console.log ("the marker2   x is :" + pt2.x +" y is :" + pt2.y+ " z is :"  + pt2.z);
    marker.rotation.x += 0.02;
    marker.rotation.y += 0.01;
    marker2.rotation.x += 0.02;
    marker2.rotation.y += 0.01;

    // get the tangent to the curve
    tangent = path.getTangent( t ).normalize();

    // calculate the axis to rotate around

    /* First calculate the axis to rotate around. 
       so that it's up-vector (local y-vector) points in the direction of the curve tangent vector. 
       The axis is a vector perpendicular to the plane defined by the up-vector and the tangent vector. 
       You use the cross-product to get this vector.
     */
    axis.crossVectors( up, tangent ).normalize();

    // calcluate the angle between the up vector and the tangent
    radians = Math.acos( up.dot( tangent ) );
   // console.log ("the axis is :" + axis.crossVectors( up, tangent ).normalize() + "radians is "+ radians );
     
    // set the quaternion
     //marker.quaternion.setFromAxisAngle( axis, radians );
     //marker2.quaternion.setFromAxisAngle( axis, radians );
    
    t = (t >= 1) ? 0 : t += 0.002;
    m = (m >= 1) ? 0 : m += 0.003;
    renderer.render( scene, camera );

}