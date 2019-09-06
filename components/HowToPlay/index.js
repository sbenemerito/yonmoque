import React from "react";
import { ImageBackground, StyleSheet, View, TouchableHighlight, Image } from "react-native";
import { vw, vh } from 'react-native-expo-viewport-units';
import Text from '../CustomText';
import Swiper from 'react-native-swiper';
import i18n from '../../utils/i18n';

import {
  white,
  grayDark,
  black
} from "../constants/colors";

class HowToPlay extends React.Component {
  render() {
    const {showMainMenu} = this.props;
    let lang = 'en';
    if (i18n.locale == 'ja') {
      lang = 'ja';
    }
    console.log(lang);
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
        
        <Text style={[styles.text]} type="PressStart">{i18n.t('howToPlay')}</Text>
        <Swiper style={styles.slide} showsButtons={true}>
          <View style={styles.slide}>

            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={{ uri: "../../assets/how-to-play/" + lang + "/1.jpg"}}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={{ uri: "../../assets/how-to-play/" + lang + "/2.jpg"}}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={{ uri: "../../assets/how-to-play/" + lang + "/3.jpg"}}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={{ uri: "../../assets/how-to-play/" + lang + "/4.jpg"}}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={{ uri: "../../assets/how-to-play/" + lang + "/5.jpg"}}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/5.1.gif")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={require("../../assets/how-to-play/5.2.gif")}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={{ uri: "../../assets/how-to-play/" + lang + "/6.jpg"}}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={{ uri: "../../assets/how-to-play/" + lang + "/7.jpg"}}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={{ uri: "../../assets/how-to-play/" + lang + "/8.jpg"}}/>
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