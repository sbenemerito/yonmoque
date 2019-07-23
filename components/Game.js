import { Game as BGGame } from "boardgame.io/core";
import {
  cells as initialCells, center, columns, rows, initialPieces,
  whiteValue, blueValue, neutralValue,
} from "./constants/board";

export function getInitialState(ctx) {
  const G = {
    cells: [],
    players: {},
  };

  // Set up the game state for each player
  G.players = Array(ctx.numPlayers).fill(null).map((_, index) => { pieces: initialPieces });

  // Fill the game board
  G.cells = initialCells;

  // Set the color markings on the board
  G.cells = G.cells.map((cellRow, rowNumber) => {
    let tempCellRow = cellRow;

    // Neutral tile for 4 corners of the board
    if (rowNumber === 0 || rowNumber === (rows - 1)) {
      tempCellRow[0] = tempCellRow[columns-1] = neutralValue;
    }

    // Neutral tile for center tile
    if (rowNumber === center) {
      tempCellRow[center] = neutralValue;
    }

    // Blue tile, in a diamond shape
    const gapFromCenter = rowNumber > 2 ? rowNumber - 2 : rowNumber;
    tempCellRow[center - gapFromCenter] = tempCellRow[center + gapFromCenter] = blueValue;

    return tempCellRow;
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
