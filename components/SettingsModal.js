import React from "react";
import { StyleSheet, View, TouchableHighlight, Button, Image} from "react-native";
import Text from './CustomText';
import { vw, vh } from 'react-native-expo-viewport-units';
import socketIO from 'socket.io-client';

import {
  blue,
  blueDark,
  white,
  playerOneTile,
  playerOneTileBorder,
  playerTwoTileBorder,
  playerTwoTile,
} from "./constants/colors";

import i18n from '../utils/i18n';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';


const Settings = ({toggleSettings, setSocket, socket, setUserData}) => {

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['white', white]}
        style={[styles.margins, styles.modal]}>
          <View style={{flexDirection: 'row', marginTop: 10, marginHorizontal: 10}}>
            <Text style={[styles.text]}>{i18n.t('settings')}</Text>
            <TouchableHighlight 
              style={[{borderRadius: vw(12) / 2}]}
              onPress={toggleSettings}>
              <LinearGradient
                colors={['#2B7FAE', '#1A5886']}
                style={[ styles.buttonBase]}>
                <Icon name="times" style={[{color: white, fontSize: 30}, styles.margins]} />
              </LinearGradient>
            </TouchableHighlight>
          </View>
        <View style={[styles.margins]}>
          <Text style={[{fontSize: vw(6), color: blueDark, marginHorizontal: 'auto'}]}>{i18n.t('selectLanguage')}</Text>
          <TouchableHighlight 
              style={[{borderRadius: vw(12) / 2}]}
              onPress={() => {
                i18n.locale = 'en-JP'
                toggleSettings();
              }}>
              <View style={styles.imageComponent}>
                <Image style={{width: vw(10), height: vw(10),}}
                  source={require("../assets/en-JP.png")}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight 
              style={[{borderRadius: vw(12) / 2}]}
              onPress={() => {
                i18n.locale = 'ja-JP'
                toggleSettings();
              }}>
              <View style={styles.imageComponent}>
                <Image style={{width: vw(10), height: vw(10),}}
                  source={require("../assets/ja-JP.png")}
                />
              </View>
            </TouchableHighlight>
        </View>
        <TouchableHighlight 
          style={[{borderRadius: vw(12) / 2, marginBottom: 15, marginHorizontal: 10}]}
          onPress={() => {
            if(socket) {
              socket.disconnect();
              setSocket(null);
              setUserData(null);
              toggleSettings();
            }
          }}>
          <LinearGradient
            colors={['#2B7FAE', '#1A5886']}
            style={[{height: vw(12), borderRadius: vw(12) / 2,}]}>
            <Text style={[{color: white, fontSize: 30}, styles.margins]}><Icon name="sign-out-alt" style={[{fontSize: 20}, styles.margins]}/> {i18n.t('logout')}</Text>
          </LinearGradient>   
        </TouchableHighlight>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: vw(75),
    height: vh(50),
    backgroundColor: white,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: white,
  },
  text: {
    fontSize: vw(8),
    color: blueDark,
    marginRight: 'auto',
  },
  basePiece: {
    width: vw(40),
    height: vh(7),
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 10,
  },
  pieceBlue: {
    borderColor: playerOneTileBorder,
    backgroundColor: playerOneTile,
  },
  pieceWhite: {
    borderColor: playerTwoTileBorder,
    backgroundColor: playerTwoTile,
  },
  buttonMargin: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: vh(4),
  },
  buttonText: {
    fontSize: vw(5),
  },
  buttonBase: {
    backgroundColor: blueDark,
    width: vw(12),
    height: vw(12),
    borderRadius: vw(12) / 2,
  },
  button: {
    backgroundColor: blue,
    width: '80%',
    height: '80%',
    borderRadius: vw(12) / 2,
  },
  margins: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default Settings;