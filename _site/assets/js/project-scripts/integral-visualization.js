let renderWidth = 500;
let renderHeight = 500;
let renderGraphic;
let viewWidth = 400;
let viewHeight = 400;
let sF = 1;
class Point {
  constructor(x,y,radius,fill){
    this.x = x;
    this.y = y;
    this.r = radius;
    this.fill = fill;
  }
  graph(){
    renderGraphic.fill(fill);
    noStroke();
    renderGraphic.circle(this.x,this.y,this.r);
  }
}
class MathFunctions{
  constructor(functionSelector){
    this.functionSelector = functionSelector;
  }
  chosenFunction(x) {
    switch(this.functionSelector) {
      case "sin":
        return this.sin(x);
      case "xSquared":
        return this.xSquared(x);
      case "xCubed":
        return this.xCubed(x);
    }
  }
  sin(theta) {
    return Math.sin(theta);
  }
  xSquared(x){
    return x^2;
  }
  xCubed(x) {
    return x^3;
  }
}
class Rectangle {
  constructor(x,y,w,h,fill,stroke) {
    
    this.x=x; // idk what this should be
    this.y=y;
    this.w= w;
    this.h= h;
    this.fillColor = fill;
    this.strokeColor = stroke;
  }
  applyColorSettings(fill,stroke){
    if (fill=== false) {
      renderGraphic.noFill();
    } else {
      renderGraphic.fill(fill);
      renderGraphic.fill("black")
    }
    if (stroke === false) {
      renderGraphic.noStroke();
    } else {
      renderGraphic.stroke(stroke);
    }
  }
  draw (fill,stroke) {
    this.applyColorSettings(fill,stroke);
    renderGraphic.rect(this.x,this.y,this.w,this.h);
  }
}
class IntegralVisualizer {
    constructor (graphPlacementX,graphPlacementY,graphWidth,graphHeight,mathFunction,domainWidth,range) {
      this.graphPlacementX = graphPlacementX;
      this.graphPlacementY = graphPlacementY;
      this.graphWidth = graphWidth;
      this.graphHeight = graphHeight;
      this.mathFunction = mathFunction;
      this.doesRectangleStartOnLeft =true;
      this.wF = graphWidth/domainWidth;
      this.hF= graphHeight/range;
      this.domainWidth = domainWidth;
    }
    calculatePointsOnFunctionAtSpacing(functionStartX, domainWidth, sizeOfDx){
      let points = [];
      for (let x = functionStartX; x <= domainWidth/sizeOfDx; x++) {
        points.push(new Point(x,this.mathFunction.chosenFunction(x)));
      }
      return points;
    }
    calculatePointsOnBaselineAtSpacing(functionStartX,functionBaseLineY,domainWidth,sizeOfDx) {
      let points =[];
      for (let x = functionStartX; x <= domainWidth/sizeOfDx; x++) {
        points.push(new Point(x,functionBaseLineY));
      }
      return points;
    }
    calculateLeftDxRectangles(baselinePoints,functionPoints){
      let rectangles = [];
      for (let i =1 ; i< functionPoints.length-1;i ++) {
        let w = Math.abs(functionPoints[i].x - baselinePoints[i-1].x) * this.wF;
        let h = Math.abs(functionPoints[i].y - baselinePoints[i-1].y) * this.hF;
        let x = baselinePoints[i].x * this.wF;
        let y = functionPoints[i].y * this.hF;
        rectangles.push(new Rectangle(x,y,w,h));
      }
      return rectangles;
    }
    calculateRightDxRectangles(){
      
    }
    calculateDxRectangles(functionStartX, functionBaseLineY,sizeOfDx){
      let functionPoints = this.calculatePointsOnFunctionAtSpacing(functionStartX,this.domainWidth,sizeOfDx);
      console.log(functionPoints)
      let baselinePoints = this.calculatePointsOnBaselineAtSpacing(functionStartX,functionBaseLineY,this.domainWidth,sizeOfDx);
      let rectangles = this.doesRectangleStartOnLeft ? this.calculateLeftDxRectangles(baselinePoints,functionPoints) : this.calculateRightDxRectangles(baselinePoints,functionPoints);
      console.log(rectangles)
      return rectangles;
    }
    graphRectangles (rectangles,fill,stroke) {
      for (let i =0 ; i < rectangles.length; i++) {
        rectangles[i].draw(fill,stroke);
      }
      
    }
}
let rectangles;
let integralVisualizer;
function setup(){
    widthOfContainer = document.getElementById("canvas-insertion-point").getBoundingClientRect().width;
      if (widthOfContainer < viewWidth) {
      viewWidth = widthOfContainer;
      viewHeight = widthOfContainer;
    }
    var canvas= createCanvas(viewWidth,viewHeight);
    canvas.parent("canvas-insertion-point");
    renderGraphic = createGraphics(viewWidth, viewHeight);
    integralVisualizer = new IntegralVisualizer(25,25,350,350,new MathFunctions("sin"),6,3)
    
    rectangles = integralVisualizer.calculateDxRectangles(-3,0,0.5);

    redraw();
}
function strokeOrFillRGB(array,filler){
    if (filler == "fill") {
      renderGraphic.fill(array[0],array[1],array[2]);
    }
    if (filler == "stroke") {
      renderGraphic.stroke(array[0],array[1],array[2]);
    }
} 
  
function draw() {
    renderGraphic.background(255);
    renderGraphic.scale(sF);
    // do stuff here
    integralVisualizer.graphRectangles(rectangles,0,0);
    image(renderGraphic, 0, 0);
    noLoop();
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