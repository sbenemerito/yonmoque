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
  G.cells = [ ...initialCells ];

  // Our game state is ready to go– return it!
  return G;
}

function CheckTile(id, G) {
  try {
    if(G.cells[id].piece === null) {
      return true;
    } else {
      return false;
    }
  } catch(err) {
    return false;
  }
}

function CanDiagonal(id, currentPlayer, G) {
  if((G.cells[id].color === blueValue && currentPlayer === '0') || (G.cells[id].color === whiteValue && currentPlayer === '1')) {
    return true;
  } else {
    return false;
  }
}

function CheckMoves(id, currentPlayer, G) {
    // Check vertical and horizontal sides
  if(CheckTile(id - 5, G)) {
    let currentID = id - 5;
    G.moveAbleCells.push(currentID);
  }
  if(CheckTile(id + 5, G)) {
    let currentID = id + 5;
    G.moveAbleCells.push(currentID);
  }
  if(id % 5 !== 0) {
    if(CheckTile(id - 1, G)) {
      let currentID = id - 1;
      G.moveAbleCells.push(currentID);
    }
  }
  if((id + 1) % 5 !== 0) {
    if(CheckTile(id + 1, G)) {
      let currentID = id + 1;
      G.moveAbleCells.push(currentID);
    }
  }

  // Check left side diagonal
  if(id % 5 !== 0) {
    for(currentID = id - 6; CheckTile(currentID, G); currentID -= 6) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || currentID % 5 === 0) {
        break;
      }
    }
    for(currentID = id + 4; CheckTile(currentID, G); currentID += 4) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || currentID % 5 === 0) {
        break;
      }
    }
  }

  // Check right side diagonal
  if((id + 1) % 5 !== 0) {
    for(currentID = id - 4; CheckTile(currentID, G); currentID -= 4) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || (currentID + 1) % 5 === 0) {
        break;
      }
    }
    for(currentID = id + 6; CheckTile(currentID, G); currentID += 6) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || (currentID + 1) % 5 === 0) {
        break;
      }
    }
  }
}

function flipLeft(id, currentPlayer, G) {
  for (i = id - 1; i % 5 == 0; i--) {
    if (G.cells[i].piece === null) {
      G.canFlipCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      G.canFlipCells.push(i);
    }
    else {
      break;
    }
  }
}

function flipRight(id, currentPlayer, G) {
  
  for (i = id + 1; (i + 1) % 5 === 0; i++) {
    if (G.cells[i].piece === null) {
      G.canFlipCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      G.canFlipCells.push(i);
      
    }
    else {
      break;
    }
  }
}

function flipUp(id, currentPlayer, G) {
  for (i = id - 5; i >= 0; i-=5) {
    if (G.cells[i].piece === null) {
      G.canFlipCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      G.canFlipCells.push(i);
    }
    else {
      break;
    }
  }
}

function flipDown(id, currentPlayer, G) {
  for (i = id + 5; i <= 24; i += 5) {
    if (G.cells[i].piece === null) {
      G.canFlipCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      G.canFlipCells.push(i);
    }
    else {
      break;
    }
  }
}

function flipUpLeft(id, currentPlayer, G) {
  for (i = id - 6; i % 5 == 0; i -= 6) {
    if (G.cells[i].piece === null) {
      G.canFlipCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      G.canFlipCells.push(i);
    }
    else {
      break;
    }
  }
}

function flipUpRight(id, currentPlayer, G) {
  for (i = id - 4; (i + 1) % 5 == 0; i -= 4) {
    if (G.cells[i].piece === null) {
      G.canFlipCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      G.canFlipCells.push(i);
    }
    else {
      break;
    }
  }
}

function flipDownLeft(id, currentPlayer, G) {
  for (i = id + 4; i % 5 == 0; i += 4) {
    if (G.cells[i].piece === null) {
      G.canFlipCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      G.canFlipCells.push(i);
    }
    else {
      break;
    }
  }
}

function flipDownRight(id, currentPlayer, G) {
  for (i = id + 6; (i + 1) % 5 == 0; i += 6) {
    if (G.cells[i].piece === null) {
      G.canFlipCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      G.canFlipCells.push(i);
    }
    else {
      break;
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
      if(G.players[ctx.currentPlayer].pieces != 0) {
        if(G.cells[id].piece === null) {
          G.cells[id].piece = ctx.currentPlayer;
          G.players[ctx.currentPlayer].pieces -= 1;
        }
      }
    },
    selectPiece: (G, ctx, id) => {
      G.moveAbleCells = [];
      if(G.cells[id].piece === ctx.currentPlayer) {
        G.selectedCell = id;
        CheckMoves(id, ctx.currentPlayer, G);
      }
    },
    movePiece: (G, ctx, id) => {
      if(G.moveAbleCells.includes(id)) {
        G.cells[G.selectedCell].piece = null;
        G.cells[id].piece = ctx.currentPlayer;
        flipLeft(id, ctx.currentPlayer, G);
        flipRight(id, ctx.currentPlayer, G);
        flipUp(id, ctx.currentPlayer, G);
        flipDown(id, ctx.currentPlayer, G);
        flipUpLeft(id, ctx.currentPlayer, G);
        flipDownLeft(id, ctx.currentPlayer, G);
        flipUpRight(id, ctx.currentPlayer, G);
        flipDownRight(id, ctx.currentPlayer, G);
        G.moveAbleCells = [];
        G.selectedCell = null;
        //flip function
      }
    },
  },

  flow: {
    endGameIf: (G, ctx) => {
      // Put winning condition here, return player key.
      
    },
  },
});

export default Game;
