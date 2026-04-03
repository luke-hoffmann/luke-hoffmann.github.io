let screenSize;
let doAnimation = true;
let graphConvexHull = true;
let showWireFrame = false;
let sceneNumber = 0;
let cameraSpotTracker; 
let scenes = [];
let renderer;
let cameraPB = new geometry.PhysicsBody(new geometry.Vector(0,0,-1200))
let camera = new geometry.Camera(cameraPB,new geometry.Vector(0,0,1),90,400,0);

let cameraMover = new geometry.CameraMover(new geometry.Vector(1000,0,-2000),new geometry.Vector(0,0,1),new geometry.Vector(0,0,0),new geometry.Vector(0,0,0));


let i =0;

function previousScene() {
    sceneNumber--;
    if (sceneNumber == -1) {
        sceneNumber = scenes.length-1;
    }
    updateScene(sceneNumber);
}
function updateScene(sceneNumber) {
    renderer.scene = scenes[sceneNumber];
}
function nextScene() {
    sceneNumber++;
    if (sceneNumber > scenes.length-1) {
        sceneNumber = 0;
    }
    updateScene(sceneNumber);
}
function setDoSimulation(boolean ) {
    doAnimation = boolean;
    document.getElementById("play-button").innerHTML = (doAnimation ? "Pause" :  "Start") + "<br><span class='font-bold'>Scene 1</span>";
}

function startSimulation(){
    setDoSimulation(!doAnimation);
    
    if (doAnimation) {
        loop();
        return
    }
    noLoop();
}





window.documentWasResized = function() {
    setDoSimulation(false);
    console.log(":hwad")
}




function setup () {
    setDoSimulation(doAnimation);
    createCanvasSizeBasedOnDiv()
    lights = [];
    lights.push(new geometry.PointLight(new colorhandler.ColorHandler(0,255,0),1000000, new geometry.Vector(0,0,1000),100));
    lights.push(new geometry.DirectionalLight(new colorhandler.ColorHandler(255,0,0),1000, new geometry.Vector(0,-1,0)));
    lights.push(new geometry.DirectionalLight(new colorhandler.ColorHandler(255,255,0),1000, new geometry.Vector(0,1,0)));
    entities=[]
    pos = new geometry.PhysicsBody(new geometry.Vector(0,0,0));
    entity = geometry.Entity.randomConvexEntityWithColors(110/width,100, pos,new colorhandler.ColorHandler(255,255,255),new colorhandler.ColorHandler(255,255,255),false);
    entities.push(entity)
    scenes.push(new geometry.Scene(entities,lights));

    lights = [];
    lights.push(new geometry.PointLight(new colorhandler.ColorHandler(0,255,0),1000000, new geometry.Vector(0,0,1000),100));
    lights.push(new geometry.DirectionalLight(new colorhandler.ColorHandler(255,0,0),1000, new geometry.Vector(0,-1,0)));
    lights.push(new geometry.DirectionalLight(new colorhandler.ColorHandler(255,255,0),1000, new geometry.Vector(0,1,0)));
    entities= []
    pos = new geometry.PhysicsBody(new geometry.Vector(0,0,0));
    entity = geometry.Entity.randomConvexEntityWithColors(110/width,100, pos,new colorhandler.ColorHandler(255,255,255),new colorhandler.ColorHandler(255,255,255),false);
    entities.push(entity)
    scenes.push(new geometry.Scene(entities,lights));

    screenSize = new geometry.Vector(width,height);
    renderer = new geometry.p5Renderer(new geometry.Scene(entities,lights),screenSize,camera, new geometry.RenderParameters({
      doVertices: false,
      doTriangles: true,
      isPerspective:true,
      doBackFaceCulling:true,
      pointRadius: 3,
      isWindingOrderBackFaceCulling: true,
      doNormalVectors: false,
      normalVectorLength: 40,
      doOutline : true,
      showLights : false,
      doFill: true,
    }),window);
    cameraSpotTracker = new geometry.CameraSpotTracker(new geometry.Vector(0,0,0), 100000/(width**2),0,0);
};


function draw () {
    i+=0.01;
    if(!doAnimation) {
        noLoop()
    }
    clear()
    cameraSpotTracker.mouseInputRotate(1,0,0,0);
    renderer.camera = cameraSpotTracker.update(renderer.camera);
    const light_pos = new geometry.Vector(Math.cos(i)*2000, 100, Math.sin(i)*2000);
    
    renderer.setSceneLightPos(light_pos,0);
    renderer.graph();
};
