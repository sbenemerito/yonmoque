import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { vw } from 'react-native-expo-viewport-units';

import {
  tileHeight,
  tileWidth,
} from "../constants/board";
import {
  playerOneTile,
  playerTwoTile,
  playerOneTileBorder,
  playerTwoTileBorder,
} from "../constants/colors";

const Piece = ({ pieceID }) => {
  let styleList = [styles.basePiece];
  switch(pieceID) {
    case '0':
      styleList.push(styles.whitePiece);
      break;
    case '1':
      styleList.push(styles.bluePiece);
      break;
  }

  return (
    <View style={styleList}></View>
  );
};

const styles = StyleSheet.create({
  basePiece: {
    width: vw(tileWidth-2),
    height: vw(tileHeight-2),
    borderWidth: 2,
    borderRadius: vw(tileWidth-2)/2,
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },
  whitePiece: {
    backgroundColor: playerOneTile,
    borderColor: playerOneTileBorder,
  },
  bluePiece: {
    backgroundColor: playerTwoTile,
    borderColor: playerTwoTileBorder,
  },
});

export default Piece;