var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    figuresGeo = [],
    mylight = null,
    cube1 = null,
    cube2 = null;

 
const size = 20,
    division = 20;
 
function startScene() {
    // Scene, Camera, Renderer
    scene  = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    camera = new THREE.PerspectiveCamera( 75,  // Angulo de Vision (Abajo o Arriba)
                                        window.innerWidth / window.innerHeight, // Relación Aspecto (16:9)
                                        0.1, // Mas Cerca (no renderiza)
                                        1000); // Mas lejos
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("app")});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
 
    //orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 5, 10);
    controls.update();

    //orbit helper
    const gridHelper = new THREE.GridHelper( size, division );
    scene.add( gridHelper );
 
    camera.position.z = 5;
    

    //gestiona la creacion del tipo de luz
    // createlight('ambient');

    // Luz - Light
    // Ambient Light
    //createlight("pointLight");
    //createlight("ambient");

    const texture = new THREE.TextureLoader().load('../src/img/facesImage/uv_test_bw_1024.png');

    //caja con material (tablero de ajedrez)

    const geometryBox1 = new THREE.BoxGeometry( 1, 1, 1 ); 
    const materialBox1 = new THREE.MeshBasicMaterial( {color: 0x00ff00, map: texture, side: THREE.DoubleSide} ); 
    cube1 = new THREE.Mesh( geometryBox1, materialBox1 );

    cube1.position.x = -2;
    cube1.position.y = 2;
    scene.add( cube1 );

    var materialCube = [new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face1.jpg'), side: THREE.DoubleSide },),
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face2.png'), side: THREE.DoubleSide} ),
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face3.jpg'), side: THREE.DoubleSide} ),
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face4.jpg'), side: THREE.DoubleSide} ),
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face5.png'), side: THREE.DoubleSide} ),
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face6.jpg'), side: THREE.DoubleSide} ),
    ];

    //caja con material (por cara)

    const geometryBox2 = new THREE.BoxGeometry( 1, 1, 1 ); 
    const materialBox2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
    cube2 = new THREE.Mesh( geometryBox2, materialCube ); 

    cube2.position.x = 2;
    cube2.position.y = 2;
    scene.add( cube2 );

    const texture2 = new THREE.TextureLoader().load('../src/img/facesImage/water.png');
    const geometry = new THREE.PlaneGeometry( 30, 20 );
    const material = new THREE.MeshBasicMaterial( {map:texture2, 
                                                    side: THREE.DoubleSide, 
                                                    color: 0xffffff, // White color, ensuring no color multiplication
                                                    transparent: true} );
    const plane = new THREE.Mesh( geometry, material );
    scene.add( plane );

    plane.position.z = 5;

    animate();

}


function createlight(){

  var e = document.getElementById("theLight");
  var typeLight = e.value;
  var text = e.options[e.selectedIndex].text;

  switch(typeLight) {
      
    case 'ambient':
    
      mylight = new THREE.AmbientLight( 0xFFFFFF, 90000000000000); // soft white light
      scene.add( mylight );
    break;

    case 'directionalLight':
      mylight = new THREE.DirectionalLight( 0xffffff, 0.5 );
      scene.add( mylight );
    break;

    case 'pointLight':
      mylight= new THREE.PointLight( 0xffffff, 10, 100);
      mylight.position.set( 0, 5, 6 );
      scene.add( mylight );

      const sphereSize = 2;
      const pointLightHelper = new THREE.PointLightHelper( mylight, sphereSize );
      scene.add( pointLightHelper );
    break;

    case 'spot':
      mylight = new THREE.Spotmylight( 0xffffff );
      mylight.position.set( 10, 10, 10 );

      scene.add( mylight );
    break;
  }
}
 
function animate() {
    requestAnimationFrame(animate);

    cube1.rotation.y += 0.01;
    cube2.rotation.y += 0.01;

    controls.update
    renderer.render( scene, camera );
}

// Resize by Screen Size
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
 
function createGeometry(geometryDraw) {
    // Box, Torus, Cone
    //var geometryFigure = null;
    //var col = +('0x' + Math.floor(Math.random()*16777215).toString(16));

    switch(geometryDraw) {
      
        case 'Box':
          // code block
            callParameters(geometryDraw);
            //geometryFigure = new THREE.BoxGeometry( 1, 1, 1 );
            //drawObjects(geometryFigure, col)
        break;

        case 'Torus':
          // code Torus
            callParameters(geometryDraw);
            //geometryFigure = new THREE.TorusGeometry( 5, 1, 16, 100 );
            //drawObjects(geometryFigure, col) 
        break;

        case 'Cone':
          // code Cone
            callParameters(geometryDraw);
            //geometryFigure = new THREE.ConeGeometry( 5, 20, 32 );
            //drawObjects(geometryFigure, col)
        break;

        case 'Delete':
          // code Delete Figure
          deletelastFigure();
          
        break;

    }
      /*
      const objectDraw = new THREE.Mesh( geometryFigure, material );
      scene.add( objectDraw );
      */
}

function deletelastFigure(){

  if(figuresGeo.length > 0){

    //elimina la ultima figura del arreglo de figuras
    var lastFigure = figuresGeo.pop();

    //ahora la elimina tambien de la escena
    scene.remove(lastFigure);

    //actualiza / refresca la pantalla
    renderer.render(scene, camera);

  }

}

function drawObjects(geometry) {

  var count = console.count();

  var randomColor = +('0x' + Math.floor(Math.random()*16777215).toString(16));

  //basic

  const materialBasic = new THREE.MeshBasicMaterial( { color: randomColor,
    transparent: true,
    opacity: 1,
    wireframe: true,
    wireframeLineWitdh: 6,
} );

  //Standart

  const materialStandart = new THREE.MeshStandardMaterial( { color: randomColor,
                                                  transparent: false,
                                                  opacity: 0.5,
                                                  wireframe: false,
                                                  roughness: 0.5,
                                                  metalness: 1
   } );

  //meshNormal

  const materialMeshNormal = new THREE.MeshNormalMaterial( { color: randomColor,
    color: 0xF3FFE2,
    emissive: 0xff0000,
    emissiveIntensity: 0
  } );

  //MeshLambertMaterial

  const materialMeshLambert = new THREE.MeshLambertMaterial( { color: randomColor,
    transparent: false,
    opacity: 0.5,
    wireframe: false
  } );


  var objectToAdd = new THREE.Mesh(geometry, materialStandard);
  objectToAdd.name = "figura"+count;
  objectToAdd.id = "figura"+count;

  figuresGeo.push(objectToAdd);
  scene.add(objectToAdd);

  //showAllObjectUI(figuresGeo[figuresGeo.length-1]);

}

function callParameters(figure){

  var validateParams = false;
  var col = +('0x' + Math.floor(Math.random()*16777215).toString(16));

  switch(figure){

    case 'Box':
      //alert("pintar box")
      var message = 'Please enter the Parameters of the Cube \n(width: Float, height: Float, depth: Floath)';
      var datas = prompt(message, "w, h, z");

      validateParams = validateData(datas, "w, h, z");

      if(validateParams){
        //alert("pintar");
        var values = clearParamsUI(datas, ',');
        var geometry = new THREE.BoxGeometry(values[0], values[1], values[2]);
        drawObjects(geometry, col);
      }

      else{
        //alert("no pintar");
        document.getElementById('warningMssgI').style.display = 'block';
      }

    break;

    case 'Torus':
      //alert("pintar Torus");
      var message = 'Please enter the Parameters of the Torus \n(radius: Float, tube: Float, radialSegments: integer, turbularSegments: Integer)';
      var datas = prompt(message, "r, rt, rs, ts");

      validateParams = validateData(datas, "r, rt, rs, ts");

      if(validateParams){
        //alert("pintar");
        var values = clearParamsUI(datas, ',');
        var geometry = new THREE.TorusGeometry(values[0], values[1], values[2], value[3]);
        drawObjects(geometry, col);
      }

      else{
        //alert("no pintar");
        document.getElementById('warningMssgI').style.display = 'block';
      }

    break;
    
    case 'Cone':

      //alert("pintar Cone");
      var message = 'Please enter the Parameters of the Cone \n(radius: Float, height: Float, radialSegments: integer)';
      var datas = prompt(message, "r, h, rs");

      validateParams = validateData(datas, "r, h, rs");

      if(validateParams){
        //alert("pintar");
        var values = clearParamsUI(datas, ',');
        var geometry = new THREE.ConeGeometry(values[0], values[1], values[2]);
        drawObjects(geometry, col);
      }

      else{
        //alert("no pintar");
        document.getElementById('warningMssgI').style.display = 'block';
      }

    break;

  }

  return validateParams;

}

function validateData(datas, conditionValidation){

  if(datas){
    if(datas != conditionValidation){
      return true;
    }

    else{
      return false;
    }
  }

  else{
    return false;
  }

}

function clearParamsUI(params, flag){

  value = params.split(flag);
  for(var i = 0; i < value.length; i++){

    console.log(i+'length'+value.length);
    if(i!=value.length-1){
      value[i] = parseFloat(value[i]);
    }
    
  }

  return value;

}
/*
function showAllObjectUI(fig){
  var node = document.createElement("LI");
  var textnode = document.createTextNode(JSON.stringify(fig.name));
  node.appendChild(textnode);
  node.setAttribute("style", "cursor: pointer; margin-bottom: 10px; margin-top: 10px;");
  node.setAttribute("onclick", "selectObject("+JSON.stringify(fig.name)+")");

  document.getElementById("myList").appendChild(node);

}

function selectObject(tra){
  alert("You have selected the figure "+tra);
  toAlter = tra.replace(/\D/g,'');
}
*/
function translateOBJ(caseToDo){

  let vx = document.getElementById("X").value;
  let vy = document.getElementById("Y").value;
  let vz = document.getElementById("Z").value;

  var tam = figuresGeo.length;
  
  if(tam>0){

    switch(caseToDo){
      case 'translate':
        
        console.log(figuresGeo[0].position.set(vx, vy, vz));
        
      break;

      case 'rotate':
        //alert("rotar")
        
        figuresGeo[0].rotateX(vx*(Math.PI)/180);
        figuresGeo[0].rotateY(vy*(Math.PI)/180);
        figuresGeo[0].rotateZ(vz*(Math.PI)/180);
      break;

      case 'scale':
        //alert("escala");
        figuresGeo[0].scale.set(vx,vy,vz);
        

      break;
    }
    
    //show2hide('none', 'none', 'block');

  }

  else{

    //show2hidee('hide', 'block', 'block');

  }

}
/*
function show2hide(mssg1, mssg2){
  
}
*/
