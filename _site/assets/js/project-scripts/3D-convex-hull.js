import * as Geometry from "../Geometry/src/index.js";
import { ColorHandler } from "../Color-Handler/src/ColorHandler.js";
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

let radiusOfPointsGenerated = 200;
let numberOfPointsGenerated = 50;


lights.push(new Geometry.Light(new ColorHandler(255,255,255),new Geometry.Vector(2000000,0,0),1))
lights.push(new Geometry.Light(new ColorHandler(255,255,255),new Geometry.Vector(0,2000000,0),0.4))
lights.push(new Geometry.Light(new ColorHandler(255,255,255),new Geometry.Vector(0,0,2000000),0.6))

let t = 0;
let viewVector = new Geometry.Vector(0,0,1);

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
window.startSimulation = startSimulation;
function reset(){
    setup();
    redraw();
}
window.reset = reset;
function findConvex(){
    graphConvexHull = !graphConvexHull;
    document.getElementById("find-convex").innerHTML = (graphConvexHull ? "Hide Convex Hull" : "Find Convex Hull");
    redraw();
}

window.findConvex = findConvex;

function createCanvasSizeBasedOnDiv(){
    var widthOfContainer = document.getElementById("canvas-insertion-point").getBoundingClientRect().width;
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
window.doBackFace = doBackFace;
function setup(){
    

    createCanvasSizeBasedOnDiv();
    
    var fieldOfPoints = Geometry.Field.generateRandomFieldInSphere(radiusOfPointsGenerated,numberOfPointsGenerated);
    var mesh = Geometry.Mesh.generateConvexMesh(fieldOfPoints,numberOfPointsGenerated);
   
    mesh.position = new Geometry.Vector(0,0,0);
    mesh.triangleColor = triangleColor;
}


window.setup = setup;

function draw() {
    // --   --
    renderGraphic.background(255);
    renderGraphic.scale(sF);
    renderGraphic.push()


    renderGraphic.translate(width/2,height/2);
    // --   --

    increaseTime = hasStartBeenPressed;
    Geometry.Mesh.graphConvexHullOnCanvas(mesh,t,graphConvexHull,doBackFaceCulling,false,true);
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

window.draw=draw;   