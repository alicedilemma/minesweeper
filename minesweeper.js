document.addEventListener('DOMContentLoaded', startGame)

var difficultyButtons = document.querySelector('.difficulty');
difficultyButtons.addEventListener('click', function (event) {
  var buttonClicked = event.target;
  checkDifficulty(buttonClicked.className);
  startGame();
});

var resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', startGame);

function checkDifficulty(difficulty) {
  switch (difficulty) {
    case 'easy':
      console.log('easy');
      rows = 4;

      break;
    case 'medium':
      console.log('medium');
      rows = 5;

      break;
    case 'hard':
      console.log('hard');
      rows = 6;

      break;

  }
}

var difficulty = 'medium';
checkDifficulty(difficulty);

function setupBoard() {
  //empty cells array
  var board = {
    cells: []
  };
  //create cellls
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      board.cells.push({ row: i + 1, col: j + 1 });
    }
  }
  board.cells.forEach(function (cell) {
    cell.hidden = true;
    cell.isMarked = false;
    if (Math.random() >= 0.9) {
      cell.isMine = true;
    } else {
      cell.isMine = false;
    }
  });
  console.log(board.cells);
  return board;
}


function startGame() {
  board = setupBoard();

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  for (var i = 0; i < board.cells.length; i++) {
    surroundingMines =
      board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  console.log(board.cells);

  document.querySelector('.board').innerHTML = '';
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

  for (var i = 0; i < board.cells.length; i++) {
    var cell = board.cells[i];
    if (cell.isMine && !cell.isMarked) {
      return;
    } else if (!cell.isMine && cell.hidden) {
      return;
    }
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')

}


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var surroundingCells = getSurroundingCells(cell.row, cell.col);
  var mineCount = 0;
  surroundingCells.forEach(function (cell) {
    if (cell.isMine === true) {
      mineCount++;
    }
  });
  return mineCount;
}



