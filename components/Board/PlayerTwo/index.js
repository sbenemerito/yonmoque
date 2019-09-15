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
  grayLight,
  playerTwoTile,
  playerTwoTileBorder,
  yellowLight,
} from "../../constants/colors";

const PlayerTwo = ({pieces, name, current, gameRoom}) => {
  let pieceStyle = [styles.numPieces];
  pieceStyle.push(styles.margins);
  if (current === '1') {
    pieceStyle.push(styles.glowPieceText);
  }

  let playerInnerTileStyle = [styles.base];
  playerInnerTileStyle.push(styles.margins);
  if (current === '1') {
    playerInnerTileStyle.push(styles.baseGlow);
  }

  let adminStyle = [styles.name];
  if(gameRoom.players[1].user ? gameRoom.players[1].user.is_admin === 1 : false) {
    adminStyle.push(styles.admin);
  }

  return (
    <View >
      <ImageBackground style={styles.root}>
        <View style={playerInnerTileStyle}>
          <View style={{flex: 1}}> 
            <Text style={pieceStyle}> {pieces} </Text> 
          </View>
          <View style={styles.nameComponent}> 
            <Text style={adminStyle}>{name}</Text> 
            <View style={styles.basePiece}></View>           
          </View>
          <View style={{flex: 1}}> 
            <Image
              style={[styles.image, styles.margins]}
              source={require("../../../assets/playertwo.png")}
            /> 
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
    backgroundColor: grayLight,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  base: {
    width: vw(playerTile * 5),
    height: vw(playerTile),
    borderWidth: 3,
    borderRadius: 10,
    borderColor: white,
    backgroundColor: white,
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
    justifyContent: "flex-end",
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
    borderColor: playerTwoTileBorder,
    backgroundColor: playerTwoTile,
  },
  name: {
    marginTop: 'auto', 
    marginBottom: 'auto', 
    marginLeft: vw(2),
    marginRight: 8,
    color: blue,
    fontSize: vw(6),
  },
  numPieces: {
    color: blue,
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

export default PlayerTwo;