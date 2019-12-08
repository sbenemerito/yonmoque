import React from 'react';
import { Client } from 'boardgame.io/react-native';
import { StatusBar, StyleSheet, View, ImageBackground, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

import Board from './components/Board';
import Game from './components/Game';
import Lobby from './components/Lobby';
import HowToPlay from './components/HowToPlay';
import MainMenu from './components/MainMenu';
import Login from './components/Login';

class App extends React.Component {
  state = {
    screen: 'mainMenu',
    isChooseColorVisible: false,
    isChooseMultiplayerModeVisible: false,
    isSettingsVisible: false,
    fontLoaded: false,
    numPlayers: 2,
    playerSide: 0,
    gameRoom: {
      id: null,
      name: null,
      players: null,
      isMultiplayer: null,
      isAI: null,
      AI: null,
      secret: null,
      turn: null,
    },
    socket: null,
    showWinnerModal: false,
    userData: null,
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
      isChooseMultiplayerModeVisible: false,
    });
  };

  async componentDidMount() {
    await Font.loadAsync({
      'JosefinSans': require("./assets/fonts/JosefinSans-Regular.ttf"),
      'PressStart': require("./assets/fonts/PressStart2P.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  startGame = ({ id, name, players, isMultiplayer, isAI, AI, secret, turn, side }) => {
    this.setState({
      screen: 'game',
      gameRoom: { id, name, players, isMultiplayer, isAI, AI, secret, turn },
      playerSide: side !== undefined
                    ? side
                    : players[0].socket === this.state.socket.id ? 0 : 1
    });
  };

  backToMainMenu = () => {
    this.setState({
      isMainMenuVisible: false,
      isChooseColorVisible: false,
      isChooseMultiplayerModeVisible: false,
    });
  };

  joinLobby = () => {
    this.setState({
      screen: 'lobby'
    });
  };

  setUserData = (data) => {
    this.setState({
      userData: data,
    }, () => {
      if(data !== null) {
        this.joinLobby();
      }
    });
  };

  howToPlay = () => {
    this.setState({
      screen: 'instruction'
    });
  };

  login = () => {
    this.setState({
      screen: 'login'
    });
  };

  toggleChooseColor = () => {
    this.setState({ 
      isChooseColorVisible: !this.state.isChooseColorVisible 
    });
  };

  toggleSettings = () => {
    this.setState({ 
      isSettingsVisible: !this.state.isSettingsVisible 
    });
  };

  toggleWinner = () => {
    this.setState({ 
      showWinnerModal: !this.state.showWinnerModal 
    });
  };
  
  toggleChooseMultiplayerMode = () => {
    this.setState({ 
      isChooseMultiplayerModeVisible: !this.state.isChooseMultiplayerModeVisible 
    });
  };


  render() {
    const {
      gameRoom,
      isChooseColorVisible,
      isChooseMultiplayerModeVisible,
      isSettingsVisible,
      numPlayers,
      playerSide,
      socket,
      showWinnerModal,
      userData,
    } = this.state;

    const YonmoqueClient = Client({
      game: Game,
      board: Board,
      numPlayers,
      debug: true,
    });
    const screenMap = {
      mainMenu: <MainMenu
                  socket={socket}
                  setSocket={this.setSocket}
                  setUserData={this.setUserData}
                  startGame={this.startGame}
                  joinLobby={this.joinLobby}
                  howToPlay={this.howToPlay}
                  toggleChooseColor={this.toggleChooseColor}
                  toggleChooseMultiplayerMode={this.toggleChooseMultiplayerMode}
                  login={this.login}
                  isChooseColorVisible={isChooseColorVisible}
                  isChooseMultiplayerModeVisible={isChooseMultiplayerModeVisible}
                  isSettingsVisible={isSettingsVisible}
                  userData={userData}
                  toggleSettings={this.toggleSettings}
                />,
      lobby: <Lobby
               socket={socket}
               setSocket={this.setSocket}
               startGame={this.startGame}
               isChooseColorVisible={isChooseColorVisible}
               toggleChooseColor={this.toggleChooseColor}
               showMainMenu={this.showMainMenu}
               userData={userData}
             />,
      game: <YonmoqueClient
              showMainMenu={this.showMainMenu}
              gameRoom={gameRoom}
              playerSide={playerSide}
              socket={socket}
              showWinnerModal={showWinnerModal}
              setSocket={this.setSocket}
              toggleWinner={this.toggleWinner}
              updateGameState={this.updateGameState}
              isChooseColorVisible={isChooseColorVisible}
              userData={userData}
            />,
      instruction: <HowToPlay
              showMainMenu={this.showMainMenu}
            />,
      login: <Login
              showMainMenu={this.showMainMenu}
              joinLobby={this.joinLobby}
              setUserData={this.setUserData}
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