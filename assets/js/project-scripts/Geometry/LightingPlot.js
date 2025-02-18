class LightingPlot{
    constructor(plotXSize,plotYSize,plotZSize,objects,lights){
        this.LIGHTING_DIAMETER = 20;
        this.COLOR = new ColorHandler(0,0,0);
        this.objectPositions = [];
        this.lightPositions = [];
        Object.assign(this, { plotXSize, plotYSize,plotZSize,objects,lights });
    }
    determinePositionOfItems(domainXSize,domainYSize,domainZSize) {
        this.objectPositions = [];
        this.lightPositions = [];
        let xScale, yScale, zScale;
        xScale = domainXSize/this.plotXSize;
        yScale = domainYSize/this.plotYSize;
        zScale = domainZSize/this.plotZSize;
        let position;
        for (const item of this.objects) {
            position = item.position.copy();
            position.x += domainXSize/2;
            position.y += domainYSize/2;
            position.z += domainZSize/2;
            position.x /= xScale;
            position.y /= yScale;
            position.z /= zScale;
            this.objectPositions.push(position);
        }

        for (const item of this.lights) {
            position = item.position.copy();
            position.x += domainXSize/2;
            position.y += domainYSize/2;
            position.z += domainZSize/2;
            position.x /= xScale;
            position.y /= yScale;
            position.z /= zScale;
            this.lightPositions.push(position);
        }
        console.log(this.lightPositions)
    }
    graphLights(){  
        for (let i =0; i < this.lightPositions.length;i++) {
            let lightPosition = this.lightPositions[i];
            let color = this.lights[i].color;
            renderGraphic.stroke("black")
            color.p5Fill();
            renderGraphic.circle(lightPosition.x,lightPosition.z,this.LIGHTING_DIAMETER);
        }
    }
    graphPlot(){
        this.COLOR.p5Stroke();
        renderGraphic.line(0,0,this.plotXSize,0);
        renderGraphic.line(0,this.plotZSize,this.plotXSize,this.plotZSize);
    }
    graphObjects() {

    }
}
