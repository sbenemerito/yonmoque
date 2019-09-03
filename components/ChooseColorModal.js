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


const ChooseColor = ({toggleChooseColor, startGame, gameData, createRoom, isCreate}) => {

  return (
    <View style={{flex: 1}}>
      <View style={[styles.margins, styles.modal]}>
        <View style={[styles.margins]}>
          <Text style={[styles.text, {marginBottom: vh(2)}]}>Choose your color!</Text>
          <TouchableHighlight
            onPress={() => {
              if (isCreate) {
                createRoom(0);
              } else {
                gameData.players[0].name = `${gameData.players[0].name} (You)`;

                if (gameData.isAI) {
                  gameData.players[1].name = `${gameData.players[1].name} (AI)`;
                  gameData.AI = new YonmoqueAI(1, [...initialCells], 6);
                }

                startGame({ ...gameData, side: 0 });
              }
            }}
          >
            <View style={[styles.basePiece, styles.pieceBlue]}>
              <Text style={[styles.buttonText, styles.margins]}>Blue</Text>
            </View>
          </TouchableHighlight>
          <Text style={[styles.text]}>or</Text>
          <TouchableHighlight
            onPress={() => {
              if (isCreate) {
                createRoom(1);
              } else {
                gameData.players[1].name = `${gameData.players[1].name} (You)`;

                if (gameData.isAI) {
                  gameData.players[0].name = `${gameData.players[0].name} (AI)`;
                  gameData.AI = new YonmoqueAI(0, [...initialCells], 6);
                }

                startGame({ ...gameData, side: 1 });
              }
            }}
          >
            <View style={[styles.basePiece, styles.pieceWhite]}>
              <Text style={[styles.buttonText, styles.margins]}>White</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.buttonMargin]}
            onPress={toggleChooseColor}>
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
    fontSize: vw(9),
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
    fontSize: vw(7),
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