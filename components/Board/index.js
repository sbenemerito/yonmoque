import React from "react";
import { StyleSheet, View } from "react-native";

import {
  boardHeight,
  boardWidth,
  tileHeight,
  tileWidth,
  columns,
  rows,
} from "../constants/board";
import Tile from "../Tile";

const Board = ({ G }) => {
  let cells = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const value = G.cells[i][j];
      cells.push(
        <View style={styles.cell}>
          <Tile tileColor={value} />
        </View>
      );
    }
  }

  return <View style={styles.root}>{cells}</View>;
};

const styles = StyleSheet.create({
  root: {
    width: boardWidth,
    height: boardHeight,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: tileWidth,
    height: tileHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Board;