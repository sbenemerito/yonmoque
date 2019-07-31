import React from "react";
import { StyleSheet, View, TouchableNativeFeedback, Text } from "react-native";
import { vw } from 'react-native-expo-viewport-units';

import {
  boardHeight,
  boardWidth,
  tileHeight,
  tileWidth,
} from "../constants/board";
import Tile from "../Tile";

class Board extends React.Component {
  onClick(id) {
    this.props.moves.addPiece(id);
    this.props.events.endTurn();
  }

  render() {
    const { G } = this.props;

    let cells = G.cells.map((cell) => {
      return (
        <TouchableNativeFeedback
          key={cell.id}
          id={`cell${cell.id}`}
          onPress={() => {
            this.onClick(cell.id);
          }}
          underlayColor="white">
          <View style={styles.cell}>
              <Tile
                index={cell.id}
                tileColor={cell.color}
                isMovable={this.props.movableTiles.includes(cell.id)}
                piece={cell.piece}
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
    width: vw(boardHeight),
    height: vw(boardWidth),
    backgroundColor: "#000",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
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