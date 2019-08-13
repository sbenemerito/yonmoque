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
    gameRoom: {
      name: null,
      players: null,
      isMultiplayer: null,
      secret: null
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

  startGame = ({ name, players, isMultiplayer, secret }) => {
    this.setState({
      screen: 'game',
      gameRoom: { name, players, isMultiplayer, secret }
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
      lobby: <Lobby setSocket={this.setSocket} startGame={this.startGame} />,
      game: <YonmoqueClient
              showMainMenu={this.showMainMenu}
              playerData={gameRoom.players}
            />
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