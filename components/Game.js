import { Game as BGGame } from "boardgame.io/core";
import {
  blueValue,
  whiteValue,
  initialCells,
  initialPieces,
  neutralValue,
} from "./constants/board";


export function getInitialState(ctx) {
  const G = {
    cells: [],
    players: {},
    moveAbleCells: [],
    canFlipCells: [],
    selectedCell: []
  };

  // Set up the game state for each player
  G.players = Array(ctx.numPlayers).fill(null).map(() => ({ pieces: initialPieces }));

  // Set the game board, we can insert board mutations here (custom boards)
  G.cells = [...initialCells];

  // Our game state is ready to go– return it!
  return G;
}

function CheckTile(id, G) {
  try {
    if (G.cells[id].piece === null) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

function CanDiagonal(id, currentPlayer, G) {
  if ((G.cells[id].color === blueValue && currentPlayer === '0') || (G.cells[id].color === whiteValue && currentPlayer === '1')) {
    return true;
  } else {
    return false;
  }
}

function CheckMoves(id, currentPlayer, G) {
  // Check vertical and horizontal sides
  if (CheckTile(id - 5, G)) {
    let currentID = id - 5;
    G.moveAbleCells.push(currentID);
  }
  if (CheckTile(id + 5, G)) {
    let currentID = id + 5;
    G.moveAbleCells.push(currentID);
  }
  if (id % 5 !== 0) {
    if (CheckTile(id - 1, G)) {
      let currentID = id - 1;
      G.moveAbleCells.push(currentID);
    }
  }
  if ((id + 1) % 5 !== 0) {
    if (CheckTile(id + 1, G)) {
      let currentID = id + 1;
      G.moveAbleCells.push(currentID);
    }
  }

  // Check left side diagonal
  if (id % 5 !== 0) {
    for (currentID = id - 6; CheckTile(currentID, G); currentID -= 6) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || currentID % 5 === 0 || G.cells[currentID].color === neutralValue) {
        break;
      }
    }
    for (currentID = id + 4; CheckTile(currentID, G); currentID += 4) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || currentID % 5 === 0 || G.cells[currentID].color === neutralValue) {
        break;
      }
    }
  }

  // Check right side diagonal
  if ((id + 1) % 5 !== 0) {
    for (currentID = id - 4; CheckTile(currentID, G); currentID -= 4) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || (currentID + 1) % 5 === 0 || G.cells[currentID].color === neutralValue) {
        break;
      }
    }
    for (currentID = id + 6; CheckTile(currentID, G); currentID += 6) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || (currentID + 1) % 5 === 0 || G.cells[currentID].color === neutralValue) {
        break;
      }
    }
  }
}

function flippableCells(id, currentPlayer, G) {
  let tempCells = [];

  // flip left direction
  for (i = id - 1; true; i--) {
    try {
      if (G.cells[i].piece === null) {
        break;
      }
      else if (currentPlayer != G.cells[i].piece) {
        tempCells.push(i);
      }
      else if (tempCells.length > 0) {
        G.canFlipCells.push(tempCells);
        break;
      }
    } catch (err) {
      break;
    }
    if (i % 5 == 0) {
      break;
    }
  }

  tempCells = [];

  // flip right direction
  for (i = id + 1; true; i++) {
    try {
      if (G.cells[i].piece === null) {
        break;
      }
      else if (currentPlayer != G.cells[i].piece) {
        tempCells.push(i);
      }
      else if (tempCells.length > 0) {
        G.canFlipCells.push(tempCells);
        break;
      }
    } catch (err) {
      break;
    }
    if ((i + 1) % 5 == 0) {
      break;
    }
  }

  tempCells = [];

  // flip up direction
  for (i = id - 5; i >= 0; i -= 5) {
    try {
      if (G.cells[i].piece === null) {
        break;
      }
      else if (currentPlayer != G.cells[i].piece) {
        tempCells.push(i);
      }
      else if (tempCells.length > 0) {
        G.canFlipCells.push(tempCells);
        break;
      }
    } catch (err) {
      break;
    }
  }

  tempCells = [];

  // flip down direction
  for (i = id + 5; i <= 24; i += 5) {
    try {
      if (G.cells[i].piece === null) {
        break;
      }
      else if (currentPlayer != G.cells[i].piece) {
        tempCells.push(i);
      }
      else if (tempCells.length > 0) {
        G.canFlipCells.push(tempCells);
        break;
      }
    } catch (err) {
      break;
    }
  }

  tempCells = [];

  // flip diagonal left up
  for (i = id - 6; true; i -= 6) {
    try {
      if (G.cells[i].piece === null) {
        break;
      }
      else if (currentPlayer != G.cells[i].piece) {
        tempCells.push(i);
      }
      else if (tempCells.length > 0) {
        G.canFlipCells.push(tempCells);
        break;
      }
    } catch (err) {
      break;
    }
    if (i % 5 == 0) {
      break;
    }
  }

  tempCells = [];

  // flip diagonal right up
  for (i = id - 4; true; i -= 4) {
    try {
      if (G.cells[i].piece === null) {
        break;
      }
      else if (currentPlayer != G.cells[i].piece) {
        tempCells.push(i);
      }
      else if (tempCells.length > 0) {
        G.canFlipCells.push(tempCells);
        break;
      }
    } catch (err) {
      break;
    }
    if ((i + 1) % 5 == 0) {
      break;
    }
  }

  tempCells = [];

  // flip diagonal left down
  for (i = id + 4; true; i += 4) {
    try {
      if (G.cells[i].piece === null) {
        break;
      }
      else if (currentPlayer != G.cells[i].piece) {
        tempCells.push(i);
      }
      else if (tempCells.length > 0) {
        G.canFlipCells.push(tempCells);
        break;
      }
    } catch (err) {
      break;
    }
    if (i % 5 == 0) {
      break;
    }
  }

  tempCells = [];

  // flip diagonal right down
  for (i = id + 6; true; i += 6) {
    try {
      if (G.cells[i].piece === null) {
        break;
      }
      else if (currentPlayer != G.cells[i].piece) {
        tempCells.push(i);
      }
      else if (tempCells.length > 0) {
        G.canFlipCells.push(tempCells);
        break;
      }
    } catch (err) {
      break;
    }
    if ((i + 1) % 5 == 0) {
      break;
    }
  }

  tempCells = [];
}

function flipCells(currentPlayer, G) {
  for (i = 0; i < G.canFlipCells.length; i += 1) {
    let currentArray = G.canFlipCells[i];
    for (j = 0; j < currentArray.length; j += 1) {
      G.cells[currentArray[j]].piece = currentPlayer;
    }
  }
}

const Game = BGGame({
  // The setup method is passed ctx
  setup: getInitialState,

  moves: {
    // G and ctx are provided automatically when calling from App– `this.props.moves.movePiece(id)`
    addPiece: (G, ctx, id) => {
      G.moveAbleCells = [];
      G.selectedCell = null;
      if (G.players[ctx.currentPlayer].pieces != 0) {
        if (G.cells[id].piece === null) {
          G.cells[id].piece = ctx.currentPlayer;
          G.players[ctx.currentPlayer].pieces -= 1;
        }
      }
      G.cells[id].piece = ctx.currentPlayer;
      G.players[ctx.currentPlayer].pieces -= 1;
    },
    selectPiece: (G, ctx, id) => {
      G.selectedCell = id;
      CheckMoves(id, ctx.currentPlayer, G);
    },
    movePiece: (G, ctx, id) => {
      G.cells[G.selectedCell].piece = null;
      G.cells[id].piece = ctx.currentPlayer;
      flippableCells(id, ctx.currentPlayer, G);
      flipCells(ctx.currentPlayer, G);
    },
    resetVars: (G) => {
      G.canFlipCells = [];
      G.moveAbleCells = [];
      G.selectedCell = null;
    }
  },

  flow: {
    endGameIf: (G, ctx) => {
      // Put winning condition here, return player key.

    },
  },
});

export default Game;
