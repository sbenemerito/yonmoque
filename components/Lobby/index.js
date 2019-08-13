import React from "react";
import { ImageBackground, StyleSheet, View, TouchableHighlight, Button, Text } from "react-native";
import { vw, vh } from 'react-native-expo-viewport-units';

import {
  white,
  grayDark
} from "../constants/colors";
import api from '../../utils/YonmoqueApi';

class Lobby extends React.Component {
  state = {
    rooms: []
  };

  componentDidMount() {
    api.get('/rooms').then(response => {
      this.setState({ rooms: response.data.rooms })
    }).catch(error => console.error(error));
  }

  render() {
    return (
      <View style={styles.background}>
        <Text>Lobby</Text>
        {
          this.state.rooms.map((room, index) => {
            return (
              <View style={styles.room} key={index}>
                <Text>{room.name}</Text>
                <Text>White: {room.players[0].name}</Text>
                <Text>Blue: {room.players[1].name}</Text>
              </View>
            )
          })
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    backgroundColor: grayDark,
    color: white
  },
  room: {
    backgroundColor: white,
    color: grayDark,
    margin: vh(1),
    borderRadius: 12,
  }
});

export default Lobby;