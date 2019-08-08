import React from "react";
import { StyleSheet, View, ImageBackground, Text, Image } from "react-native";
import { vw } from 'react-native-expo-viewport-units';
import LinearGradient from 'react-native-linear-gradient';

import {
  boardHeight,
  boardWidth,
  playerTile
} from "../../constants/board";
import {
  white,
  blue,
  grayLight,
  playerTwoTile,
  playerTwoTileBorder,
  yellowLight
} from "../../constants/colors";

const PlayerTwo = ({pieces, name, current}) => {  
  let pieceStyle = [styles.numPieces];
  pieceStyle.push(styles.margins);
  if (current === '1') {
    pieceStyle.push(styles.glowPieceText);
  }

  let playerTileStyle = [styles.root];
  if (current === '1') {
    playerTileStyle.push(styles.rootGlow);
  }

  return (
    <View >
      <ImageBackground 
        style={playerTileStyle}>
        <LinearGradient 
          colors={[white, blue]}
          style={[styles.base, styles.margins]}>
          <View style={{flex: 1}}> 
            <Text style={pieceStyle}> {pieces} </Text> 
          </View>
          <View style={styles.nameComponent}> 
            <Text style={styles.name}>{name}</Text> 
            <View style={styles.basePiece}></View>           
          </View>
          <View style={{flex: 1}}> 
            <Image
              style={[styles.image, styles.margins]}
              source={require("../../../assets/playertwo.png")}
            /> 
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: vw(boardWidth),
    height: vw(boardHeight / 3),
    backgroundColor: grayLight,
    borderRadius: 12,
  },
  rootGlow: {
shadowColor: yellowLight,
textShadowRadius: 20
  },
  base: {
    width: vw(playerTile * 5),
    height: vw(playerTile * 1.4),
    backgroundColor: white,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: "wrap",
  },
  numPieces: {
    color: blue,
    fontSize: vw(15),
    fontWeight: 'bold'
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
    backgroundColor: playerTwoTile,
    borderColor: playerTwoTileBorder,
    marginTop: 'auto', 
    marginBottom: 'auto', 
  },
  nameComponent: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: "flex-end",
  },
  name: {
    color: blue,
    fontSize: vw(6),
    marginLeft: vw(2),
    marginTop: 'auto', 
    marginBottom: 'auto', 
    marginRight: 8
  },
});

export default PlayerTwo;