import React from "react";
import { StyleSheet, View, TouchableHighlight, Button, Image} from "react-native";
import Text from './CustomText';
import { vw, vh } from 'react-native-expo-viewport-units';

import {
  blue,
  blueDark,
  white,
  playerOneTile,
  playerOneTileBorder,
  playerTwoTileBorder,
  playerTwoTile,
} from "./constants/colors";
import { initialCells } from "./constants/board";
import YonmoqueAI from '../utils/YonmoqueAI';
import i18n from '../utils/i18n';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';


const ChooseColor = ({toggleChooseColor, startGame, gameData, createRoom, isCreate}) => {

  return (
    <View style={{flex: 1}}>
      <View style={[styles.margins, styles.modal]}>
        <View style={[styles.margins]}>
          <Text style={[styles.text, {marginBottom: vh(2)}]}>{i18n.t('chooseColor')}</Text>
          <TouchableHighlight
            onPress={() => {
              if (isCreate) {
                createRoom(0);
              } else {
                gameData.players[0].user.isChooseByPlayer = true;
                gameData.players[0].user.username = `${gameData.players[0].user.username} (You)`;
                if (gameData.isAI) {
                  gameData.players[1].user.username = `${gameData.players[1].user.username} (AI)`;
                  gameData.AI = new YonmoqueAI(1, [...initialCells], 6);
                }

                startGame({ ...gameData, side: 0 });
              }
            }}
          >
            <LinearGradient
              colors={['#2B7FAE', '#1A5886']}
              style={[styles.basePiece]}>
              <Text style={[styles.buttonText, styles.margins]}>{i18n.t('blue')}</Text>
            </LinearGradient>
          </TouchableHighlight>
          <Text style={[styles.text]}>{i18n.t('or')}</Text>
          <TouchableHighlight
            onPress={() => {
              if (isCreate) {
                createRoom(1);
              } else {
                gameData.players[1].user.isChooseByPlayer = true;
                gameData.players[1].user.username = `${gameData.players[1].user.username} (You)`;

                if (gameData.isAI) {
                  gameData.players[0].user.username = `${gameData.players[0].user.username} (AI)`;
                  gameData.AI = new YonmoqueAI(0, [...initialCells], 6);
                }

                startGame({ ...gameData, side: 1 });
              }
            }}
          >
            <LinearGradient
              colors={[white, playerTwoTileBorder]}
              style={[styles.basePiece]}>
              <Text style={[styles.buttonText, styles.margins]}>{i18n.t('white')}</Text>
            </LinearGradient> 
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.buttonMargin]}
            onPress={toggleChooseColor}>
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
  pieceBlue: {
    borderColor: playerOneTileBorder,
    backgroundColor: playerOneTile,
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

export default ChooseColor;