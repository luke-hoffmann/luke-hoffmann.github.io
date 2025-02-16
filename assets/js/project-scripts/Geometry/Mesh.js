class Mesh {
    constructor (vertices,triangles,triangleColor,standalonePointDiameter,standalonePointColor,trianglePointDiameter,trianglePointColor,doGraphNormalVectors,normalVectorColor) {
        
        if (standalonePointDiameter == undefined) {
            this.standalonePointDiameter = 3;
        } else {
            this.standalonePointDiameter = standalonePointDiameter;
        }
        if (standalonePointColor == undefined) {
            this.standalonePointColor = "black";
        } else {
            this.standalonePointColor = standalonePointColor
        }
        if (trianglePointDiameter == undefined) {
            this.trianglePointDiameter = 3;
        } else {
            this.trianglePointDiameter = trianglePointDiameter
        }
        if (trianglePointColor == undefined) {
            this.trianglePointColor = "black";
        } else {
            this.trianglePointColor = trianglePointColor;
        }
        if (triangleColor == undefined) {
            this.triangleColor = "black";
        } else {
            this.triangleColor = triangleColor;
        }
        if (triangleColor == true) {
            this.triangleColor = true;
        }
        if (normalVectorColor == undefined) {
            this.normalVectorColor = "black";
        } else {
            this.normalVectorColor = normalVectorColor;
        }
        if (doGraphNormalVectors == true) {
            this.doGraphNormalVectors = true;
        } else {
            this.doGraphNormalVectors = false;
        }

        this.vertices = vertices;
        this.triangles = triangles;
        if (vertices ==undefined) {
            this.vertices = [];
        }
        if (triangles ==undefined) {
            this.triangles = [];
        }
    }

    static removeTrianglesThatAreCoveredUp(field,triangles,boundaryPoints,farthestPoint,searchForDuplicateTriangles){
        
        let triangleReferenceCountList = Triangle.getTimesTriangleIsReferencedByBoundaryPoints(triangles,boundaryPoints);
        let trianglesToRemove = Triangle.findTrianglesToRemove(triangleReferenceCountList);
        let temporaryTriangleList = [...triangles];
        for (let i =0; i < trianglesToRemove.length;i++) {
            if (!trianglesToRemove[i]) continue;
            
            if (!Triangle.doesUpspaceContain(field,triangles[i],farthestPoint)) continue;

            if (searchForDuplicateTriangles) console.log("Removing triangle:",i);
            temporaryTriangleList.splice(i,1);
        }

        return temporaryTriangleList;
    }


    static removeTrianglesFromArray(array,triangleIndices) {
        let triangles = [...array];
        let index;
        for (let i =triangleIndices.length-1; i >= 0; i--) {
            index = triangleIndices[i];
            triangles.splice(index,1);
        }
        return triangles;
    }
    static convexHullIterativeProcess(field,triangles,graphIndices,deleteSOON) {
        triangles = [...triangles]
        let upSpaceIndices = Field.getTrianglesUpspace(field,triangles,graphIndices);
        let farthestPoint = Field.getFarthestPointFromTriangles(field,triangles,upSpaceIndices);
        if (farthestPoint === false) {
            
            return false;
        }
        let triangleIndicesWithPointInUpspace = Field.getTrianglesWithPointInUpspace(field,triangles,farthestPoint);
        let trianglesWithPointInUpspace =  Triangle.getTrianglesFromIndices(triangles,triangleIndicesWithPointInUpspace)

        let newTriangleMap = new Map();
         
        Triangle.addPointsFromTrianglesToMap(newTriangleMap,trianglesWithPointInUpspace);
        let boundaryPoints = UsefulFunction.getNodesOnOutsideOfCounterClockwiseGraph(newTriangleMap);

        let newTriangles = Triangle.createPyramidFromBoundaryPoints(boundaryPoints,farthestPoint);
        
        
        triangles = this.removeTrianglesFromArray(triangles,triangleIndicesWithPointInUpspace);
        UsefulFunction.addElementsToArray(triangles,newTriangles);
        // triangles = this.removeTrianglesThatAreCoveredUp(field,triangles,boundaryPoints,farthestPoint,searchForDuplicateTriangles);
        
        return triangles;
    }
    static generateConvexMesh(field,iterationNumber) {
        let unusedField = field;
        let searchToRemoveDuplicateTriangles = true;
        let triangles = undefined;
        console.log(field)
        if (triangles == undefined) {
            triangles = [Field.calculateLargestTriangleFromField(field)];
            triangles.push(Triangle.flipNormal(triangles[0]));
        }
            
        let result;
        let graphIndices = UsefulFunction.arrayOfIndices(field.array.length);
        triangles = this.convexHullIterativeProcess(field,triangles,graphIndices);

        for (let i =0 ; i < iterationNumber;i++) {
            result = this.convexHullIterativeProcess(field,triangles,graphIndices,iterationNumber);
            if (result == false) return new this(field.array,triangles,[]);
            triangles = result;
        }
        

        

        
        return new this(field.array,triangles,[]);
        // return new this(field.array,triangles);
        
    }
    graphNormalVectors(color,length){
        for (triangle of this.triangles) {
            let field = new Field(this.vertices);
           
            let centerOfTriangle = Triangle.computeCentroid(field,triangle);
            let normalVector = Vector.scalarMult(Triangle.computeNormal(field,triangle),length);
            normalVector = Vector.add(normalVector,centerOfTriangle)

            Line.graphBetweenTwoPoints(normalVector,centerOfTriangle,color);
        }
    }
    graphSpecificVertices(indices,diameter,color) {
        for (const index of indices) {
            this.vertices[index].graph(diameter,color);
        }
    }
    graphVertices(diameter,color){
        for (const vertex of this.vertices) {
            
            vertex.graph(diameter,color);
        }
    }
    getVerticesFromTriangle(triangle){
        let vertices =[];
        for (const reference of triangle.verticeReferences) {
            vertices.push(reference);
        }
        return vertices;
    }

    graphTriangle(triangle,color) {
        
        let verticesThatMakeUpTriangle = triangle.verticeReferences
        Line.graphBetweenTwoPoints(this.vertices[verticesThatMakeUpTriangle[0]],this.vertices[verticesThatMakeUpTriangle[1]],color);
        Line.graphBetweenTwoPoints(this.vertices[verticesThatMakeUpTriangle[1]],this.vertices[verticesThatMakeUpTriangle[2]],color);
        Line.graphBetweenTwoPoints(this.vertices[verticesThatMakeUpTriangle[2]],this.vertices[verticesThatMakeUpTriangle[0]],color);
    }

    graphTriangles(triangleColor,pointDiameter,pointColor){
        for (triangle of this.triangles) {
            for (point of triangle.verticeReferences) {
                this.vertices[point].graph(pointDiameter,pointColor,point);
            }
            if (triangleColor == true) {
                this.graphTriangle(triangle,triangle.color)
                continue;
            }
            this.graphTriangle(triangle,triangleColor);
        }
    
    }
    static graph(mesh, graphTriangles,tX,tY,tZ){
        let rotatedMesh = this.rotate(mesh,tX,tY,tZ)
        rotatedMesh.graphVertices(mesh.standalonePointDiameter,mesh.standalonePointColor);
        if (graphTriangles) {
            rotatedMesh.graphTriangles(mesh.triangleColor,mesh.trianglePointDiameter,mesh.trianglePointColor,);
        }
        if (!mesh.doGraphNormalVectors) {
            return
        }
        rotatedMesh.graphNormalVectors(mesh.normalVectorColor,40);
    }

    
    static rotate(mesh, angX,angY,angZ){
        let rotatedMesh = new this([],mesh.triangles);
        for (const vertex of mesh.vertices) {
            rotatedMesh.vertices.push(Vector.rotateVector(vertex,angX,angY,angZ));
        }
        return rotatedMesh;
    }

}