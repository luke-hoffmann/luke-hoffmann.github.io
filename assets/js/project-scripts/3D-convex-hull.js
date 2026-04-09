let screenSize;
let doAnimation = false;
let graphConvexHull = false;
let showWireFrame = false;
// new
let entities = [];

let lights = [];
lights.push(new geometry.PointLight(new colorhandler.ColorHandler(0,255,0),1000000, new geometry.Vector(0,0,1000),100));
lights.push(new geometry.DirectionalLight(new colorhandler.ColorHandler(255,0,0),1000, new geometry.Vector(0,-1,0)));
lights.push(new geometry.DirectionalLight(new colorhandler.ColorHandler(255,255,0),1000, new geometry.Vector(0,1,0)));

let renderer;
let cameraPB = new geometry.PhysicsBody(new geometry.Vector(0,0,-1200))
let camera = new geometry.Camera(cameraPB,new geometry.Vector(0,0,1),90,400,0);

let cameraMover = new geometry.CameraMover(new geometry.Vector(1000,0,-2000),new geometry.Vector(0,0,1),new geometry.Vector(0,0,0),new geometry.Vector(0,0,0));


let i =0;


function setDoSimulation(boolean ) {
    doAnimation = boolean;
    document.getElementById("play-button").innerHTML = (doAnimation ? "Pause" :  "Play") + " Simulation";
}

function startSimulation(){
    setDoSimulation(!doAnimation);
    
    if (doAnimation) {
        loop();
        return
    }
    noLoop();
}

function findConvex(){
    graphConvexHull = !graphConvexHull;
    document.getElementById("find-convex").innerHTML = (graphConvexHull ? "Hide Convex Hull" : "Find Convex Hull");
}



window.documentWasResized = function() {
    setDoSimulation(false);
    console.log(":hwad")
}


let cameraSpotTracker; 
let scene;

function setup () {
    setDoSimulation(doAnimation);
    createCanvasSizeBasedOnDiv()
    console.log(width)
    entities=[]
    pos = new geometry.PhysicsBody(new geometry.Vector(0,0,0));
    entity = geometry.Entity.randomConvexEntityWithColors(110,100, pos,new colorhandler.ColorHandler(255,255,255),new colorhandler.ColorHandler(255,255,255),false);
    entities.push(entity)
    scene = new geometry.Scene(entities,lights);
    screenSize = new geometry.Vector(width,height);
    console.log(width)
    renderer = new geometry.p5Renderer(scene,screenSize,camera, new geometry.RenderParameters({
      doVertices: true,
      doTriangles: true,
      isPerspective:true,
      doBackFaceCulling:false,
      pointRadius: 3,
      isWindingOrderBackFaceCulling: true,
      doNormalVectors: false,
      normalVectorLength: 40,
      doOutline : true,
      showLights : false,
      doFill: false,
      colorOfVertices: new colorhandler.ColorHandler(42,45,52)
    }),window);
    cameraSpotTracker = new geometry.CameraSpotTracker(new geometry.Vector(0,0,0), 300,0,0);
    renderer.renderParameters.doTriangles = graphConvexHull;
};


function draw () {
    i+=0.01;
    if(!doAnimation) {
        noLoop()
    }
    clear()
    cameraSpotTracker.mouseInputRotate(1,0,0,0);
    renderer.camera = cameraSpotTracker.update(renderer.camera);
    const light_pos = new geometry.Vector(Math.cos(i)*300, 100, Math.sin(i)*300);
    renderer.setSceneLightPos(light_pos,0);
    renderer.graph();
    
    renderer.renderParameters.doTriangles = graphConvexHull;
};
