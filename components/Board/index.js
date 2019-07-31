import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import { vw } from 'react-native-expo-viewport-units';

import {
  boardHeight,
  boardWidth,
  tileHeight,
  tileWidth,
} from "../constants/board";
import Tile from "../Tile";

class Board extends React.Component {
  render() {
    const { G } = this.props;

    let cells = G.cells.map((cell) => {
      return (
        <TouchableNativeFeedback
          key={cell.id}
          id={`cell${cell.id}`}
          onPress={() => {
            this.props.moves.addPiece(cell.id);
          }}
          underlayColor="white">
          <View style={styles.cell}>
              <Tile
                index={cell.id}
                tileColor={cell.color}
                isMovable={this.props.movableTiles.includes(cell.id)}
                addPiece={this.props.moves.addPiece}
              />
          </View>
        </TouchableNativeFeedback>
      );
    });

    return <View style={styles.root}>{cells}</View>;
  }
};

const styles = StyleSheet.create({
  root: {
    width: vw(boardWidth),
    height: vw(boardHeight),
    backgroundColor: "#444",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },
  cell: {
    width: vw(tileWidth),
    height: vw(tileHeight),
  },
});

export default Board;