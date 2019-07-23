const columns = 5;
const rows = 5;
const cells = Array(rows).fill(Array(columns).fill(null));
const center = Math.floor(columns * (rows / 2));
const tileWidth = 100;
const tileHeight = 100;
const boardWidth = tileWidth * columns;
const boardHeight = tileHeight * rows;

module.exports = {
  columns,
  rows,
  cells,
  center,
  tileWidth,
  tileHeight,
  boardWidth,
  boardHeight,
};
