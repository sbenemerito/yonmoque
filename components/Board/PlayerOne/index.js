import React from "react";
import { StyleSheet, View, ImageBackground, Text, Image } from "react-native";
import { vw } from 'react-native-expo-viewport-units';

import {
  boardHeight,
  boardWidth,
  playerTile
} from "../../constants/board";
import {
  white,
  blue,
  blueDark,
  playerOneTile,
  playerOneTileBorder,
  yellowLight
} from "../../constants/colors";

const PlayerOne = ({pieces, name, current}) => { 
  let pieceStyle = [styles.numPieces];
  pieceStyle.push(styles.margins);
  if (current === '0') {
    pieceStyle.push(styles.glowPieceText);
  }

  let playerTileStyle = [styles.root];
  if (current === '0') {
    playerTileStyle.push(styles.rootGlow);
  }

  return (
    <View >
      <ImageBackground 
        style={playerTileStyle}>
        <View style={[styles.base, styles.margins]}>
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
    borderRadius: 12,
  },
  rootGlow: {
    backgroundColor: yellowLight,
  },
  base: {
    width: vw(playerTile * 5),
    height: vw(playerTile * 1.4),
    backgroundColor: blue,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: "wrap",
  },
  numPieces: {
    color: white,
    fontSize: vw(15),
    fontWeight: 'bold',
  },
  glowPieceText: {
    textShadowColor: yellowLight,
    textShadowRadius: 20
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
    borderWidth: 2,
    borderRadius: vw(6)/2,
    backgroundColor: playerOneTile,
    borderColor: playerOneTileBorder,
    marginTop: 'auto', 
    marginBottom: 'auto', 
  },
  nameComponent: {
    flex: 2,
    flexDirection: 'row',
  },
  name: {
    color: white,
    fontSize: vw(6),
    marginLeft: vw(2),
    marginTop: 'auto', 
    marginBottom: 'auto', 
  },
});

export default PlayerOne;