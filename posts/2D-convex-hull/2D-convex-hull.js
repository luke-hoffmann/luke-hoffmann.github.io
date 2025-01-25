function BearingTo(x1,y1,x2,y2){
  angle = Math.atan2((y2-y1),(x2-x1))

  angle *= (180/Math.PI);

  angle = (angle+270)%360;

  return angle;
}
function Distance(x1,y1,x2,y2){
  return Math.sqrt(((x2-x1)**2)+((y2-y1)**2));
}
function LawCosine(a,b,c){
  return Math.acos(((c**2)-(b**2)-(a**2))/((-2*a*b))) * (180/Math.PI);
}
function ConvexHull(graph){
  // input graph given as an array of arrays, where the elements will have an array with x and y values such that [[x(0),y(0)], ... [x(n-1),y(n-1)]]
  
  hull = [];
  
  // determining the left-most vertex on the graph
  leftMost = [null,null];
  whereIsLeftMost= -1;
  for (let i =0 ;i <graph.length;i++) {         
      
      if (graph[i][0] < leftMost[0] || leftMost[0] == null) {
          
          leftMost =graph[i];
          whereIsLeftMost =i;
      }


  }
  hull.push(leftMost);
  
  for (let i =0 ; i < hull.length;i++){
      
      currentBestAngle =360;
      currentBestPoint = -1;
   
      for (let j =0 ; j < graph.length;j++){
          
          if (hull[i][0] == graph[j][0] && hull[i][1] == graph[j][1]){
              continue;
          }
          if (i==0) {
              currentAngle = BearingTo(hull[i][0],hull[i][1],graph[j][0],graph[j][1]);
          } else {
              a = Distance(hull[i-1][0],hull[i-1][1],hull[i][0],hull[i][1])
              b = Distance(hull[i][0],hull[i][1],graph[j][0],graph[j][1])
              c = Distance(hull[i-1][0],hull[i-1][1],graph[j][0],graph[j][1])
              currentAngle = 360-LawCosine(a,b,c);
              
          }
          if (currentAngle <currentBestAngle ) {
              currentBestAngle = currentAngle;

              currentBestPoint = j;
          }

      }
      

      if (currentBestPoint!= -1) {
      hull.push(graph[currentBestPoint]);
      }
      
      if ((hull[i][0] == hull[0][0] && hull[i][1] == hull[0][1]) && i != 0) {
          hull.push(currentBestPoint);
          return hull;
      }
      
      
  }






}



let renderWidth = 500;
let renderHeight = 500;
let renderGraphic;
let viewWidth = 400;
let viewHeight = 400;
let sF = 1;


let points = [];
let hull = [];
let graphConvexHull = false;
function reset(){
  graphConvexHull = false;
  setup();
}
function findConvex(){
  graphConvexHull = true;
}


function setup(){
  widthOfContainer = document.getElementById("p5-canvas-div").getBoundingClientRect().width;
    if (widthOfContainer < viewWidth) {
    viewWidth = widthOfContainer;
    viewHeight = widthOfContainer;
  }
  var canvas= createCanvas(viewWidth,viewHeight);
  canvas.parent("p5-canvas-div");
  renderGraphic = createGraphics(viewWidth, viewHeight);
  points =[];
  for (let i =0 ;i  <20;i++) {
      points.push([20 + Math.random()*(width-40),20 + Math.random()*(height-40)]);
  }
  hull = ConvexHull(points);
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
  image(renderGraphic, 0, 0);
  renderGraphic.scale(sF);
  // do stuff here
  for (let i =0;  i < points.length;i++) {
      strokeOrFillRGB([points[i][0]/(width),150,points[i][0]/(width/255)],"fill")
      renderGraphic.circle(points[i][0],points[i][1],15);
  }
  if (graphConvexHull) {
      for (let i =1; i < hull.length;i++){
          renderGraphic.line(hull[i-1][0],hull[i-1][1],hull[i][0],hull[i][1])
      }
  }
}

function exportHighRes() {
  // HighRes Export
  sF = renderWidth/viewWidth;
  renderGraphic = createGraphics(renderWidth, renderHeight);
  renderGraphic.background(255);
  draw();
  
  save(renderGraphic, "convex-hull-2D-render", 'png');
  
  // Reset Default
  sF=1;
  
  renderGraphic = createGraphics(viewWidth, viewHeight);
  renderGraphic.background(100);
  draw();
}

// Export when key is pressed
function keyReleased() {
  if (key == 'e' || key == 'E') exportHighRes(width,height);
}