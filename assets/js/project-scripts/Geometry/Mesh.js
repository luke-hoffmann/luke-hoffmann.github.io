class Mesh {
    constructor (vertices,triangles,triangleColor,standalonePointDiameter,standalonePointColor,trianglePointDiameter,trianglePointColor,doGraphNormalVectors,normalVectorColor) {
        
        if (standalonePointDiameter == undefined) {
            this.standalonePointDiameter = 3;
        } else {
            this.standalonePointDiameter = standalonePointDiameter;
        }
        if (standalonePointColor == undefined) {
            this.standalonePointColor = new ColorHandler(0,0,0);
        } else {
            this.standalonePointColor = standalonePointColor
        }
        if (trianglePointDiameter == undefined) {
            this.trianglePointDiameter = 3;
        } else {
            this.trianglePointDiameter = trianglePointDiameter
        }
        if (trianglePointColor == undefined) {
            this.trianglePointColor =new ColorHandler(0,0,0);
        } else {
            this.trianglePointColor = trianglePointColor;
        }
        if (triangleColor == undefined) {
            this.triangleColor = new ColorHandler(0,0,0);
        } else {
            this.triangleColor = triangleColor;
        }
        if (triangleColor == true) {
            this.triangleColor = true;
        }
        if (normalVectorColor == undefined) {
            this.normalVectorColor = new ColorHandler(0,0,0);
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
    static setBrightnessOfTrianglesToArray(mesh,array,ambientLight){
        if (ambientLight == undefined) {
            ambientLight = 0;
        }
        if (array.length != mesh.triangles.length) throw new Error("Array size mismatch");
        let newMesh = this.copy(mesh);
        let triangles = [...newMesh.triangles];
        for (let i = 0 ; i < array.length;i++) {
            let brightness = array[i];
            
            triangles[i].color.multiplyByNumber(brightness+ambientLight);
            
        }
        newMesh.triangles = triangles;
        return newMesh;
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
    static convexHullIterativeProcess(field,triangles,graphIndices) {
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
        
        return triangles;
    }
    static generateConvexMesh(field,iterationNumber) {
        let unusedField = field;
        let searchToRemoveDuplicateTriangles = true;
        let triangles = undefined;
        if (triangles == undefined) {
            triangles = [Field.calculateLargestTriangleFromField(field)];
            triangles.push(Triangle.flipNormal(triangles[0]));
        }
        
            
        let result;
        let graphIndices = UsefulFunction.arrayOfIndices(field.array.length);
        triangles = this.convexHullIterativeProcess(field,triangles,graphIndices);
        for (let i =0 ; i < iterationNumber;i++) {
            result = this.convexHullIterativeProcess(field,triangles,graphIndices,iterationNumber);
            if (result == false) return new this(field.array,triangles,false);
            triangles = result;
        }
        

        

        
        return new this(field.array,triangles,false);
        
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
    graphTriangleOutline(triangle,color) {
        let verticesThatMakeUpTriangle = triangle.verticeReferences;
        color.p5NoFill();
        color.p5Stroke();
        renderGraphic.triangle(this.vertices[verticesThatMakeUpTriangle[0]].x,this.vertices[verticesThatMakeUpTriangle[0]].y,this.vertices[verticesThatMakeUpTriangle[1]].x,this.vertices[verticesThatMakeUpTriangle[1]].y,this.vertices[verticesThatMakeUpTriangle[2]].x,this.vertices[verticesThatMakeUpTriangle[2]].y);
    }
    graphTriangleFill(triangle,color) {
        
        let verticesThatMakeUpTriangle = triangle.verticeReferences;
        color.p5Fill();
        color.p5NoStroke();
        renderGraphic.triangle(this.vertices[verticesThatMakeUpTriangle[0]].x,this.vertices[verticesThatMakeUpTriangle[0]].y,this.vertices[verticesThatMakeUpTriangle[1]].x,this.vertices[verticesThatMakeUpTriangle[1]].y,this.vertices[verticesThatMakeUpTriangle[2]].x,this.vertices[verticesThatMakeUpTriangle[2]].y);
        
        
    }

    graphTriangles(triangleColor,pointDiameter,pointColor){
        for (triangle of this.triangles) {
            if (triangleColor == true) {
                this.graphTriangleFill(triangle,triangle.color)
                this.graphTriangleOutline(triangle,new ColorHandler(0,0,0))
                continue;
            }
            this.graphTriangleOutline(triangle,triangleColor);
        }
    
    }

    static backFaceCulling(mesh,viewVector) {
        let visibleTriangles = [];
        let backFaceCulledMesh = this.copy(mesh);
        backFaceCulledMesh.triangles = [];
        for (const triangle of mesh.triangles) {
            let isTriangleVisible = Triangle.isTriangleFacingCamera(new Field(mesh.vertices),triangle,viewVector);
            if (!isTriangleVisible) continue;
            backFaceCulledMesh.triangles.push(triangle);
            
        }
        return backFaceCulledMesh;
    }
    static graph(mesh, graphTriangles,graphVertices,graphNormalVectors){
        if (graphTriangles) {
            mesh.graphTriangles(mesh.triangleColor,mesh.trianglePointDiameter,mesh.trianglePointColor);
        } 
        if (graphVertices) {
            mesh.graphVertices(mesh.standalonePointDiameter,mesh.standalonePointColor);
        }
        if (!graphNormalVectors) {
            return
        }
        mesh.graphNormalVectors(mesh.normalVectorColor,40);
    }

    
    static rotate(mesh, angX,angY,angZ){
        let rotatedMesh = this.copy(mesh);
        rotatedMesh.vertices = [];
        for (const vertex of mesh.vertices) {
            rotatedMesh.vertices.push(Vector.rotateVector(vertex,angX,angY,angZ));
        }
        return rotatedMesh;
    }
    static copy(mesh){
        let newMesh = Object.assign(Object.create(Object.getPrototypeOf(mesh)), mesh);
        
        newMesh.triangles = mesh.triangles.map(triangle => {
            // Create a new Triangle instance for each element in the triangles array
            return new Triangle(triangle.verticeReferences, triangle.color);
        });
        return newMesh;
    }
}