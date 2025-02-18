class LightingPlot{
    constructor(plotXSize,plotYSize,plotZSize,objects,lights){
        Object.assign(this, { plotXSize, plotYSize,plotZSize,objects,lights });
    }
    determinePositionOfItems(domainXSize,domainYSize,domainZSize) {
        this.objectPositions = [];
        this.lightPositions = [];
        let position = new Vector(0,0,0);
        for (const item of objects) {
            
        }
    }
    graphLights(){  
        for (const light of lights) {

        }
    }
    graphObjects() {

    }
}
