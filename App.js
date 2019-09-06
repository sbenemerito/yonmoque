import React from 'react';
import { Client } from 'boardgame.io/react-native';
import { StatusBar, StyleSheet, View, ImageBackground, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

import Board from './components/Board';
import Game from './components/Game';
import Lobby from './components/Lobby';
import HowToPlay from './components/HowToPlay';
import MainMenu from './components/MainMenu';

class App extends React.Component {
  state = {
    screen: 'mainMenu',
    isChooseColorVisible: false,
    fontLoaded: false,
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

  updateGameState = (gameRoom) => {
    this.setState({ gameRoom });
  };

  setSocket = (socket) => {
    this.setState({ socket });
  };

  showMainMenu = () => {
    this.setState({
      screen: 'mainMenu',
      isChooseColorVisible: false,
    });
  };

  async componentDidMount() {
    await Font.loadAsync({
      'JosefinSans': require("./assets/fonts/JosefinSans-Regular.ttf"),
      'PressStart': require("./assets/fonts/PressStart2P.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  startGame = ({ id, name, players, isMultiplayer, secret, turn, side }) => {
    this.setState({
      screen: 'game',
      gameRoom: { id, name, players, isMultiplayer, secret, turn },
      playerSide: side !== undefined
                    ? side
                    : players[0].socket === this.state.socket.id ? 0 : 1
    });
  };

  backToMainMenu = () => {
    this.setState({
      isMainMenuVisible: false,
      isChooseColorVisible: false,
    });
  };

  joinLobby = () => {
    this.setState({
      screen: 'lobby'
    });
  };

  howToPlay = () => {
    this.setState({
      screen: 'instruction'
    });
  };

  toggleChooseColor = () => {
    this.setState({ 
      isChooseColorVisible: !this.state.isChooseColorVisible 
    });
  };

  render() {
    const {
      gameRoom,
      isChooseColorVisible,
      numPlayers,
      playerSide,
      socket
    } = this.state;

    const YonmoqueClient = Client({
      game: Game,
      board: Board,
      numPlayers,
      debug: true,
    });
    const screenMap = {
      mainMenu: <MainMenu
                  startGame={this.startGame}
                  joinLobby={this.joinLobby}
                  howToPlay={this.howToPlay}
                  toggleChooseColor={this.toggleChooseColor}
                  isChooseColorVisible={isChooseColorVisible}
                />,
      lobby: <Lobby
               socket={socket}
               setSocket={this.setSocket}
               startGame={this.startGame}
               isChooseColorVisible={isChooseColorVisible}
               toggleChooseColor={this.toggleChooseColor}
               showMainMenu={this.showMainMenu}
             />,
      game: <YonmoqueClient
              showMainMenu={this.showMainMenu}
              gameRoom={gameRoom}
              playerSide={playerSide}
              socket={socket}
              setSocket={this.setSocket}
              updateGameState={this.updateGameState}
              isChooseColorVisible={isChooseColorVisible}
            />,
      instruction: <HowToPlay
              showMainMenu={this.showMainMenu}
            />
    };

    return (
      <View>
        <StatusBar/>
        {
          this.state.fontLoaded ? (
            <ImageBackground
              source={require("./assets/backgrounds/mainmenubackground.jpg")}
              style={styles.container}>
              {
                screenMap[this.state.screen]
              }
            </ImageBackground>
          ) : (
            <ActivityIndicator size="large" />
          )
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
    overflow: "hidden"
  },
});

export default App;