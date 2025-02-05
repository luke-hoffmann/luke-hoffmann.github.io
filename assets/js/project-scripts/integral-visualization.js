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
    renderGraphic.fill(this.fill);
    renderGraphic.noStroke();
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
      case "cos":
        return this.cos(x);
      case "xSquared":
        return this.xSquared(x);
      case "xCubed":
        return this.xCubed(x);
      case "x":
        return this.x(x);
      case "polynomialOne":
        return this.polynomialOne(x);
      case "polynomialTwo":
        return this.polynomialTwo(x);
      case "cubicOne":
        return this.cubicOne(x);
    }
  }
  sin(theta) {
    return Math.sin(theta);
  }
  cos(theta) {
    return Math.cos(theta);
  }
  xSquared(x){
    return x*x;
  }
  xCubed(x) {
    return x*x*x;
  }
  x(x){
    return x;
  }
  polynomialOne(x){
  }

  polynomialTwo(x) {

  }

  cubicOne(x) {
    return (.5 * (Math.pow(x,3))) + (2*(Math.pow(x,2))) + x -1;
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
    }
    if (stroke === false) {
      renderGraphic.noStroke();
    } else {

      renderGraphic.stroke(stroke);
    }
    renderGraphic.noFill();
    renderGraphic.stroke("black");
  }
  draw (fill,stroke) {
    this.applyColorSettings(fill,stroke);
    renderGraphic.rect(this.x,this.y,this.w,this.h);
  }
}
class IntegralVisualizer {
    constructor (graphPlacementX,graphPlacementY,graphWidth,graphHeight,mathFunction,functionStartX,range) {
      this.graphPlacementX = graphPlacementX;
      this.graphPlacementY = graphPlacementY;
      this.graphWidth = graphWidth;
      this.graphHeight = graphHeight;
      this.mathFunction = mathFunction;
      this.doesRectangleStartOnLeft =false;
      this.wF = graphPlacementX/functionStartX;
      this.hF= graphHeight/range;
      this.domainWidth = graphWidth/this.wF;
      this.rectangles;
      this.areaUnderCurve = 0;
      this.graphPoints;
      this.functionStartX = functionStartX;
    }
    calculatePointsOnFunctionAtSpacing(functionStartX, domainWidth, sizeOfDx){
      let points = [];
      for (let x = functionStartX; x <= functionStartX + domainWidth; x+=sizeOfDx) {
        points.push(new Point(x,this.mathFunction.chosenFunction(x)));
      }
      return points;
    }
    
    calculatePointsOnBaselineAtSpacing(functionStartX,functionBaseLineY,domainWidth,sizeOfDx) {
      let points =[];
      for (let x = functionStartX; x <= functionStartX + domainWidth; x+=sizeOfDx) {
        points.push(new Point(x,functionBaseLineY));
      }
      return points;
    }
    calculateLeftDxRectangles(baselinePoints,functionPoints){
      let rectangles = [];
      for (let i =1 ; i< functionPoints.length;i ++) {
        let w = (functionPoints[i-1].x - baselinePoints[i].x)
        let h = -(functionPoints[i-1].y - baselinePoints[i].y)
        let x = this.graphPlacementX +baselinePoints[i].x 
        let y = this.graphPlacementY + baselinePoints[i].y
        rectangles.push(new Rectangle(x,y,w,h));
      }
      return rectangles;
    }
    calculateRightDxRectangles(baselinePoints,functionPoints){
      let rectangles = [];
      for (let i =1 ; i< functionPoints.length;i ++) {
        let w = (functionPoints[i].x - baselinePoints[i-1].x)
        let h = -( baselinePoints[i-1].y - functionPoints[i].y)
        let x = baselinePoints[i-1].x;
        let y = baselinePoints[i-1].y
        rectangles.push(new Rectangle(x,y,w,h));
      }
      return rectangles;
    }
    calculateDxRectangles(functionPoints,baselinePoints){
      this.rectangles = this.doesRectangleStartOnLeft ? this.calculateLeftDxRectangles(baselinePoints,functionPoints) : this.calculateRightDxRectangles(baselinePoints,functionPoints);
      this.areaUnderCurve = this.calculateAreaOfRectangles(this.rectangles);
      return rectangles;
    }
    graphRectangles (fill,stroke) {
      for (let i =0 ; i < this.rectangles.length; i++) {
        this.rectangles[i].draw(fill,stroke);
      }
      
    }
    calculateAreaOfRectangles(rectangles){
      let sum = 0;
      for (let i =0; i <rectangles.length;i ++) {
        let rectangle = rectangles[i];
        sum += ((rectangle.w * rectangle.h) / this.wF) /this.hF;
      }
      return sum;
    }
    
    calculateGraphPoints(functionPoints){
      let graphPoints = [];
      for (let i=0 ; i < functionPoints.length;i++ ){
        let x =  this.graphPlacementX + (((functionPoints[i].x -this.functionStartX) *this.wF));
        let y = this.graphPlacementY + (this.graphHeight/2 - (functionPoints[i].y *this.hF));
        
        graphPoints.push( new Point(x,y,3,"red"));
      }
      return graphPoints;
    }
    graphTheFunction(graphPoints){
      for (let i=0; i < graphPoints.length;i++) {
        graphPoints[i].graph();
      }
    } 
    graphTheCanvas(){
      renderGraphic.stroke(100);
      renderGraphic.fill(230);
      renderGraphic.rect(this.graphPlacementX,this.graphPlacementY,this.graphWidth,this.graphHeight);
      renderGraphic.stroke(0);
      renderGraphic.line(this.graphPlacementX+ this.graphWidth/2, this.graphPlacementY, this.graphPlacementX + this.graphWidth/2, this.graphPlacementY+this.graphHeight);
      renderGraphic.line(this.graphPlacementX , this.graphPlacementY + this.graphHeight/2, this.graphPlacementX + this.graphWidth, this.graphPlacementY+this.graphHeight/2);
    }
    initialize(dxSize){
      this.graphPoints = this.calculateGraphPoints(this.calculatePointsOnFunctionAtSpacing(this.functionStartX,this.domainWidth,0.02));

      let rectanglePoints = this.calculateGraphPoints(this.calculatePointsOnFunctionAtSpacing(this.functionStartX,this.domainWidth,dxSize));
      let rectangleBaselinePoints = this.calculateGraphPoints(this.calculatePointsOnBaselineAtSpacing(this.functionStartX,0,this.domainWidth,dxSize));
      this.calculateDxRectangles(rectanglePoints,rectangleBaselinePoints);
    }
}




let rectangles;
let integralVisualizer;
let graphStartX = Number(document.getElementById("intervalSlider").value);
let range = 3;


function updateVisualization() {
  graphStartX = Number(document.getElementById("intervalSlider").value);
  dxSize = Number(document.getElementById("dxSlider").value)
  integralVisualizer = new IntegralVisualizer(40,25,310,350,new MathFunctions(document.getElementById("functionPicker").value),graphStartX,range)
  integralVisualizer.initialize(dxSize);
}

function setup(){
    widthOfContainer = document.getElementById("canvas-insertion-point").getBoundingClientRect().width;
      if (widthOfContainer < viewWidth) {
      viewWidth = widthOfContainer;
      viewHeight = widthOfContainer;
    }
    var canvas= createCanvas(viewWidth,viewHeight);
    canvas.parent("canvas-insertion-point");
    renderGraphic = createGraphics(viewWidth, viewHeight);
    dxSize = Number(document.getElementById("dxSlider").value)
    integralVisualizer = new IntegralVisualizer(25,25,350,350,new MathFunctions(document.getElementById("functionPicker").value),graphStartX,range)
    integralVisualizer.initialize(dxSize);
    

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
    renderGraphic.clear();
    renderGraphic.background(200);
    renderGraphic.scale(sF);
    // do stuff here
    
    integralVisualizer.graphTheCanvas();
    integralVisualizer.graphRectangles(false,"black");
    integralVisualizer.graphTheFunction(integralVisualizer.graphPoints);
    document.getElementById("area-curve-span").innerHTML = Math.round(100* integralVisualizer.areaUnderCurve)/100;
    image(renderGraphic, 0, 0);
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