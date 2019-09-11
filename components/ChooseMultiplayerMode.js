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


const ChooseMultiplayerMode = ({toggleChooseMultiplayerMode, startGame, gameData, isCreate, joinLobby, login, userData}) => {

  return (
    <View style={{flex: 1}}>
      <View style={[styles.margins, styles.modal]}>
        <View style={[styles.margins]}>
          <Text style={[styles.text, { marginBottom: vh(2) }]}>{i18n.t('multiplayerMode')}</Text>
          <TouchableHighlight>
            <View style={[styles.basePiece, styles.pieceWhite]}>
              <Text style={[styles.buttonText, styles.margins]}>{i18n.t('samePhone')}</Text>
            </View>
          </TouchableHighlight>
          <Text style={[styles.text]}>{i18n.t('or')}</Text>
          <TouchableHighlight
            onPress={() => {
              console.log(userData)
              if(userData !== null) {
                joinLobby()
              } else {
                login()
              }
            }}>
            <View style={[styles.basePiece, styles.pieceWhite]}>
              <Text style={[styles.buttonText, styles.margins]}>{i18n.t('internet')}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.buttonMargin]}
            onPress={toggleChooseMultiplayerMode}>
            <View style={[styles.buttonBase, ]}>
              <View style={[styles.button, styles.margins]}>
                <Image
                  style={[{width: vw(5), height: vw(5)}, styles.margins]}
                  source={require("../assets/icons/close.png")}
                />
              </View>
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
    borderColor: blueDark,
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
    marginTop: vh(2), 
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 5,
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