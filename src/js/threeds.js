//var camera, scene, renderer, geometry, material, cube;


function init(){

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


       //add the control on the 3D obj*
    var controls = new THREE.OrbitControls(camera, renderer.domElement); 

    /* resize the 3D obj while the winodow's size changin */
    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();

     renderer.setSize( window.innerWidth, window.innerHeight );

    };


    
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true} );
    /*
    var material = [ 
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/project-1.jpg'), side:THREE.DoubleSide}), 
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/project-2.jpg'), side:THREE.DoubleSide}), 
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/project-3.jpg'), side:THREE.DoubleSide}), 
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/project-4.jpg'), side:THREE.DoubleSide}), 
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/project-5.jpg'), side:THREE.DoubleSide}), 
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/project-6.jpg'), side:THREE.DoubleSide}), 
        ];
      */  
/*

        var material1 = new THREE.BasicMaterial({color:'#2020ff'});
        var geometry1 = new THREE.BoxGeometry( );
        cube1 = new THREE.Mesh(geometry1, material1);
        cube1.position.set(0.0, 0.0, 2.0);
    
        var material2 = new THREE.BasicMaterial({color:'#ff2020'});
        var geometry2 = new THREE.BoxGeometry( );
        cube2 = new THREE.Mesh(geometry2, material2);
        cube2.position.set(2.0, 0.0, 0.0);
            
        var cubeone = new THREE.Mesh( geometry1, material1 );
        var cubetwo = new THREE.Mesh( geometry2, material2 );
        scene.add( cubeone );
        scene.add( cubetwo );


*/  

        var cube = new THREE.Mesh( geometry, material );
        var cubeone = new THREE.Mesh( geometry, material );
        
        cube.position.set(-2.0, 1.0, 0.0);
        cubeone.position.set(1.0, -1.0, 0.0);

        scene.add( cube );
        scene.add( cubeone );
    
   

  /*
    var geometry = new THREE.BoxGeometry(30,30,30);
    var material = new THREE.MeshBasicMaterial({color:0x00ff44 , wireframe : true});
    
    //initial offset so does not start in middle.
    var xOffset = -80;
    
    for(var i = 0; i < 2; i++){
        for(var j = 0; j < 2; j++){
                var mesh  = new THREE.Mesh(geometry, material);
                mesh.position.x = (xDistance * i) + xOffset;
                mesh.position.z = (zDistance * j);
                scene.add(mesh);
        }
    };
 */
    camera.position.z = 3;

    var animate = function () {
        requestAnimationFrame( animate );

       // cube.rotation.x += 0.01;
       // cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    };

    animate();

}



/* 
// add the heart shape
var x = 0, y = 0;
var heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

var geometry = new THREE.ShapeGeometry( heartShape );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,  wireframe: true } );
var mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh );  

*/





// add the lighiting 
//var ambientLight =  new THREE.AmbientLight (0x3f7b9d, 2.0); 
//scene.add( ambientLight );

// add the VR effect 
//var realEffect = new THREE.AnaglyphEffect(renderer);
//realEffect.setSize(window.innerWidth,window.innerHeight);
//scene.add( realEffect );

//var spotlight  = new THREE.SportLight (0x3f7b9d, 2)
//SportLight.position.set(0.1.0);
//scene.add( SportLight );

/*
        
    //var geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
    //var material = new THREE.MeshBasicMaterial( {color:  0x00ff00, wireframe: false}  );
    //var  for material = new THREE.MeshBasicMaterial( {color:  0x00ff00 ,  wireframe: true}  );


    var earthTexture = new THREE.TextureLoader().load("../img/cubs.png");
    var earthGeometery = new THREE.SphereGeometry(300, 200, 200);
    var earthMaterial = new THREE.MeshLambertMaterial({
            map: earthTexture,
            transparent: true
});

        var spherespherematerial = [ new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/book1.jpeg')}),
        new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/cubs.png')}), 
        ];

*/


//var material = new THREE.MeshFaceMaterial( spherespherematerial );            
//var sphere = new THREE.Mesh( geometry,  material );     

//var sphere = new THREE.Mesh( geometry, spherematerial );  
//scene.add( sphere );
// sphere.scale.x = -1;





		

