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
      if(!CanDiagonal(id, currentPlayer, G) || currentID % 5 === 0 || G.cells[currentID].color === neutralValue) {
        break;
      }
    }
    for(currentID = id + 4; CheckTile(currentID, G); currentID += 4) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || currentID % 5 === 0 || G.cells[currentID].color === neutralValue) {
        break;
      }
    }
  }

  // Check right side diagonal
  if((id + 1) % 5 !== 0) {
    for(currentID = id - 4; CheckTile(currentID, G); currentID -= 4) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || (currentID + 1) % 5 === 0 || G.cells[currentID].color === neutralValue) {
        break;
      }
    }
    for(currentID = id + 6; CheckTile(currentID, G); currentID += 6) {
      G.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer, G) || (currentID + 1) % 5 === 0 || G.cells[currentID].color === neutralValue) {
        break;
      }
    }
  }
}

function flipHorizontal(id, currentPlayer, G) {
  let tempCells = [];
  let i = id;

  //flip left direction
  if (id % 5 != 0) {
    do {
      i--;
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
    } while (i % 5 != 0);
  }

  tempCells = [];
  i = id;

  // flip right direction
  if ((id + 1) % 5 != 0) {
    do {
      i++;
      if (G.cells[i].piece === null) {
        break;
      }
      else if (currentPlayer != G.cells[i].piece) {
        tempCells.push(i);
      }
      else if (tempCells.length > 0) {
        G.canFlipCells.push(tempCells);
        tempCells = [];
        break;
      }
    } while ((i + 1) % 5 != 0);
  }
}

function flipVertical(id, currentPlayer, G) {
  let tempCells = [];
  let i = id;

  // flip up direction
  if (i > 4) {
    do {
      i -= 5;
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
      } catch {
        break;
      }
    } while (i >= 0);
  }

  console.log(G.canFlipCells);
  tempCells = [];
  i = id;

  //flip down direction
  if (i < 20) {
    do {
      i += 5;
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
      } catch {
        break;
      }
    } while (i <= 24);
  }
}

function flipDiagLeft(id, currentPlayer, G) {
  let tempCells = [];
  let i = id;

  // flip diagonal left up
  if (id % 5 != 0 && id > 4) {
    do {
      i -= 6;
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
      } catch {
        break;
      }
    } while (i % 5 != 0 && i >= 0);
  }

  tempCells = [];
  i = id;

  // flip diagonal right down
  if ((id + 1) % 5 != 0 && id < 20) {
    do {
      i += 6;
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
      } catch {
        break;
      }
    } while ((i + 1) % 5 != 0 && i <= 24);
  }

}

function flipDiagRight(id, currentPlayer, G) {
  let tempCells = [];
  let i = id;

  // flip diagonal right up
  if ((i + 1) % 5 != 0 && i > 4) {
    do {
      i -= 4;
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
      } catch {
        break;
      }
    } while ((i + 1) % 5 != 0 && i >= 0);
  }

  tempCells = [];
  i = id;

  // flip diagonal left down
  if (i % 5 != 0 && i < 20) {
    do {
      i += 4;
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
      } catch {
        break;
      }
    } while (i % 5 != 0 && i <= 24);
  }
}

function flippableCells(id, currentPlayer, G) {
  G.canFlipCells.push(id);

  flipDiagLeft(id, currentPlayer, G);
  flipDiagRight(id, currentPlayer, G);
  flipHorizontal(id, currentPlayer, G);
  flipVertical(id, currentPlayer, G);

  for (i = 1; i < G.canFlipCells.length; i += 1) {
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
