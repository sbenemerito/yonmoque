import React from "react";
import { ImageBackground, StyleSheet, View, TouchableHighlight, Image, TextInput } from "react-native";
import { vw, vh } from 'react-native-expo-viewport-units';
import Text from '../CustomText';

import {
  white,
  grayDark
} from "../constants/colors";
import i18n from '../../utils/i18n';

class Login extends React.Component {
  render() {
    const {showMainMenu, joinLobby} = this.props;

    return (
      <ImageBackground 
        source={require("../../assets/backgrounds/mainmenubackground.jpg")}
        style={styles.background}>
        <View style={styles.homeComponent}>
          <TouchableHighlight 
            style={styles.button}
            onPress={() => {
              showMainMenu();
            }}>
            <Image
              style={[{width: vw(7), height: vw(7)}, styles.margins]}
              source={require("../../assets/icons/settings.png")}/>
          </TouchableHighlight>
        </View>
        <View style={styles.loginComponent}>
          <View style={styles.margins}>
            <Text style={{fontSize: vw(10), marginBottom: vh(3)}}>{i18n.t('loginTitle')}</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
            <Text style={{fontSize: vw(5), marginBottom: vh(3)}}>{i18n.t('username')}</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
            <Text style={{fontSize: vw(5), marginBottom: vh(3)}}>{i18n.t('password')}</Text>
            <TouchableHighlight
              onPress={joinLobby}>
              <View style={[styles.buttonBase, styles.menuButtonBase]}>
                <View style={[styles.buttonLogin, styles.menuButton, styles.margins]}>
                  <Text style={[styles.text, styles.margins]}>{i18n.t('login')}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
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
  loginComponent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
  },
  homeComponent: {
    width: '100%',
    paddingTop: vw(30),
    paddingRight: vw(5),
    alignItems: 'flex-end',
  },
  room: {
    backgroundColor: white,
    color: grayDark,
    margin: vh(1),    
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#2B7FAE',
    width: vw(32),
    height: vh(7),
    borderRadius: vh(2),
  },
  margins: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  buttonBase: {
    backgroundColor: '#1A5886',
  },
  buttonLogin: {
    backgroundColor: '#2B7FAE',
  },
  menuButtonBase: {
    width: "100%",
    height: vh(7),
    borderRadius: 12,
    marginTop: 20,
  },
  menuButton: {
    width: '95%',
    height: '80%',
    borderRadius: 10,
  },
  text: {
    color: white,
    fontSize: vw(5),
  },
});

export default Login;