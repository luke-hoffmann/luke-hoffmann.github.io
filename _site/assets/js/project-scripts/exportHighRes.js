function exportHighRes(renderWidth,renderHeight,viewWidth,viewHeight,fileName) {
    // HighRes Export
    sF = renderWidth/viewWidth;
    renderGraphic = createGraphics(renderWidth, renderHeight);
    increaseTime = false;
    draw();
    noLoop();
    save(renderGraphic, fileName, 'png');
    
    // Reset Default
    sF=1;
    renderGraphic = createGraphics(viewWidth, viewHeight);
    draw();
}
