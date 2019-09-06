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
  grayMedium,
  white,
  yellowTile,
} from "../constants/colors";
import Piece from "../Piece";

const Tile = ({ tileColor, isMovable, piece }) => {
  let styleList = [styles.baseTile];
  switch(tileColor) {
    case whiteValue:
      styleList.push(styles.whiteTile);
      break;
    case blueValue:
      styleList.push(styles.blueTile);
      break;
    case neutralValue:
      styleList.push(styles.neutralTile);
      break;
  }

  if (isMovable) {
    styleList.push(styles.movableTile);
  }
  
  return (
    <View style={styleList}>
      {
      piece !== null 
        ? <Piece pieceID={piece}/>
        : null
      }
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
    backgroundColor: grayMedium
  },
  movableTile: {
    borderWidth: tileHeight + vw(4),
    borderColor: yellowTile,
  },
});

export default Tile;