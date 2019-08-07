import React from "react";
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
import { vw } from 'react-native-expo-viewport-units';

import {
  boardHeight,
  boardWidth,
  tileHeight,
  tileWidth,
} from "../constants/board";
import Tile from "../Tile";


class Board extends React.Component {
  onClick(cell, moveAbles, numPieces, selectedCell) {
    if(cell.piece === null) {
      if(moveAbles.length === 0 ) {
        this.addPiece(cell.id, numPieces);
      } else {
        this.movePiece(cell.id, moveAbles);
      }
    } else {
      this.selectPiece(cell, selectedCell);
    }
  }

  addPiece(id, numPieces) {
    if(numPieces !== 0) {
      this.props.moves.resetVars();
      this.props.moves.addPiece(id);
      this.props.events.endTurn();
    }
  }

  selectPiece(cell, selectedCell) {
    this.props.moves.resetVars();
    if(cell.id !== selectedCell && cell.piece === this.props.ctx.currentPlayer) {
      this.props.moves.selectPiece(cell.id);
    }
  }

  movePiece(id, moveAbles) {
    if(moveAbles.includes(id)) {
      this.props.moves.movePiece(id);
      this.props.events.endTurn();
    }
    this.props.moves.resetVars();
  }

  render() {
    const { G } = this.props;
    let cells = G.cells.map((cell) => {
      return (
        <TouchableHighlight
          key={cell.id}
          id={`cell${cell.id}`}
          onPress={() => {
            this.onClick(cell, G.moveAbleCells, G.players[this.props.ctx.currentPlayer].pieces, G.selectedCell);
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
        </TouchableHighlight>
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