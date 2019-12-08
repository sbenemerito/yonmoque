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

import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

class HowToPlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperIndex: 0,
    }
    this.onIndexChanged.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: (this.props.lastHowToUseModalTimestamp) ? false : true,
      })
    }, 100);
  }

  onIndexChanged = (index) => {
      this.setState({
        swiperIndex: index
      });
  }

  render() {
    const {showMainMenu} = this.props;
    
    let button;
    let swiperIndex = this.state.swiperIndex;
    if (swiperIndex !== 9) {
      button = (
        <View style={styles.buttonContainer}>
          <TouchableHighlight 
            style={{borderRadius: vh(2), }}
            onPress={() => {
              if(this.state.swiperIndex > 0) {
                this.refs.swiper.scrollBy(-1)}
              }
            }>
            <LinearGradient
              colors={['white', white]}
              style={[ styles.backButton, styles.margins]}>
            <Icon name="angle-double-left" style={[{color: '#2B7FAE', fontSize: 30}, styles.margins]} />
            </LinearGradient>
          </TouchableHighlight>
          <TouchableHighlight 
            style={{borderRadius: vh(2), }}
            onPress={() => {this.refs.swiper.scrollBy(1)}}>
            <LinearGradient
              colors={['#2B7FAE', '#1A5886']}
              style={[ styles.nextButton, styles.margins]}>
            <Icon name="angle-double-right" style={[{color: white, fontSize: 30}, styles.margins]} />
            </LinearGradient>
          </TouchableHighlight>
        </View>
      )
    } else {
      button = (
        <View style={styles.buttonContainer}>
          <TouchableHighlight 
            style={{borderRadius: vh(2), }}
            onPress={() => {showMainMenu();}}>
            <LinearGradient
              colors={['#2B7FAE', '#1A5886']}
              style={[ styles.startButton, styles.margins]}>
            <Text style={[{color: white, fontSize: 20}, styles.margins]}>{i18n.t('finishHowToPlay')}</Text>
            </LinearGradient>
          </TouchableHighlight>
        </View>
      )
    }

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
          <View style={{alignItems: 'flex-start'}}>
            <TouchableHighlight 
              style={styles.button}
              onPress={() => {
                showMainMenu();
              }}>
              <Icon name="home" style={[{color: white, fontSize: 20}, styles.margins]} />
            </TouchableHighlight>
          </View>
        </View>
        
        <Swiper 
            containerStyle={Platform.OS === 'ios' ? styles.slide : undefined}
            style={Platform.OS !== 'ios' ? styles.slide : undefined}
            onIndexChanged={this.onIndexChanged}
            showsButtons={true}
            showsButtons={false}
            loop={false}
            ref='swiper'
            activeDot={
              <View style={[{ 
                  backgroundColor: '#2B7FAE',
                  width: 24, 
                  height: 8, 
                  borderRadius: 4, 
                  marginLeft: 3, 
                  marginRight: 3, 
                  marginTop: 3, 
                  marginBottom: 3,
              }, styles.shadowDefault]} 
          />}
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
        {button}
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
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 20, 
    backgroundColor: 'white', 
    alignSelf: 'baseline', 
    borderRadius: vh(2), 
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  button: {
    backgroundColor: '#2B7FAE',
    width: vh(6),
    height: vh(6),
    borderRadius: vh(6),
  },
  nextButton: {
    backgroundColor: '#2B7FAE',
    width: vw(35),
    height: vh(7),
    borderRadius: vh(2),
  },
  backButton: {
    backgroundColor: white,
    width: vw(20),
    height: vh(7),
    borderRadius: vh(2),
  },
  startButton: {
    backgroundColor: '#2B7FAE',
    width: vw(50),
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