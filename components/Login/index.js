import React from "react";
import { ImageBackground, StyleSheet, View, TouchableHighlight, Image, TextInput } from "react-native";
import { vw, vh } from 'react-native-expo-viewport-units';
import Text from '../CustomText';
import api from '../../utils/YonmoqueApi';

import {
  white,
  black,
  grayDark,
  playerTwoTileBorder,
  playerTwoTile,
} from "../constants/colors";
import i18n from '../../utils/i18n';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    message: null
 }
 
 handleUsername = (text) => {
    this.setState({ username: text })
 }
 handlePassword = (text) => {
    this.setState({ password: text })
 }

  login() {
    const {setUserData} = this.props;

    let body = {
      username: this.state.username,
      password: this.state.password
    }
    api.post('/login', body)
      .then(response => {
        setUserData(response);
      })
      .catch(error => { 
        this.setState({ message: error.response.data.key })
      });
  }

  register() {
    const {setUserData} = this.props;

    let body = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password,
    }
    api.post('/signup', body)
      .then(response => {
        setUserData(response);
      })
      .catch((error) => {
        this.setState({ message: error.response.data.key })
      }
      );
  }

  render() {
    const {showMainMenu} = this.props;

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
            <Text style={{fontSize: vw(8), marginBottom: vh(3)}}>{i18n.t('loginTitle')}</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText = {this.handleUsername}
            />
            <Text style={{fontSize: vw(5), marginBottom: vh(3)}}>{i18n.t('username')}</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              secureTextEntry = {true}
              onChangeText = {this.handlePassword}
            />
            <Text style={{fontSize: vw(5), marginBottom: vh(3)}}>{i18n.t('password')}</Text>
            {
              this.state.message
                ? (
                  <View style={styles.margins}>
                    <Text style={{ fontSize: vw(5), marginBottom: vh(1), color: 'red' }}>{i18n.t(this.state.message)}</Text>
                  </View>
                )
                : null
            }
            <View style={styles.buttonComponent}>
              <TouchableHighlight
                onPress={() => {
                  this.register();
                }}>
                <View style={[styles.buttonBaseRegister, styles.menuButtonBase]}>
                  <View style={[styles.buttonRegister, styles.menuButton, styles.margins]}>
                    <Text style={[styles.textRegister, styles.margins]}>{i18n.t('register')}</Text>
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ paddingLeft: 15}}
                onPress={() => {
                  this.login();
                }}>
                <View style={[styles.buttonBaseLogin, styles.menuButtonBase]}>
                  <View style={[styles.buttonLogin, styles.menuButton, styles.margins]}>
                    <Text style={[styles.text, styles.margins]}>{i18n.t('login')}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
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
  buttonComponent: {
    flexDirection: 'row',
    justifyContent: "center",
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
  buttonBaseLogin: {
    backgroundColor: '#1A5886',
  },
  buttonBaseRegister: {
    backgroundColor: playerTwoTileBorder,
  },
  buttonLogin: {
    backgroundColor: '#2B7FAE',
  },
  buttonRegister: {
    backgroundColor: playerTwoTile,
  },
  menuButtonBase: {
    width: vw(40),
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
  textRegister: {
    color: black,
    fontSize: vw(5),
  },
});

export default Login;