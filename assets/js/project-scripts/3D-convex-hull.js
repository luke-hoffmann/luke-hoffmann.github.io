
let renderWidth = 500;
let renderHeight = 500;
let renderGraphic;
let ogWidth = 400;
let viewWidth = 400;
let viewHeight = 400;
let sF = 1;
let mesh, canvas;
function scalePositionToRGB(x,y,w,h){
    return [x/(w)*255,80,y/(h)*255];
}
  
  
  
function strokeOrFillRGB(array,filler){
    
  if (filler == "fill") {
    renderGraphic.fill(array[0],array[1],array[2]);
  }
  if (filler == "stroke") {
    renderGraphic.stroke(array[0],array[1],array[2]);
  }
}
let hasStartBeenPressed = false;
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
let graphConvexHull = false;
function reset(){
    fieldOfPoints = Field.generateRandomFieldInSphere(170,200);
    mesh = Mesh.generateConvexMesh(fieldOfPoints,200);
    mesh.triangleColor = true;

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
  
function setup(){
    radiusOfPointsGenerated = 200;
    numberOfPointsGenerated = 200;
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

    //document.getElementsByClassName("canvas").remove();
    createCanvas(viewWidth,viewHeight).parent("canvas-insertion-point");
    //canvas.parent("canvas-insertion-point")
    

    renderGraphic = createGraphics(viewWidth, viewHeight);

    fieldOfPoints = Field.generateRandomFieldInSphere(radiusOfPointsGenerated,numberOfPointsGenerated);
    
    mesh = Mesh.generateConvexMesh(fieldOfPoints,100);
    //mesh = PrimitiveObject.cube(150);
    mesh.triangleColor = true;
}

let t= 0;
function draw() {
    increaseTime = hasStartBeenPressed;
    
    renderGraphic.background(255);
    
    renderGraphic.scale(sF);
    renderGraphic.push()
    renderGraphic.translate(width/2,height/2);
    // do stuff here
    Mesh.graph(mesh,graphConvexHull,t,t,t);
    
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

function exportHighRes() {
    // HighRes Export
    sF = renderWidth/viewWidth;
    renderGraphic = createGraphics(renderWidth, renderHeight);
    
    renderGraphic.background(255);
    increaseTime = false;
    draw();
    noLoop();
    save(renderGraphic, "convex-hull-test-export", 'png');
    
    // Reset Default
    sF=1;
    
    renderGraphic = createGraphics(viewWidth, viewHeight);
    renderGraphic.background(100);
    draw();
}

// Export when key is pressed
/*
function keyReleased() {
    if (key == 'e' || key == 'E') exportHighRes(width,height);
}


function keyPressed(){
    if (increaseTime) {
        increaseTime = false;
        return
    }
    increaseTime = true;
}
*/