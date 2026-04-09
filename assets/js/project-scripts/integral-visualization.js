
let renderGraphic;

let sF = 1;
class Point {
  constructor(x,y,radius,fill){
    this.x = x;
    this.y = y;
    this.r = radius;
    this.fill = fill;
  }
  graph(renderGraphic){
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
      case "oneOverFourX":
        return this.oneOverFourX(x);
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

  oneOverFourX(x) {
    return (1/(4*x));

  }
}
class Rectangle {
  constructor(x,y,w,h) {
    this.x=x; // idk what this should be
    this.y=y;
    this.w= w;
    this.h= h;
  }
  
  draw (renderGraphic,stroke) {
    renderGraphic.noFill()
    renderGraphic.stroke(stroke);
    renderGraphic.rect(this.x,this.y,this.w,this.h);
  }
}
class IntegralVisualizer {
  constructor (graphPlacementX,graphPlacementY,graphWidth,graphHeight,mathFunction,domainWidth,range,riemannSide) {
    this.graphPlacementX = graphPlacementX;
    this.graphPlacementY = graphPlacementY;
    this.graphWidth = graphWidth;
    this.graphHeight = graphHeight;
    this.mathFunction = mathFunction;
    this.doesRectangleStartOnLeft =riemannSide;
    this.wF = graphWidth/domainWidth;
    this.hF = graphHeight/range;
    this.domainWidth = domainWidth
    this.rectangles;
    this.areaUnderCurve = 0;
    this.graphPoints;
    this.functionStartX = - domainWidth/2
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
      let h = (functionPoints[i-1].y - baselinePoints[i].y)
      let x = baselinePoints[i].x 
      let y = baselinePoints[i].y
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
  graphRectangles (renderGraphic,stroke) {
    for (let i =0 ; i < this.rectangles.length; i++) {
      this.rectangles[i].draw(renderGraphic,stroke);
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
      
      graphPoints.push( new Point(x,y,3,"#2A2D34"));
    }
    return graphPoints;
  }
  graphTheFunction(renderGraphic,graphPoints){
    for (let i=0; i < graphPoints.length;i++) {
      graphPoints[i].graph(renderGraphic);
    }
  } 
  graphTheCanvas(renderGraphic){
    renderGraphic.stroke("#2A2D34");
    renderGraphic.line(this.graphPlacementX+ this.graphWidth/2, this.graphPlacementY, this.graphPlacementX + this.graphWidth/2, this.graphPlacementY+this.graphHeight);
    renderGraphic.line(this.graphPlacementX , this.graphPlacementY + this.graphHeight/2, this.graphPlacementX + this.graphWidth, this.graphPlacementY+this.graphHeight/2);
  }
  initialize(dxSize){
    this.graphPoints = this.calculateGraphPoints(this.calculatePointsOnFunctionAtSpacing(this.functionStartX,this.domainWidth,0.009));
    
    let rectanglePoints = this.calculateGraphPoints(this.calculatePointsOnFunctionAtSpacing(this.functionStartX,this.domainWidth,dxSize));
    let rectangleBaselinePoints = this.calculateGraphPoints(this.calculatePointsOnBaselineAtSpacing(this.functionStartX,0,this.domainWidth,dxSize));
    this.calculateDxRectangles(rectanglePoints,rectangleBaselinePoints);
  }
}




let rectangles;
let integralVisualizer;
let domainWidth = 7.65 // Number(document.getElementById("intervalSlider").value);
let range = 3;
let visualizedFunctionInUse = new MathFunctions("sin");
let riemannSide = true;
function setRiemannSide(side) {
  riemannSide = side;
  updateVisualization();
}
function changeVisualizedFunction(functionToUse) {
  visualizedFunctionInUse = new MathFunctions(functionToUse);
  updateVisualization();
}

function updateVisualization(renderGraphic) {
  domainWidth = 7.65 //Number(document.getElementById("intervalSlider").value);
  dxSize = Number(document.getElementById("dxSlider").value)
  insetAmount = 10;
  console.log(canvasWidth,canvasHeight)
  w = (canvasWidth || 400) - (insetAmount * 2)
  h = (canvasHeight || 400) - (insetAmount * 2)
  console.log(w,h)
  integralVisualizer = new IntegralVisualizer(insetAmount,insetAmount,w,h,visualizedFunctionInUse,domainWidth,range,riemannSide)
  integralVisualizer.initialize(dxSize);
  redraw();
}

function setup(){
  createCanvasSizeBasedOnDiv()
  renderGraphic = createGraphics(width, height);
  dxSize = Number(document.getElementById("dxSlider").value)
  updateVisualization();
  
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
  clear()
  renderGraphic.clear();
  renderGraphic.scale(sF);
  // do stuff here
  
  integralVisualizer.graphTheCanvas(renderGraphic);
  integralVisualizer.graphRectangles(renderGraphic,"#2A2D34");
  integralVisualizer.graphTheFunction(renderGraphic,integralVisualizer.graphPoints);
  image(renderGraphic, 0, 0);
  noLoop();
}
  

