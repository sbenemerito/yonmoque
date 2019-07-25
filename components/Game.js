import { Game as BGGame } from "boardgame.io/core";
import {
  blueValue,
  whiteValue,
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
    const neutralCell = {color: neutralValue, piece: null};
    const blueCell = {color: blueValue, piece: null};
    let tempRow = [ ...cellRow ];

    // Neutral tile for 4 corners of the board
    if (rowNumber === 0 || rowNumber === (rows - 1)) {
      tempRow[0] = tempRow[columns - 1] = neutralCell;
    }

    // Neutral tile for center tile
    if (rowNumber === center) {
      tempRow[center] = neutralCell;
    }

    // Blue tile, in a diamond shape
    const gapFromCenter = rowNumber > 2
                            ? 4 - rowNumber
                            : rowNumber === 2
                                ? 2
                                : rowNumber;
    tempRow[center - gapFromCenter] = tempRow[center + gapFromCenter] = blueCell;

    return tempRow;
  });

  console.log("Initial Game State", G, "Initial ctx", ctx);

  // Our game state is ready to go– return it!
  return G;
}

function CheckTile(rowNumber, columnNumber) {
  try {
    if(G.cells[rowNumber, columnNumber][1] === null) {
      return true;
    } else {
      return false;
    }
  } catch(err) {
    return false;
  }
}

function CanDiagonal(rowNumber, columnNumber, currentPlayer) {
  if((G.cells[rowNumber, columnNumber][0] === blueValue && currentPlayer === 0) || (G.cells[rowNumber, columnNumber][0] === whiteValue && currentPlayer === 1)) {
    return true;
  } else {
    return false;
  }
}

export function CheckMoves(rowNumber, columnNumber, currentPlayer) {
  const M = {
    moveAbleCells: [],
  };

  M.moveAbleCells.push({rowNumber, columnNumber});
  
  // Check vertical and horizontal sides
  if(CheckTile(rowNumber - 1, columnNumber)) {
    let currentRow = rowNumber - 1;
    M.moveAbleCells.push({currentRow, columnNumber});
  }
  if(CheckTile(rowNumber + 1, columnNumber)) {
    let currentRow = rowNumber + 1;
    M.moveAbleCells.push({currentRow, columnNumber});
  }
  if(CheckTile(rowNumber, columnNumber - 1)) {
    let currentColumn = columnNumber - 1;
    M.moveAbleCells.push({rowNumber, currentColumn});
  }
  if(CheckTile(rowNumber, columnNumber + 1)) {
    let currentColumn = columnNumber + 1;
    M.moveAbleCells.push({rowNumber, currentColumn});
  }

  // Check diagonal sides
  for(currentRow = rowNumber, currentColumn = columnNumber; CheckTile(currentRow, currentRow); currentRow -= 1, currentColumn -= 1) {
    M.moveAbleCells.push({currentRow, currentColumn});
    if(!CanDiagonal(rowNumber, columnNumber, currentPlayer)) {
      break;
    }
  }
  for(currentRow = rowNumber, currentColumn = columnNumber; CheckTile(currentRow, currentRow); currentRow -= 1, currentColumn += 1) {
    M.moveAbleCells.push({currentRow, currentColumn});
    if(!CanDiagonal(rowNumber, columnNumber, currentPlayer)) {
      break;
    }
  }
  for(currentRow = rowNumber, currentColumn = columnNumber; CheckTile(currentRow, currentRow); currentRow += 1, currentColumn -= 1) {
    M.moveAbleCells.push({currentRow, currentColumn});
    if(!CanDiagonal(rowNumber, columnNumber, currentPlayer)) {
      break;
    }
  }
  for(currentRow = rowNumber, currentColumn = columnNumber; CheckTile(currentRow, currentRow); currentRow += 1, currentColumn += 1) {
    M.moveAbleCells.push({currentRow, currentColumn});
    if(!CanDiagonal(rowNumber, columnNumber, currentPlayer)) {
      break;
    }
  }

  // Return the moveable coordinates
  return M;
}

const Game = BGGame({
  // The setup method is passed ctx
  setup: getInitialState,
  
  moves: { 
    // G and ctx are provided automatically when calling from App– `this.props.moves.movePiece(id)`
    addPiece: (G, ctx, rowNumber, columnNumber) => {
      if(G.player[ctx.currentPlayer].pieces != 0) {
        if(G.cells[rowNumber, columnNumber][1] === null) {
          G.cells[rowNumber, columnNumber][1] = ctx.currentPlayer;
          G.player[ctx.currentPlayer].pieces -= 1;
        }
      }
    },
    selectPiece: (G, ctx, rowNumber, columnNumber) => {
      if(G.cells[rowNumber, columnNumber][1] === ctx.currentPlayer) {
        CheckMoves(rowNumber, columnNumber, ctx.currentPlayer);
      }
    },
    movePiece: (G, ctx, rowNumber, columnNumber) => {
      if(M.moveAbleCells.includes({rowNumber, columnNumber})) {
        G.cells[rowNumber, columnNumber][1] = ctx.currentPlayer;
        M.moveAbleCells = [];
        //flip function
      }
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
