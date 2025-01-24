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


class bug {
  constructor(position,velocity){
    this.target = createVector(0,0);
    this.position = position;
    this.velocity = velocity;
    if (position == undefined) {
    this.position = createVector(Math.random()*widthScreen, Math.random()*heightScreen);
    }
    if (velocity == undefined) {
    this.velocity = p5.Vector.random2D();
      this.velocity.setMag(random(2,4));
    }
    this.acceleration = createVector();
    
    this.maxSpeed = 2;
    this.maxForce  = 0.1;
    this.radius = 10;
    this.color = [Math.random()*255,0,0];
    //console.log(this.color)
    
    
  }

  draw() {
    this.direction = this.velocity.normalize();
    // steering = desired_velocity - velocity
    renderGraphic.stroke(0);
    renderGraphic.noFill();
    if (lookNice) {
    strokeOrFillRGB([this.position.x/widthToRGB,this.position.y/heightToRGB,0],"fill")
    renderGraphic.stroke(0);
      
    }
    //drawLineToDir(this.position.x ,this.position.y, this.direction.heading(), 10); 
    
    
    if (lookNice == true) {
    this.shiftedX = this.position.x+ (Math.cos(this.direction.heading() + (90 * radiansToDegrees)) *this.radius/2);
    this.shiftedY = this.position.y+ (Math.sin(this.direction.heading() + (90 * radiansToDegrees)) *this.radius/2);
    this.topX =this.position.x+ (Math.cos(this.direction.heading()) *10);
    this.topY =this.position.y+ (Math.sin(this.direction.heading()) *10);
    this.top  = createVector(this.topX,this.topY)
    this.left = createVector(this.shiftedX,this.shiftedY);
    this.shiftedX = this.position.x+ (Math.cos(this.direction.heading() + (-90 * radiansToDegrees)) *this.radius/2);
    this.shiftedY = this.position.y+ (Math.sin(this.direction.heading() + (-90 * radiansToDegrees)) *this.radius/2);
  this.right = createVector(this.shiftedX,this.shiftedY);
    
    //line(this.left.x,this.left.y,this.top.x,this.top.y);
    //line(this.right.x,this.right.y,this.top.x,this.top.y);
    //line(this.position.x,this.position.y,this.top.x,this.top.y);
    renderGraphic.beginShape()
    renderGraphic.vertex(this.left.x,this.left.y);
    renderGraphic.vertex(this.top.x,this.top.y,);
    renderGraphic.vertex(this.right.x,this.right.y)
    renderGraphic.endShape();
    }
    renderGraphic.circle(this.position.x,this.position.y,this.radius);
    if (drawCones) {
      this.headingAngle = this.velocity.heading();
      this.smallAngle = (sizeOfViewCone/2)*degreesToRadians;
      this.left = createVector((Math.cos(this.headingAngle-this.smallAngle)*sizeOfDrawCone)+this.position.x,(Math.sin(this.headingAngle-(this.smallAngle))*sizeOfDrawCone)+this.position.y)
      renderGraphic.line(this.position.x,this.position.y,this.left.x,this.left.y)
      this.right = createVector((Math.cos(this.headingAngle+(this.smallAngle))*sizeOfDrawCone)+this.position.x,(Math.sin(this.headingAngle+(this.smallAngle))*sizeOfDrawCone)+this.position.y)
      renderGraphic.line(this.position.x,this.position.y,this.right.x,this.right.y)
      //this.right = createVector((Math.cos(this.headingAngle)*sizeOfDrawCone) +this.position.x, (Math.sin(this.headingAngle)*sizeOfDrawCone)+ this.position.y)
      //line(this.position.x,this.position.y,this.right.x,this.right.y)

      //drawCircle(this.position.x,this.position.y,(this.headingAngle-this.smallAngle)*radiansToDegrees,sizeOfViewCone,perceptionRadius,1)
    }

    
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.position.add(this.velocity);
    if (this.position.x < 0) {
      this.position.x = widthScreen;
    }
    if (this.position.x > widthScreen) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = heightScreen;
    }
    if (this.position.y > heightScreen) {
      this.position.y = 0;
    }
    this.acceleration = createVector(0,0);
    
  }
  seek() {
    this.desiredVelocity = this.target.sub(this.position).setMag(this.maxSpeed);
    this.steering = this.desiredVelocity.sub(this.velocity).limit(this.maxForce);
    this.addAcc(this.steering);
    
  }
  flee() {
    this.desiredVelocity = this.target.sub(this.position).setMag(this.maxSpeed);
    this.steering = this.desiredVelocity.sub(this.velocity).limit(this.maxForce);
    this.addAcc(this.steering.mult(-1));
    
  }
  flocking(flock) {
    this.seperationForce = this.seperation(flock);
    this.alignmentForce = this.alignment(flock);
    this.cohesionForce = this.cohesion(flock);
    this.acceleration.add(this.seperationForce);
    this.acceleration.add(this.cohesionForce);
    
    this.acceleration.add(this.alignmentForce);
  }
  alignment(flock){
    //let perceptionRadius = 25;
    this.steering = createVector();
    this.total = 0;
    for (let i = 0; i < flock.length; i++) {
        renderGraphic.stroke("RED");
      //line(this.position.x,this.position.y,flock[i].position.x,flock[i].position.y)
      this.distance = p5.Vector.dist(this.position, flock[i].position)
      ///console.log(this.distance)
      if (this.distance < perceptionRadius && flock[i] != this ) {
        this.steering.add(flock[i].velocity)
        this.total++;
      }
      
    }
    if (this.total > 0) {
      this.steering.div(this.total);
      this.steering.setMag(this.maxSpeed)
      this.steering.sub(this.velocity)
      this.steering.limit(this.maxForce)
    }
    
    return this.steering
  }
  

  cohesion(flock) {
    //let perceptionRadius = 50;
    this.steering = createVector();
    this.total = 0;
    for (let i = 0; i < flock.length; i++) {
      this.distance = p5.Vector.dist(this.position, flock[i].position)
      
      if (this.distance < perceptionRadius && flock[i] != this ) {
        this.steering.add(flock[i].position)
        this.total++;
        renderGraphic.stroke("red")
        if (drawFlockLines) {
          line(flock[i].position.x,flock[i].position.y,this.position.x,this.position.y);
        }
        
      }
      
    }
    if (this.total > 0) {
      this.steering.div(this.total);
      this.steering.sub(this.position) 
      this.steering.setMag(this.maxSpeed)
      this.steering.sub(this.velocity)
      this.steering.limit(this.maxForce)
    }
    
    return this.steering
    
  }


  seperation(flock){
    //let perceptionRadius = 25;
    this.steering = createVector();
    this.total = 0;
    for (let i = 0; i < flock.length; i++) {
      this.distance = p5.Vector.dist(this.position, flock[i].position)
      ///console.log(this.distance)
      if (this.distance < perceptionRadius && flock[i] != this ) {
        this.currentSelect = p5.Vector.sub(this.position,flock[i].position)
        this.currentSelect.normalize();
        this.currentSelect.div(this.distance);
        
        this.steering.add(this.currentSelect)
      }
      
    }
    if (this.total > 0) {
      
      this.steering.setMag(this.maxSpeed)
      this.steering.sub(this.velocity)
      this.steering.limit(this.maxForce)
    }
    
    return this.steering
  }

  

  
}


let bugs = [];
let grid = [];

function reset(){
  
  bugs = [];
  grid = [];
  setup();
  redraw();
}
let renderWidth = 500;
let renderHeight = 500;
let renderGraphic;
let viewWidth = 400;
let viewHeight = 400;
let hasStartBeenPressed = false;
let sF = 1;
function setup(){
    widthOfContainer = document.getElementById("p5-canvas-div").getBoundingClientRect().width;
    if (widthOfContainer < viewWidth) {
      viewWidth = widthOfContainer;
      viewHeight = widthOfContainer;
    }
    var canvas = createCanvas(viewWidth,viewHeight);
    canvas.parent('p5-canvas-div');
    renderGraphic = createGraphics(viewWidth, viewHeight);

    for (let i =0; i < amountOfBugs; i ++) {
        bugs.push(new bug());
      }
    
      let testBug1  = new bug(createVector(195,195), createVector(-1,-1));
    let testBug2  = new bug(createVector(200,200), createVector(-1,-1));
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

  for (let i =0;i < height/perceptionRadius; i++) {
    row = [];
    for (let j =0; j < width/perceptionRadius; j++) {
      row.push([]);
    }
    grid.push(row);
  }
  
  for (let i =0 ; i< bugs.length;i++) {

    
    flock = [];
    gridX = Math.floor(bugs[i].position.x/perceptionRadius);
    gridY = Math.floor(bugs[i].position.y/perceptionRadius);
    if (gridX > -1 && gridX < grid[0].length && gridY > -1 && gridY < grid.length) {
      //console.log(gridX)
      //console.log(gridY)
      //console.log(grid[0].length)
      
      //console.log(grid[gridX][gridY])
      grid[gridY][gridX].push(bugs[i]);
    }
  }
  //console.log(getLengthOf3DArray(grid))
  for (let i=0; i < bugs.length; i ++) {

    
    flock = [];
    bugGrid = createVector(Math.floor(bugs[i].position.x/perceptionRadius), Math.floor(bugs[i].position.y/perceptionRadius))
    for (let l = bugGrid.y-1;l < bugGrid.y+1; l++) {
    if (l < 0 ) {
      //console.log(l)
      continue
    }
    if (l >= grid.length) {

      
      break
    }
    for (let j =bugGrid.x-1; j < bugGrid.x+1; j++) {

      if (j < 0 ) {
        //j++
        
        continue
        
      }
      if (j >= grid[0].length) {
        
        continue
      }
      
      if (grid[l][j] == undefined) {
        continue
      }
      for (let k =0; k < grid[l][j].length; k++) {
        
        distance = (((grid[l][j][k].position.y - bugs[i].position.y)**2) + ((grid[l][j][k].position.x- bugs[i].position.x)**2));
        //console.log(distance <perceptionRadius**2)
        if (distance < perceptionRadius**2) {


          if (doViewCone) {
          if (inViewCone(bugs[i],grid[l][j][k])) {
            flock.push(grid[l][j][k]);
          } else {
            
          }
          } else {
            flock.push(grid[l][j][k]);
          }
            
          
        }
      }
    }
  }


    
    bugs[i].flocking(flock)
    bugs[i].draw();
  }
  if (zeta > 3) {
  noLoop();
  }
  //noLoop();
  //zeta++;
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