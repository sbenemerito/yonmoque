import React from "react";
import { StyleSheet, View, ImageBackground, Text, Image } from "react-native";
import { vw } from 'react-native-expo-viewport-units';

import {
  boardHeight,
  boardWidth,
  playerTile,
} from "../../constants/board";
import {
  white,
  blue,
  blueDark,
  playerOneTile,
  playerOneTileBorder,
  yellowLight,
} from "../../constants/colors";

const PlayerOne = ({pieces, name, current}) => { 
  let pieceStyle = [styles.numPieces];
  pieceStyle.push(styles.margins);
  if (current === '0') {
    pieceStyle.push(styles.glowPieceText);
  }

  let playerInnerTileStyle = [styles.base];
  playerInnerTileStyle.push(styles.margins);
  if (current === '0') {
    playerInnerTileStyle.push(styles.baseGlow);
  }

  return (
    <View >
      <ImageBackground style={styles.root}>
        <View style={playerInnerTileStyle}>
          <View style={{flex: 1}}> 
            <Image
              style={[styles.image, styles.margins]}
              source={require("../../../assets/playerone.jpg")}
            /> 
          </View>
          <View style={styles.nameComponent}> 
            <View style={styles.basePiece}></View>
            <Text style={styles.name}>{name}</Text> 
          </View>
          <View style={{flex: 1}}> 
            <Text style={pieceStyle}> {pieces} </Text> 
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: vw(boardWidth),
    height: vw(boardHeight / 3),
    backgroundColor: blueDark,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  base: {
    width: vw(playerTile * 5),
    height: vw(playerTile * 1.4),
    borderWidth: 3,
    borderRadius: 10,
    borderColor: blue,
    backgroundColor: blue,
    flexDirection: 'row',
    flexWrap: "wrap",
  },
  baseGlow: {
    borderWidth: 3,
    borderColor: yellowLight,
  },
  numPieces: {
    color: white,
    fontSize: vw(15),
    fontWeight: 'bold',
  },
  glowPieceText: {
    textShadowRadius: 20,
    textShadowColor: yellowLight,
  },
  image: {
    width: vw(playerTile),
    height: vw(playerTile),
    borderRadius: (vw(playerTile) / 2),
  }, 
  margins: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  basePiece: {
    width: vw(6),
    height: vw(6),
    marginTop: 'auto', 
    marginBottom: 'auto', 
    borderWidth: 2,
    borderRadius: vw(6)/2,
    borderColor: playerOneTileBorder,
    backgroundColor: playerOneTile,
  },
  nameComponent: {
    flex: 2,
    flexDirection: 'row',
  },
  name: {
    marginTop: 'auto', 
    marginBottom: 'auto', 
    marginLeft: vw(2),
    color: white,
    fontSize: vw(6),
  },
});

export default PlayerOne;