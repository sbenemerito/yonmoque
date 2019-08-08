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
const tileWidth = 18;
const tileHeight = 18;
const boardWidth = (16 * columns) + 6;
const boardHeight = (16 * rows) + 6;
const initialPieces = 6;
const playerTile = 16;

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
  playerTile,
};
