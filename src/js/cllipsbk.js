// GLOBALS - ALLOCATE THESE OUTSIDE OF THE RENDER LOOP - CHANGED
var cubes = [], marker, spline;
var matrix = new THREE.Matrix4();
var up = new THREE.Vector3( 0, 1, 0 );
var axis = new THREE.Vector3( );
var pt, radians, axis, tangent, path;

// the getPoint starting variable - !important
var t = 0;

//This function generates the cube and chooses a random color for it 
//on intial load.

// .......... Create the cube .............//

function getCube(){
    // cube mats and cube
    var mats = [];
    for (var i = 0; i < 6; i ++) {
        mats.push(new THREE.MeshBasicMaterial({color:Math.random()*0xffffff}));
    }
    
    var cube = new THREE.Mesh(
        new THREE.CubeGeometry(2, 2, 2),
        new THREE.MeshFaceMaterial( mats )
    );
   
    return cube
}


function getSimulatedObj(){
    // cube mats and cube
    var geometry = new THREE.SphereGeometry( 0.5, 64, 64);
    var material = new THREE.MeshBasicMaterial( {color:  0x00ff00, wireframe: true}  );
   
    var simulteobj = new THREE.Mesh( geometry, material) ;

    return simulteobj;
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

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();
    
    // camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 5, 20, 50 );
    
    // controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 10;
    controls.maxDistance = 50;
    
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
    marker.position.set(0,0,0);
    scene.add(marker);
    
    
    ////////////////////////////////////////
    //      Create an Extruded shape      //
    ////////////////////////////////////////

    // path
    path = new Ellipse( 8, 10 );

    // params
    var pathSegments = 108;      // the curve of the elipise , the degree of smoothes
    var tubeRadius = 0.1;        // the size of tube of clipse
    var radiusSegments = 10;
    var closed = true;

    var geometry = new THREE.TubeBufferGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
    
    // material
    var material = new THREE.MeshPhongMaterial( {
        color: 0x0080ff, 
    } );
    
    // mesh
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    var curve = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        0, 11,            // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );

    //defines the amount of points the path will have
    var path2 = new THREE.Path( curve.getPoints( 100 ) );
    geometrycirc = path2.createPointsGeometry( 100 );   
     //geometrycirc = path2.setFromPoints( 100 );  
 
    var materialcirc = new THREE.LineBasicMaterial( { color : 0xff0000 } );

    // Create the final object to add to the scene
    var ellipse = new THREE.Line( geometrycirc, materialcirc );
    ellipse.position.set(0,0,0);
   // scene.add( ellipse );

}

function animate() {
    requestAnimationFrame(animate);
    
    render();
}

function render() {

    // set the marker position
    pt = path.getPoint( t );

    // set the marker position
    //marker.position.set( pt.x, pt.y, pt.z );
    
    /*
    // get the tangent to the curve
    tangent = path.getTangent( t ).normalize();

    // calculate the axis to rotate around
    axis.crossVectors( up, tangent ).normalize();

    // calcluate the angle between the up vector and the tangent
    radians = Math.acos( up.dot( tangent ) );

    // set the quaternion
    marker.quaternion.setFromAxisAngle( axis, radians );
    */
    t = (t >= 1) ? 0 : t += 0.002;
    
    renderer.render( scene, camera );

}