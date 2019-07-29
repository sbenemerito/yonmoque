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
  G.players = Array(ctx.numPlayers).fill(null).map(() => ({ pieces: initialPieces }));

  // Set the game board, we can insert board mutations here (custom boards)
  G.cells = [ ...initialCells ];

  console.log("Initial Game State", G, "Initial ctx", ctx);

  // Our game state is ready to go– return it!
  return G;
}

function CheckTile(rowNumber, columnNumber) {
  try {
    if(G.cells[rowNumber, columnNumber].piece === null) {
      return true;
    } else {
      return false;
    }
  } catch(err) {
    return false;
  }
}

function CanDiagonal(rowNumber, columnNumber, currentPlayer) {
  if((G.cells[rowNumber, columnNumber].color === blueValue && currentPlayer === 0) || (G.cells[rowNumber, columnNumber].color === whiteValue && currentPlayer === 1)) {
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
      if(G.players[ctx.currentPlayer].pieces != 0) {
        if (G.cells[rowNumber, columnNumber].piece === null) {
          G.cells[rowNumber, columnNumber].piece = ctx.currentPlayer;
          G.players[ctx.currentPlayer].pieces -= 1;
        }
      }
    },
    selectPiece: (G, ctx, rowNumber, columnNumber) => {
      if(G.cells[rowNumber, columnNumber].piece === ctx.currentPlayer) {
        CheckMoves(rowNumber, columnNumber, ctx.currentPlayer);
      }
    },
    movePiece: (G, ctx, rowNumber, columnNumber) => {
      if(M.moveAbleCells.includes({rowNumber, columnNumber})) {
        G.cells[rowNumber, columnNumber].piece = ctx.currentPlayer;
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
