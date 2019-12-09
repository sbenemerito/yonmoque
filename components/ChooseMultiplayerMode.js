import React from "react";
import { StyleSheet, View, TouchableHighlight, Image} from "react-native";
import Text from './CustomText';
import { vw, vh } from 'react-native-expo-viewport-units';

import {
  blue,
  blueDark,
  white,
  playerTwoTileBorder,
  playerTwoTile,
} from "./constants/colors";
import i18n from '../utils/i18n';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const ChooseMultiplayerMode = ({toggleChooseMultiplayerMode, startGame, gameData, isCreate, joinLobby, login, userData}) => {
  const gameDataLocal = {
    name: "Local Game",
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
    isAI: false,
    turn: 0
  };

  return (
    <View style={{flex: 1}}>
      <View style={[styles.margins, styles.modal]}>
        <View style={[styles.margins]}>
          <Text style={[styles.text, { marginBottom: vh(2) }]}>{i18n.t('multiplayerMode')}</Text>
          <TouchableHighlight
            onPress={() => {
              startGame({ ...gameDataLocal, side: 0 });
            }}
          >
            <LinearGradient
              colors={[white, playerTwoTileBorder]}
              style={[styles.basePiece]}>
              <Text style={[styles.buttonText, styles.margins]}>{i18n.t('samePhone')}</Text>
            </LinearGradient>
          </TouchableHighlight>
          <Text style={[styles.text]}>{i18n.t('or')}</Text>
          <TouchableHighlight
            onPress={() => {
              if(userData !== null) {
                joinLobby()
              } else {
                login()
              }
            }}>
            <LinearGradient
              colors={[white, playerTwoTileBorder]}
              style={[styles.basePiece]}>
              <Text style={[styles.buttonText, styles.margins]}>{i18n.t('internet')}</Text>
            </LinearGradient>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.buttonMargin]}
            onPress={toggleChooseMultiplayerMode}>
            <View style={[styles.buttonBase, ]}>
              <LinearGradient
                colors={['#2B7FAE', '#1A5886']}
                style={[ styles.buttonBase]}>
                <Icon name="times" style={[{color: white, fontSize: 30}, styles.margins]} />
              </LinearGradient>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: vw(75),
    height: vh(50),
    backgroundColor: white,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: white,
  },
  text: {
    fontSize: vw(8),
    color: blueDark,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  basePiece: {
    width: vw(40),
    height: vh(7),
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 10,
  },
  pieceWhite: {
    borderColor: playerTwoTileBorder,
    backgroundColor: playerTwoTile,
  },
  buttonMargin: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: vh(4),
  },
  buttonText: {
    fontSize: vw(5),
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
  margins: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default ChooseMultiplayerMode;