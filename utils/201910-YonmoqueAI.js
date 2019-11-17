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

    this.board.forEach((cell, index) => {
      if (cell.piece == this.side) {
        movablePieces.push(index);
      } else if (cell.piece !== null) {
        opponentPieces.push(index);
      }
    });

    // add 'addPiece' to movesList if AI still has pieces to place
    if (this.pieces > 0) movesList.push('addPiece');
    // add 'movePiece' to movesList if AI has pieces placed
    if (movablePieces.length > 0) movesList.push('movePiece');

    // AI just randomly decides what to do
    let moveData = {
      type: movesList[Math.floor(Math.random() * movesList.length)],
      src: null,
      dest: null
    };

    if (moveData.type === 'addPiece') {
      // if opponent has no piece in the board yet, add a piece in a random cell
      if (opponentPieces.length === 0) moveData.dest = Math.floor(Math.random() * this.board.length);
      else {
        // add a piece near one of opponent's pieces
        console.log(this.checkPossibleWin())
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
    } else {
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

    return moveData;
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