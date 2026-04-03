


function resetFlockingParameters(){
  document.getElementById("seperation-slider").value = startingSeperationSlider;
  document.getElementById("cohesion-slider").value = startingCohesionSlider;
  document.getElementById("alignment-slider").value = startingAlignmentSlider;
  updateFlockingParameters();
}
function updateFlockingParameters() {
  for (let i=0;  i < bugs.length;i++) {
    bug = bugs[i];
    bug.seperationStrength = Number(document.getElementById("seperation-slider").value)
    bug.cohesionStrength = Number(document.getElementById("cohesion-slider").value)
    bug.alignmentStrength = Number(document.getElementById("alignment-slider").value)
  }
}


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


function reset(){
  
  bugs = [];
  grid = [];
  setup();
  redraw();
}


let bugs = [];
let grid = [];




let hasStartBeenPressed = false;
let sF = 1;
function setup(){
  bugs = []
  createCanvasSizeBasedOnDiv()
  hasStartBeenPressed = false;
  document.getElementById("play-button").innerHTML = "Play";
  for (let i =0; i < amountOfBugs; i ++) {
    bugs.push(new Bug(canvasWidth,canvasHeight));
  }
  
  resetFlockingParameters
  noLoop();
}


function draw() {
  clear()
  // do stuff here
  grid =[];
  stroke(42,45,52);
  fill(42,45,52);
  strokeWeight(1);
  
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
    bugs[i].kinematics();
    
  }
  
}
