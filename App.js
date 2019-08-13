import React from 'react';
import { Client } from 'boardgame.io/react-native';
import { StatusBar, StyleSheet, View } from 'react-native';

import Board from './components/Board';
import colors from './components/constants/colors';
import Game from './components/Game';
import Lobby from './components/Lobby';
import MainMenu from './components/MainMenu';


class App extends React.Component {
  state = {
    screen: 'mainMenu',
    numPlayers: 2,
    playerConfig: {
      "0": {
        name: "Player 1",
        color: colors.blue,
        skin: null,
      },
      "1": {
        name: "Player 2",
        color: colors.white,
        skin: null,
      },
    },
    socket: null,
  };

  showMainMenu = () => {
    this.setState({
      screen: 'mainMenu'
    });
  };

  startGame = () => {
    this.setState({
      screen: 'game'
    });
  };

  joinLobby = () => {
    this.setState({
      screen: 'lobby'
    });
  };

  render() {
    const { numPlayers, playerConfig } = this.state;
    const YonmoqueClient = Client({
      game: Game,
      board: Board,
      numPlayers,
      debug: true,
    });
    const screenMap = {
      mainMenu: <MainMenu startGame={this.startGame} joinLobby={this.joinLobby} />,
      lobby: <Lobby socket={this.state.socket} />,
      game: <YonmoqueClient showMainMenu={this.showMainMenu} playerConfig={playerConfig} />
    };

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {
          screenMap[this.state.screen]
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#888",
  },
});

export default App;