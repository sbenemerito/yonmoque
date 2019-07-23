const boardSize = 5;
const columns = boardSize;
const rows = boardSize;
const whiteValue = 'A';
const blueValue = 'B';
const neutralValue = 'X';
const initialCells = Array(rows).fill(Array(columns).fill(whiteValue));
const center = Math.floor(boardSize / 2);
const tileWidth = 100;
const tileHeight = 100;
const boardWidth = tileWidth * columns;
const boardHeight = tileHeight * rows;
const initialPieces = 6;

module.exports = {
  blueValue,
  boardHeight,
  boardWidth,
  center,
  columns,
  initialCells,
  initialPieces,
  neutralValue,
  tileWidth,
  tileHeight,
  rows,
  whiteValue,
};
