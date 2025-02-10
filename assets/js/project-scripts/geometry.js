class Field {
    constructor(array) {
        
        this.array = array;
        if(array == undefined) {
            this.array = [];
        }
    }
    static getFarthestPointFromVector(v,field){
        this.lowestDistance = 0;
        this.farthestDistancePoint = undefined
        for (this.i =0; this.i< field.array.length; this.i++){

            this.dist = Vector.distance(field.array[this.i],v);
            if (this.dist > this.lowestDistance){
                this.lowestDistance = this.dist;
                this.farthestDistancePoint = field.array[this.i]
            }
        }
        return this.farthestDistancePoint
    }
    /**
     * Lowest point based upon x value of vector points
     * @param {*} field 
     * @returns {Vector} point
     */
    static lowestPointInField(field){
        this.lowestCoordinate = undefined
        for (this.i =0; this.i < field.array.length; this.i++) {
            if (this.lowestCoordinate == undefined) {
                this.lowestCoordinate = field.array[this.i];
                this.i = 0;
            }
            if(this.lowestCoordinate.x > field.array[this.i].x) {
                this.lowestCoordinate = field.array[this.i];
                this.i = 0;
            }
        }
        return this.lowestCoordinate
    }
    
    static QuickHull(field){
    
        let dividerPlane= Plane.calculateLargestPlaneFromField(field);

        
        let upSpace = this.findPointsAbovePlane(field,dividerPlane);
        let p4 = Plane.calculateFarthestPointFromPlane(upSpace,dividerPlane)
        let out = Plane.createPlanesFromBoundaryPoints (p4,[dividerPlane.p1,dividerPlane.p2,dividerPlane.p3]);


        /*
        for (let i= 0; i< out.length;i++) {
            dividerPlane = out[i];
            let newSpace = this.upSpace(upSpace,dividerPlane);
            p4 = Plane.farthestPointFromPlane(newSpace,dividerPlane)
            this.current = Plane.createFacesFromBoundary(p4,[dividerPlane.p1,dividerPlane.p2,dividerPlane.p3]);
            newOut.push(this.current);
        }
            */

        // remove points from field as they form triangles
        
        upSpace = this.findPointsAbovePlane(field,out[0]);
        p4 = Plane.calculateFarthestPointFromPlane(upSpace,out[0]);

        this.applicablePlanes = this.calculateUpspacesThatContainPoint(p4,out);
        // turn applicablePlanes into a list of points that go in clockwise order. create function to turn applicable planes into one continous ring of ppoints.
        
        this.boundary = Plane.determineBoundaryPointsFromPlanes(this.applicablePlanes);
        this.final = Plane.createPlanesFromBoundaryPoints(p4,this.boundary);
        return [[dividerPlane],this.final];
        
    }

    // static planesFromField(field,plane){
    //     if (field.array.length == 1) {
    //         this.z = Plane.newPlanes(field.array[0],plane);
    //         return this.z
    //     }
    //     if (field.array.length == 0) {
    //         this.z = [plane]
    //         return this.z
    //     }
    //     let prism =this.triangularPrism(field,plane);
    //     let output = [];
    //     prism.forEach(element => {
    //         this.out = this.QuickHull(field,element)
    //         output.push(this.out);
    //     });
    //     return this.combineArrays(output)
    // }
    // static triangularPrism(field,plane){
    //     this.up4 = Plane.farthestPointFromPlane(field,plane);
    //     this.z = Plane.newPlanes(this.up4,plane);
    //     return this.z

    // }
    
    // static combineArrays(l) {
    //     this.combined = [];
    //     for (this.i =0; this.i < l.length; this.i++) {
    //         for (this.j = 0; this.j < l[this.i].length; this.j++) {
    //             this.combined.push(l[this.i][this.j])
    //         }
            
    //     }
    //     return this.combined;
    // }
    // static upSpace(field,plane){
    //     this.normal = Plane.normalPlane(plane);
    //     this.field = new this();
    //     for (this.i = 0; this.i < field.array.length; this.i++) {
    //         if (field.array[this.i] == this.p1 || field.array[this.i] == this.p2 || field.array[this.i] == this.p3) continue;

    //         if (!Plane.isInUpSpace(field.array[this.i],plane,this.normal)) continue;

    //         this.field.array.push(field.array[this.i])

    //     }
    //     return this.field;
    // }
    // static downSpace(field,plane){
    //     this.normal = Plane.normalPlane(plane);
    //     this.field = new this();
    //     for (this.i = 0; this.i < field.array.length; this.i++) {
    //         if (field.array[this.i] == this.p1 || field.array[this.i] == this.p2 || field.array[this.i] == this.p3) continue;

    //         if (Plane.isInUpSpace(field.array[this.i],plane,this.normal)) continue;

    //         this.field.array.push(field.array[this.i])

    //     }
    //     return this.field;
    // }
    static calculateUpspacesThatContainPoint(point,planes){
        this.planesContaining = [];
        for (let i =0; i < planes.length;i ++) {

            if (!Plane.doesUpSpaceContain(point,planes[i])) continue;
            this.planesContaining.push(planes[i])
        }
        return this.planesContaining;
    }
    /**
     * 
     * @param {array} array An array of arrays of the form [[item1,item2,item3,...],[item4,item5,item6,...],...]
     * @returns {array} An array of items of the form [item1,item2,item3,...,item4,item5,item6,...]
     */
    static combineArrays(array) {
        let combinedArray = [];
        for (let i =0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                combinedArray.push(array[i][j])
            }
            
        }
        return combinedArray;
    }
    static findPointsAbovePlane(field,plane){
        let pointsAbovePlane = new this();
        for (let i = 0; i < field.array.length; i++) {
            if (field.array[i] == this.p1 || field.array[i] == this.p2 || field.array[i] == this.p3) continue;

            if (!Plane.doesUpSpaceContain(field.array[i],plane)) continue;
            pointsAbovePlane.array.push(field.array[i])

        }
        return  pointsAbovePlane;
    }
    static SpherePoint(mag){
        // slow algo so find something better in future
        this.mag = Math.random()*mag*mag*mag;
        this.mag = Math.cbrt(this.mag)
        this.d = 2;
        while (this.d > 1.0) {
    
            this.x = (Math.random()*2)-1
            this.y = (Math.random()*2)-1
            this.z = (Math.random()*2)-1;
            this.d = (this.x*this.x)+(this.y*this.y)+(this.z*this.z);
        }
        return new Vector(this.x*this.mag,this.y*this.mag,this.z*this.mag);
    
    }
    static graphField(field,radius,color){
        stroke(color);
        fill(color);
        for (let i =0; i < field.array.length;i++) {
            circle(field.array[i].x,field.array[i].y,radius/2);
        }
    }

    static rotateFieldOfPoints(field,xRotate,yRotate,zRotate){
        let outputField = new Field();
        if (xRotate ==undefined) {
            xRotate = 0;
        }
        if (yRotate ==undefined) {
            yRotate = 0;
        }
        if (zRotate ==undefined) {
            zRotate = 0;
        }
        let currentVectorBeingRotated;
        for (let i = 0 ; i < field.array.length; i++){
            currentVectorBeingRotated = field.array[i];
            currentVectorBeingRotated = Vector.rotateVectorAroundXAxis(currentVectorBeingRotated,xRotate);
            currentVectorBeingRotated = Vector.rotateVectorAroundYAxis(currentVectorBeingRotated,yRotate);
            currentVectorBeingRotated = Vector.rotateVectorAroundZAxis(currentVectorBeingRotated,zRotate);
            outputField.array.push(currentVectorBeingRotated);
        }
        return outputField;
    }
}

class Plane {
    constructor (p1,p2,p3){
        this.p1 = p1;
        this.p2 = p2;

        if (p3==undefined) {
            this.p3 = 0;
        } else {
            this.p3 = p3;
        }
    }
    static nextPlaneIndex (index){
        if (index==2) return 0;
        return index+1;
    }

    static calculateNormalLineFromPlane(plane,magnitudeOfLine){
        let normalVector = this.computeNormal(plane);
        normalVector = Vector.scalarMultVector(normalVector,magnitudeOfLine);

        let centerOfPlane = this.computeCenter(plane);
        return new Line(Vector.addVectors(normalVector,centerOfPlane),centerOfPlane);
    }
    static determineBoundaryPointsFromPlanes(planes){
        let planesDefinedByLines = [];
        for (let i =0 ; i < planes.length;i++) {
            let plane = this.returnPlaneCreatedByLines(planes[i]);
            planesDefinedByLines.push(plane);
        }
        
        let pointIndex = 0;
        let planeIndex = 0;
        let count = this.countNumberOfIdenticalLines(planeIndex,pointIndex,planesDefinedByLines);
        while (count ==5) {
            pointIndex = Math.floor((Math.random()*3)); // terrible way of selecting candidate perimeter points.
            planeIndex = Math.floor((Math.random()*planesDefinedByLines.length));
            count = this.countNumberOfIdenticalLines(planeIndex,pointIndex,planesDefinedByLines);
        }
        let pathway = [];
        let atStart = true;
        let firstPoint = pointIndex;
        let firstPlane = planeIndex;
        console.log(planes)
        pathway.push(planes[planeIndex].points[pointIndex]);
        
        if (count ==0) {
            pointIndex = this.nextPlaneIndex(pointIndex);
            pathway.push(planes[planeIndex].points[pointIndex]);
            atStart = false;
        }
        let ticker = 0;
        while (atStart || (pointIndex != firstPoint || planeIndex != firstPlane)) {
            count = this.countNumberOfIdenticalLines(planeIndex,pointIndex,planesDefinedByLines);
        
            if (count ==0) {
                pointIndex = this.nextPlaneIndex(pointIndex);
                pathway.push(planes[planeIndex].points[pointIndex]);
                atStart = false;
            }
            let line = this.findMatchingLine(planeIndex,pointIndex,planesDefinedByLines)
            if (!(this.doLineOrdersMatch(planesDefinedByLines[planeIndex][pointIndex],planesDefinedByLines[line[0]][line[1]]))) {
                
                planeIndex = line[0];
                pointIndex = line[1];
                pointIndex = this.nextPlaneIndex(pointIndex);
                continue
            }
            planeIndex = line[0];
            pointIndex = line[1];
            ticker++;
            if (ticker > 7) {
                break;
            }
        
            
            
        }
        //pathway.push(planes[planeIndex].points[pointIndex]);
        return pathway;



    }
    static doLineOrdersMatch(l1,l2){
        if (l1.p1 !=l2.p1) return false;
        return true;
    }
    static findMatchingLine(planeIndex,pointIndex,planes){
        for (let i =0; i < planes.length; i++) {
            for (let j = 0; j < planes[i].length; j++) {
                if (j==pointIndex && i==planeIndex) continue;
                if (Line.isLineEqual(planes[i][j],planes[planeIndex][pointIndex])) return [i,j];
                
            }
        }
        return [planeIndex,pointIndex]
    }
    static countNumberOfIdenticalPoints(planeIndex,pointIndex,planes){
        let count = 0;
        for (let i =0 ; i< planes.length;i ++) {
            for (let j = 0; j < planes[i].length; j++) {
                if (planes[i][j] === planes[planeIndex][pointIndex]) count++;
            }
        }
        return count-1;
    }
    static countNumberOfIdenticalLines(planeIndex,pointIndex,planes){
        let count = 0;
        for (let i =0 ; i< planes.length;i ++) {
            for (let j = 0; j < planes[i].length; j++) {
                if (Line.isLineEqual(planes[i][j],planes[planeIndex][pointIndex])) count++;
            }
        }
        return count-1;
    }
    static returnPlaneCreatedByLines(plane){
        return [new Line(plane.p1,plane.p2), new Line(plane.p2,plane.p3), new Line(plane.p3,plane.p1)];
    }
    static createPlanesFromBoundaryPoints(point,boundaryField){
        // boundary in the class of field
        // must have at leasat three boundary points, three makes the most sense though
        let newFaces = [];
        
        // planes need to be created with their points in counter clockwise order
        for(let i =0; i < boundaryField.length-1; i ++) {
            this.newFace = new this(point,boundaryField[i],boundaryField[i+1]);
            newFaces.push(this.newFace);
        }
        
        this.newFace = new this(point,boundaryField[boundaryField.length-1],boundaryField[0]);

        newFaces.push(this.newFace);
        return newFaces;
    }
    static doesUpSpaceContain(point,plane){
        let PA = Vector.sub(point,plane.p1);
        let normal = this.computeNormal(plane)
        let dotProduct = Vector.dotProduct(PA,normal)
        const epsilon = 1e-6;
        if (Math.abs(dotProduct)< epsilon) return false;
        return true;
    }
    // static isInDownSpace(point,plane,normal){

    //     if (Vector.dotProduct(Vector.sub(point,plane.p1),normal)<0) 
    //         {
    //             return true

    //         };
        
    //     return false;
    
    // }
    static flipPlanesNormal(plane) {
        return new this (plane.p3,plane.p2,plane.p1);
    }
    static newPlanes(v,plane){
        this.temp = [new this (v,plane.p1,plane.p2),new this(v,plane.p2,plane.p3), new this(v,plane.p3,plane.p1)]
        return this.temp;
    }
    static computeCenter(plane){
        this.lerp1 = Vector.lerp(plane.p1,plane.p2,0.5);
        this.lerp2 = Vector.lerp(plane.p2,plane.p3,0.5);
        this.lerp3 = Vector.lerp(plane.p3,plane.p1,0.5);
        this.lerp4 = Vector.lerp(this.lerp1,this.lerp2,0.5);
        this.lerp5 = Vector.lerp(this.lerp3,this.lerp4,0.5);
        return this.lerp5;
    }
    static graph(plane){
        return [plane.p1,plane.p2,plane.p3];
    }
    computeCenter(){
        return this.computeCenter(this.p1,this.p2,this.p3);
    }

    static computeNormal(plane){
        let s1 = Vector.sub(plane.p1,plane.p2);
        let s2 = Vector.sub(plane.p3,plane.p1);
        let cross = Vector.crossProduct(s1,s2)
        return Vector.normalize(cross);
    }
    distanceToPoint(v) {
        this.normal = this.constructor.computeNormal(this);
        this.d = 0
        return Math.abs(this.normal.x*v.x + this.normal.y*v.y + this.normal.z*v.z + this.d)/ (Math.sqrt((this.normal.x**2) + (this.normal.y**2) + (this.normal.z**2)));
    }

    static calculateFarthestPointFromPlane(field,plane){
        this.farthestDistance = 0;
        for (this.i= 0; this.i < field.array.length; this.i++) {
            this.dist = plane.distanceToPoint(field.array[this.i]);
            if (this.dist > this.farthestDistance) {
                this.farthestDistance = this.dist;
                this.p4 = field.array[this.i];
            }
        }
        return this.p4;
    }
    static calculateLargestPlaneFromField(field) {
        
        this.p1= Field.lowestPointInField(field)

        this.p2 = Field.getFarthestPointFromVector(this.p1,field)
        this.line = new Line(this.p1,this.p2);
        this.p3 = Line.calculateFarthestPoint(field,this.line);
        return new Plane(this.p1,this.p2,this.p3);
    }



    static graphPlane(plane,color){
        let linesToBeGraphed = this.returnPlaneCreatedByLines(plane);
        for (let i =0; i < linesToBeGraphed.length;i++) {
            Line.graphLine(linesToBeGraphed[i],color);
        }
    }
    static rotatePlane(plane,xRotate,yRotate,zRotate) {
        let p1 = plane.p1;
        let p2 = plane.p2;
        let p3 = plane.p3;

        p1 = Vector.rotateVector(p1,xRotate,yRotate,zRotate);
        p2 = Vector.rotateVector(p2,xRotate,yRotate,zRotate);
        p3 = Vector.rotateVector(p3,xRotate,yRotate,zRotate);
        
        return new Plane(p1,p2,p3);
    }
    static rotatePlanes(planes,xRotate,yRotate,zRotate) {
        let outputPlanes = [];
        let newPlane;
        for (let i = 0; i < planes.length;i++) {
            newPlane = this.rotatePlane(planes[i],xRotate,yRotate,zRotate);
            outputPlanes.push(newPlane);
        }
        return outputPlanes;
    }
}








class Line {
    constructor(p1,p2){
        this.p1 = p1;
        this.p2 = p2;
    }
    static isLineEqual(l1,l2){
        if (l1===l2) return true;
        if (l1.p1 === l2.p1 && l1.p2 === l2.p2) return true;
        if (l1.p1 === l2.p2 && l1.p2 == l2.p1) return true;
        return false;
    }
    static calculateFarthestPoint(field,line) {
        this.farthestDistance = 0;
        this.p3 = undefined
        for (this.i =0; this.i < field.array.length;this.i++) {
            if (field.array[this.i] == this.p1 || field.array[this.i] == this.p2) continue;
            
            this.distance= line.distanceToPoint(field.array[this.i]);
            
            if (this.farthestDistance < this.distance) {
                this.p3 = field.array[this.i];
                this.farthestDistance = this.distance;
            }
        }
        return this.p3;
    }
    distanceToPoint(v){
        this.BA = Vector.sub(v,this.p1);
        this.BC = Vector.sub(this.p2,this.p1);
        return Vector.magnitude(Vector.crossProduct(this.BA,this.BC)) / Vector.magnitude(this.BC)
    }
    static graphLine(line,color){
        stroke(color);
        fill(color);
        line(line.p1.x,line.p1.y,line.p2.x,line.p2.y);
    }
}











class Vector {
    constructor (x,y,z){
        if (x==undefined) {
            this.x=undefined
        } else {
            this.x = x;
        }
        if (y==undefined) {
            this.y=undefined
        } else {
            this.y = y;
        }
        if (z==undefined) {
            this.z=0
        } else {
            this.z = z;
        }
        

    }
    static magnitude(v){
        return Math.sqrt((v.x**2)+(v.y**2)+(v.z**2))
    }
    static distance(v1,v2) {
        return (((v1.x-v2.x)**2) + ((v1.y-v2.y)**2) + ((v1.z-v2.z)**2))
    }
    static lerp(p1,p2,t){
        if (p1== undefined || p2 ==undefined || t== undefined) return false;
        if (p1 instanceof this) {
            return this.lerpVector(p1,p2,t)
        }
        return ((p2-p1)*t) + p1;
    }

    static lerpVector(v1,v2,t){
        return new this(this.lerp(v1.x,v2.x,t),this.lerp(v1.y,v2.y,t),this.lerp(v1.z,v2.z,t));
    }
    /**
     * 
     * @param {*} v 2D or 3D Vector
     * @returns The 2D or 3D Vector that has the same direction as v but a magnitude of 1.
     */
    static normalize(v){
        this.mag = Math.sqrt( (v.x **2) + (v.y **2) + (v.z **2));
        
        return new this(v.x/this.mag,v.y/this.mag,v.z/this.mag);
    }

    /**
     * 
     * @param {Vector} v1 3D Vector
     * @param {Vector} v2 3D Vector
     * @returns {Vector} The cross product of v1 and v2 in the form of a 3D Vector
     */
    static crossProduct(v1,v2){
       
        return new this((v1.y*v2.z)-(v1.z*v2.y),(v1.z*v2.x)-(v1.x*v2.z),(v1.x*v2.y)-(v1.y*v2.x));
        
    }
    static dotProduct(v1,v2){
        return ((v1.x *v2.x) + (v1.y *v2.y) + (v1.z *v2.z));
    }


    static sub (v1,v2) {
        return new this(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z);
    }
    static add (v1,v2) {
        return new this(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z);
    }
    static scalarMult(v,c) {
        return new this (v.x*c,v.y*c,v.z * c);
    }

    static rotateVector(v,xRotate,yRotate,zRotate){
        v = this.rotateVectorAroundXAxis(v,xRotate);
        v = this.rotateVectorAroundYAxis(v,yRotate);
        v = this.rotateVectorAroundZAxis(v,zRotate);
        return v;
    }
    static rotateVectorAroundXAxis(v,theta){
        return new this(v.x, (v.y*Math.cos(theta))-(v.z*Math.sin(theta)), (v.y*Math.sin(theta))+ (v.z* Math.cos(theta)));
    }
    static rotateVectorAroundYAxis(v,theta){
        return new this((v.x*Math.cos(theta))+(v.z*Math.sin(theta)),v.y,(-v.x*Math.sin(theta))+(v.z*Math.cos(theta)));
    }
    static rotateVectorAroundZAxis(v,theta){
        return new this((v.x*Math.cos(theta))-(v.y*Math.sin(theta)), (v.x*Math.sin(theta))+(v.y*Math.cos(theta)),v.z);
    }
    static rotate2DVector(v,theta){
        return new this((v.x*Math.cos(theta)) -(v.y* Math.sin(theta)),(v.x*Math.sin(theta))+(v.y*Math.cos(theta)))
    }
}

