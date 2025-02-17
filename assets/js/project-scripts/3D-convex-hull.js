let renderWidth = 500;
let renderHeight = 500;
let renderGraphic;
let ogWidth = 400;
let viewWidth = 400;
let viewHeight = 400;
let sF = 1;
let mesh, canvas;
let hasStartBeenPressed = false;
let triangleColor = new ColorHandler(0,0,0);
let doBackFaceCulling = true;
let graphConvexHull = false;
let graphVertices = false;
let t = 0;
let viewVector = new Vector(0,0,1);

function startSimulation(){
    if (hasStartBeenPressed) {
        hasStartBeenPressed = false;
        document.getElementById("play-button").innerHTML = "Play";
        noLoop();
        return
    }
    document.getElementById("play-button").innerHTML = "Pause";
    hasStartBeenPressed = true;
    loop();
    draw();
}

function reset(){
    fieldOfPoints = Field.generateRandomFieldInSphere(170,15);
    mesh = Mesh.generateConvexMesh(fieldOfPoints,15);
    mesh.triangleColor = triangleColor;

    graphConvexHull = false;
    document.getElementById("find-convex").innerHTML = (graphConvexHull ? "Hide Convex Hull" : "Find Convex Hull");
    setup();
    redraw();
}
function findConvex(){
    graphConvexHull = !graphConvexHull;
    document.getElementById("find-convex").innerHTML = (graphConvexHull ? "Hide Convex Hull" : "Find Convex Hull");
    redraw();
}


function createCanvasSizeBasedOnDiv(){
    widthOfContainer = document.getElementById("canvas-insertion-point").getBoundingClientRect().width;
    if (widthOfContainer < viewWidth) {
      viewWidth = widthOfContainer;
      viewHeight = widthOfContainer;
      radiusOfPointsGenerated = 130;
    }
    if (ogWidth != viewWidth) {
        radiusOfPointsGenerated = 130;
    }
    document.getElementById("canvas-insertion-point").innerHTML = ""
    $("canvas").remove();
    createCanvas(viewWidth,viewHeight).parent("canvas-insertion-point");
    renderGraphic = createGraphics(viewWidth, viewHeight);
}

function doBackFace() {
    doBackFaceCulling = !doBackFaceCulling;
    document.getElementById("do-back-face").innerHTML = (doBackFaceCulling ? "Stop Back-Face Culling" : "Start Back-Face Culling");
    redraw();
}
function setup(){
    radiusOfPointsGenerated = 200;
    numberOfPointsGenerated = 150;

    createCanvasSizeBasedOnDiv();
    
    fieldOfPoints = Field.generateRandomFieldInSphere(radiusOfPointsGenerated,numberOfPointsGenerated);
    mesh = Mesh.generateConvexMesh(fieldOfPoints,numberOfPointsGenerated);
    //mesh = PrimitiveObject.cube(150);
    mesh.triangleColor = triangleColor;
}
function graphConvexHullOnCanvas(mesh,t,graphConvexHull,doBackFaceCulling,doNormalVectors,triangleColor) {
    currentMesh = Mesh.copy(mesh);
    rotatedMesh = Mesh.rotate(currentMesh,t,t,t)
    rotatedMesh.triangleColor = triangleColor;
    
    
    if (!graphConvexHull) {
        Mesh.graph(rotatedMesh,graphConvexHull,true,false);
        return
    } 
    if (doBackFaceCulling) {
        rotatedMesh = Mesh.backFaceCulling(rotatedMesh,viewVector);
        lightingLevels = Triangle.getLightingLevelOfTriangles(new Field(rotatedMesh.vertices),rotatedMesh.triangles,new Vector(.5,-.4,-0.5))
        console.log(lightingLevels)
        rotatedMesh = Mesh.setBrightnessOfTrianglesToArray(rotatedMesh,lightingLevels,0.25);
        Mesh.graph(rotatedMesh,graphConvexHull,false,doNormalVectors);
    }   else {
        rotatedMesh.triangleColor = new ColorHandler(0,0,0);
        Mesh.graph(rotatedMesh,graphConvexHull,true,doNormalVectors);
    }
}

function draw() {
    // --   --
    renderGraphic.background(255);
    renderGraphic.scale(sF);
    renderGraphic.push()
    renderGraphic.translate(width/2,height/2);
    // --   --

    increaseTime = hasStartBeenPressed;
    graphConvexHullOnCanvas(mesh,t,graphConvexHull,doBackFaceCulling,false,true);
    // do stuff here
    
    console.log(mesh);

    renderGraphic.pop();

    if (increaseTime) {
        t+=0.01;
    }
    if(!hasStartBeenPressed) {
        noLoop();
        image(renderGraphic, 0, 0);
        return
    }
    image(renderGraphic, 0, 0);
}



// Export when key is pressed
/*
function keyReleased() {
    if (key == 'e' || key == 'E') exportHighRes(renderWidth,renderHeight,viewWidth,viewHeight,"convex-hull-test-export");
}
*/

