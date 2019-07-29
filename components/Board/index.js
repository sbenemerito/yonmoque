import React from "react";
import { StyleSheet, View } from "react-native";
import { vw } from 'react-native-expo-viewport-units';

import {
  boardHeight,
  boardWidth,
  tileHeight,
  tileWidth,
  columns,
  rows,
} from "../constants/board";
import Tile from "../Tile";

class Board extends React.Component {
  render() {
    const { G } = this.props;

    let cells = G.cells.map((cell) => {
      return (
        <View key={cell.id} id={`cell${cell.id}`} style={styles.cell}>
          <Tile tileColor={cell.color} />
        </View>
      );
    });

    return <View style={styles.root}>{cells}</View>;
  }
};

const styles = StyleSheet.create({
  root: {
    width: vw(boardWidth),
    height: vw(boardHeight),
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    width: vw(tileWidth),
    height: vw(tileHeight),
  },
});

export default Board;