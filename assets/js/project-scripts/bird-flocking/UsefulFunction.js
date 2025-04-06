
function strokeOrFillRGB(array,filler){
  
    if (filler == "fill") {
      fill(array[0],array[1],array[2]);
    }
    if (filler == "stroke") {
      stroke(array[0],array[1],array[2]);
    }
}