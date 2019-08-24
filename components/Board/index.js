import React, { Fragment } from "react";
import { ImageBackground, StyleSheet, View, TouchableHighlight, Image } from "react-native";
import Text from '../CustomText';
import Tile from "../Tile";
import PlayerOne from "./PlayerOne";
import PlayerTwo from "./PlayerTwo";
import Modal from "react-native-modal";

import { vw, vh } from 'react-native-expo-viewport-units';
import {
  boardHeight,
  boardWidth,
  tileHeight,
  tileWidth,
} from "../constants/board";
import {
  white,
  black,
  blue,
  blueDark,
  grayDark
} from "../constants/colors";

class Board extends React.Component {
  onClick(cell, moveAbles, numPieces, selectedCell) {
    const { ctx, gameRoom, playerSide, socket } = this.props;

    const notLocalVersus = gameRoom.isMultiplayer || gameRoom.isAI;
    const oppositePlayer = (playerSide - 1) * -1;
    const noOpponent = gameRoom.players[oppositePlayer].name === null;
    if ((ctx.currentPlayer != playerSide || noOpponent) && notLocalVersus) return;

    let moveData = {
      id: gameRoom.id,
      type: null,
      src: null,
      dest: null
    };

    if(cell.piece === null) {
      if(moveAbles.length === 0 ) {
        this.addPiece(cell.id, numPieces);

        if (gameRoom.isMultiplayer) {
          moveData.type = 'addPiece';
          moveData.dest = cell.id;
          socket.emit('make move', moveData);
        }
      } else {
        this.movePiece(cell.id, moveAbles);

        if (gameRoom.isMultiplayer) {
          moveData.type = 'movePiece';
          moveData.src = selectedCell;
          moveData.dest = cell.id;
          socket.emit('make move', moveData);
        }
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

  movePiece(id, moveAbles, src=null) {
    if (src !== null) {
      this.props.moves.movePiece(id, src);
      this.props.events.endTurn();
    } else if (moveAbles.includes(id)) {
      this.props.moves.movePiece(id);
      this.props.events.endTurn();
    }
    this.props.moves.resetVars();
  }

  componentDidMount() {
    const { G, socket, updateGameState, moves } = this.props;

    if (socket !== null) {
      socket.on('opponent moved', (moveData) => {
        if (moveData.type) {
          switch (moveData.type) {
            case 'addPiece':
              this.addPiece(moveData.dest, G.players[this.props.ctx.currentPlayer].pieces);
              break;
            case 'movePiece':
              this.movePiece(moveData.dest, null, moveData.src);
              break;
            default:
              console.error('Invalid move');
              break;
          }
        }
      });

      socket.on('player joined', (roomData) => {
        let side;

        if (roomData.players[0].socket === socket.id) {
          roomData.players[0].name = `${roomData.players[0].name} (You)`;
          side = 0;
        } else {
          roomData.players[1].name = `${roomData.players[1].name} (You)`;
          side = 1;
        }

        updateGameState({ ...roomData, side });
      });

      socket.on('opponent left', ({ player }) => {
        moves.surrender(player);
      });

      socket.on('disconnect', (reason) => {
        console.log(`Disconnected. Reason: ${reason}`);
      });
    }
  }

  componentWillUnmount() {
    const { socket, setSocket, gameRoom } = this.props;
    const firstPlayerSocket = gameRoom.players[0].socket;
    const secondPlayerSocket = gameRoom.players[1].socket;
    // it is an 'ongoing game' if there are 2 players in a room
    const isOngoingGame = firstPlayerSocket !== null && secondPlayerSocket !== null;

    if (isOngoingGame && socket !== null) {
      // disconnect player so opponent wins, and reset socket
      socket.disconnect();
      setSocket(null);
    }
  }

  render() {
    const { G, gameRoom, showMainMenu } = this.props;

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
        <ImageBackground
          source={require("../../assets/backgrounds/gamebackground.jpg")} 
          style={styles.gameComponent}>
          <View style={styles.menuComponent}>
            <TouchableHighlight 
              style={styles.buttonMargin}
              onPress={showMainMenu} >
              <View style={[styles.buttonBase]}>
                <View style={[styles.button, styles.margins]}>
                  <Image
                    style={[{width: vw(8), height: vw(8)}, styles.margins]}
                    source={require("../../assets/icons/settings.png")}
                  />
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.buttonMargin}>
              <View style={[styles.buttonBase]}>
                <View style={[styles.button, styles.margins]}>
                  <Image
                    style={[{width: vw(6), height: vw(6)}, styles.margins]}
                    source={require("../../assets/icons/undo.png")}
                  />
                </View>
              </View>
            </TouchableHighlight>
            <Text style={[styles.text]} type="PressStart">Yonmoque</Text>
          </View>
          <Fragment>
            <PlayerOne
              pieces={G.players[0].pieces}
              name={gameRoom.players[0].name ? gameRoom.players[0].name : 'waiting...'}
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
              name={gameRoom.players[1].name ? gameRoom.players[1].name : 'waiting...'}
              current={this.props.ctx.currentPlayer}>
            </PlayerTwo>
          </Fragment>
          <Modal isVisible={this.props.ctx.gameover ? true : false}>
          <View style={{flex: 1}}>
            <View style={[styles.margins, styles.modal]}>
              <View style={[styles.margins]}>
                <Image
                  style={[{width: vw(50), height: vw(55)}, styles.margins]}
                  source={require("../../assets/icons/winner.png")}
                />
                <Text style={[styles.text, styles.margins, {marginBottom: vh(2)}]}> Player {parseInt(G.victory) + 1} </Text>
                <TouchableHighlight 
                  style={[styles.buttonMargin, styles.margins]}
                  onPress={showMainMenu}>
                  <View style={[styles.buttonBase]}>
                    <View style={[styles.button, styles.margins]}>
                      <Image
                        style={[{width: vw(6), height: vw(6)}, styles.margins]}
                        source={require("../../assets/icons/close.png")}
                      />
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          </Modal>
        </ImageBackground>
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
  menuComponent: {
    flexDirection: 'row',
    justifyContent: "center",
    marginBottom: vh(4),
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
  buttonBase: {
    backgroundColor: blueDark,
    width: vw(12),
    height: vw(12),
    borderRadius: vw(12) / 2,
  },
  button: {
    backgroundColor: blue,
    width: '80%',
    height: '80%',
    borderRadius: vw(12) / 2,
  },
  buttonMargin: {
    marginRight: vw(4),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  margins: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  text: {
    color: black,
    fontSize: 35,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  modal: {
    width: vw(75),
    height: vh(45),
    backgroundColor: white,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: blueDark,
  },
});

export default Board;