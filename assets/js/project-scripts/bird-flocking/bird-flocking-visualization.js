let widthScreen = 400;
let heightScreen = 400;
let amountOfBugs = 300;
let radiansToDegrees = 380/Math.PI;
let widthToRGB = widthScreen /255;
let heightToRGB = heightScreen / 255;
const degreesToRadians = Math.PI/180;
let perceptionRadius = 15;
let sizeOfViewCone = 90;
let doViewCone = false;
let lookNice = true;
let drawCones = false;
let sizeOfDrawCone = perceptionRadius;
let drawFlockLines = false;


let startingAlignmentSlider = 1;
let startingCohesionSlider = 1;
let startingSeperationSlider = 1.4;


function badAngleToGoodAngle(x1,y1,x2,y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  
this.angle = Math.atan((this.y1-this.y2)/(this.x1-this.x2)) * 180 / Math.PI;
  
  if (this.x1 < this.x2) {
      if (this.y1 < this.y2) {
        this.angle = this.angle + 180
        
      } else {
        this.angle = 90 + 90-Math.abs(this.angle)
      }
    } else {
      if (this.y1 < this.y2) {
        this.angle = 360 - Math.abs(this.angle);
      } else {
        
        
      }
    }
  return this.angle
}

function drawCircle( x, y, startAngle, length, radius, direction, res) {
  if (res == undefined) {
    res = 1;
  }
  
  //direction =-1;
  this.x = x;
  this.y = y;
  
  going = true;
  i = startAngle;
  this.count = 0;
  if (direction == 1) {
  
    for (let i =startAngle ; i < startAngle+ length; i++) {
    
    
      angle =  Math.PI/180 * (i);
        
      this.x1 = this.x + (Math.cos(angle)*radius);
      this.y1 = this.y + (Math.sin(angle)*radius);
        
      renderGraphic.point(this.x1,this.y1);
      
      
    }
  } else {
    for (let i =startAngle ; i > startAngle- length; i--) {
  
  
    angle =  Math.PI/180 * (i);
      
    this.x1 = this.x + (Math.cos(angle)*radius);
    this.y1 = this.y + (Math.sin(angle)*radius);
    
    renderGraphic.point(this.x1,this.y1);
    
    
  }
  }
  
}
function inViewCone(boid, checkBoid) {


  boidVelocity =  badAngleToGoodAngle(0,0,boid.velocity.x,boid.velocity.y);//Math.atan((0-boid.velocity.y)/(0-boid.velocity.x)) * 180 / Math.PI; // degrees
  directionToOtherBoid = badAngleToGoodAngle(boid.position.x,boid.position.y,checkBoid.position.x,checkBoid.position.y);//Math.atan( (boid.position.x- boid.position.y)/(checkBoid.position.x-checkBoid.position.y)) * 180 / Math.PI; // degrees

  topRange = boidVelocity + (sizeOfViewCone/2)
  bottomRange = boidVelocity - (sizeOfViewCone/2)

  if (topRange > 360) {
    topRange = topRange - 360
  }
  if (bottomRange < 0) {
    bottomRange = 0;
  }


  
  if (directionToOtherBoid < topRange && directionToOtherBoid > bottomRange) {
    return true
  }
  return false
}
  
function drawLinToDir(x,y,dir, length){

  x1 = x+ Math.cos(dir) * length;
  y1 = y+ Math.sin(dir) * length;
  renderGraphic.line(x,y,x1,y1);
  return
}
function randomHexColor(){
  function individualNumToHex(num){
  
 
  
  if (num < 10) {
    return num
  }
  switch (num) { 

    case 10:
      return "a";
    case 11:
      return "b";
    case 12:
      return "c";
    case 13:
      return "d";
    case 14:
      return "e";
    case 15:
      return "f";
    default:
      return num;
  }
}
  this.max = 15;
  this.min = 0;
  a = individualNumToHex(Math.round(Math.random() * (this.max - this.min) + this.min));
  b = individualNumToHex(Math.round(Math.random() * (this.max - this.min) + this.min));
  c = individualNumToHex(Math.round(Math.random() * (this.max - this.min) + this.min));
  d = individualNumToHex(Math.round(Math.random() * (this.max - this.min) + this.min));
  e = individualNumToHex(Math.round(Math.random() * (this.max - this.min) + this.min));
  f = individualNumToHex(Math.round(Math.random() * (this.max - this.min) + this.min));
  return "#" + a + b + c + d + e + f;

      

}
      
function strokeOrFillRGB(array,filler){
  
  if (filler == "fill") {
    renderGraphic.fill(array[0],array[1],array[2]);
  }
  if (filler == "stroke") {
    renderGraphic.stroke(array[0],array[1],array[2]);
  }
}

function resetFlockingParameters(){
  document.getElementById("seperation-slider").value = startingSeperationSlider;
  document.getElementById("cohesion-slider").value = startingCohesionSlider;
  document.getElementById("alignment-slider").value = startingAlignmentSlider;
  updateFlockingParameters();
}



let bugs = [];
let grid = [];

function reset(){
  
  bugs = [];
  grid = [];
  setup();
  redraw();

  resetFlockingParameters();
}
let renderWidth = 500;
let renderHeight = 500;
let renderGraphic;
let viewWidth = 400;
let viewHeight = 400;
let hasStartBeenPressed = false;
let sF = 1;
function setup(){
  widthOfContainer = document.getElementById("canvas-insertion-point").getBoundingClientRect().width;
  if (widthOfContainer < viewWidth) {
    viewWidth = widthOfContainer;
    viewHeight = widthOfContainer;
  }
  
  var canvas = createCanvas(viewWidth,viewHeight);
  canvas.parent('canvas-insertion-point');
  renderGraphic = createGraphics(viewWidth, viewHeight);
  for (let i =0; i < amountOfBugs; i ++) {
      bugs.push(new Bug());
    }
  
    let testBug1  = new Bug(createVector(195,195), createVector(-1,-1));
  let testBug2  = new Bug(createVector(200,200), createVector(-1,-1));
  resetFlockingParameters
}
let zeta = 0;
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

function updateFlockingParameters() {
  for (let i=0;  i < bugs.length;i++) {
    bug = bugs[i];
    bug.seperationStrength = Number(document.getElementById("seperation-slider").value)
    bug.cohesionStrength = Number(document.getElementById("cohesion-slider").value)
    bug.alignmentStrength = Number(document.getElementById("alignment-slider").value)
  }
}
function draw() {
  image(renderGraphic, 0, 0);
  renderGraphic.background(255);
  renderGraphic.scale(sF);
  renderGraphic.push();
  // do stuff here
  grid =[];
  strokeWeight(1);
  heightFactor = height/perceptionRadius;
  widthFactor = width/perceptionRadius;
  
  for (let i =0; i < bugs.length;i++) {
    flock = [];
    for (let j = 0 ; j < bugs.length;j++) {
      if (bugs[i] == bugs[j]) {
        continue;
      }
      flock.push(bugs[j]);
    }
    bugs[i].flocking(flock);
    bugs[i].draw();
    
  }
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
  
  save(renderGraphic, "boids-with-rgb-render", 'png');
  
  // Reset Default
  sF=1;
  
  renderGraphic = createGraphics(viewWidth, viewHeight);
  renderGraphic.background(255);
  draw();
}

// Export when key is pressed