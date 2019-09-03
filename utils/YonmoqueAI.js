class YonmoqueAI {
  constructor(side, board, pieces=6) {
    this.side = side;
    this.board = board;
    this.pieces = pieces;
  }

  handleMove(board) {
    this.board = board;
    console.log('AI received new board state');
  }

  makeMove() {
    // assume only 'movePiece' can be made
    let movesList = ['movePiece'];
    let movablePieces = [];
    let opponentPieces = [];

    this.board.forEach((cell, index) => {
      if (cell.piece == this.side) {
        movablePieces.push(index);
      } else if (cell.piece !== null) {
        opponentPieces.push(index);
      }
    });

    // add 'addPiece' to moveList if AI still has pieces to place
    if (this.pieces > 0) movesList.push('addPiece');

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
          if ((cell-4) % 5 > 0 && rightCell <= 24 && this.board[rightCell].piece === null) emptyCells.push(rightCell);

          if (emptyCells.length > 0) {
            moveData.dest = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            return true;
          }

          return false;
        });
      }
    }

    console.log(moveData, 'AI made a move!');
    return moveData;
  }

  shuffleList(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
  }
}

export default YonmoqueAI;