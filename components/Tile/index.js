import React from "react";
import { StyleSheet, View } from "react-native";

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

const Tile = ({ tileColor, isMovable }) => {
  return (
    <View
      style={() => {
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
      }}
    >
    </View>
  );
};

const styles = StyleSheet.create({
  baseTile: {
    width: tileWidth,
    height: tileHeight,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: yellowLight
  },
});

export default Tile;