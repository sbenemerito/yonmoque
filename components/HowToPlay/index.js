import React from "react";
import { ImageBackground, StyleSheet, View, TouchableHighlight, Image } from "react-native";
import { vw, vh } from 'react-native-expo-viewport-units';
import Text from '../CustomText';
import Swiper from 'react-native-swiper';
import i18n from '../../utils/i18n';
import { Platform } from 'react-native';
import {
  white,
  grayDark,
  black
} from "../constants/colors";

class HowToPlay extends React.Component {
  render() {
    const {showMainMenu} = this.props;
    let lang = 'en';
    if (i18n.locale === 'ja-JP') {
      lang = 'ja';
    }
    const imagesMap = {
      en: [
        null,
        require("../../assets/how-to-play/en/1.jpg"),
        require("../../assets/how-to-play/en/2.jpg"),
        require("../../assets/how-to-play/en/3.jpg"),
        require("../../assets/how-to-play/en/4.jpg"),
        require("../../assets/how-to-play/en/5.jpg"),
        require("../../assets/how-to-play/en/6.jpg"),
        require("../../assets/how-to-play/en/7.jpg"),
        require("../../assets/how-to-play/en/8.jpg")
      ],
      ja: [
        null,
        require("../../assets/how-to-play/ja/1.jpg"),
        require("../../assets/how-to-play/ja/2.jpg"),
        require("../../assets/how-to-play/ja/3.jpg"),
        require("../../assets/how-to-play/ja/4.jpg"),
        require("../../assets/how-to-play/ja/5.jpg"),
        require("../../assets/how-to-play/ja/6.jpg"),
        require("../../assets/how-to-play/ja/7.jpg"),
        require("../../assets/how-to-play/ja/8.jpg")
      ],
    };

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
        <Swiper 
            containerStyle={Platform.OS === 'ios' ? styles.slide : undefined}
            style={Platform.OS !== 'ios' ? styles.slide : undefined}
            showsButtons={true}
          >
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={imagesMap[lang][1]}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={imagesMap[lang][2]}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={imagesMap[lang][3]}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={imagesMap[lang][4]}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={imagesMap[lang][5]}/>
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
              source={imagesMap[lang][6]}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={imagesMap[lang][7]}/>
          </View>
          <View style={styles.slide}>
            <Image
              style={[{width: vw(85), height: vw(130)}, styles.images]}
              source={imagesMap[lang][8]}/>
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