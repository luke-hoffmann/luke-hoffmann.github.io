let points=new Field();
let sizeOfSlice=400;
let planes = undefined;
let redPoints = [];

1350,600
let renderWidth = 5000;
let renderHeight = 5000;
let renderGraphic;
let ogWidth = 400;
let viewWidth = 400;
let viewHeight = 400;
let sF = 1;
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
    points=new Field();
    sizeOfSlice=400;
    planes = undefined;
    redPoints = [];
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
    widthOfContainer = document.getElementById("p5-canvas-div").getBoundingClientRect().width;
    if (widthOfContainer < viewWidth) {
      viewWidth = widthOfContainer;
      viewHeight = widthOfContainer;
      radiusOfPointsGenerated = 130;
    }
    if (ogWidth != viewWidth) {
        radiusOfPointsGenerated = 130;
    }
    var canvas = createCanvas(viewWidth,viewHeight);
    canvas.parent("p5-canvas-div")
    renderGraphic = createGraphics(viewWidth, viewHeight);
    for (let i =0 ; i < 100;i++) {
        thetaXY = Math.random() * Math.PI*2
        thetaZ = Math.random()* Math.PI*2;
        points.array.push(Field.SpherePoint(radiusOfPointsGenerated));
    }
    planes = (Field.QuickHull(points));
}
function BoundFace(index){
    if (index>2){
        return index-2-1;
    }
    return index;
}
let increaseTime= true; 
let t =0.4;
function generateRandomColors(array,n){
    for (let i =0; i < n; i++) { 
        array.push("rgb(" + Math.round(Math.random()*255) + "," + Math.round(Math.random()*255) + "," + Math.round(Math.random()*255) + ")");
    }
    return array;
}
let colors = ["red","blue","green"];
colors = generateRandomColors(colors,10000)
console.log(colors)
function getPointsFromPlane(plane) {

    graphList = Plane.graph(plane);
    
    return graphList;
}



function draw() {
    
    
    renderGraphic.background(255);
    
    renderGraphic.scale(sF);
    renderGraphic.push()
    renderGraphic.translate(width/2,height/2);
    // do stuff here
    if (graphConvexHull) {
        for(let i =0;i<planes.length;i++){
            renderGraphic.stroke("black");
            renderGraphic.fill("black")
            renderGraphic.stroke(colors[i]);
            renderGraphic.fill(colors[i])
            planePoints = getPointsFromPlane(planes[i])
            last = undefined
            first = undefined
            for(let j =0;j<planePoints.length;j++){
                graph = Vector.rotateAroundX(planePoints[j],t);
                graph = Vector.rotateAroundY(graph,t);
                if (j==0) {
                    first = graph;
                }
                renderGraphic.circle(graph.x,graph.y,10);
                if (j >0) {
                    renderGraphic.line(last.x,last.y,graph.x,graph.y);
                }
                if (j == planePoints.length-1) {
                    renderGraphic.stroke("black")
                    renderGraphic.line(first.x,first.y,graph.x,graph.y);
                    continue;
            }
            last = graph;
        }
    }
    }
    for(let i =0;i<points.array.length;i++){
        renderGraphic.stroke("black");
        renderGraphic.fill("black")
        graph = Vector.rotateAroundX(points.array[i],t);
        graph = Vector.rotateAroundY(graph,t);
        renderGraphic.circle(graph.x,graph.y,2);
        renderGraphic.textSize(7);
    }
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
