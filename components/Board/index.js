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
  onClick(cell) {
    if(cell.piece === null) {
      this.addPiece(cell.id);
    } else {
      this.movePiece(cell.id);
    }
  }

  addPiece(id) {
    this.props.moves.addPiece(id);
    this.props.events.endTurn();
  }

  movePiece(id) {
    this.props.moves.selectPiece(id);
  }

  render() {
    const { G } = this.props;
    let cells = G.cells.map((cell) => {
      return (
        <TouchableNativeFeedback
          key={cell.id}
          id={`cell${cell.id}`}
          onPress={() => {
            this.onClick(cell);
          }}
          underlayColor="white">
          <View style={styles.cell}>
              <Tile
                index={cell.id}
                tileColor={cell.color}
                isMovable={G.moveAbleCells.includes(cell.id)}
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
    width: vw(boardWidth),
    height: vw(boardHeight),
    backgroundColor: "#444",
    flexWrap: "wrap",
    flexDirection: 'row',
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