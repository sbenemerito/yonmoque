import React from "react";
import { StyleSheet, View, Image, TouchableHighlight } from "react-native";
import Text from '../CustomText';
import {
  white,
}  from "../constants/colors";
import { vw, vh } from "react-native-expo-viewport-units";

class MainMenu extends React.Component {
  render() {
    const { startGame } = this.props;

    return (
      <View style={styles.root}>
        <View style={styles.settingComponent}>
          <TouchableHighlight
            onPress={startGame}>
            <View style={[styles.buttonBase, styles.roundButtonBase]}>
              <View style={[styles.button, styles.roundButton, styles.margins]}>
                <Image
                  style={[{width: vw(8), height: vw(8)}, styles.margins]}
                  source={require("../../assets/icons/settings.png")}
                />
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.imageComponent}>
          <Image
            style={{width: vw(80), height: vw(60),}}
            source={require("../../assets/yonmoque.png")}
          />
        </View>
        <View style={styles.menuComponent}>
          <TouchableHighlight
            onPress={startGame}>
            <View style={[styles.buttonBase, styles.menuButtonBase]}>
              <View style={[styles.button, styles.menuButton, styles.margins]}>
                <Text style={[styles.text, styles.margins]}> Play with AI </Text> 
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={startGame}>
            <View style={[styles.buttonBase, styles.menuButtonBase]}>
              <View style={[styles.button, styles.menuButton, styles.margins]}>
                <Text style={[styles.text, styles.margins]}> Multiplayer </Text> 
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={[styles.buttonBase, styles.menuButtonBase]}>
              <View style={[styles.button, styles.menuButton, styles.margins]}>
                <Text style={[styles.text, styles.margins]}> How to Play </Text> 
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  menuComponent: {
    alignItems: "center",
    marginTop: vh(8),
  },
  imageComponent: {
    alignItems: "center",
    marginTop: vh(3),
  },
  settingComponent: {
    alignItems: "flex-end",
    marginTop: vh(5),
    marginRight: vw(3),
  },
  buttonBase: {
    backgroundColor: '#1A5886',
  },
  button: {
    backgroundColor: '#2B7FAE',
  },
  menuButtonBase: {
    width: vw(60),
    height: vh(7),
    borderRadius: 12,
    marginTop: 20,
  },
  menuButton: {
    width: '95%',
    height: '80%',
    borderRadius: 10,
  },
  roundButtonBase: {
    width: vw(12),
    height: vw(12),
    borderRadius: vw(12) / 2,
  },
  roundButton: {
    width: '80%',
    height: '80%',
    borderRadius: vw(12) / 2,
  },
  text: {
    color: white,
    fontSize: vw(5),
  },
  margins: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default MainMenu;