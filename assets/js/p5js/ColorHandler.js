class ColorHandler {
    constructor (red,green,blue,classToColor){
        this.classToColor = classToColor;
        this.color = [red,green,blue];
    }
    static random(){
        return new this(UsefulFunction.randomIntBetween(0,255),UsefulFunction.randomIntBetween(0,255),UsefulFunction.randomIntBetween(0,255));
    }
    getRed(){
        return this.color[0];
    }
    getGreen(){
        return this.color[1];
    }
    getBlue(){
        return this.color[2];
    }
    classFill() {
        this.classToColor.fill(this.getRed(),this.getGreen(),this.getBlue());
    }
    classStroke() {
        this.classToColor.stroke(this.getRed(),this.getGreen(),this.getBlue());
    }
    classNoFill(){
        this.classToColor.noFill();
    }
    classNoStroke(){
        this.classToColor.noStroke();
    }
    p5Fill(){
        renderGraphic.fill(this.getRed(),this.getGreen(),this.getBlue());
    }
    p5Stroke() {
        renderGraphic.stroke(this.getRed(),this.getGreen(),this.getBlue());
    }
    p5NoStroke(){
        renderGraphic.noStroke();
    }
    p5NoFill(){
        renderGraphic.noFill();
    }
    multiplyByNumber(number){
        for (let i =0; i < this.color.length;i++) {
            this.color[i] = this.color[i]*number;
        }

    }
    static randomColorBetween(red1,red2,green1,green2,blue1,blue2){
        return new this (UsefulFunction.randomIntBetween(red1,red2),UsefulFunction.randomIntBetween(green1,green2),UsefulFunction.randomIntBetween(blue1,blue2));
    }
    addNumber(number) {
        for (let i =0; i < this.color.length;i++) {
            this.color[i] = this.color[i] + number;
        }
    }
    copy(){
        return new this.constructor(this.color[0],this.color[1],this.color[2]);
    }
}