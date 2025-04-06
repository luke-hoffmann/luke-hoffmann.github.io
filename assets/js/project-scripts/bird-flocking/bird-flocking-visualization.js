


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
  widthOfContainer = document.getElementById("canvas-insertion-point").getBoundingClientRect().width;
  if (widthOfContainer < VIEW_WIDTH) {
    VIEW_WIDTH = widthOfContainer;
    VIEW_HEIGHT = widthOfContainer;
  }
  hasStartBeenPressed = false;
  document.getElementById("play-button").innerHTML = "Play";
  var canvas = createCanvas(VIEW_WIDTH,VIEW_HEIGHT);
  canvas.parent('canvas-insertion-point');
  for (let i =0; i < amountOfBugs; i ++) {
    bugs.push(new Bug());
  }
  
  resetFlockingParameters
  noLoop();
}


function draw() {
  background(255);
  // do stuff here
  grid =[];
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
    
  }
  
}
