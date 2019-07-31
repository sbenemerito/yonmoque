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
  onClick(cell, moveAbles, selected) {
    if(cell.piece === null) {
      if(moveAbles.length === 0 ) {
        this.addPiece(cell.id, selected);
      } else {
        this.movePiece(cell.id);
      }
    } else {
      this.selectPiece(cell.id);
    }
  }

  addPiece(id, selected) {
    this.props.moves.addPiece(id);
    this.props.events.endTurn();
  }

  selectPiece(id) {
    this.props.moves.selectPiece(id);
  }

  movePiece(id) {
    this.props.moves.movePiece(id);
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
            this.onClick(cell, G.moveAbleCells, G.selectedCell);
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