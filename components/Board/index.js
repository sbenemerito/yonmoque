import React, { Fragment } from "react";
import { Animated, ImageBackground, StyleSheet, View, TouchableHighlight, Image } from "react-native";
import Text from '../CustomText';
import Tile from "../Tile";
import PlayerOne from "./PlayerOne";
import PlayerTwo from "./PlayerTwo";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

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
import i18n from '../../utils/i18n';



class Board extends React.Component {
  state = {
    showWinnerModal: false,
    finalBoard: false,
    playerNames: [],
  };

  onClick(cell, moveAbles, numPieces, selectedCell) {
    const { ctx, gameRoom, playerSide, socket, userData } = this.props;

    const notLocalVersus = gameRoom.isMultiplayer || gameRoom.isAI;
    const oppositePlayer = (playerSide - 1) * -1;
    const noOpponent = gameRoom.players[oppositePlayer].user === null;

    if ((ctx.currentPlayer != playerSide || noOpponent) && notLocalVersus) return;

    let moveData = {
      id: gameRoom.id,
      type: null,
      src: null,
      dest: null,
      token: userData ? userData.data.token : ''
    };

    if(cell.piece === null) {
      if(moveAbles.length === 0 ) {
        const successfulMove = this.addPiece(cell.id, numPieces);

        if (gameRoom.isMultiplayer && successfulMove) {
          moveData.type = 'addPiece';
          moveData.dest = cell.id;
          socket.emit('make move', moveData);
        }
      } else {
        const successfulMove = this.movePiece(cell.id, moveAbles);

        if (gameRoom.isMultiplayer && successfulMove) {
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
      return true;
    } else {
      return false;
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
      this.props.moves.resetVars();
      return true;
    } else if (moveAbles.includes(id)) {
      this.props.moves.movePiece(id);
      this.props.events.endTurn();
      this.props.moves.resetVars();
      return true;
    } else {
      this.props.moves.resetVars();
      return false;
    }
  }

  moveAI() {
    const { gameRoom, ctx, playerSide } = this.props;

    if (gameRoom.isAI && gameRoom.AI !== null && ctx.currentPlayer != playerSide) {
      const aiMove = gameRoom.AI.makeMove();
      switch (aiMove.type) {
        case 'addPiece':
          this.addPiece(aiMove.dest, aiMove.pieces);
          gameRoom.AI.pieces = gameRoom.AI.pieces - 1;
          break;
        case 'movePiece':
          this.movePiece(aiMove.dest, null, aiMove.src);
          break;
        default:
          console.error('Invalid move');
          break;
      }
    }
  }

  toggleWinner = () => {
    let closeModalTimer = 3000;

    if (this.state.showWinnerModal) {
      closeModalTimer = 300;
    }
    setTimeout(() => {
      this.setState({ 
        showWinnerModal: !this.state.showWinnerModal,
        finalBoard: true
      })
    }, closeModalTimer)
  };

  componentDidMount() {
    const { G, ctx, socket, updateGameState, moves } = this.props;
    const { playernames } = this.state;

    this.moveAI();

    if (socket !== null) {
      socket.on('opponent moved', (moveData) => {
        if (moveData.type) {
          switch (moveData.type) {
            case 'addPiece':
              this.addPiece(moveData.dest, G.players[ctx.currentPlayer].pieces);
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
          roomData.players[0].user.username = `${roomData.players[0].user.username} (You)`;
          side = 0;
          playerNames[0].name = `${roomData.players[0].user.username} (You)`;
          playernames[0].socket = socket.id;
        } else {
          roomData.players[1].user.username = `${roomData.players[1].user.username} (You)`;
          side = 1;
          playerNames[1] = `${roomData.players[0].user.username} (You)`;
          playernames[1].socket = socket.id;
        }

        updateGameState({ ...roomData, side });
        this.setState({ playerNames });
      });

      socket.on('opponent left', (disconnectMeta) => {
        if (!this.props.ctx.gameover && disconnectMeta) moves.surrender(disconnectMeta.player);
      });

      socket.on('disconnect', (reason) => {
        console.log(`Disconnected. Reason: ${reason}`);
      });
    }
  }

  componentDidUpdate() {
    // AI should respond when the game state updates.
    // It is placed in componentDidUpdate() so it gets the board state changes.
    const { G, ctx, playerSide, gameRoom, socket, userData } = this.props;

    if (gameRoom.isAI && gameRoom.AI !== null) {
      gameRoom.AI.handleMove([...G.cells]);
      this.moveAI();
    }
    // this one is triggered when the game is over and puts validation condition for modal winner so it will not always show
    if (this.props.ctx.gameover && !this.state.showWinnerModal && !this.state.finalBoard) {
      this.toggleWinner();

      if (gameRoom.isMultiplayer && socket) {
        socket.emit('endgame', { id: gameRoom.id, winner: parseInt(G.victory), token: userData.data.token });
      }
    }
  }

  componentWillUnmount() {
    const { socket, setSocket, gameRoom } = this.props;
    const firstPlayerSocket = gameRoom.players[0].socket;
    const secondPlayerSocket = gameRoom.players[1].socket;
    // it is an 'ongoing game' if there are 2 players in a room
    const isOngoingGame = firstPlayerSocket !== null && secondPlayerSocket !== null;

    // stop warnings for 'memory leak'
    this.addPiece = () => {};
    this.selectPiece = () => {};
    this.movePiece = () => {};

    if (isOngoingGame && socket !== null) {
      // disconnect player so opponent wins, and reset socket
      socket.disconnect();
      setSocket(null);
    }
  }

  // this is function for rendering the modal
  // @params: string, playerName comes from render() of winnerName
  renderEndGameModal(playerName) {
    const { G, gameRoom } = this.props;
    const {
      showWinnerModal,
      playerNames,
    } = this.state;
    
    // @TODO refactor this condition
    let srcImg = require("../../assets/icons/loser.png"); // default is loser.png
    if (G.victory !== null && G.victory !== undefined) { // this checks if there's already a winner in G
      const winnerIndex = parseInt(G.victory);
      // (AI) if gameRoom.players of winnerIndex user obj have isChooseByPlayer then current player wins and will get winner.png
      if (gameRoom.players[winnerIndex].user.isChooseByPlayer) {
        srcImg = require("../../assets/icons/winner.png");
      }
    }

    // (MULTIPLAYER, local) 
    if (gameRoom.name === 'Local Game') {
      srcImg = require("../../assets/icons/winner.png");
    };

    // (MULTIPLAYER, online) if playerNames of winner index socket is same with socket.id then will get winner.png
    if (playerNames.length > 0) {
      if (playerNames[winnerIndex].socket === socket.id) {
        srcImg = require("../../assets/icons/winner.png");
      }
    }
    
    return (
      <Modal isVisible={showWinnerModal}>
        <View style={{flex: 1}}>
          <View style={[styles.margins, styles.modal]}>
            <TouchableHighlight 
              style={[styles.buttonMargin, styles.marginsRight]}
              onPress={() => {
                this.toggleWinner();
              }}>
              <View style={[styles.buttonBase]}>
                <LinearGradient
                  colors={['#2B7FAE', '#1A5886']}
                  style={[ styles.buttonBase]}>
                  <Icon name="times" style={[{color: white, fontSize: 30}, styles.margins]} />
                </LinearGradient>
              </View>
            </TouchableHighlight>
            <View style={[styles.marginsTop]}>  
              <Image
                style={[{width: vw(50), height: vh(31)}, styles.margins]}
                source={srcImg}/>
              <Text style={[styles.text, styles.margins, {marginBottom: vh(2)}]}> Winner: {playerName} </Text>
              <TouchableHighlight 
                style={[styles.buttonMargin, styles.margins]}
                onPress={() => {
                  showMainMenu();
                }}>
                <View style={[styles.buttonBase]}>
                  <LinearGradient
                    colors={['#2B7FAE', '#1A5886']}
                    style={[ styles.buttonBase]}>
                    <Icon name="home" style={[{color: white, fontSize: 30}, styles.margins]} />
                  </LinearGradient>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { G, gameRoom, showMainMenu, socket, setSocket } = this.props;

    let winnerName = 'Player';
    if (G.victory !== null && G.victory !== undefined) {
      const winnerIndex = parseInt(G.victory);
      winnerName = gameRoom.players[winnerIndex] ? (gameRoom.players[winnerIndex].user ? gameRoom.players[winnerIndex].user.username : 'Player') : 'Player';
      // winnerIndex gives the value of the winner.
      // console.log(gameRoom.players[winnerIndex].user.username) specifies the entire name of winner
    }

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
              onPress={() => {
                if (socket !== null) {
                  // disconnect player so opponent wins, and reset socket
                  socket.disconnect();
                  setSocket(null);
                }
                showMainMenu();
              }} >
              <LinearGradient
                colors={['#2B7FAE', '#1A5886']}
                style={[ styles.buttonBase]}>
                <Icon name="door-open" style={[{color: white, fontSize: 20}, styles.margins]} />
              </LinearGradient>
            </TouchableHighlight>
            {/* <TouchableHighlight 
              style={styles.buttonMargin}>
              <View style={[styles.buttonBase]}>
                <View style={[styles.button, styles.margins]}>
                  <Image
                    style={[{width: vw(6), height: vw(6)}, styles.margins]}
                    source={require("../../assets/icons/undo.png")}
                  />
                </View>
              </View>
            </TouchableHighlight> */}
            <Text style={[styles.text]} type="PressStart">Yonmoque</Text>
          </View>
          <Fragment>
            <PlayerOne
              pieces={G.players[0].pieces}
              name={gameRoom.players[0] ? (gameRoom.players[0].user ? gameRoom.players[0].user.username : i18n.t('waiting')) : i18n.t('waiting')}
              current={this.props.ctx.currentPlayer}
              gameRoom={gameRoom}>
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
              name={gameRoom.players[1] ? (gameRoom.players[1].user ? gameRoom.players[1].user.username : i18n.t('waiting')) : i18n.t('waiting')}
              current={this.props.ctx.currentPlayer}
              gameRoom={gameRoom}>
            </PlayerTwo>
          </Fragment>
          {this.renderEndGameModal(winnerName)}
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
  marginsTop: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 'auto',
  },
  marginsRight: {
    marginLeft: 'auto',
    marginTop: 'auto',
  },
  text: {
    color: black,
    fontSize: vw(7.5),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  modal: {
    width: vw(75),
    height: vh(55),
    backgroundColor: white,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: white,
  },
});

export default Board;