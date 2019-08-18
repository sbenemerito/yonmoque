import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, ActivityIndicator } from 'react-native';
import { Client } from "boardgame.io/react-native";

import colors from "./components/constants/colors";
import Board from './components/Board';
import Game from "./components/Game";
import MainMenu from './components/MainMenu';
import {Font} from 'expo';

class App extends React.Component {
  state = {
    isChooseColorVisible: false,
    fontLoaded: false,
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

  async componentDidMount() {
    await Font.loadAsync({
      'JosefinSans': require("./assets/fonts/JosefinSans-Regular.ttf"),
      'PressStart': require("./assets/fonts/PressStart2P.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  backToMainMenu = () => {
    this.setState({
      isMainMenuVisible: true,
    });
  };

  startGame = () => {
    this.setState({
      isMainMenuVisible: false,
      isChooseColorVisible: false,
    });
  };

  toggleChooseColor = () => {
    this.setState({ 
      isChooseColorVisible: !this.state.isChooseColorVisible 
    });
  };

  render() {
    const { isMainMenuVisible, numPlayers, playerConfig, isChooseColorVisible } = this.state;
    const YonmoqueClient = Client({
      game: Game,
      board: Board,
      numPlayers,
      debug: true,
    });

    return (
      <View>
        <StatusBar/>
        {this.state.fontLoaded ? (
          <ImageBackground
            source={require("./assets/backgrounds/mainmenubackground.jpg")}
            style={styles.container}>
            {
              isMainMenuVisible
                ? <MainMenu
                    startGame={this.startGame}
                    toggleChooseColor={this.toggleChooseColor}
                    isChooseColorVisible={isChooseColorVisible}
                  />
                : <YonmoqueClient
                    backToMainMenu={this.backToMainMenu}
                    playerConfig={playerConfig}
                    toggleChooseColor={this.toggleChooseColor}
                    isChooseColorVisible={isChooseColorVisible}
                  />
            }
          </ImageBackground>
        ) : (
          <ActivityIndicator size="large" />
        )}
        
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