import {
  blueValue,
  whiteValue
} from "../components/constants/board";


class YonmoqueAI {
  constructor(side, board, pieces=6) {
    this.side = side;
    this.board = board;
    this.pieces = pieces;
  }

  handleMove(board) {
    this.board = board;
  }

  makeMove() {
    // assume only 'movePiece' can be made
    let movesList = [];
    let movablePieces = [];
    let opponentPieces = [];
    let nextMove = [];

    this.board.forEach((cell, index) => {
      if (cell.piece == this.side) {
        movablePieces.push(index);
      } else if (cell.piece !== null) {
        opponentPieces.push(index);
      }
    });

    console.log(opponentPieces);
    // check winning piece of opponent
    if (opponentPieces.length >= 3) nextMove = this.checkWinning(movablePieces, opponentPieces);
    console.log(nextMove)
    console.log(nextMove.length)
    if (nextMove && nextMove.length == 1) movesList.push('addPiece');
    // priorty 'movePiece' if AI has pieces placed
    else if (nextMove && nextMove.length == 2 || movablePieces.length > 0) movesList.push('movePiece');
    // add 'addPiece' to movesList if AI still has pieces to place
    else if (this.pieces > 0) movesList.push('addPiece');

    let moveData = {
      type: movesList[0],
      src: null,
      dest: null
    };

    if (moveData.type === 'addPiece') {
      if (nextMove && nextMove.length == 1) {
        moveData.dest = nextMove[0];
        //return true;
      } else {
        this.addPiece(opponentPieces, moveData);
      }
    } else {
      if (nextMove && nextMove.length >= 2) {
        moveData.scr = nextMove[0];
        moveData.dest = nextMove[1];
        //return true;

      } else { //last option: move random
        const shuffledPieces = this.shuffleList(movablePieces);
        shuffledPieces.some((cell) => {
          const movableCells = this.checkMovables(cell);

          if (movableCells.length > 0) {
            moveData.src = cell;
            moveData.dest = movableCells[Math.floor(Math.random() * movableCells.length)];
            return true;
          }
          return false;
        });
      }
    }
    console.log(moveData);
    return moveData;
  }

  checkWinning(movablePiece, opponentPieces) {
    for(let i = 0; i < opponentPieces.length - 2; i++){

      let horizontalId = this.checkHorizontal(i, opponentPieces);
      let verticalId = this.checkVertical(i, opponentPieces);
      let diagLeftId = this.checkDiagLeft(i, opponentPieces);
      let diagRightId = this.checkDiagRight(i, opponentPieces);

      if(horizontalId != 0 && movablePiece.includes(horizontalId) != true) {
        return this.findMovableId(movablePiece, horizontalId);
      } else if (verticalId != 0 && movablePiece.includes(verticalId) != true){
        return this.findMovableId(movablePiece, verticalId);
      } else if (diagLeftId != 0 && movablePiece.includes(diagLeftId) != true){
        return this.findMovableId(movablePiece, diagLeftId);
      } else if (diagRightId != 0 && movablePiece.includes(diagRightId) != true){
        return this.findMovableId(movablePiece, diagRightId);
      } else {
        return [];
      }
    }
  }

  findMovableId(movablePiece, id) {
    let nextMove = [];

    //goal is to get pieces that can be moved to a given tile
    for (let i = 0; i < movablePiece.length; i++) {
      temp = this.checkMovables(movablePiece[i]);
      if (temp.includes(id)) { // if there's movable
        nextMove.push(i, id);
      } else { // else add piece to block
        nextMove.push(id);
      }
    }
    return nextMove;
  }

  checkHorizontal(i, opponentPieces) {
    let id = 0;
    let sum = (opponentPieces[i] - opponentPieces[i + 1]) + opponentPieces[i + 2];
    if(sum == opponentPieces[i + 1] && (opponentPieces[i + 2] + 1 % 5) == 0){
      id = opponentPieces[i] - 1;
    } else if (sum == opponentPieces[i + 1]) {
      id = opponentPieces[i] + 3;
    }

    return id;
  }

  checkVertical (i, opponentPieces) {
    let id = 0;
    if(opponentPieces.includes(opponentPieces[i] + 5) 
      && opponentPieces.includes(opponentPieces[i] + 10)
      && opponentPieces[i] >= 5){
      id = opponentPieces[i] - 5;
    } else if (opponentPieces.includes(opponentPieces[i] + 5) 
      && opponentPieces.includes(opponentPieces[i] + 10)) {
      id = opponentPieces[i] + 15;
    }
    return id;
  }

  checkDiagLeft (i, opponentPieces) {
    let id = 0;
    if(opponentPieces.includes(opponentPieces[i] + 4) 
      && opponentPieces.includes(opponentPieces[i] + 8)
      && opponentPieces[i] >= 8){
      id = opponentPieces[i] - 4;
    } else if (opponentPieces.includes(opponentPieces[i] + 4) 
      && opponentPieces.includes(opponentPieces[i] + 8)) {
      id = opponentPieces[i] + 12;
    }
    return id;
  }

  checkDiagRight (i, opponentPieces) {
    let id = 0;
    if(opponentPieces.includes(opponentPieces[i] + 6) 
      && opponentPieces.includes(opponentPieces[i] + 12)
      && opponentPieces[i] >= 6){
      id = opponentPieces[i] - 6;
    } else if (opponentPieces.includes(opponentPieces[i] + 6) 
      && opponentPieces.includes(opponentPieces[i] + 12)) {
      id = opponentPieces[i] + 18;
    }
    return id;
  }

  addPiece(opponentPieces, moveData) {
    // if opponent has no piece in the board yet, add a piece in a random cell
    if (opponentPieces.length === 0) moveData.dest = Math.floor(Math.random() * this.board.length);
    else {
      // add a piece near one of opponent's pieces
      const shuffledPieces = this.shuffleList(opponentPieces);
      shuffledPieces.some((cell) => {
        let emptyCells = [];

        // top
        const topCell = cell - 5;
        if (topCell >= 0 && this.board[topCell].piece === null) emptyCells.push(topCell);

        // left
        const leftCell = cell - 1;
        if (cell % 5 > 0 && leftCell >= 0 && this.board[leftCell].piece === null) emptyCells.push(leftCell);

        // bottom
        const bottomCell = cell + 5;
        if (cell < 20 && bottomCell <= 24 && this.board[bottomCell].piece === null) emptyCells.push(bottomCell);

        // right
        const rightCell = cell + 1;
        if ((cell - 4) % 5 > 0 && rightCell <= 24 && this.board[rightCell].piece === null) emptyCells.push(rightCell);

        if (emptyCells.length > 0) {
          moveData.dest = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          return true;
        }

        return false;
      });
    }
  }

  shuffleList(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
  }

  checkMovables(cell) {
    const passableTile = this.side === 0 ? blueValue : whiteValue;
    let movableCells = [];

    // top
    const topCell = cell - 5;
    if (topCell >= 0 && this.board[topCell].piece === null) movableCells.push(topCell);

    // left
    const leftCell = cell - 1;
    if (cell % 5 > 0 && leftCell >= 0 && this.board[leftCell].piece === null) movableCells.push(leftCell);

    // bottom
    const bottomCell = cell + 5;
    if (cell < 20 && bottomCell <= 24 && this.board[bottomCell].piece === null) movableCells.push(bottomCell);

    // right
    const rightCell = cell + 1;
    if ((cell - 4) % 5 > 0 && rightCell <= 24 && this.board[rightCell].piece === null) movableCells.push(rightCell);

    // top-left
    let diagonalTL = cell - 6;
    while (cell % 5 > 0 && diagonalTL >= 0 && this.board[diagonalTL].piece === null) {
      if (this.board[diagonalTL].color === passableTile) movableCells.push(diagonalTL);
      diagonalTL -= 6;
    }

    // top-right
    let diagonalTR = cell - 4;
    while (diagonalTR % 5 > 0 && diagonalTR >= 0 && this.board[diagonalTR].piece === null) {
      if (this.board[diagonalTR].color === passableTile) movableCells.push(diagonalTR);
      diagonalTR -= 4;
    }

    // bottom-left
    let diagonalBL = cell + 4;
    while (cell % 5 > 0 && diagonalBL < 24 && this.board[diagonalBL].piece === null) {
      if (this.board[diagonalBL].color === passableTile) movableCells.push(diagonalBL);
      if (diagonalBL % 5 === 0) break;
      diagonalBL += 4;
    }

    // bottom-right
    let diagonalBR = cell + 6;
    while ((cell-4) % 5 > 0 && diagonalBR <= 24 && this.board[diagonalBR].piece === null) {
      if (this.board[diagonalBR].color === passableTile) movableCells.push(diagonalBR);
      if ((diagonalBR - 4) % 5 === 0) break;
      diagonalBR += 6;
    }

    return movableCells;
  }
}

export default YonmoqueAI;