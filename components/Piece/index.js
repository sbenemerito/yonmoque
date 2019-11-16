import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { vw } from 'react-native-expo-viewport-units';
import { LinearGradient } from 'expo-linear-gradient';

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
  let colorOne;
  let colorTwo;
  switch(pieceID) {
    case '0':
      colorOne = playerOneTile;
      colorTwo = playerOneTileBorder;
      break;
    case '1':
      colorOne = playerTwoTile;
      colorTwo = playerTwoTileBorder;
      break;
  }

  return (
    <LinearGradient
      colors={[colorOne, colorTwo]}
      style={styles.basePiece}>
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  basePiece: {
    width: vw(tileWidth-2),
    height: vw(tileHeight-2),
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