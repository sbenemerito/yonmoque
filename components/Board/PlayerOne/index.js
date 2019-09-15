import React from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import Text from '../../CustomText';
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

const PlayerOne = ({pieces, name, current, gameRoom}) => { 
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

  let adminStyle = [styles.name];
  if(gameRoom.players[0].user ? gameRoom.players[0].user.is_admin === 1 : false) {
    adminStyle.push(styles.admin);
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
            <Text style={adminStyle}>{name}</Text> 
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
    height: vw(boardHeight / 4),
    backgroundColor: blueDark,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  base: {
    width: vw(playerTile * 5),
    height: vw(playerTile),
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
  nameComponent: {
    flex: 2,
    flexDirection: 'row',
  },
  image: {
    width: vw(playerTile - 4),
    height: vw(playerTile - 4),
    borderRadius: (vw(playerTile) / 2),
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
  name: {
    marginTop: 'auto', 
    marginBottom: 'auto', 
    marginLeft: vw(2),
    color: white,
    fontSize: vw(6),
  },
  numPieces: {
    color: white,
    fontSize: vw(12),
    fontWeight: 'bold',
  },
  glowPieceText: {
    textShadowRadius: 20,
    textShadowColor: yellowLight,
  },
  margins: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  admin: {
    color: '#FF0000',
    fontWeight: 'bold',
  }
});

export default PlayerOne;