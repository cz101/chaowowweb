
var mycanvaswidth, mycanvasheight;

mycanvaswidth = window.getComputedStyle(document.documentElement).getPropertyValue('--canvaswidth');
mycanvasheight = window.getComputedStyle(document.documentElement).getPropertyValue('--canvasheight');


var container = document.querySelector('#container');
var canvas = document.querySelector('#canvas');

function scaleToFit (container, node) {
  var rect = container.getBoundingClientRect();
  node.width = rect.width;
  node.height = rect.height;
}


function init(){
   
    var scene = new THREE.Scene();
    //var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var camera = new THREE.PerspectiveCamera( 75, mycanvaswidth / mycanvasheight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    //renderer.setSize( window.innerWidth, window.innerHeight );
    console.log ( mycanvaswidth + " " + mycanvasheight);
    //console.log ( window.innerWidth + " " + window.innerHeight);
    //renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setSize( mycanvaswidth, mycanvasheight);
    document.body.appendChild( renderer.domElement );


       //add the control on the 3D obj*
    var controls = new THREE.OrbitControls(camera, renderer.domElement); 

    /* resize the 3D obj while the winodow's size changin */
    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

    // camera.aspect = window.innerWidth / window.innerHeight;
     camera.aspect = mycanvaswidth / mycanvasheight;
     camera.updateProjectionMatrix();

     renderer.setSize( mycanvaswidth, mycanvasheight);
     //renderer.setSize( window.innerWidth, window.innerHeight);

    };

   // in order to have phongmaterial working . it need light 
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 3, 2, 1 ).normalize();
    //scene.add(light);

   // set the background pic of  canvas 
    var bgTexture = new THREE.TextureLoader().load("../img/galaxy_starfield.png");
    bgTexture.minFilter = THREE.LinearFilter;
    scene.background = bgTexture;

   // var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
   // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true} );

    var geometry = new THREE.SphereGeometry( 0.5, 64, 64);
    var material = new THREE.MeshBasicMaterial( {color:  0x00ff00, wireframe: true}  );
   // var gmaterial  = new THREE.MeshPhongMaterial ({ map: new THREE.TextureLoader().load('../img/globe1.jpg'),});

    var material1 = [ 
       // new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('../img/dv4k.jpg'), side:THREE.DoubleSide}), 
       // new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/dv4k.jpg'), side:THREE.DoubleSide}),
        new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../img/dvscketh2.jpg'), side:THREE.DoubleSide}),
    ]


    /* 
    // cube pic with double side 
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

        var simulteobj = new THREE.Mesh( geometry, material1) ;
        var cubeone = new THREE.Mesh( geometry, material );
        
        //simulteobj.position.set(0, 0.0, -3);
        //simulteobj.position.x = Math.cos(toRadians(loc+=5)) * radius;
        //simulteobj.position.z = Math.sin(toRadians(loc+=5)) * radius;

     
  
      
      
      
      
      
      
      
        //cubeone.position.set(0, 1.0, 0.0);

        scene.add( simulteobj );
      //  scene.add( cubeone );
    




    
      var targetPosition1 = new THREE.Vector3( -0.5, 0, 0 );
      var targetPosition2 = new THREE.Vector3( 0.5, 0, 0 );
      var targetPosition3 = new THREE.Vector3( 0.5, 0, -1 );
      var targetPosition4 = new THREE.Vector3( 0, 0, -1);
      //var targetPosition4 = new THREE.Vector3( 0.5, 0.5, 0 );

      var tween1 = new TWEEN.Tween( simulteobj.position ).to( targetPosition1, 2000 ); 
      var tween2 = new TWEEN.Tween( simulteobj.position ).to( targetPosition2, 2000 ); 
      var tween3 = new TWEEN.Tween( simulteobj.position ).to( targetPosition3, 2000 ); 
      var tween4 = new TWEEN.Tween( simulteobj.position ).to( targetPosition4, 2000 ); 
   

    
      tween1.chain( tween2 );
      tween2.chain( tween3 );
      tween3.chain( tween4 );
      tween4.chain( tween1 );


     

      //tween1.start();
  

    
        // setup targeting postion f
   

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
    camera.position.z = 1;



    

    var animate = function () {
        requestAnimationFrame( animate );

        //simulteobj.rotation.x += 0.02;
        //simulteobj.rotation.y += 0.02;
        //simulteobj.rotation.z += 0.02;
        //cube.rotation.y += 0.01;
        //cube.rotation.z -= 0.01;
      
        //TWEEN.update( );
        
        renderer.render( scene, camera );
    };

    animate();

}


