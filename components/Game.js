import { Game as BGGame } from "boardgame.io/core";
import {
  blueValue,
  center,
  columns,
  initialCells,
  initialPieces,
  neutralValue,
  rows,
} from "./constants/board";

export function getInitialState(ctx) {
  const G = {
    cells: [],
    players: {},
  };

  // Set up the game state for each player
  G.players = Array(ctx.numPlayers).fill(null).map((_, index) => { pieces: initialPieces });

  // Fill the game board
  G.cells = initialCells.map((cellRow, rowNumber) => {
    let tempRow = [ ...cellRow ];

    // Neutral tile for 4 corners of the board
    if (rowNumber === 0 || rowNumber === (rows - 1)) {
      tempRow[0] = tempRow[columns - 1] = [neutralValue, null];
    }

    // Neutral tile for center tile
    if (rowNumber === center) {
      tempRow[center] = [neutralValue, null];
    }

    // Blue tile, in a diamond shape
    const gapFromCenter = rowNumber > 2
                            ? 4 - rowNumber
                            : rowNumber === 2
                                ? 2
                                : rowNumber;
    tempRow[center - gapFromCenter] = tempRow[center + gapFromCenter] = [blueValue, null];

    return tempRow;
  });

  console.log("Initial Game State", G, "Initial ctx", ctx);

  // Our game state is ready to go– return it!
  return G;
}

const Game = BGGame({
  // The setup method is passed ctx
  setup: getInitialState,

  moves: {
    // G and ctx are provided automatically when calling from App– `this.props.moves.movePiece(id)`

    addPiece: (G, ctx, id) => {
      // Check if there are pieces left, or tile is empty here, and update game state (board)
      console.log('addPiece right here');
    },
    movePiece: (G, ctx, id) => {
      // Check legal moves here, and update game state (board)
      console.log('movePiece right here');
    },
  },

  flow: {
    endGameIf: (G, ctx) => {
      // Put winning condition here, return player key.
      // Temporarily win when opponent is out of pieces
      const winner = Object.keys(G.players).reduce(
        (previousPlayer, currentPlayer) =>
          G.players[previousPlayer].pieces === 0
            ? currentPlayer
            : previousPlayer
      );

      return winner;
    },
    movesPerTurn: 1,
  },
});

export default Game;
