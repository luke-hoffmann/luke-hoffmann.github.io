let changeNumber = 0;
let backCol = "#FFFF";
let selectedRow = -4;
let selectedCol = -4;
let backgroundColor = "#FFFF";
let placedCol = "#203A75"
let setCol = "red";
let selectionColor = "#FD480F";
let textCol = "#000000";
let placedTextCol = "#8ac0ff";
let notesMode = "off";
let updatedBoard = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],

];
let mainBoard = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],

];
let unChangeable = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],

];
function colRowColBox(row, col, color) {
  $("#smallerSmall_" + (row + "_" + col)).css("background-color", color);

  for (i = 0; i < 9; i++) {

    $("#smallerSmall_" + row + "_" + i).css("background-color", color);
  }
  for (i = 0; i < 9; i++) {

    $("#smallerSmall_" + i + "_" + col).css("background-color", color);
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

  for (iDontLikeFor = 0; iDontLikeFor < 3; iDontLikeFor++) {
    for (jDontLikeFor = 0; jDontLikeFor < 3; jDontLikeFor++) {

      $("#smallerSmall_" + (startRow + iDontLikeFor) + "_" + (startCol + jDontLikeFor)).css("background-color", color);


    }
  }
}


function checkBox(row, col, matrix, number) {
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

  for (iDontLikeFor = 0; iDontLikeFor < 3; iDontLikeFor++) {
    for (jDontLikeFor = 0; jDontLikeFor < 3; jDontLikeFor++) {
      if (matrix[startRow + iDontLikeFor][startCol + jDontLikeFor] == number) {
        return true
      }
    }
  }
  return false
}
function checkRow(row, matrix, number) {
  // this function returns true if the same number as given is found in the given row
  for (iHateRows = 0; iHateRows < 9; iHateRows++) {
    if (matrix[row][iHateRows] == number) {
      return true;
    }
  }
  return false;
}

function checkCol(col, matrix, number) {
  // this function returns true if the same number as given is found in the given column
  for (iHateThis = 0; iHateThis < 9; iHateThis++) {
    if (matrix[iHateThis][col] == number) {
      return true;
    }
  }
  return false;
}

function checkSpot(row, column, matrix, number) {
  return !checkBox(row, column, matrix, number) && !checkRow(row, matrix, number) && !checkCol(column, matrix, number);
}

function solveBoard(board) {

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        for (let l = 1; l < 10; l++) {
          if (checkSpot(i, j, board, l)) {
            board[i][j] = l;
            updatedBoard[i][j] = l

            if (solveBoard(board)) {
              return true
            } else {
              board[i][j] = 0;
              updatedBoard[i][j] = 0;
            }
          }
        }

        return false
      }
    }
  }
  return true;
}

function putRandomNumsInBoard() {

  for (i = 0; i < board.length; i++) {
    for (j = 0; j < board[i].length; j++) {
      a = Math.round(Math.random() * 9);
      board[i][j] = a;
      updatedBoard[i][j] = a;
    }
  }

}
function scrambleBoard(board, num) {
  addAmount = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 3; j++) {

      searching = true;

      while (searching) {
        a = Math.round(Math.random() * 9);

        if (checkBox(j + addAmount, i, board, a) == false) {
          board[j + addAmount][i] = a;
          updatedBoard[j + addAmount][i] = a;
          searching = false;
        }
      }

    }
    if ((i + 1) % 3 == 0) {
      addAmount += 3
    }
  }
  (solveBoard(board))
  for (let i = 0; i < num; i++) {
    search = true;
    while (search) {
      searchRow = Math.round(Math.random() * 8);
      searchCol = Math.round(Math.random() * 8);

      if (mainBoard[searchRow][searchCol] != 0) {
        mainBoard[searchRow][searchCol] = 0;
        search = false;

      }

    }
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (mainBoard[i][j] != 0) {
        unChangeable[i][j] = 1;
      }
    }
  }

}

scrambleBoard(mainBoard, 12);
console.log(updatedBoard)
console.log("----")
console.log(mainBoard)
console.log("----")
console.log(unChangeable)
for (i = 1; i < 4; i++) {
  $("#grid").append("<div style='width:195px; margin:2px; margin-bottom:1px; height:195px; display:inline-block; background-color:none;' id='" + "smaller_" + i + "'> </div>");
}
let enterI = 1;
let row = 0;
let col = 0;
let topVal = 9;

for (i = 1; i < 82; i++) {

  col = 9 - Math.abs(topVal - i) - 1;
  //console.log(row, " ", col)

  smallContent = mainBoard[row][col]
  if (smallContent == 0) {
    smallContent = "<span style='color:none; visibility:hidden;'>0</span>";
  }
  seperationForShower = 6;
  content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box;' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>";

  if (row == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-bottom: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-top: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }

  if (row == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-bottom: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-top: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (col == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (col == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (col == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (col == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }

  if (row == 2 && col == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower + "px solid" + selectionColor +";border-bottom: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 2 && col == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower + "px solid" + selectionColor +";border-bottom: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 2 && col == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower + "px solid" + selectionColor +";border-bottom: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 2 && col == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower + "px solid" + selectionColor +";border-bottom: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"

  }

  if (row == 5 && col == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower + "px solid" + selectionColor +";border-bottom: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 5 && col == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower + "px solid" + selectionColor +";border-bottom: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"

  }
  if (row == 5 && col == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower + "px solid" + selectionColor +";border-bottom: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 5 && col == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + ";border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower + "px solid" + selectionColor +";border-bottom: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"

  }

  if (row == 6 && col == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower + "px solid" + selectionColor +";border-top: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 6 && col == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower + "px solid" + selectionColor +";border-top: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"

  }
  if (row == 6 && col == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower + "px solid" + selectionColor +";border-top: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 6 && col == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower + "px solid" + selectionColor +";border-top: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"

  }

  if (row == 3 && col == 5) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower + "px solid" + selectionColor +";border-top: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 3 && col == 6) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower + "px solid" + selectionColor +";border-top: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"

  }
  if (row == 3 && col == 2) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-right: " + seperationForShower + "px solid" + selectionColor +";border-top: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"
  }
  if (row == 3 && col == 3) {
    content = "<div class='smallBoi'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box; border-left: " + seperationForShower + "px solid" + selectionColor +";border-top: " + seperationForShower + "px solid" + selectionColor +";' id='" + "smallerSmall_" + row + "_" + col + "'> <h3 style='color:" + textCol + "; text-align:center;'>" + smallContent + "</h3> </div>"


  }
  $("#smaller_" + enterI).append(content)
  if (i % 3 == 0) {
    enterI++
  }

  if (i % 9 == 0) {
    enterI = 1;

  }

  if (i % 9 == 0) {
    row++;
    topVal += 9;
  }
}

for (i = 1; i < 10; i++) {
  content = "<div class='numberOptions'style='width:60px; margin:2px; margin-bottom:1px; height:60px; display:inline-block; background-color:" + backCol + "; border: 1px solid black; box-sizing:border-box;' id='" + "smallerSmall_" + i + "'> <h3 style='black:white; text-align:center;'>" + i + "</h3> </div>";
  $("#buttons").append(content);
}

let width = document.body.clientWidth;
if (width < 720) {
  $("#grid").css("height", "385px")
  $("#grid").css("width", "385px")
  $("#buttons").css("width", "385px")
  for (i = 1; i < 10; i++) {
    $("#smallerSmall_" + i).css("width", "35px")
    $("#smallerSmall_" + i).css("height", "35px")
    $("#smallerSmall_" + i + "> h3").css("margin-top", "4px");
  }

  for (i = 1; i < 4; i++) {
    $("#smaller_" + i).css("width", "118px")
  }
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      size = "35px"
      $("#smallerSmall_" + i + "_" + j + "> h3").css("margin-top", "4px");
      $("#smallerSmall_" + i + "_" + j).css("width", size);
      $("#smallerSmall_" + i + "_" + j).css("height", size);
    }
  }
}
$(".smallBoi").click(function() {
  
  info = $(this).attr("id").split("_");
  row = Number(info[1]);
  col = Number(info[2]);
  changeNumber = mainBoard[row][col];
  selectedRow = row;
  selectedCol = col;
  
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
        $("#smallerSmall_" + i + "_" + j).css("background-color", backCol);
    }
  }
  
  $("#smallerSmall_" + selectedRow + "_" + selectedCol).css("background-color", selectionColor);


})

$(".numberOptions").click(function() {
  info = $(this).attr("id").split("_");
  $("#buttons >").not(this).css("background-color", backCol);
  $(this).css("background-color", selectionColor);
  number = Number(info[1]);
  changeNumber = number;
  if (unChangeable[selectedRow][selectedCol] == 1) {
    return
  }
  if (selectedRow < 0 || selectedCol < 0) {
    return
  }

  if (notesMode == "off") {
    
  
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {

      $("#smallerSmall_" + i + "_" + j).css("background-color", backgroundColor);

    }
  }
  
  // <h3 style='color:"+ textCol+"; text-align:center;'>"+ smallContent +"</h3>
  
  if (unChangeable[selectedRow][selectedCol] == 0 && mainBoard[selectedRow][selectedCol] == changeNumber) {
    
    mainBoard[selectedRow][selectedCol] = 0;
    $("#smallerSmall_" + selectedRow + "_" + selectedCol).html("<h3 text-align:center;'><span style='visibility:hidden;'>0</span></h3>")
    return
  }


  
  if (unChangeable[selectedRow][selectedCol] == 0) {
    mainBoard[selectedRow][selectedCol] = changeNumber;
    $("#smallerSmall_" + selectedRow + "_" + selectedCol).html("<h3 style='color:" + placedTextCol + "; text-align:center;'>" + changeNumber + "</h3>")
  }
  
  $("#smallerSmall_" + selectedRow + "_" + selectedCol).css("background-color", selectionColor);
  } else {
    
    if (mainBoard[selectedRow][selectedCol] != 0) {
      return
    }
      
    if ($("#smallerSmall_" + selectedRow + "_" + selectedCol + ">").length == 9) {
        

      if (notesBoard[selectedRow][selectedCol][changeNumber-1] == 1) {
        $("#smallerSmall_" + selectedRow + "_" + selectedCol + " > #notesDiv" + changeNumber).html("")
        notesBoard[selectedRow][selectedCol][changeNumber-1] = 0;
      } else {
        $("#smallerSmall_" + selectedRow + "_" + selectedCol + " > #notesDiv" + changeNumber).html(changeNumber)
        notesBoard[selectedRow][selectedCol][changeNumber-1] = 1;
      }
          
          
        
        

        
      } else {
        console.log($("#smallerSmall_" + selectedRow + "_" + selectedCol + ">").length)
        content = ""
        $("#smallerSmall_" + selectedRow + "_" + selectedCol).css("vertical-align","top")
        
        
        
        
        for (let i =1; i < 10; i++) {
          
       smallContent = "<div id='notesDiv" +i + "' style='display:inline-block;margin:0px; width:33%; height:27%; text-align:center;  '> </div>"
          content += smallContent;
        }
        $("#smallerSmall_" + selectedRow + "_" + selectedCol).html(content)

        $("#smallerSmall_" + selectedRow + "_" + selectedCol + " > #notesDiv" + changeNumber).html(changeNumber)

        notesBoard[selectedRow][selectedCol][changeNumber-1] = 1;
      }
    }
    
  
  
})

$(window).resize(function() {
  width = document.body.clientWidth;
  if (width < 720) {
    $("#grid").css("width", "385px")
    $("#grid").css("height", "385px")
    $("#buttons").css("width", "385px")
    $("#buttons").css("height", "100px")

    for (i = 1; i < 10; i++) {
      $("#smallerSmall_" + i).css("width", "35px")
      $("#smallerSmall_" + i).css("height", "35px")
      $("#smallerSmall_" + i + "> h3").css("margin-top", "4px");
    }

    for (i = 1; i < 4; i++) {
      $("#smaller_" + i).css("width", "118px")
    }
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        size = "35px"
        $("#smallerSmall_" + i + "_" + j + "> h3").css("margin-top", "4px");
        $("#smallerSmall_" + i + "_" + j).css("width", size);
        $("#smallerSmall_" + i + "_" + j).css("height", size);
      }
    }

  } else {
    $("#grid").css("width", "600px")
    $("#grid").css("height", "600px")
    $("#buttons").css("height", "600px")
    $("#buttons").css("width", "100px")
    //$("#buttons").css("float","right")
    for (i = 1; i < 10; i++) {
      $("#smallerSmall_" + i).css("width", "60px")
      $("#smallerSmall_" + i).css("height", "60px")
      $("#smallerSmall_" + i + "> h3").css("margin-top", "18.72px");
    }
    for (i = 1; i < 4; i++) {
      $("#smaller_" + i).css("width", "195px")
    }
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        size = "60px"
        $("#smallerSmall_" + i + "_" + j + "> h3").css("margin-top", "18.72px");
        $("#smallerSmall_" + i + "_" + j).css("width", size);
        $("#smallerSmall_" + i + "_" + j).css("height", size);
      }
    }
  }
});




$(document).keypress(function(event) {
  key = event.which
  if (selectedRow < 0 || selectedCol < 0 || selectedRow > 8 || selectedCol > 8) {
    selectedRow = -4;
    selectedCol = -4;
    
    return
  }
  if (key === 13 || key === 32) {
    event.preventDefault();


    selectedCol++
    if (selectedCol > 8) {
      selectedCol = 0;
      selectedRow++;
    }

    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {

        if (unChangeable[i][j] == 0) {
          $("#smallerSmall_" + i + "_" + j).css("background-color", backCol);
          $("#smallerSmall_" + i + "_" + j).css("color", placedTextCol);
        } else if (unChangeable[i][j] == 1) {
          $("#smallerSmall_" + i + "_" + j).css("background-color", backCol);
        }

      }
    }

    changeNumber = mainBoard[selectedRow][selectedCol];


    $("#smallerSmall_" + selectedRow + "_" + selectedCol).css("background-color", selectedCol);
    return
  }

  a = String.fromCharCode(key);
  if (notesMode == "off") {
  if (a > 0 && a < 10) {

    /*
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {

        if (unChangeable[i][j] == 0) {
          $("#smallerSmall_" + i + "_" + j).css("background-color", backCol);
          $("#smallerSmall_" + i + "_" + j).css("color", placedTextCol);
        } else if (unChangeable[i][j] == 1) {
          $("#smallerSmall_" + i + "_" + j).css("background-color", backCol);
        }

      }
    }
    */

    if (unChangeable[selectedRow][selectedCol] == 0) {
      if (mainBoard[selectedRow][selectedCol] != a) {
    
      $("#smallerSmall_" + selectedRow + "_" + selectedCol).html("<h3 style=' color:" + placedTextCol + "; text-align:center;'>" + (a) + "</h3>");

      mainBoard[selectedRow][selectedCol] = a
      } else
      {
        
        $("#smallerSmall_" + selectedRow + "_" + selectedCol).html("<h3 style=' text-align:center;'><span style='visibility:hidden;'>0</span></h3>");
        mainBoard[selectedRow][selectedCol] = 0;
      

      
      }
      
    }
  }

  changeNumber = mainBoard[selectedRow][selectedCol];
  
  

  $("#smallerSmall_" + selectedRow + "_" + selectedCol).css("background-color", selectedCol);
  } else {
    if (mainBoard[selectedRow][selectedCol] == 0) {
      
      if ($("#smallerSmall_" + selectedRow + "_" + selectedCol + ">").length == 9) {
        changeNumber = a;

          if (notesBoard[selectedRow][selectedCol][changeNumber-1] == 1) {
            $("#smallerSmall_" + selectedRow + "_" + selectedCol + " > #notesDiv" + changeNumber).html("")
            notesBoard[selectedRow][selectedCol][changeNumber-1] = 0;
          } else {
            $("#smallerSmall_" + selectedRow + "_" + selectedCol + " > #notesDiv" + changeNumber).html(changeNumber)
            notesBoard[selectedRow][selectedCol][changeNumber-1] = 1;
          }
          
          
        
        

        
      } else {
        content = ""
        $("#smallerSmall_" + selectedRow + "_" + selectedCol).css("vertical-align","top")
        changeNumber = a;
        for (let i =1; i < 10; i++) {
       smallContent = "<div id='notesDiv" +i + "' style='display:inline-block;margin:0px; width:33%; height:27%; text-align:center;  '> </div>"
          content += smallContent;
        }
        $("#smallerSmall_" + selectedRow + "_" + selectedCol).html(content)
        $("#smallerSmall_" + selectedRow + "_" + selectedCol + " > #notesDiv" + changeNumber).html(changeNumber)
        notesBoard[selectedRow][selectedCol][changeNumber-1] = 1;
      }
    }
  }
});





$("#reset").click(function() {
  for (i = 0;i < 9; i++) {

    for (j =0; j< 9;j++) {
      mainBoard[i][j] = 0;
      unChangeable[i][j] = 0;
      updatedBoard[i][j] = 0;
    }
  }
  hard = $("#hard").val();
  scrambleBoard(mainBoard, Math.round(hard*10));
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      num = mainBoard[i][j];
      if (width < 620) {
        if (num == 0) {
          $("#smallerSmall_" + i + "_" + j).html("<h3 style='margin-top:4px; color:" + textCol + "; text-align:center;'><span style='visibility:hidden;'>0</span></h3>");
        } else {
          $("#smallerSmall_" + i + "_" + j).html("<h3 style='margin-top:4px; color:" + textCol + "; text-align:center;'>"+num+"</h3>")
        }
      } else {
        if (num == 0) {
          $("#smallerSmall_" + i + "_" + j).html("<h3 style=' color:" + textCol + "; text-align:center;'><span style='visibility:hidden;'>0</span></h3>");
        } else {
          $("#smallerSmall_" + i + "_" + j).html("<h3 style=' color:" + textCol + "; text-align:center;'>"+num+"</h3>");
        }
      }

    }
  }
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (unChangeable[i][j] == 0) {
        $("#smallerSmall_" + i + "_" + j).css("background-color", backCol);
        $("#smallerSmall_" + i + "_" + j).css("color", placedTextCol);
      } else if (unChangeable[i][j] == 1) {
        $("#smallerSmall_" + i + "_" + j).css("background-color", backCol);
      }

    }
  }
})


$("#notes").click(function(){
  if (notesMode == "off") {
    notesMode = "on";
    $("#notes>div").css("background-color","green")
    $("#notes>div>span").html("On")
  } else {
    notesMode = "off";
    $("#notes>div").css("background-color","")
    $("#notes>div>span").html("off")
  }
  
})

let possibilitiesForEach = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],

];
function average(array) {
  average = 0;
  for (let i = 0; i < array.length; i++) {
    average+= array[i];
  }
  
  return (average/array.length)
}
function difficulty() {
  listOfDif = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j<9;j++) {
      listOfFound = [];
      for (k = 1; k < 10;k++){
        a = !checkCol(j,mainBoard,k)
        b = !checkRow(i,mainBoard,k)
        c = !checkBox(i,j,mainBoard,k)
        length = 0;
        if( a && b && c){
          listOfFound.push(k)
          length++
        } else {
        }
      }
      possibilitiesForEach[i][j] = length
      listOfDif.push(listOfFound);
    }
  }
  counter = 0;
  average = 0;
  for (let i = 0; i < listOfDif.length;i++) {
    smallSum = 0;
    for (let j = 0 ; j< listOfDif[i].length; j++) {
      counter++
      smallSum++
    }
    average+=smallSum;
  }
  averagePerSquare = Math.round(( (average/listOfDif.length) + Number.EPSILON) * 100) / 100;
  return ({avg:averagePerSquare, counter:counter});
}


function getDifficultiesForEach(){
  eachItem = [];
  
  for (let i = 0; i < 15; i++) {
    console.log(i);
    averageForSmall = 0;
    averageCounterSmall = 0;
    timesToDo = 10;
    for (let j = 0; j < timesToDo; j++) {
      scrambleBoard(mainBoard,i)
      d = difficulty();
      averageForSmall+= d.avg;
      averageCounterSmall+=d.counter;
    }
    averageForSmall = averageForSmall/timesToDo;
    averageCounterSmall = averageCounterSmall/timesToDo;
    eachItem.push({averageOf:averageForSmall, counter:averageCounterSmall});
  }
  console.log(eachItem)
}

$(document).on('input', '#ranger', function() {
  $("#hard").val($("#ranger").val()/10)
})

$(document).on('input', '#hard', function() {
  $("#ranger").val($("#hard").val()*10)
})