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
  };

  // Set up the game state for each player
  G.players = Array(ctx.numPlayers).fill(null).map(() => ({ pieces: initialPieces }));

  // Set the game board, we can insert board mutations here (custom boards)
  G.cells = [ ...initialCells ];

  console.log("Initial Game State", G, "Initial ctx", ctx);

  // Our game state is ready to go– return it!
  return G;
}

function CheckTile(id) {
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

function CanDiagonal(id, currentPlayer) {
  if((G.cells[id].color === blueValue && currentPlayer === 0) || (G.cells[id].color === whiteValue && currentPlayer === 1)) {
    return true;
  } else {
    return false;
  }
}

export function CheckMoves(id, currentPlayer) {
  const M = {
    moveAbleCells: [],
  };
  
  // Check vertical and horizontal sides
  if(CheckTile(id - 5)) {
    let currentID = id - 5;
    M.moveAbleCells.push(currentID);
  }
  if(CheckTile(id + 5)) {
    let currentID = id + 5;
    M.moveAbleCells.push(currentID);
  }
  if(id % 5 !== 0) {
    if(CheckTile(id - 1)) {
      let currentID = id - 1;
      M.moveAbleCells.push(currentID);
    }
  }
  if((id + 1) % 5 !== 0) {
    if(CheckTile(id + 1)) {
      let currentID = id + 1;
      M.moveAbleCells.push(currentID);
    }
  }

  // Check left side diagonal
  if(id % 5 !== 0) {
    for(currentID = id - 6; CheckTile(currentID); currentID -= 6) {
      M.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer) || currentID % 5 === 0) {
        break;
      }
    }
    for(currentID = id + 4; CheckTile(currentID); currentID += 4) {
      M.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer) || currentID % 5 === 0) {
        break;
      }
    }
  }

  // Check right side diagonal
  if((id + 1) % 5 !== 0) {
    for(currentID = id - 4; CheckTile(currentID); currentID -= 4) {
      M.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer) || (currentID + 1) % 5 === 0) {
        break;
      }
    }
    for(currentID = id + 6; CheckTile(currentID); currentID += 6) {
      M.moveAbleCells.push(currentID);
      if(!CanDiagonal(id, currentPlayer) || (currentID + 1) % 5 === 0) {
        break;
      }
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
    addPiece: (G, ctx, id) => {
      console.log(ctx.currentPlayer)
      if(G.players[ctx.currentPlayer].pieces != 0) {
        if(G.cells[id].piece === null) {
          G.cells[id].piece = ctx.currentPlayer;
          G.players[ctx.currentPlayer].pieces -= 1;
        }
      }
    },
    selectPiece: (G, ctx, id) => {
      console.log(ctx.currentPlayer)
      if(G.cells[id].piece === ctx.currentPlayer) {
        M.moveAbleCells = [];
        CheckMoves(id, ctx.currentPlayer);
      }

    },
    movePiece: (G, ctx, id) => {
      console.log(ctx.currentPlayer)
      if(M.moveAbleCells.includes(id)) {
        G.cells[id].piece = ctx.currentPlayer;
        M.moveAbleCells = [];
        //flip function
        //check winner
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
