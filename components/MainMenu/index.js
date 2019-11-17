import React from "react";
import { StyleSheet, View, Image, TouchableHighlight } from "react-native";
import Text from '../CustomText';
import {
  white,
}  from "../constants/colors";
import { vw, vh } from "react-native-expo-viewport-units";
import Modal from "react-native-modal";
import ChooseColor from "../ChooseColorModal";
import ChooseMultiplayerMode from "../ChooseMultiplayerMode";
import Settings from "../SettingsModal";
import i18n from '../../utils/i18n';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

class MainMenu extends React.Component {

  render() {
    const { startGame, joinLobby, howToPlay, toggleChooseColor, toggleChooseMultiplayerMode, login, toggleSettings } = this.props;
    const gameDataAI = {
      name: "Playing with AI",
      players: {
        "0": {
          user: {
            username: `${i18n.t('player')} 1`
          },
          skin: null
        },
        "1": {
          user: {
            username: `${i18n.t('player')} 2`
          },
          skin: null
        }
      },
      secret: null,
      isMultiplayer: false,
      isAI: true,
      turn: 0
    };

    return (
      <View style={styles.root}>
        <View style={styles.settingComponent}>
          <TouchableHighlight
            onPress={toggleSettings}
            style={{borderRadius: vw(12) / 2,}}>
              <LinearGradient
                colors={['#2B7FAE', '#1A5886']}
                style={[ styles.roundButtonBase, styles.margins]}>
                <Icon name="cogs" style={[styles.icon, styles.margins]} />
              </LinearGradient>
          </TouchableHighlight>
        </View>
        <View style={styles.imageComponent}>
          <Image
            style={{width: vw(80), height: vw(60),}}
            source={require("../../assets/yonmoque.png")}
          />
        </View>
        
        <View style={styles.menuComponent}>
          <Modal isVisible={this.props.isChooseColorVisible}>
            <ChooseColor 
              toggleChooseColor={toggleChooseColor}
              startGame={startGame}
              gameData={gameDataAI}
            />
          </Modal>
          <Modal isVisible={this.props.isChooseMultiplayerModeVisible}>
            <ChooseMultiplayerMode 
              toggleChooseMultiplayerMode={toggleChooseMultiplayerMode}
              startGame={startGame}
              joinLobby={joinLobby}
              login={login}
              userData={this.props.userData}
            />
          </Modal>
          <Modal isVisible={this.props.isSettingsVisible}>
            <Settings 
              toggleSettings={toggleSettings}
              startGame={startGame}
              joinLobby={joinLobby}
              login={login}
              userData={this.props.userData}
            />
          </Modal>
          <TouchableHighlight
            onPress={toggleChooseColor}
            style={{marginTop: 20, borderRadius: 12}}>
            <LinearGradient
              colors={['#2B7FAE', '#1A5886']}
              style={[ styles.menuButtonBase, styles.margins]}>
              <Text style={[styles.text, styles.margins]}><Icon name="gamepad" style={styles.icon} /> {i18n.t('withAi')}</Text>
            </LinearGradient>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={toggleChooseMultiplayerMode}
            style={{marginTop: 20, borderRadius: 12}}>
              <LinearGradient
                colors={['#2B7FAE', '#1A5886']}
                style={[ styles.menuButtonBase, styles.margins]}>
                <Text style={[styles.text, styles.margins]}><Icon name="user-friends" style={styles.icon} /> {i18n.t('multiplayer')}</Text>
              </LinearGradient>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={howToPlay}
            style={{marginTop: 20, borderRadius: 12}}>
              <LinearGradient
                colors={['#2B7FAE', '#1A5886']}
                style={[ styles.menuButtonBase, styles.margins]}>
                <Text style={[styles.text, styles.margins]}><Icon name="chalkboard-teacher" style={styles.icon} /> {i18n.t('howto')}</Text>
              </LinearGradient>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  menuComponent: {
    alignItems: "center",
    marginTop: vh(8),
  },
  imageComponent: {
    alignItems: "center",
    marginTop: vh(15),
  },
  settingComponent: {
    right: 0,
    marginTop: vh(7),
    marginRight: vw(5),
    position: 'absolute'
  },
  buttonBase: {
    backgroundColor: '#1A5886',
  },
  button: {
    backgroundColor: '#2B7FAE',
  },
  menuButtonBase: {
    width: vw(60),
    height: vh(7),
    borderRadius: 12,
  },
  menuButton: {
    width: '95%',
    height: '80%',
    borderRadius: 10,
  },
  roundButtonBase: {
    width: vw(12),
    height: vw(12),
    borderRadius: vw(12) / 2,
  },
  roundButton: {
    width: '80%',
    height: '80%',
    borderRadius: vw(12) / 2,
  },
  text: {
    color: white,
    fontSize: vw(5),
  },
  icon: {
    color: white,
    fontSize: 20
  },
  margins: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default MainMenu;