let renderWidth = 500;
let renderHeight = 500;
let renderGraphic;
let viewWidth = 400;
let viewHeight = 400;
let sF = 1;

class IntegralVisualizer {
    constructor (function) {

    }
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
    renderGraphic.background(255);
    renderGraphic.scale(sF);
    // do stuff here
    
    image(renderGraphic, 0, 0);
    noLoop();
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