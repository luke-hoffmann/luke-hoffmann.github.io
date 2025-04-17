class Bug {
  constructor(position,velocity,perceptionRadius){

    this.seperationStrength = 1.34;
    this.cohesionStrength = 1;
    this.alignmentStrength = 1;



    
    this.position = position;
    this.velocity = velocity;
    if (position == undefined) this.position = createVector(Math.random()*VIEW_WIDTH, Math.random()*VIEW_HEIGHT);
    
    if (velocity == undefined) {
      this.velocity = p5.Vector.random2D();
      this.velocity.setMag(random(2,4));
    }
    this.acceleration = createVector();
    
  
  }
  kinematics(){
    this.velocity.add(this.acceleration)
    this.velocity.limit(maxBugVelocity)
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
  draw() {
    let direction = this.velocity.normalize();
    stroke(0);
    fill(color(this.position.x/WIDTH_TO_RGB,this.position.y/HEIGHT_TO_RGB,0));
    
    let shiftedX = this.position.x+ (Math.cos(direction.heading() + (90 * RADIAN_TO_DEGREE)) *drawBugRadius/2);
    let shiftedY = this.position.y+ (Math.sin(direction.heading() + (90 * RADIAN_TO_DEGREE)) *drawBugRadius/2);
    let topX =this.position.x+ (Math.cos(direction.heading()) *10);
    let topY =this.position.y+ (Math.sin(direction.heading()) *10);
    let top  = createVector(topX,topY)
    let left = createVector(shiftedX,shiftedY);
    shiftedX = this.position.x+ (Math.cos(direction.heading() + (-90 * RADIAN_TO_DEGREE)) *drawBugRadius/2);
    shiftedY = this.position.y+ (Math.sin(direction.heading() + (-90 * RADIAN_TO_DEGREE)) *drawBugRadius/2);
    let right = createVector(shiftedX,shiftedY)
    beginShape()
    vertex(left.x,left.y);
    vertex(top.x,top.y,);
    vertex(right.x,right.y)
    endShape();
  
    circle(this.position.x,this.position.y,drawBugRadius);
    
  }
  seek(target) {
    let desiredVelocity = target.sub(this.position).setMag(maxBugVelocity);
    let steering = desiredVelocity.sub(this.velocity).limit(maxBugForce);
    this.addAcc(steering);
    
  }
  flee(target) {
    let desiredVelocity = target.sub(this.position).setMag(maxBugVelocity);
    let steering = desiredVelocity.sub(this.velocity).limit(maxBugForce);
    this.addAcc(steering.mult(-1));
  }
  flocking(flock) {
    flock = Bug.getBirdsInPerceptionRadius(this,flock);
    if (flock.length ==0) return;

    let seperationForce = this.seperation(flock);
    let alignmentForce = this.alignment(flock);
    let cohesionForce = this.cohesion(flock);


    this.acceleration.add(seperationForce);
    this.acceleration.add(cohesionForce)
    this.acceleration.add(alignmentForce);
  }
  alignment(flock){
    let steering = createVector();
    if (flock.length ==0) return steering;
      for (let i = 0; i < flock.length; i++) {
        let bird = flock[i];
        steering.add(bird.velocity)
      }
      steering.div(flock.length);
      steering.setMag(maxBugVelocity)
      steering.sub(this.velocity)
      steering.limit(maxBugForce)
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
      steering.setMag(maxBugVelocity)
      steering.sub(this.velocity)
      steering.limit(maxBugForce)
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
      
      
    steering.setMag(maxBugVelocity);
    steering.sub(this.velocity);
    steering.limit(maxBugForce);
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
      let birdIsPerceived = distanceToBird < bugPerceptionRadius;
      if (birdIsPerceived) {
        birdsInPerceptionRadius.push(currentBird);
      }
    }
    return birdsInPerceptionRadius;
  }
  
}