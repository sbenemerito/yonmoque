import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground } from 'react-native';
import { Client } from "boardgame.io/react-native";

import colors from "./components/constants/colors";
import Board from './components/Board';
import Game from "./components/Game";
import MainMenu from './components/MainMenu';

class App extends React.Component {
  state = {
    isMainMenuVisible: true,
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
    }
  };

  backToMainMenu = () => {
    this.setState({
      isMainMenuVisible: true,
    });
  };

  startGame = () => {
    this.setState({
      isMainMenuVisible: false,
    });
  };

  render() {
    const { isMainMenuVisible, numPlayers, playerConfig } = this.state;
    const YonmoqueClient = Client({
      game: Game,
      board: Board,
      numPlayers,
      debug: true,
    });

    return (
      <View>
        <StatusBar/>
        <ImageBackground
          source={require("./assets/backgrounds/mainmenubackground.jpg")}
          style={styles.container}>
          {
            isMainMenuVisible
              ? <MainMenu
                  startGame={this.startGame}
                />
              : <YonmoqueClient
                  backToMainMenu={this.backToMainMenu}
                  playerConfig={playerConfig}
                />
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