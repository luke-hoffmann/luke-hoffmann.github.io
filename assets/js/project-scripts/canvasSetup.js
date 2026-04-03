let canvasWidth;
let canvasHeight;

function getCanvasInsertionPointSize(){
    let element = document.getElementById("canvas-insertion-point").getBoundingClientRect();
    width = element.width;
    height = element.width;
    return {w:width,h:height};
}
/** This function must be placed in the native setup() function created by p5.js */
function createCanvasSizeBasedOnDiv(){
    let size = getCanvasInsertionPointSize() || {w:400,h:400};


    document.getElementById("canvas-insertion-point").innerHTML = ""

    createCanvas(size.w,size.w).parent("canvas-insertion-point");
    canvasWidth = size.w;
    canvasHeight = size.h;
}
function windowResized(){
    let size = getCanvasInsertionPointSize() || {w:400,h:400};
    resizeCanvas(size.w,size.h)
}
/** This function must be only used in the context of p5js script */
addEventListener("resize", ()=>{
    windowResized();
    setup()
    draw()
})
