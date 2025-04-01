








seperation(flock){
    //let perceptionRadius = 25;
    this.steering = createVector();
    this.total = 0;
    for (let i = 0; i < flock.length; i++) {
      this.distance = p5.Vector.dist(this.position, flock[i].position)
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
