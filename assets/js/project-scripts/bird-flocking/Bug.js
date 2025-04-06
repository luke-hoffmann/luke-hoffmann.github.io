class Bug {
  constructor(position,velocity,perceptionRadius){

    this.seperationStrength = 1.34;
    this.cohesionStrength = 1;
    this.alignmentStrength = 1;



    this.perceptionRadius = perceptionRadius;
    if (perceptionRadius == undefined) this.perceptionRadius = 10;
    this.target = createVector(0,0);
    this.position = position;
    this.velocity = velocity;
    if (position == undefined) {
    this.position = createVector(Math.random()*VIEW_WIDTH, Math.random()*VIEW_HEIGHT);
    }
    if (velocity == undefined) {
    this.velocity = p5.Vector.random2D();
      this.velocity.setMag(random(2,4));
    }
    this.acceleration = createVector();
    this.maxSpeed = 5;
    this.maxForce  = .2;
    this.radius = 10;
    this.color = [Math.random()*255,0,0];
    
  
  }

  draw() {
    this.direction = this.velocity.normalize();
    stroke(0);
    noFill();
    strokeOrFillRGB([this.position.x/WIDTH_TO_RGB,this.position.y/HEIGHT_TO_RGB,0],"fill")
    stroke(0);
    
    this.shiftedX = this.position.x+ (Math.cos(this.direction.heading() + (90 * RADIAN_TO_DEGREE)) *this.radius/2);
    this.shiftedY = this.position.y+ (Math.sin(this.direction.heading() + (90 * RADIAN_TO_DEGREE)) *this.radius/2);
    this.topX =this.position.x+ (Math.cos(this.direction.heading()) *10);
    this.topY =this.position.y+ (Math.sin(this.direction.heading()) *10);
    this.top  = createVector(this.topX,this.topY)
    this.left = createVector(this.shiftedX,this.shiftedY);
    this.shiftedX = this.position.x+ (Math.cos(this.direction.heading() + (-90 * RADIAN_TO_DEGREE)) *this.radius/2);
    this.shiftedY = this.position.y+ (Math.sin(this.direction.heading() + (-90 * RADIAN_TO_DEGREE)) *this.radius/2);
    this.right = createVector(this.shiftedX,this.shiftedY)
    beginShape()
    vertex(this.left.x,this.left.y);
    vertex(this.top.x,this.top.y,);
    vertex(this.right.x,this.right.y)
    endShape();
  
    circle(this.position.x,this.position.y,this.radius);
    
        
    
  
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.position.add(this.velocity);
    if (this.position.x < 0) {
      this.position.x = VIEW_WIDTH;
    }
    if (this.position.x > VIEW_WIDTH) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = VIEW_HEIGHT;
    }
    if (this.position.y > VIEW_HEIGHT) {
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
    flock = Bug.getBirdsInPerceptionRadius(this,flock);
    if (flock.length ==0) return;
    this.seperationForce = this.seperation(flock);
    this.alignmentForce = this.alignment(flock);
    this.cohesionForce = this.cohesion(flock);


    this.acceleration.add(this.seperationForce);
    this.acceleration.add(this.cohesionForce);
      
    this.acceleration.add(this.alignmentForce);
  }
  alignment(flock){
    let steering = createVector();
    if (flock.length ==0) return steering;
      for (let i = 0; i < flock.length; i++) {
        let bird = flock[i];
        steering.add(bird.velocity)
      }
      steering.div(flock.length);
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
      steering.mult(this.alignmentStrength)
      return steering
  }
  

  cohesion(flock) {
      let steering = createVector();
      if (flock.length ==0) return steering;
      for (let i =0 ; i < flock.length;i++) {
        let bird = flock[i];
        steering.add(bird.position)
          
      }
  
      steering.div(flock.length);
      steering.sub(this.position) 
      steering.setMag(this.maxSpeed)
      steering.sub(this.velocity)
      steering.limit(this.maxForce)
      steering.mult(this.cohesionStrength)
      return steering
    
  }

  
  seperation(flock){
    let steering = createVector();
    
    if (flock.length ==0) return steering;
    for (let i =0 ; i < flock.length;i++) {

      let bird = flock[i];
      

      let distanceToBird = p5.Vector.dist(this.position, bird.position)
      let differenceBetweenBirds = p5.Vector.sub(this.position, bird.position)
      differenceBetweenBirds.normalize();
      differenceBetweenBirds.div(distanceToBird);
        
      steering.add(differenceBetweenBirds)
    }
      
      
    steering.setMag(this.maxSpeed);
    steering.sub(this.velocity);
    steering.limit(this.maxForce);
    steering.mult(this.seperationStrength)
    return steering
  }
  
  static getBirdsInPerceptionRadius(bird,flock){
    let birdsInPerceptionRadius = [];
    for (let i = 0; i < flock.length; i++) {
      let currentBird = flock[i];
      if (currentBird == bird) {
        continue;
      }

      
      let distanceToBird = p5.Vector.dist(bird.position, currentBird.position);
      let birdIsPerceived = distanceToBird < bird.perceptionRadius;
      if (birdIsPerceived) {
        birdsInPerceptionRadius.push(currentBird);
      }
    }
    return birdsInPerceptionRadius;
  }
  
}