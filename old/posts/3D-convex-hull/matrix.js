class matrix{

    constructor(matrix){
        this.matrix = matrix;
    }
    static lerp(p1,p2,t){
        return ((p2-p1)*t) + p1;
    }
    static lerp3DVector(m1,m2,t){
        this.m1 = m1.matrix[0];
        this.m2 = m2.matrix[0];
        return new this([[this.lerp(this.m1[0],this.m2[0],t),this.lerp(this.m1[1],this.m2[1],t),this.lerp(this.m1[2],this.m2[2],t)]])

    }
    static generateBlankMatrix(rows,columns){
        this.output=[];

        for (this.i =0 ; this.i < rows;this.i++) {
            this.r = [];
            for (this.j=0;this.j< columns;this.j++) {
                this.r.push(0);
            }
            this.output.push(this.r);
        }
        
        return new this(this.output);
    }
    static centerOfPlane(p1,p2,p3){
        this.lerp1 = this.lerp3DVector(p1,p2,0.5);
        this.lerp2 = this.lerp3DVector(p2,p3,0.5);
        this.lerp3 = this.lerp3DVector(p3,p1,0.5);
        this.lerp4 = this.lerp3DVector(this.lerp1,this.lerp2,0.5);
        this.lerp5 = this.lerp3DVector(this.lerp3,this.lerp4,0.5);
        return this.lerp5;
    }
    static add (m1,m2){
        this.m1 = m1.matrix;
        this.m2 = m2.matrix;
        if (!(this.m1.length==this.m2.length&&this.m1[0].length==this.m2[0].length)) return [[]];
        this.out = this.generateBlankMatrix(this.m1.length,this.m1[0].length)
        for (this.i = 0; this.i < this.m1.length;this.i++){
            for (this.j =0; this.j  < this.m1[0].length;this.j++) {
                
                this.out.matrix[this.i][this.j]= this.m1[this.i][this.j]+this.m2[this.i][this.j];
            }
        }
        return this.out;
    }
    static sub (m1,m2){
        this.m1 = m1.matrix;
        this.m2 = m2.matrix;
        if (!(this.m1.length==this.m2.length&&this.m1[0].length==this.m2[0].length)) return [[]];
        this.out = this.generateBlankMatrix(this.m1.length,this.m1[0].length)
        for (this.i = 0; this.i < this.m1.length;this.i++){
            for (this.j =0; this.j  < this.m1[0].length;this.j++) {
                this.out.matrix[this.i][this.j]= this.m1[this.i][this.j]-this.m2[this.i][this.j];
            }
        }
        return this.out;
    }
    add(matrix){
        if (matrix.matrix.length != this.matrix.length || matrix.matrix[0].length != this.matrix[0].length) return [[]];
        for (let i =0; i < matrix.matrix.length;i++) {
            for (let j =0 ;j < matrix.matrix[0].length;j++) {
                this.matrix[i][j] += matrix.matrix[i][j];
            }
        }
        return this

    }
    sub(matrix){
        if (matrix.matrix.length != this.matrix.length || matrix.matrix[0].length != this.matrix[0].length) return [[]];
        for (let i =0; i < matrix.matrix.length;i++) {
            for (let j =0 ;j < matrix.matrix[0].length;j++) {
                this.matrix[i][j] -= matrix.matrix[i][j];
            }
        }
        return this

    }
    
    static colWrap(matrix,col){
   
        if(col >=matrix.matrix[0].length) {
            return Math.abs(matrix.matrix[0].length-col);
        }
        if(col <0){
            return matrix.matrix[0].length+col;
        }
        return col;
        
        
    }
    static xRotation(theta){
        return new this(([
            [1,0,0],
            [0,Math.cos(theta),-Math.sin(theta)],
            [0,Math.sin(theta),Math.cos(theta)]
        ]));
    }
    static yRotation(theta){
        return new this(([
            [Math.cos(theta),0,Math.sin(theta)],
            [0,1,0],
            [-Math.sin(theta),0,Math.cos(theta)]
        ]));
    }
    static zRotation(theta){
        return new this(([
            [Math.cos(theta),-Math.sin(theta),0],
            [Math.sin(theta),Math.cos(theta),0],
            [0,0,1]
        ]));
    }
    static rotation2D(theta){
        return new this(([
            [Math.cos(theta),-Math.sin(theta)],
            [Math.sin(theta),Math.cos(theta)]
        ]));
    }
    

    
    
    static mult(matrix1,matrix2){
        
        this.matrix1 = matrix1.matrix;
        this.matrix2 = matrix2.matrix;
        if (this.matrix1[0].length != this.matrix2.length) {return new this([[]])};
        this.out = this.generateBlankMatrix(this.matrix1.length,this.matrix2[0].length);

        for (this.i=0; this.i < this.matrix1.length;this.i++) {
            for (this.j = 0 ; this.j < this.matrix2[0].length;this.j++) {
                this.sum = 0;
                for (this.k =0; this.k < this.matrix1[0].length;this.k++) {
                    this.sum += (this.matrix1[this.i][this.k] * this.matrix2[this.k][this.j]);
                }
                this.out.matrix[this.i][this.j] = this.sum;
            }
        }
        return (this.out);
    }
    static orthographicProjection(){
        return new this([
            [1,0,0],
            [0,1,0],
            [0,0,0]
        ]);
        
    }
    static det(matrix){
        this.matrix = matrix.matrix;

        
        if (this.matrix.length != this.matrix[0].length) return false;
        if (this.matrix.length==2) {
            return this.matrix[0][0]*this.matrix[1][1] - this.matrix[0][1]*this.matrix[1][0];
        }
        if (this.matrix.length==3){
            this.pos = 0;
            this.neg = 0;
            for (this.i =0 ; this.i <3;this.i++) {
                this.posRow = 1;
                this.negRow =1;
                for (this.j = 0;this.j < 3;this.j++) {
                    this.posRow*= this.matrix[this.j][this.colWrap(new this(this.matrix),this.i+this.j)];
                    this.negRow*= this.matrix[this.j][this.matrix.length-this.colWrap(new this(this.matrix),this.i+this.j)-1];
                }
                this.pos+=this.posRow;
                this.neg+=this.negRow;
            }
            
            return this.pos-this.neg
        }
    }
    static normalize3DVector(mat){
        this.mag = Math.sqrt( (mat.matrix[0][0] **2) + (mat.matrix[0][1] **2) + (mat.matrix[0][2] **2));
        


        return new this([[mat.matrix[0][0]/this.mag,mat.matrix[0][1]/this.mag,mat.matrix[0][2]/this.mag]]);
    }
    static normalPlane(p1,p2,p3){
        ///console.log(p1)
        this.s1 = this.sub(p1,p2);
       
        this.s2 = this.sub(p1,p3);
        
        return this.normalize3DVector(this.crossProduct3D(this.s1,this.s2));

    }
    static crossProduct3D(mat1,mat2){
        
        this.m1 = mat1.matrix[0];
        this.m2 = mat2.matrix[0];
       
        
        return new this([[(this.m1[1]*this.m2[2])-(this.m1[2]*this.m2[1]),(this.m1[2]*this.m2[0])-(this.m1[0]*this.m2[2]),(this.m1[0]*this.m2[1])-(this.m1[1]*this.m2[0])]]);
        
        
    }
    scalarMult(scalar){
        for (this. i =0 ; this.i < this.matrix.length;this.i++){
            for (this. j =0 ; this.j < this.matrix[0].length;this.j++){
                this.matrix[this.i][this.j] = this.matrix[this.i][this.j]*scalar;
            }
        }
    }
    mult(matrix){

        return this.mult(this,matrix);
    }
    
}


