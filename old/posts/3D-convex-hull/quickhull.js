function Distance(x1,y1,x2,y2){
    return Math.sqrt(((y2-y1)**2)+((x2-x1)**2));
}

function Distance3D(x1,y1,z1,x2,y2,z2){
    if (x1 instanceof matrix && y1 instanceof matrix) {
        m1 = x1;
        m2 = y1;
        x1 = m1.matrix[0][0];
        y1 = m1.matrix[0][1];
        z1 = m1.matrix[0][2];
        x2 = m1.matrix[0][0];
        y2 = m2.matrix[0][1];
        z2 = m2.matrix[0][2];
        return Math.sqrt(((x2-x1)**2)+((y2-y1)**2)+((z2-z1)**2))
    }
    return Math.sqrt(((x2-x1)**2)+((y2-y1)**2)+((z2-z1)**2))
}
function SortDistance3D(x,y,z,graph){
    index = -1;
    lowestDistance = 0;
    lowestDistancePoints = new matrix([[null],[null],[null]]);
    for (let i =0; i< graph.length;i++){
        dist = Distance3D(x,y,z,graph[i].matrix[0][0],graph[i].matrix[0][1],graph[i].matrix[0][2]);
        if (dist > lowestDistance){
            lowestDistance = dist;
            lowestDistancePoint = graph[i];
            index = i;
        }
    }
    return [lowestDistancePoint,index];
}
function lowestPointInGraphOfMatrices(graph){
    lowest_index=-1;
    lowest_coordinate=[];
    for (let i =0; i < graph[0].matrix[0].length; i++) {
        lowest_coordinate.push(null);
    }
    lowest_coordinate = new matrix([lowest_coordinate]);

    for (let i =0; i < graph.length; i++) {
        if (lowest_coordinate.matrix[0][0] == null) {
            lowest_coordinate = graph[i];
            lowest_index= i;
            i = 0;
        }
        if(lowest_coordinate.matrix[0][0] > graph[i].matrix[0][0]) {
            lowest_coordinate = graph[i];
            lowest_index= i;
            i = 0;
        }
    }
    return [lowest_coordinate,lowest_index];
}
function DotProduct3D(m1,m2){
    return ((m1.matrix[0][0] *m2.matrix[0][0]) + (m1.matrix[0][1] *m2.matrix[0][1]) + (m1.matrix[0][2] *m2.matrix[0][2]));
}

function distanceToLine3D(A,B,C){
    distance = Distance3D(C.matrix[0][0],C.matrix[0][1],C.matrix[0][2],B.matrix[0][0],B.matrix[0][1],B.matrix[0][2]);
    D = (matrix.sub(C,B));
    D.scalarMult(1/distance);
    V = matrix.sub(A,B)
    //console.log(V)
    //console.log(D)
    dot = DotProduct3D(V,D)
    D.scalarMult(dot);
    P = matrix.add(D,B);
    return Distance3D(P,A);
}
function QuickHull(graph){
    // graph presented as [[x(0),y(0),z(0)],[x(n-1),y(n-1),z(n-1)]]
    temp= lowestPointInGraphOfMatrices(graph)
    p1 =temp[0];
    p1_index = temp[1]
    temp = SortDistance3D(p1.matrix[0][0],p1.matrix[0][1],p1.matrix[0][2],graph);
    p2 = temp[0];
    p2_index = temp[1];
    top_distance = 0;
    p3 = new matrix([[0,0,0]]);
    p3_index = 0;
    for (let i =0; i < graph.length;i++) {
        if(i== p2_index || i == p1_index) continue;
        distance= distanceToLine3D(graph[i],p2,p1)
        if (top_distance < distance) {
            p3 = graph[i];
            p3_index=i;
            top_distance = distance;
        }
    }
    //if (inUpSpace(points,pointsOfPlane(points,faces[0]),rotatePoint(faces[0][3],t))) {

    //}
    return [p1_index,p2_index,p3_index,matrix.normalPlane(p1,p2,p3)];
}