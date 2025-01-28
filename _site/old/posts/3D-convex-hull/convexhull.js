


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
    hull.push(whereIsLeftMost);
    
    for (let i =0 ; i < hull.length;i++){
        
        currentBestAngle =360;
        currentBestPoint = -1;
     
        for (let j =0 ; j < graph.length;j++){
            
            if (graph[hull[i]][0] == graph[j][0] && graph[hull[i]][1] == graph[j][1]){
                continue;
            }
            if (i==0) {
                currentAngle = BearingTo(graph[hull[i]][0],graph[hull[i]][1],graph[j][0],graph[j][1]);
            } else {
                a = Distance(graph[hull[i-1]][0],graph[hull[i-1]][1],graph[hull[i]][0],graph[hull[i]][1])
                b = Distance(graph[hull[i]][0],graph[hull[i]][1],graph[j][0],graph[j][1])
                c = Distance(graph[hull[i-1]][0],graph[hull[i-1]][1],graph[j][0],graph[j][1])
                currentAngle = 360-LawCosine(a,b,c);
                
            }
            if (currentAngle <currentBestAngle ) {
                currentBestAngle = currentAngle;

                currentBestPoint = j;
            }

        }
        
        if (hull.length > graph.length**2) {
            return hull;
        }

        
        if (currentBestPoint ==hull[0] &&i != 0) {
            hull.push(currentBestPoint);
            return hull;
        }
        if (currentBestPoint!= -1) {
            hull.push(currentBestPoint);
        }
        
    }






}


