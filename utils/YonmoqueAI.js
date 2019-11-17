import {
  blueValue,
  whiteValue
} from "../components/constants/board";


class YonmoqueAI {
  constructor(side, board, pieces = 6) {
    this.side = side;
    this.board = board;
    this.pieces = pieces;
  }

  handleMove(board) {
    this.board = board;
  }

  makeMove() {
    let nextMove = [];
    const winningMove = this.checkWinningMove();

    let moveData = {
      type: 'checkMove', //ask samu
      src: null,
      dest: null
    };

    if (moveData.type === 'checkMove') {
      if(winningMove.length !== 0) {
        moveData.type = 'movePiece';
        moveData.scr = winningMove[0];
        moveData.dest = winningMove[1];
      } else moveData = this.moveRandom();
    }

    return moveData;
  }

  checkWinningMove() {
    let store = [];
    let createNextMove = [];
    
    // check horizontal
    for(let i = 0; i <= 20; i+5) {
      for(let j = i; (j+1) % 5 !== 0; j++) {
        alert(j)
        //if (this.board[j].piece !== null) store.push(this.board[j].piece)
        //if (store.length !== 0) store = this.checkFrequency(store);
      }
      if (store.length !== 0) {
        for(let k = 0; k <= store.length - 1; k++)
          if(store[k].id - store[k-1].id != 1) 
            createNextMove = this.findPiece(store[k+1].id, store[store.length - 1])
      }
    }

    store = [];

    //check vertical
  //   for(let i = 0; i <= 4; i+5) {
  //     for(let j = i; (j+1) % 5 !== 0; j+5) {
  //       alert(j)
  //       if (this.board[j].piece !== null) store.push(this.board[j])
  //       if (store.length !== 0) store = this.checkFrequency(store);
  //     }
  //     if (store.length !== 0) {
  //       for(let k = 0; k <= store.length - 1; k++)
  //         if(store[k].id - store[k-1].id != 1) 
  //           createNextMove = this.findPiece(store[k+1].id, store[store.length - 1])
  //     }
  //   }
    
  //  return createNextMove;
  }

  getFlipMove() {
    // check horizontal
    for(let i = 0; i <= 20; i+5) {
      for(let j = i; (j+1) % 5 == 0; i++) {
        if (this.board[j].piece == this.board[j + 1].piece)
          return this.findPiece(store[j+2], this.board[j].color)
      }
    }

    //check vertical
    for(let i = 0; i <= 4; i++) {
      for(let j = i; j < 20; i+5) {
        if (this.board[j].piece == this.board[j + 1].piece)
          return this.findPiece(store[j+2], this.board[j].color)
      }
    }
  }

  checkFrequency(arr) { // get win possibility
    let counter = 0;
    let maxValue = 3;
    let store = [];
    let AIColor;

    //determine what color is AI
    if (this.side == 1) AIColor = 0;
    else AIColor = 1;

    for (let i = 0; i < arr.length; i++){
      for (let j = i; j < arr.length; j++) {
        if (arr[i].piece == arr[j].piece) {
          counter++;
          store.push(arr[j]);
        }
        if (maxValue == counter) {
          store.push(AIColor);
          return store;
        }
      }
      counter = 0; //reset counter
      store = []; //reset array
    }

    return store;
  }

  findPiece(id, color) {
    //goal is to get pieces that can be moved to a given tile
    let nextMove = [];
    let temp = [];

    for (let i = 0; i < 25; i++) {
      if (this.board[i].piece !== null && this.board[i].piece == color) {
        temp = this.checkMovables(i);
        if (temp.includes(id)) {
          nextMove.push(i, id);
          return nextMove;
        }
      }
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
    while ((cell - 4) % 5 > 0 && diagonalBR <= 24 && this.board[diagonalBR].piece === null) {
      if (this.board[diagonalBR].color === passableTile) movableCells.push(diagonalBR);
      if ((diagonalBR - 4) % 5 === 0) break;
      diagonalBR += 6;
    }

    return movableCells;
  }

  moveRandom() {
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
    console.log(this.side);
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
            moveData.type = 'addPiece';
            moveData.src = null;
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
          moveData.type = 'movePiece';
          moveData.src = cell;
          moveData.dest = movableCells[Math.floor(Math.random() * movableCells.length)];
          return true;
        }

        return false;
      });
    }

    return moveData;
  }
}

export default YonmoqueAI;