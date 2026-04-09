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
    setDoSimulation(doAnimation);
    redraw();
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
    document.getElementById("play-button").innerHTML = (doAnimation ? "Pause" :  "Start") + "<br><span class='font-bold'>Scene " + (sceneNumber+1) +"</span>";
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

    // scene 1 - scene 1 - scene 1 - scene 1 - scene 1 - scene 1
    lights = [];
    entities=[]
    lights.push(
        new geometry.PointLight(new colorhandler.ColorHandler(255,0,0),100000000, new geometry.Vector(0.5,1,0)),
        new geometry.PointLight(new colorhandler.ColorHandler(0,255,0),100000000, new geometry.Vector(0.5,1,0))
    );
    
    pos = new geometry.PhysicsBody(new geometry.Vector(0,0,0));
    entity = geometry.Entity.entityWithColorsFromMesh(geometry.MeshGenerator.generateEvenSphereMesh(400,100), pos,new colorhandler.ColorHandler(255,255,255),new colorhandler.ColorHandler(255,255,255),false);
    entities.push(entity)
    scenes.push(new geometry.Scene(entities,lights));


    // scene 2 - scene 2 - scene 2 - scene 2 - scene 2 - scene 2
    lights = [];
    entities = []
    
    lights.push(
        new geometry.DirectionalLight(new colorhandler.ColorHandler(0,0,0),0, new geometry.Vector(0.5,1,0)),
        new geometry.DirectionalLight(new colorhandler.ColorHandler(0,0,0),0, new geometry.Vector(0.5,1,0)),
        new geometry.PointLight(new colorhandler.ColorHandler(70,200,100),1000000, new geometry.Vector(0,0,0),100)
    );

    pos = new geometry.PhysicsBody(new geometry.Vector(-1000,0,0));
    entity = geometry.Entity.randomConvexEntityWithColors(500,100, pos,new colorhandler.ColorHandler(255,255,255),new colorhandler.ColorHandler(255,255,255),false);
    entities.push(entity)
    pos = new geometry.PhysicsBody(new geometry.Vector(1000,0,0));
    entity = geometry.Entity.randomConvexEntityWithColors(500,100, pos,new colorhandler.ColorHandler(255,255,255),new colorhandler.ColorHandler(255,255,255),false);
    entities.push(entity)
    scenes.push(new geometry.Scene(entities,lights));


    // scene 3 - scene 3 - scene 3 - scene 3 - scene 3 - scene 3
    lights = [];
    entities = []
    lights.push(
        new geometry.DirectionalLight(new colorhandler.ColorHandler(0,0,0),0, new geometry.Vector(0.5,1,0)),
        new geometry.DirectionalLight(new colorhandler.ColorHandler(0,0,0),0, new geometry.Vector(0.5,1,0)),
        new geometry.DirectionalLight(new colorhandler.ColorHandler(0,0,0),0, new geometry.Vector(0.5,1,0)),
        new geometry.PointLight(new colorhandler.ColorHandler(100,0,255),10000000, new geometry.Vector(0,0,0),100),
        new geometry.PointLight(new colorhandler.ColorHandler(0,255,255),10000000, new geometry.Vector(0,0,0),100)
    );

    pos = new geometry.PhysicsBody(new geometry.Vector(-500,-200,0));
    entity = geometry.Entity.randomConvexEntityWithColors(250,100, pos,new colorhandler.ColorHandler(255,255,255),new colorhandler.ColorHandler(255,255,255),false);
    entities.push(entity)
    pos = new geometry.PhysicsBody(new geometry.Vector(500,-200,0));
    entity = geometry.Entity.randomConvexEntityWithColors(250,100, pos,new colorhandler.ColorHandler(255,255,255),new colorhandler.ColorHandler(255,255,255),false);
    entities.push(entity)
    pos = new geometry.PhysicsBody(new geometry.Vector(0,300,0));
    entity = geometry.Entity.randomConvexEntityWithColors(250,100, pos,new colorhandler.ColorHandler(255,255,255),new colorhandler.ColorHandler(255,255,255),false);
    entities.push(entity)
    scenes.push(new geometry.Scene(entities,lights));


    // scene 4 - scene 4 - scene 4 - scene 4 - scene 4 - scene 4
    lights = [];
    entities = []
    lights.push(
        new geometry.DirectionalLight(new colorhandler.ColorHandler(0,0,0),0, new geometry.Vector(0.5,1,0)),
        new geometry.DirectionalLight(new colorhandler.ColorHandler(0,0,0),0, new geometry.Vector(0.5,1,0)),
        new geometry.DirectionalLight(new colorhandler.ColorHandler(0,0,0),0, new geometry.Vector(0.5,1,0)),
        new geometry.DirectionalLight(new colorhandler.ColorHandler(0,0,0),0, new geometry.Vector(0.5,1,0)),
        new geometry.DirectionalLight(new colorhandler.ColorHandler(0,0,0),0, new geometry.Vector(0.5,1,0)),
        new geometry.PointLight(new colorhandler.ColorHandler(255,51,153),500000, new geometry.Vector(0,0,0),100),
    );

    pos = new geometry.PhysicsBody(new geometry.Vector(0,0,0));
    entity = geometry.Entity.randomConvexEntityWithColors(450,100, pos,new colorhandler.ColorHandler(255,255,255),new colorhandler.ColorHandler(255,255,255),false);
    entities.push(entity)
    scenes.push(new geometry.Scene(entities,lights));


    screenSize = new geometry.Vector(width,height);
    renderer = new geometry.p5Renderer(scenes[sceneNumber],screenSize,camera, new geometry.RenderParameters({
      doVertices: false,
      doTriangles: true,
      isPerspective:true,
      doBackFaceCulling:true,
      pointRadius: 3,
      isWindingOrderBackFaceCulling: true,
      doNormalVectors: false,
      normalVectorLength: 40,
      doOutline : true,
      showLights : true,
      doFill: true,
    }),window);
    cameraSpotTracker = new geometry.CameraSpotTracker(new geometry.Vector(0,0,0), 3000,0,30 * (Math.PI/180));
};


function draw () {
    i+=0.01;
    if(!doAnimation) {
        noLoop()
    }
    clear();
    cameraSpotTracker.mouseInputRotate(0.5,0,0,0);
    renderer.camera = cameraSpotTracker.update(renderer.camera)
    light_pos = new geometry.Vector(0, Math.sin(i)*500, Math.cos(i)*500);
    renderer.setSceneLightPos(light_pos,0);
    light_pos = new geometry.Vector(Math.cos(i)*500, 0, Math.sin(i)*500);
    renderer.setSceneLightPos(light_pos,1);

    light_pos = new geometry.Vector(0, Math.cos(i)*500, 0);
    renderer.setSceneLightPos(light_pos,2);

    
    light_pos = new geometry.Vector(Math.cos(i)*1000, 0, Math.sin(i)*1000);
    renderer.setSceneLightPos(light_pos,3);
    light_pos = new geometry.Vector(0,300 + Math.cos(i+30)*550, Math.sin(i+20)*550);
    renderer.setSceneLightPos(light_pos,4);

    light_pos = new geometry.Vector(Math.cos(i+30)*550,0, Math.sin(i+20)*550);
    renderer.setSceneLightPos(light_pos,5);
    renderer.graph();
};
