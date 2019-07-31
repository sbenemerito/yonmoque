import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { vw } from 'react-native-expo-viewport-units';

import {
  whiteValue,
  blueValue,
  neutralValue,
  tileHeight,
  tileWidth,
} from "../constants/board";
import {
  blue,
  blueDark,
  white,
  yellowLight,
} from "../constants/colors";

const Piece = ({ pieceID }) => {
  let styleList = [styles.baseTile];
  switch(pieceID) {
    case 0:
      styleList.push(styles.whiteTile);
      break;
    case 1:
      styleList.push(styles.blueTile);
      break;
  }

  return (
    <View>
      <Text>{pieceID}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseTile: {
    width: vw(tileWidth),
    height: vw(tileHeight),
  },
  whiteTile: {
    backgroundColor: white
  },
  blueTile: {
    backgroundColor: blue
  },
  neutralTile: {
    backgroundColor: blueDark
  },
  movableTile: {
    borderWidth: 2,
    borderColor: yellowLight,
  },
});

export default Piece;