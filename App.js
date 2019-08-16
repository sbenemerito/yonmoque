import React from 'react';
import { Client } from 'boardgame.io/react-native';
import { StatusBar, StyleSheet, View, ImageBackground } from 'react-native';

import Board from './components/Board';
import colors from './components/constants/colors';
import Game from './components/Game';
import Lobby from './components/Lobby';
import MainMenu from './components/MainMenu';


class App extends React.Component {
  state = {
    screen: 'mainMenu',
    numPlayers: 2,
    playerSide: 0,
    gameRoom: {
      id: null,
      name: null,
      players: null,
      isMultiplayer: null,
      secret: null,
      turn: null,
    },
    socket: null,
  };

  setSocket = (socket) => {
    this.setState({ socket });
  };

  showMainMenu = () => {
    this.setState({
      screen: 'mainMenu'
    });
  };

  startGame = ({ id, name, players, isMultiplayer, secret, turn }) => {
    this.setState({
      screen: 'game',
      gameRoom: { id, name, players, isMultiplayer, secret, turn },
      playerSide: players[0].socket === this.state.socket.id ? 0 : 1
    });
  };

  joinLobby = () => {
    this.setState({
      screen: 'lobby'
    });
  };

  render() {
    const { numPlayers, gameRoom } = this.state;
    const YonmoqueClient = Client({
      game: Game,
      board: Board,
      numPlayers,
      debug: true,
    });
    const screenMap = {
      mainMenu: <MainMenu startGame={this.startGame} joinLobby={this.joinLobby} />,
      lobby: <Lobby
               socket={this.state.socket}
               setSocket={this.setSocket}
               setSide={this.setSide}
               startGame={this.startGame}
             />,
      game: <YonmoqueClient
              showMainMenu={this.showMainMenu}
              gameRoom={this.state.gameRoom}
              playerSide={this.state.playerSide}
              socket={this.state.socket}
            />
    };

    return (
      <View>
        <StatusBar/>
        <ImageBackground
          source={require("./assets/backgrounds/mainmenubackground.jpg")}
          style={styles.container}>
          {
            screenMap[this.state.screen]
          }
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden"
  },
});

export default App;