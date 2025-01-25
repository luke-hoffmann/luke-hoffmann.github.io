let sideLength= 170;

let orthographic = [
  [1,0,0],
  [0,1,0],
  [0,0,0]
]
function matrixMult(mat1,mat2) {
  let outMat = [];
  for (let i =0 ; i < mat1.length; i++) {
    b  =[];
    for (let j =0; j < mat2[0].length; j++) {
      b.push(0);
    }
    outMat.push(b);
  }
  for (let i =0 ; i< mat1.length; i++) {
    
    for (let j = 0; j < mat2[0].length; j++) {
      smallSum = 0;
      for (let k =0; k < mat1[0].length; k++) {
        smallSum += mat1[i][k] * mat2[k][j];
      }
      outMat[i][j] = smallSum
    }
  }
  return outMat
}
let renderWidth = 500;
let renderHeight = 500;
let renderGraphic;
let viewWidth = 400;
let viewHeight = 400;
let sF = 1;

function scalePositionToRGB(x,y,w,h){
  return [(x/(w))*255,80,(y/(h))*255];
}
  
  
  
function strokeOrFillRGB(array,filler){
    
  if (filler == "fill") {
    renderGraphic.fill(array[0],array[1],array[2]);
  }
  if (filler == "stroke") {
    renderGraphic.stroke(array[0],array[1],array[2]);
  }
  if (filler== "color") {
    color = ("rgb(" + Math.round(array[0]) + "," + Math.round(array[1])  + "," +Math.round(array[2]) + ")");
    console.log(color);
    return color;
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
let colorsForGraph = [];
let points;
function setup(){
  sideLength = 170;
  widthOfContainer = document.getElementById("p5-canvas-div").getBoundingClientRect().width;
    if (widthOfContainer < viewWidth) {
      viewWidth = widthOfContainer;
      viewHeight = widthOfContainer;
      sideLength = 130;
    }
  var canvas= createCanvas(viewWidth,viewHeight);
  canvas.parent("p5-canvas-div");
  renderGraphic = createGraphics(viewWidth, viewHeight);
  points = [
    [-sideLength / 2, -sideLength / 2, -sideLength / 2],
    [-sideLength / 2, -sideLength / 2, sideLength / 2],
    [sideLength / 2, -sideLength / 2, -sideLength / 2],
    [sideLength / 2, sideLength / 2, -sideLength / 2],
    [sideLength / 2, -sideLength / 2, sideLength / 2],
    [-sideLength / 2, sideLength / 2, sideLength / 2],
    [-sideLength / 2, sideLength / 2, -sideLength / 2],
    [sideLength / 2, sideLength / 2, sideLength / 2]
  ];
  for (let i =0;i < points.length;i++) {
    colorsForGraph.push(strokeOrFillRGB(scalePositionToRGB(points[i][0]+width/2,points[i][1]+height/2,width,height),"color"));
  }
}

console.log(colorsForGraph)
let theta = 0.05;
let circleTheta = 0;

let gridPoints = [];
for (let i =0 ; i < 5; i++) {
  for (let j =0; j < 5; j++) {
    gridPoints.push([i*15.5,0,j*15.5])
  }
}

for (i = 0 ; i < gridPoints.length; i++) {
  theta = 45;
  theta = theta * Math.PI /180
  rotationX = [
  [1,0,0],
  [0,Math.cos(theta),-Math.sin(theta)],
  [0,Math.sin(theta),Math.cos(theta)]];
  theta=15;
  rotationY = [
  [Math.cos(theta),0,Math.sin(theta)],
  [0,1,0],
  [-Math.sin(theta),0,Math.sin(theta)]
]
  gridPoints[i] = matrixMult(matrixMult([gridPoints[i]], rotationX),rotationY)
}
function draw() {
    image(renderGraphic, 0, 0);
    renderGraphic.background(255);
    renderGraphic.scale(sF);
    renderGraphic.push();
    // do stuff here
    rotationX = [
      [1,0,0],
      [0,Math.cos(theta),-Math.sin(theta)],
      [0,Math.sin(theta),Math.cos(theta)]];
      
      rotationY = [
      [Math.cos(theta),0,Math.sin(theta)],
      [0,1,0],
      [-Math.sin(theta),0,Math.sin(theta)]
    ]
      
      rotationZ = [
      [Math.cos(theta),-Math.sin(theta),0],
      [Math.sin(theta),Math.cos(theta),0],
      [0,0,1]
    ]
      
      renderGraphic.translate(width/2,height/2)
      
      points2 = matrixMult(points,rotationX)
      points2 = matrixMult(points2,rotationY)
      points2 = matrixMult(points2,rotationZ)
      newArray = [];
      circleTheta += .01;
      for (let l = 0; l < points.length;l++) {
        b = [points[l]]
        b = matrixMult(b,rotationX)
        b = matrixMult(b,rotationY)
        b = matrixMult(b,rotationZ)
        b[0][0] = b[0][0]
        b[0][1] = b[0][1]
        //console.log(b)
        newArray.push(b);
      }
      
      
      
      //weDontCareAboutZ = matrixMult(points2,orthographic);
      //console.log(newArray[0][0])
      
      //console.log(orderToDo)
      renderGraphic.stroke(0);
      
      renderGraphic.strokeWeight(3);
      renderGraphic.line(newArray[0][0][0],newArray[0][0][1],newArray[1][0][0],newArray[1][0][1])
      renderGraphic.strokeWeight(1);
      renderGraphic.line(newArray[2][0][0],newArray[2][0][1],newArray[0][0][0],newArray[0][0][1])
      renderGraphic.line(newArray[2][0][0],newArray[2][0][1],newArray[3][0][0],newArray[3][0][1])
      renderGraphic.line(newArray[5][0][0],newArray[5][0][1],newArray[1][0][0],newArray[1][0][1])
      renderGraphic.line(newArray[7][0][0],newArray[7][0][1],newArray[3][0][0],newArray[3][0][1])
      renderGraphic.line(newArray[7][0][0],newArray[7][0][1],newArray[5][0][0],newArray[5][0][1])
      renderGraphic.line(newArray[6][0][0],newArray[6][0][1],newArray[5][0][0],newArray[5][0][1])
      
      renderGraphic.line(newArray[6][0][0],newArray[6][0][1],newArray[3][0][0],newArray[3][0][1])
      
      renderGraphic.line(newArray[6][0][0],newArray[6][0][1],newArray[0][0][0],newArray[0][0][1])
      renderGraphic.line(newArray[2][0][0],newArray[2][0][1],newArray[4][0][0],newArray[4][0][1])
      renderGraphic.line(newArray[1][0][0],newArray[1][0][1],newArray[4][0][0],newArray[4][0][1])
      renderGraphic.line(newArray[7][0][0],newArray[7][0][1],newArray[4][0][0],newArray[4][0][1])
      for (let i =0; i < newArray.length; i++) {
        renderGraphic.fill(colorsForGraph[i]);
        //strokeOrFillRGB(scalePositionToRGB(newArray[i][0][0],newArray[i][0][1],width/4,height/4),"fill");
        renderGraphic.circle (newArray[i][0][0],newArray[i][0][1],15)
      }
      //noLoop()
      
      theta+=0.01;
    renderGraphic.pop();
    if(!hasStartBeenPressed) {
      noLoop();
      image(renderGraphic, 0, 0);
      return
    }
}

function exportHighRes() {
    // HighRes Export
    sF = renderWidth/viewWidth;
    renderGraphic = createGraphics(renderWidth, renderHeight);
    renderGraphic.background(255);
    draw();
    
    save(renderGraphic, "convex-hull-test-export", 'png');
    
    // Reset Default
    sF=1;
    
    renderGraphic = createGraphics(viewWidth, viewHeight);
    renderGraphic.background(255);
    draw();
}

// Export when key is pressed
function keyReleased() {
    if (key == 'e' || key == 'E') exportHighRes(width,height);
}