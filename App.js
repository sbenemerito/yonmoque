import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Client } from "boardgame.io/react-native";

import Game from "./components/Game";
import colors from "./components/constants/colors";

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
    },
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
      board: null, // Board class
      game: Game,
      numPlayers,
      debug: true,
    });

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <YonmoqueClient
          backToMainMenu={this.backToMainMenu}
          playerConfig={playerConfig}
        />
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