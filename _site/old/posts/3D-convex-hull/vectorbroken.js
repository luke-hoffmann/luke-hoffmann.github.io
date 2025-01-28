class Field {
    constructor(array) {
        
        this.array = array;
        if(array == undefined) {
            this.array = [];
        }
    }
    static getFarthestPoint(v,field){
        this.lowestDistance = 0;
        this.farthestDistancePoint = undefined
        for (this.i =0; this.i< field.array.length; this.i++){
            this.dist = Vector.distance(v,field.array[this.i]);
            if (this.dist > this.lowestDistance){
                this.lowestDistance = this.dist;
                this.farthestDistancePoint = field.array[this.i]
            }
        }
        return this.farthestDistancePoint
    }
    static lowestPoint(field){
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
    
    static QuickHull(field,plane){
        let dividerPlane = plane;
        if (plane==undefined) {
            dividerPlane= Plane.largePlane(field);
        }   
        //return [dividerPlane]
        let final = [];
        let upField = this.upSpace(field,dividerPlane)
        let up = this.planesFromField(upField,dividerPlane);
        final.push(up);
        if (plane == undefined) {
            let downField = this.upSpace(field,Plane.flipNormal(dividerPlane));
            let down = this.planesFromField(downField,Plane.flipNormal(dividerPlane));
            final.push(down)
        }
        
        //return [this.a,this.upField]
        
        
        return this.combineArrays(final)
        //return this.combineArrays(this.output)
    }

    static planesFromField(field,plane){
        if (field.array.length == 1) {
            this.z = Plane.newPlanes(field.array[0],plane);
            return this.z
        }
        if (field.array.length == 0) {
            this.z = [plane]
            return this.z
        }
        let prism =this.triangularPrism(field,plane);
        let output = [];
        prism.forEach(element => {
            this.out = this.QuickHull(field,element)
            output.push(this.out);
        });
        return this.combineArrays(output)
    }
    static triangularPrism(field,plane){
        this.up4 = Plane.farthestPointFromPlane(field,plane);
        this.z = Plane.newPlanes(this.up4,plane);
        return this.z

    }
    
    static combineArrays(l) {
        this.combined = [];
        for (this.i =0; this.i < l.length; this.i++) {
            for (this.j = 0; this.j < l[this.i].length; this.j++) {
                this.combined.push(l[this.i][this.j])
            }
            
        }
        return this.combined;
    }
    static upSpace(field,plane){
        this.normal = Plane.normalPlane(plane);
        this.field = new this();
        for (this.i = 0; this.i < field.array.length; this.i++) {
            if (field.array[this.i] == this.p1 || field.array[this.i] == this.p2 || field.array[this.i] == this.p3) continue;

            if (!Plane.isInUpSpace(field.array[this.i],plane,this.normal)) continue;

            this.field.array.push(field.array[this.i])

        }
        return this.field;
    }
    static downSpace(field,plane){
        this.normal = Plane.normalPlane(plane);
        this.field = new this();
        for (this.i = 0; this.i < field.array.length; this.i++) {
            if (field.array[this.i] == this.p1 || field.array[this.i] == this.p2 || field.array[this.i] == this.p3) continue;

            if (Plane.isInUpSpace(field.array[this.i],plane,this.normal)) continue;

            this.field.array.push(field.array[this.i])

        }
        return this.field;
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
    static isInUpSpace(point,plane,normal){
        /*
        if (Vector.dotProduct(Vector.sub(point,plane.p1),normal)>0) 
            {
                return true
    
            };
        
        return false;
        */
        this.BA = Vector.sub(plane.p2,plane.p1);
        this.CA = Vector.sub(plane.p3,plane.p1);
        this.PA = Vector.sub(point,plane.p1);
        this.cross = Vector.crossProduct(this.BA,this.CA);
        this.dot = Vector.dotProduct(this.PA,this.cross)
        //console.log(this.dot);
        if (Math.round(this.dot*1000)/1000 == 0) return false;
        if (this.dot > 0) return true;
        return false;
    }
    static isInDownSpace(point,plane,normal){

        if (Vector.dotProduct(Vector.sub(point,plane.p1),normal)<0) 
            {
                return true

            };
        
        return false;
    
    }
    static flipNormal(plane) {
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
    computerCenter(){
        return this.computerCenter(this.p1,this.p2,this.p3);
    }

    static normalPlane(plane){
        this.s1 = Vector.sub(plane.p1,plane.p2);
        this.s2 = Vector.sub(plane.p1,plane.p3);
        
        return Vector.normalize(Vector.crossProduct(this.s1,this.s2));
    
    }
    distance(v) {
        this.normal = this.constructor.normalPlane(this);
        this.d = 0
        return Math.abs(this.normal.x*v.x + this.normal.y*v.y + this.normal.z*v.z + this.d)/ (Math.sqrt((this.normal.x**2) + (this.normal.y**2) + (this.normal.z**2)));
    }

    static farthestPointFromPlane(field,plane){
        this.farthestDistance = 0;
        for (this.i= 0; this.i < field.array.length; this.i++) {
            this.dist = plane.distance(field.array[this.i]);
            if (this.dist > this.farthestDistance) {
                this.farthestDistance = this.dist;
                this.p4 = field.array[this.i];
            }
        }
        return this.p4;
    }
    static largePlane(field) {
        
        this.p1= Field.lowestPoint(field)

        this.p2 = Field.getFarthestPoint(this.p1,field)
        
        this.line = new Line(this.p1,this.p2);
        this.p3 = Line.farthestDistancefromLine(field,this.line);
        return new Plane(this.p1,this.p2,this.p3);
    }
}


class Line {
    constructor(p1,p2){
        this.p1 = p1;
        this.p2 = p2;
    }
    static farthestDistancefromLine(field,line) {
        this.farthestDistance = 0;
        this.p3 = undefined
        for (this.i =0; this.i < field.array.length;this.i++) {
            if (field.array[this.i] == this.p1 || field.array[this.i] == this.p2) continue;
            
            this.distance= line.distance(field.array[this.i]);
            
            if (this.farthestDistance < this.distance) {
                this.p3 = field.array[this.i];
                this.farthestDistance = this.distance;
            }
        }
        return this.p3;
    }
    distance(v){
        //p2 is c
        //p1 is b
        //v is a
        /*
        this.dist = Vector.distance(this.p2,this.p1);
        this.D = (Vector.sub(this.p2,this.p1));
        this.D = Vector.scalarMult(this.D,1/this.dist);
        
        this.V = Vector.sub(v,this.p1)

        this.t = Vector.dotProduct(this.V,this.D)

        this.P = Vector.scalarMult(this.D,this.t);
        this.P = Vector.add(this.P,this.p1);

        return Vector.distance(this.P,v);
        */
       this.BA = Vector.sub(v,this.p1);
       this.BC = Vector.sub(this.p2,this.p1);
       return Vector.magnitude(Vector.crossProduct(this.BA,this.BC)) / Vector.magnitude(this.BC)
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
    static rotateAroundX(v,theta){
        return new this(v.x, (v.y*Math.cos(theta))-(v.z*Math.sin(theta)), (v.y*Math.sin(theta))+ (v.z* Math.cos(theta)));
    }
    static rotateAroundY(v,theta){
        return new this((v.x*Math.cos(theta))+(v.z*Math.sin(theta)),v.y,(-v.x*Math.sin(theta))+(v.z*Math.cos(theta)));
    }
    static rotateAroundZ(v,theta){
        return new this((v.x*Math.cos(theta))-(v.y*Math.sin(theta)), (v.x*Math.sin(theta))+(v.y*Math.cos(theta)),v.z);
    }
    static rotate(v,theta){
        return new this((v.x*Math.cos(theta)) -(v.y* Math.sin(theta)),(v.x*Math.sin(theta))+(v.y*Math.cos(theta)))
    }
}


