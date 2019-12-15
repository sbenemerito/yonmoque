import React, { Component } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
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

export default class Piece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDoneFlip: false,
      animatedPieceSyle: null,
      colorOne: null,
      colorTwo: null,
    };
  }

  componentWillMount() {
    const { pieceID } = this.props;

    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })

    this.front = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });
    this.back = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });

    this.changePieceColor(pieceID);
    
  }

  changePieceColor(pieceID) {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.front }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.back }
      ]
    }

    switch(pieceID) {
      case '0':
        this.setState({
          colorOne: playerOneTile,
          colorTwo: playerOneTileBorder,
          pieceStyle: frontAnimatedStyle,
        });
        break;
      case '1':
        this.setState({
          colorOne: playerTwoTile,
          colorTwo: playerTwoTileBorder,
          pieceStyle: backAnimatedStyle,
        });
        break;
    }
  }

  async flipping(pieceID) {
    if(this.value >= 90){
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 500
      }).start();
      setTimeout(() => {
        this.changePieceColor(pieceID);
      }, 200);
    } else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        duration: 500
      }).start();
      setTimeout(() => {
        this.changePieceColor(pieceID);
      }, 200);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.pieceID !== prevProps.pieceID) {
      this.flipping(this.props.pieceID);
    }
  }

  render() {
    const { isDoneFlip, colorOne, colorTwo, pieceStyle } = this.state;
    let styleList = [styles.basePiece];

    return (
      <View>
        <Animated.View style={[pieceStyle]}>
          <LinearGradient
            colors={[colorOne, colorTwo]}
            style={styles.basePiece}>
          </LinearGradient>
        </Animated.View>
      </View>
    );
  }
}

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