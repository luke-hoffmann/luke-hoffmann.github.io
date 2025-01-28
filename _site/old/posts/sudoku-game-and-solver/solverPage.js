let changeNumber = 0;
let backCol = "#595766"
let selectedRow = -4;
let selectedCol = -4;
let placedCol = "#203A75"
let setCol = "#16151B"
let textCol = "white"
let placedTextCol = "#8ac0ff"
let updatedBoard = [[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            
];
let mainBoard = [[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            
];

let unChangeable = [[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            
];
function colRowColBox(row,col,color) {
  //color = "red"
  //console.log(row, " ", col)
  $("#smallerSmall_" +(row+ "_" + col)).css("background-color",color);
  
  for (i = 0; i < 9; i++) {
  
    $("#smallerSmall_" +row+ "_" + i).css("background-color",color);
    
  }
  for (i = 0; i < 9; i++) {
    
    $("#smallerSmall_" +i+ "_" + col).css("background-color",color);
  }
  
  startRow = 0;
  startCol = 0;
  
  if (row > 5) {
    startRow = 6;
  }
  else if (row > 2) {
    startRow = 3;
  } else {
    startRow = 0;
  }
  if (col > 5) {
    startCol = 6;
  }
  else if (col > 2) {
    startCol = 3;
  } else {
    startCol = 0;
  }

  for (iDontLikeFor = 0 ; iDontLikeFor < 3; iDontLikeFor ++) {
    for (jDontLikeFor = 0; jDontLikeFor < 3; jDontLikeFor++) {
      
      $("#smallerSmall_" +(startRow+iDontLikeFor)+ "_" + (startCol+jDontLikeFor)).css("background-color",color);
      
      
    }
  }
}





function checkBox(row, col,matrix,number) {
  // this function returns true if the same number as given is found in the given box
  startRow = 0;
  startCol = 0;
  
  if (row > 5) {
    startRow = 6;
  }
  else if (row > 2) {
    startRow = 3;
  } else {
    startRow = 0;
  }
  if (col > 5) {
    startCol = 6;
  }
  else if (col > 2) {
    startCol = 3;
  } else {
    startCol = 0;
  }

  for (iDontLikeFor = 0 ; iDontLikeFor < 3; iDontLikeFor ++) {
    for (jDontLikeFor = 0; jDontLikeFor < 3; jDontLikeFor++) {
      if (matrix[startRow+iDontLikeFor][startCol+jDontLikeFor] == number) {
        return true
      }
    }
  }
  return false
}
function checkRow(row,matrix,number) {
  // this function returns true if the same number as given is found in the given row
  for (iHateRows = 0 ; iHateRows< 9; iHateRows++) {
    if (matrix[row][iHateRows] == number) {
      return true;
    }
  }
  return false;
}

function checkCol(col,matrix,number) {
  // this function returns true if the same number as given is found in the given column
  for (iHateThis = 0 ; iHateThis< 9; iHateThis++) {
    if (matrix[iHateThis][col] == number) {
      return true;
    }
  }
  return false;
}

function checkSpot(row,column,matrix,number){
  return !checkBox(row,column,matrix,number) && !checkRow(row,matrix,number) && !checkCol(column,matrix,number);
}

function solveBoard(board) {
  //console.log("poop")
  //local = Math.random()

  //console.log(local);
  //console.log(" ")
  for ( let i =0 ; i< 9; i++) {
    for (let j = 0; j< 9; j++) {
      //console.log(i)
      if (board[i][j] == 0) {
        for (let l = 1; l <10; l++) {
          if (checkSpot(i,j,board,l)) {
            board[i][j] = l;
            mainBoard[i][j] = l
            
            if (solveBoard(board)) {
              return true
            } else {
              board[i][j] = 0;
              mainBoard[i][j] = 0;
            }
          }
        }
        
        return false
      }
    }
  }
  return true;
  
}






for (i = 1; i < 4; i++) {
  $("#grid").append("<div style='width:195px; margin:2px; margin-bottom:1px; height:195px; display:inline-block; background-color:none;' id='" + "smaller_"+i +"'> </div>");
}
let enterI = 1;
let row = 0;
let col = 0;
let topVal = 9;

for (i = 1; i < 82; i++) {
  
  col = 9 - Math.abs(topVal - i)-1;
  //console.log(row, " ", col)
  
  smallContent = mainBoard[row][col]
  if (smallContent == 0) {
    smallContent = "<span style='color:none; visibility:hidden;'>0</span>";
  }
  seperationForShower = 6;
  content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>";
  
  if (row == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-bottom: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
  }
  if (row == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-top: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
  }

  if (row == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-bottom: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
  }
  if (row == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-top: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
  }
  if (col == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
  }
  if (col == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
  }
  if (col == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
  }
  if (col == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
  }

  if (row ==2 && col == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower+"px solid black;border-bottom: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      }
    if (row ==2 && col == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower+"px solid black;border-bottom: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
    }
      if (row ==2 && col == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower+"px solid black;border-bottom: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      }
    if (row ==2 && col == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower+"px solid black;border-bottom: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      
  }

  if (row ==5 && col == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower+"px solid black;border-bottom: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      }
    if (row ==5 && col == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower+"px solid black;border-bottom: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      
  }
  if (row ==5 && col == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower+"px solid black;border-bottom: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      }
    if (row ==5 && col == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + ";border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower+"px solid black;border-bottom: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      
  }

  if (row ==6 && col == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower+"px solid black;border-top: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      }
    if (row ==6 && col == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower+"px solid black;border-top: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      
  }
  if (row ==6 && col == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower+"px solid black;border-top: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      }
    if (row ==6 && col == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower+"px solid black;border-top: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      
  }

  if (row ==3 && col == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower+"px solid black;border-top: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      }
    if (row ==3 && col == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower+"px solid black;border-top: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      
  }
  if (row ==3 && col == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower+"px solid black;border-top: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"
      }
    if (row ==3 && col == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" +backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower+"px solid black;border-top: " + seperationForShower+"px solid black;' id='" + "smallerSmall_"+ row + "_"  + col +"'> <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3> </div>"

      
  }
    $("#smaller_" +enterI).append(content)
  if (i % 3 ==0) {
    enterI++
  }
  
  if (i % 9 ==0) {
    enterI= 1;
    
  }
  
  if (i % 9 == 0) {
    row++;
    topVal+=9;
  }
}
//

for (i = 1 ;i < 10; i++) {
  content = "<div class='numberOptions'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:"+backCol+"; border: 1px solid black; box-sizing:border-box;' id='" + "smallerSmall_"+i+"'> <h3 style='black:white; text-align:center;'>"+ i +"</h3> </div>";
  $("#buttons").append(content);
}

let width = document.body.clientWidth;
if (width < 620) {
  $("#grid").css("height","385px")
  $("#grid").css("width","385px")
  $("#buttons").css("width","385px")
  for (i =1; i < 10;i++) {
      $("#smallerSmall_" + i).css("width","35px")
      $("#smallerSmall_" + i).css("height","35px")
      $("#smallerSmall_" +i+"> h3").css("margin-top","4px");
    }
      
    for (i = 1; i <4;i++) {
      $("#smaller_"+i).css("width","118px")
    }
for (i = 0; i  < 9;i++) {
  for (j = 0; j< 9; j++) {
    size = "35px"
    $("#smallerSmall_" +i+ "_" + j + "> h3").css("margin-top","4px");
    $("#smallerSmall_" +i+ "_" + j).css("width",size);
    $("#smallerSmall_" +i+ "_" + j).css("height",size);
  }
}
}
$(".smallBoi").click(function(){
  info = $(this).attr("id").split("_");
  row = Number(info[1]);
  col = Number(info[2]);
  changeNumber = mainBoard[row][col];
  selectedRow = row;
  selectedCol = col;
  
  for (i = 0; i < 9; i++) {
    for (j = 0; j <9; j++) {
      
      if (unChangeable[i][j] == 0) {
        $("#smallerSmall_" +i+ "_" + j).css("background-color",backCol);
        $("#smallerSmall_" +i+ "_" + j).css("color",placedTextCol);
      } else if (unChangeable[i][j] == 1) {
        $("#smallerSmall_" +i+ "_" + j).css("background-color",backCol);
      }
      
    }
  }
  colRowColBox(row,col,"#666666");
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9;j++) {
      
      if (mainBoard[i][j] == changeNumber && changeNumber != 0) {
        $("#smallerSmall_" +i+ "_" + j).css("background-color",setCol);
        
      }
    }
  }
  
  
  
  
  $("#smallerSmall_" + selectedRow + "_" + selectedCol).css("background-color","#268aff");
  
  
})


//colRowColBox(4,4,mainBoard,"lightgrey")
$(".numberOptions").click(function(){
  info = $(this).attr("id").split("_");
  $("#buttons >").not(this).css("background-color",backCol);
  $(this).css("background-color","lightgrey");
  number = Number(info[1]);
  changeNumber = number;
  if (selectedRow <0 || selectedCol < 0) {
    return
  }
  for (i = 0; i < 9; i++) {
    for (j = 0; j <9; j++) {
      
      if (unChangeable[i][j] == 0) {
        $("#smallerSmall_" +i+ "_" + j).css("background-color",backCol);
        $("#smallerSmall_" +i+ "_" + j).css("color",placedTextCol);
      } else if (unChangeable[i][j] == 1) {
        $("#smallerSmall_" +i+ "_" + j).css("background-color",backCol);
      }
      
    }
  }
  
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9;j++) {
      
      if (mainBoard[i][j] == changeNumber && changeNumber != 0) {
        $("#smallerSmall_" +i+ "_" + j).css("background-color",setCol);
        
      }
    }
  }
  // <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3>
  
  if (unChangeable[selectedRow][selectedCol] == 0 && mainBoard[selectedRow][selectedCol] == changeNumber) {
    width = document.body.clientWidth;
    mainBoard[selectedRow][selectedCol] = 0;
    if (width < 620) {
      $("#smallerSmall_" + selectedRow + "_" + selectedCol).html("<h3 style='margin-top:4px; color:"+ setCol+"; text-align:center;'><span style='visibility:hidden;'>0</span></h3>")
      
    } else {
      $("#smallerSmall_" + selectedRow + "_" + selectedCol).html("<h3 style='color:"+ setCol+"; text-align:center;'><span style='visibility:hidden;'>0</span></h3>")
      
    }
    //console.log(1)
  }
  else if (unChangeable[selectedRow][selectedCol] == 0) {
    mainBoard[selectedRow][selectedCol] = changeNumber;
    if (width < 620) {
      $("#smallerSmall_" + selectedRow + "_" + selectedCol).html("<h3 style='margin-top:4px; color:"+ placedTextCol+"; text-align:center;'>"+ changeNumber +"</h3>");
    }
    else {
      $("#smallerSmall_" + selectedRow + "_" + selectedCol).html("<h3 style='color:"+ placedTextCol+"; text-align:center;'>"+ changeNumber +"</h3>")
    }
    //console.log(2)
  }
  selectedCol++
  if (selectedCol > 8) {
    selectedCol = 0;
    selectedRow++;
  }
  colRowColBox(selectedRow,selectedCol,"#666666");
  $("#smallerSmall_" + selectedRow + "_" + selectedCol).css("background-color","#268aff");
  
})

$( document).keypress(function( event ) {
  key = event.which
  console.log("wow")
  if (key) {
     event.preventDefault();
  }
  a = String.fromCharCode(key);
  if (a >0 && a < 10) {

    for (i = 0; i < 9; i++) {
    for (j = 0; j <9; j++) {
      
      if (unChangeable[i][j] == 0) {
        $("#smallerSmall_" +i+ "_" + j).css("background-color",backCol);
        $("#smallerSmall_" +i+ "_" + j).css("color",placedTextCol);
      } else if (unChangeable[i][j] == 1) {
        $("#smallerSmall_" +i+ "_" + j).css("background-color",backCol);
      }
      
    }
  }
  
    if (a != 0) {
    if (width < 620) {
      $("#smallerSmall_" + selectedRow + "_" + selectedCol).html("<h3 style='margin-top:4px; color:"+ placedTextCol+"; text-align:center;'>"+ (a) +"</h3>");
    } else {
      
      $("#smallerSmall_" + selectedRow + "_" + selectedCol).html("<h3 style=' color:"+ placedTextCol+"; text-align:center;'>"+ (a) +"</h3>");
      
    }
    }
    mainBoard[selectedRow][selectedCol] = a
      mainBoard[selectedRow][selectedCol] = a
  }
  
  selectedCol++
  if (selectedCol > 8) {
    selectedCol = 0;
    selectedRow++;
  }
  colRowColBox(selectedRow,selectedCol,"#666666");
  $("#smallerSmall_" + selectedRow + "_" + selectedCol).css("background-color","#268aff");
});

$("#solve").click(function(){
  solveBoard(mainBoard)
  console.log(mainBoard)
  width = document.body.clientWidth;
  if (width < 620) {
      for (i = 0; i < 9; i++) {
    for (j=0;j<9;j++) {
      $("#smallerSmall_" + i + "_" + j).html("<h3 style='margin-top:6px; color:"+ placedTextCol+"; text-align:center;'>"+ mainBoard[i][j] +"</h3>");
    }
  }
  } else {
  for (i = 0; i < 9; i++) {
    for (j=0;j<9;j++) {
      $("#smallerSmall_" + i + "_" + j).html("<h3 style=' color:"+ placedTextCol+"; text-align:center;'>"+ mainBoard[i][j] +"</h3>");
    }
  }
  }
})
$(window).resize(function(){
  width = document.body.clientWidth;
  if (width < 620) {
    $("#grid").css("width","385px")
    $("#grid").css("height","385px")
    $("#buttons").css("height","385px")
    for (i =1; i < 10;i++) {
      $("#smallerSmall_" + i).css("width","35px")
      $("#smallerSmall_" + i).css("height","35px")
      $("#smallerSmall_" +i+"> h3").css("margin-top","4px");
    }
      
    for (i = 1; i <4;i++) {
      $("#smaller_"+i).css("width","118px")
    }
    for (i =0; i < 9; i++) {
      for (j=0; j< 9;j++) {
        size = "35px"
        $("#smallerSmall_" +i+ "_" + j + "> h3").css("margin-top","4px");
        $("#smallerSmall_" +i+ "_" + j).css("width",size);
        $("#smallerSmall_" +i+ "_" + j).css("height",size);
      }
    }
    
  } else {
    $("#grid").css("width","600px")
    $("#grid").css("height","600px")
    $("#buttons").css("width","600px")
    for (i =1; i < 10;i++) {
      $("#smallerSmall_" + i).css("width","60px")
      $("#smallerSmall_" + i).css("height","60px")
      $("#smallerSmall_" +i+"> h3").css("margin-top","18.72px");
    }
    for (i = 1; i <4;i++) {
      $("#smaller_"+i).css("width","195px")
    }
    for (i =0; i < 9; i++) {
      for (j=0; j< 9;j++) {
        size = "60px"
        $("#smallerSmall_" +i+ "_" + j + "> h3").css("margin-top","18.72px");
        $("#smallerSmall_" +i+ "_" + j).css("width",size);
        $("#smallerSmall_" +i+ "_" + j).css("height",size);
      }
    }
  }
})

$("#reset").click(function(){
  //console.log("reset")
  
  for (i=0; i < 9; i ++) {
    for (j =0; j< 9;j++) {
      if (width < 620) {
      $("#smallerSmall_" + i + "_" + j).html("<h3 style='margin-top:4px; color:"+ placedTextCol+"; text-align:center;'><span style='visibility:hidden;'>0</span></h3>");
      } else {
      
      $("#smallerSmall_" + i + "_" + j).html("<h3 style=' color:"+ placedTextCol+"; text-align:center;'><span style='visibility:hidden;'>0</span></h3>");
      
      }
      mainBoard[i][j] = 0;
    }
  }
 for (i = 0; i < 9; i++) {
    for (j = 0; j <9; j++) {
      
      if (unChangeable[i][j] == 0) {
        $("#smallerSmall_" +i+ "_" + j).css("background-color",backCol);
        $("#smallerSmall_" +i+ "_" + j).css("color",placedTextCol);
      } else if (unChangeable[i][j] == 1) {
        $("#smallerSmall_" +i+ "_" + j).css("background-color",backCol);
      }
      
    }
  }


  
})