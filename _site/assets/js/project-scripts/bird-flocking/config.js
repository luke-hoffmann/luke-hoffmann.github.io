const VIEW_WIDTH = 400;
const VIEW_HEIGHT = 400;

const RADIAN_TO_DEGREE = 380/Math.PI;
const DEGREE_TO_RADIAN = Math.PI/180;
const WIDTH_TO_RGB = VIEW_WIDTH /255;
const HEIGHT_TO_RGB = VIEW_HEIGHT / 255;

let perceptionRadius = 15;
let sizeOfViewCone = 90;
let sizeOfDrawCone = perceptionRadius;
let amountOfBugs = 300;

let maxBugVelocity = 5;
let maxBugForce  = .2;
let drawBugRadius = 10;
let bugPerceptionRadius = 20;

let startingAlignmentSlider = 1;
let startingCohesionSlider = 1;
let startingSeperationSlider = 1.4;



