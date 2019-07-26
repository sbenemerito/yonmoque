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
  let cells = G.cells.map((cell) => {
    return (
      <View key={cell.id} id={`cell${cell.id}`} style={styles.cell}>
        <Tile tileColor={cell.color} />
      </View>
    );
  });

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