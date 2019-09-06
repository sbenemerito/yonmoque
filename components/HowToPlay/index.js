import React from "react";
import { ImageBackground, StyleSheet, View, TouchableHighlight, Image } from "react-native";
import { vw, vh } from 'react-native-expo-viewport-units';
import Text from '../CustomText';
import Swiper from 'react-native-swiper'

import {
  white,
  grayDark,
  black
} from "../constants/colors";

class HowToPlay extends React.Component {
  render() {
    const {showMainMenu} = this.props;

    return (
      <ImageBackground 
        source={require("../../assets/backgrounds/mainmenubackground.jpg")}
        style={styles.background}>
          
        <View style={styles.container}>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableHighlight 
              style={styles.button}
              onPress={() => {
                showMainMenu();
              }}>
              <Image
                style={[{width: vw(4), height: vw(4)}, styles.margins]}
                source={require("../../assets/icons/settings.png")}/>
            </TouchableHighlight>
          </View>
        </View>
        
        <Text style={[styles.text]} type="PressStart">How to Play</Text>
        <Swiper style={styles.slide} showsButtons={true}>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/des-1.jpg")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/des-2.jpg")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/des-3.jpg")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/des-4.jpg")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/des-5.jpg")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/des-5.5.gif")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/des-6.gif")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/des-7.jpg")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/des-8.jpg")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/des-9.jpg")}/>
          </View>
        </Swiper>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    backgroundColor: '#00FFFFFF',
  },
  container: {
    width: '100%',
    paddingTop: vh(8),
    paddingLeft: vw(5),
    paddingRight: vw(5),
  },
  room: {
    backgroundColor: white,
    color: grayDark,
    margin: vh(1),    
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#2B7FAE',
    width: vw(20),
    height: vh(7),
    borderRadius: vh(2),
  },
  waiting: {
    backgroundColor: white
  },
  started: {
    backgroundColor: grayDark
  },
  margins: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  images: {
    borderRadius: vh(2),
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: black,
    fontSize: vw(7.5),
    marginTop: 'auto',
  }
});

export default HowToPlay;