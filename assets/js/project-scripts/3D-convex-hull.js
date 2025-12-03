import {Vector, Light, ColorHandler, Mesh, PrimitiveObject, Field} from './../Geometry/src/index.js';
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
let lights = [];

lights.push(new Light(new ColorHandler(255,255,255),new Vector(2000000,0,0),1))
lights.push(new Light(new ColorHandler(255,255,255),new Vector(0,2000000,0),0.4))
lights.push(new Light(new ColorHandler(255,255,255),new Vector(0,0,2000000),0.6))

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
    numberOfPointsGenerated = 50;

    createCanvasSizeBasedOnDiv();
    
    fieldOfPoints = Field.generateRandomFieldInSphere(radiusOfPointsGenerated,numberOfPointsGenerated);
    mesh = Mesh.generateConvexMesh(fieldOfPoints,numberOfPointsGenerated);
   
    mesh.position = new Vector(0,0,0);
    mesh.triangleColor = triangleColor;
}




function draw() {
    // --   --
    renderGraphic.background(255);
    renderGraphic.scale(sF);
    renderGraphic.push()


    renderGraphic.translate(width/2,height/2);
    // --   --

    increaseTime = hasStartBeenPressed;
    Mesh.graphConvexHullOnCanvas(mesh,t,graphConvexHull,doBackFaceCulling,false,true);
    // do stuff here
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

