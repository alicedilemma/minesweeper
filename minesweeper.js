document.addEventListener('DOMContentLoaded', startGame)

//initialise board size
var difficulty = 'medium';

//buttons to change board size
var difficultyButtons = document.querySelector('.difficulty');
difficultyButtons.addEventListener('click', function (event) {
  var buttonClicked = event.target;
  difficulty = buttonClicked.className;
  startGame();
});

//button to reset board
var resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', startGame);

function checkDifficulty(difficulty) {
  switch (difficulty) {
    case 'easy':
      //console.log('easy');
      rows = 4;
      break;
    case 'medium':
      //console.log('medium');
      rows = 5;
      break;
    case 'hard':
      //console.log('hard');
      rows = 6;
      break;
  }
}

function setupBoard() {
  //create empty cells array
  var board = {
    cells: []
  };
  //create cellls - note that the board is always square so rows = cols
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      board.cells.push({ row: i + 1, col: j + 1 });
    }
  }
  board.cells.forEach(function (cell) {
    cell.hidden = true;
    cell.isMarked = false;
    if (Math.random() >= 0.8) {
      cell.isMine = true;
    } else {
      cell.isMine = false;
    }
  });
  //console.log(board.cells);
  return board;
}

function startGame() {
  checkDifficulty(difficulty);
  board = setupBoard();

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  //console.log(board.cells);

  //clear out the old board before re-creating
  document.querySelector('.board').innerHTML = '';
  lib.initBoard()
}

function checkForWin() {
  for (var i = 0; i < board.cells.length; i++) {
    var cell = board.cells[i];
    //check that all mines are marked
    if (cell.isMine && !cell.isMarked) {
      return;
    //check that all non-mines are no longer hidden
    } else if (!cell.isMine && cell.hidden) {
      return;
    }
  }
  var audioWin = document.querySelector(".audioWin");
  audioWin.play();
  lib.displayMessage('You win!')
}

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