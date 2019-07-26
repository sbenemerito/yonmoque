const boardSize = 5;
const columns = boardSize;
const rows = boardSize;
const whiteValue = 'A';
const blueValue = 'B';
const neutralValue = 'X';
const blueTiles = [2, 6, 8, 10, 14, 16, 18, 22];
const neutralTiles = [0, 4, 12, 20, 24];
const initialCells = Array(rows * columns).fill(0).map((_, index) => {
  let tileColor = whiteValue;

  if (blueTiles.includes(index)) tileColor = blueValue;
  if (neutralTiles.includes(index)) tileColor = neutralValue;

  return {
    id: index,
    color: tileColor,
    piece: null
  };
});
const center = Math.floor(boardSize / 2);
const tileWidth = 100;
const tileHeight = 100;
const boardWidth = tileWidth * columns;
const boardHeight = tileHeight * rows;
const initialPieces = 6;

module.exports = {
  blueTiles,
  blueValue,
  boardHeight,
  boardWidth,
  center,
  columns,
  initialCells,
  initialPieces,
  neutralTiles,
  neutralValue,
  tileWidth,
  tileHeight,
  rows,
  whiteValue,
};
