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
    selectedCell: [],
    checkVictory: [],
    victory: false
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

function flippableCells(id, currentPlayer, G) {
  G.canFlipCells.push(id);
  let tempCells = [];
  let i = id;

  // flip left direction
  if (id % 5 != 0) {
    for (i = id - 1; true; i--) {
      try {
        if (G.cells[i].piece === null) {
          tempCells = [];
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
  }

  tempCells = [];

  // flip right direction
  if ((id + 1) % 5 != 0) {
    for (i = id + 1; true; i++) {
      try {
        if (G.cells[i].piece === null) {
          tempCells = [];
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
  }

  tempCells = [];

  // flip up direction
  for (i = id - 5; i >= 0; i-=5) {
    try {
      if (G.cells[i].piece === null) {
        tempCells = [];
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
        tempCells = [];
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
        tempCells = [];
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
        tempCells = [];
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
        tempCells = [];
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
        tempCells = [];
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
  for(i = 1; i < G.canFlipCells.length; i += 1) {
    let currentArray = G.canFlipCells[i];
    for(j = 0; j < currentArray.length; j += 1) {
      G.cells[currentArray[j]].piece = currentPlayer;
    }
  }
}

function checkHorizontal(id, currentPlayer, G) {
  var lineNum = 0;
  var j = id;
  //get last index in the right side
  do {
    j++;
  } while (j % 5 != 0);

  //check horizontal from right to left
  do {
    j--;
    if (G.cells[j].piece == currentPlayer) {
      lineNum += 1;
    }
    else if (G.cells[j].piece == null && lineNum < 4) {
      lineNum = 0;
    } 
  } while (j % 5 != 0);
  G.checkVictory.push(lineNum);
}

function checkVertical(id, currentPlayer, G) {
  var lineNum = 0;
  var j = id;
  console.log(j);
  //get last index in the right side
  while (j >= 0) {
    j -= 5;
  }

  //check vertical from right to left
  while (j < 20) {
    j += 5;
    if (G.cells[j].piece == currentPlayer) {
      lineNum += 1;
    }
    else if (G.cells[j].piece == null && lineNum < 4) {
      lineNum = 0;
    }
  }
  G.checkVictory.push(lineNum);
}

function checkDiagRight(id, currentPlayer, G) {
  var lineNum = 0;
  var j = id;
  //get last index in the right side
  while (j % 5 != 0) {
    if (j > 20 && j < 25) {
      break;
    }
    j += 4;
  }

  //check horizontal from right to left
  do {
    if (G.cells[j].piece == currentPlayer) {
      lineNum += 1;
    }
    else if (G.cells[j].piece == null && lineNum < 4) {
      lineNum = 0;
    }
    j -= 4;
  } while ((j + 5) % 5 != 0 && j >= 0);
  G.checkVictory.push(lineNum);

}

function checkDiagLeft(id, currentPlayer, G) {
  var lineNum = 0;
  var j = id;
  //get last index in the right side
  while ((j + 1) % 5 != 0) {
    if (j > 20 && j < 25) {
      break;
    }
    j += 6;
  }

  //check horizontal from right to left
  do {
    if (G.cells[j].piece == currentPlayer) {
      lineNum += 1;
    }
    else if (G.cells[j].piece == null && lineNum < 4) {
      lineNum = 0;
    }
    j -= 6;
  } while ((j + 6) % 5 != 0 && j >= 0);
  G.checkVictory.push(lineNum);
  
}

function checkVictory(currentPlayer, G) {
  let lineNum = 0;
  var checkCells = G.canFlipCells;

  //check all directions for flipped and moved
  for (i = 0; i < checkCells.length; i++){
    //get left side last id to check horizontal
    checkHorizontal(checkCells[0], currentPlayer, G);
    checkVertical(checkCells[0], currentPlayer, G);
    checkDiagRight(checkCells[0], currentPlayer, G);
    checkDiagLeft(checkCells[0], currentPlayer, G);
  }
  lineNum = Math.max(...G.checkVictory);

  if (lineNum == 5) {
    if (currentPlayer == 0) {
      alert("White wins.");
    } else {
      alert("Blue wins.")
    }
    return true;
  }
  else if (lineNum == 4) {
    alert("Player " + currentPlayer + " wins.");
    return true;
  } else {
    fourLine = 0;
    return false;
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
      flipCells(ctx.currentPlayer, G);
      console.log(G.canFlipCells);
      G.victory = checkVictory(ctx.currentPlayer, G);
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
      if (G.victory) {
        return { winner: ctx.currentPlayer };
      }
    },
  },
});

export default Game;
