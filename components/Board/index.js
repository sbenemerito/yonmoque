import React, { Fragment } from "react";
import { ImageBackground, StyleSheet, View, TouchableHighlight, Button, Text } from "react-native";
import { vw, vh } from 'react-native-expo-viewport-units';

import {
  boardHeight,
  boardWidth,
  tileHeight,
  tileWidth,
} from "../constants/board";
import {
  white,
  grayDark
} from "../constants/colors";
import Tile from "../Tile";
import PlayerOne from "./PlayerOne";
import PlayerTwo from "./PlayerTwo";

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
    const { showMainMenu } = this.props;
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

    return (
      <View style={styles.background}>
        <View style={styles.menuComponent}>
          <Fragment>
            <Button
              title="Menu "
              accessibilityLabel="Go to Menu"
              onPress={showMainMenu}
            />
            <Button
              title="Undo  "
              disabled
              accessibilityLabel="Undo Move"
            />
            <Text style={styles.text}>Yonmoque</Text>
          </Fragment>
        </View>
        <View style={styles.gameComponent}>
          <Fragment>
            <PlayerOne
              pieces={G.players[0].pieces}
              name={this.props.playerConfig[0].name}
              current={this.props.ctx.currentPlayer}>
            </PlayerOne>
          </Fragment>
          <Fragment>
            <ImageBackground 
              source={require("../../assets/backgrounds/board.jpg")}
              style={styles.boardBackground}>
              <View style={styles.board}>{cells}</View>
            </ImageBackground>
          </Fragment>
          <Fragment>
            <PlayerTwo
              pieces={G.players[1].pieces}
              name={this.props.playerConfig[1].name}
              current={this.props.ctx.currentPlayer}>
            </PlayerTwo>
          </Fragment>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    backgroundColor: grayDark,
  },
  gameComponent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
  },
  boardBackground: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  board: {
    width: vw(boardWidth),
    height: vw(boardHeight),
    flexWrap: "wrap",
    flexDirection: 'row',
    justifyContent: "center",
    alignContent: "center",
  },
  cell: {
    width: vw(tileWidth),
    height: vw(tileHeight),
  },
  menuComponent: {
    flexDirection: 'row',
    justifyContent: "center",
    marginTop: vh(5),
  },
  text: {
    color: white,
    fontSize: 48,
  },
});

export default Board;