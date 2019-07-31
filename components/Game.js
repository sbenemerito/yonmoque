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

  console.log("Initial Game State", G, "Initial ctx", ctx);

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

function flipableCells(id, currentPlayer, G) {
  let tempCells = [];

  // flip left direction
  for (i = id - 1; i % 5 != 0; i--) {
    if (G.cells[i].piece === null) {
      tempCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      tempCells.push(i);
    }
    else {
      break;
    }
  }

  G.canFlipCells.push(tempCells);
  tempCells = [];

  // flip right direction
  for (i = id + 1; (i + 1) % 5 != 0; i++) {
    if (G.cells[i].piece === null) {
      tempCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      tempCells.push(i);
    }
    else {
      break;
    }
  }

  G.canFlipCells.push(tempCells);
  tempCells = [];

  // flip up direction
  for (i = id - 5; i >= 0; i-=5) {
    if (G.cells[i].piece === null) {
      tempCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      tempCells.push(i);
    }
    else {
      break;
    }
  }

  G.canFlipCells.push(tempCells);
  tempCells = [];

  // flip down direction
  for (i = id + 5; i <= 24; i += 5) {
    if (G.cells[i].piece === null) {
      tempCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      tempCells.push(i);
    }
    else {
      break;
    }
  }

  G.canFlipCells.push(tempCells);
  tempCells = [];

  // flip diagonal left up
  for (i = id - 6; i % 5 != 0; i -= 6) {
    if (G.cells[i].piece === null) {
      tempCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      tempCells.push(i);
    }
    else {
      break;
    }
  }

  G.canFlipCells.push(tempCells);
  tempCells = [];

  // flip diagonal right up
  for (i = id - 4; (i + 1) % 5 != 0; i -= 4) {
    if (G.cells[i].piece === null) {
      tempCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      tempCells.push(i);
    }
    else {
      break;
    }
  }

  G.canFlipCells.push(tempCells);
  tempCells = [];

  // flip diagonal left down
  for (i = id + 4; i % 5 != 0; i += 4) {
    if (G.cells[i].piece === null) {
      tempCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      tempCells.push(i);
    }
    else {
      break;
    }
  }

  G.canFlipCells.push(tempCells);
  tempCells = [];

  // flip diagonal right down
  for (i = id + 6; (i + 1) % 5 != 0; i += 6) {
    if (G.cells[i].piece === null) {
      tempCells = [];
      break;
    }
    else if (currentPlayer != G.cells[i].piece) {
      tempCells.push(i);
    }
    else {
      break;
    }
  }

  G.canFlipCells.push(tempCells);
}

const Game = BGGame({
  // The setup method is passed ctx
  setup: getInitialState,
  
  moves: { 
    // G and ctx are provided automatically when calling from App– `this.props.moves.movePiece(id)`
    addPiece: (G, ctx, id) => {
      G.moveAbleCells = [];
      G.selectedCell = [];
      if(G.players[ctx.currentPlayer].pieces != 0) {
        if(G.cells[id].piece === null) {
          G.cells[id].piece = ctx.currentPlayer;
          G.players[ctx.currentPlayer].pieces -= 1;
        }
      }
    },
    selectPiece: (G, ctx, id) => {
      G.moveAbleCells = [];
      G.selectedCell = id;
      if(G.cells[id].piece === ctx.currentPlayer) {
        CheckMoves(id, ctx.currentPlayer, G);
      }
    },
    movePiece: (G, ctx, id) => {
      if(G.moveAbleCells.includes(id)) {
        G.cells[G.selectedCell].piece = null;
        G.cells[id].piece = ctx.currentPlayer;
        G.moveAbleCells = [];
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
