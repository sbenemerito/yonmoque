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
    console.log('AI made a move!');
  }
}

export default YonmoqueAI;