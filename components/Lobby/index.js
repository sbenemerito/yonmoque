import React from "react";
import socketIO from 'socket.io-client';
import { ImageBackground, StyleSheet, View, TouchableHighlight, Button, Text } from "react-native";
import { vw, vh } from 'react-native-expo-viewport-units';

import {
  white,
  grayDark
} from "../constants/colors";
import api from '../../utils/YonmoqueApi';
import getEnvVars from '../../environment';

const { apiUrl } = getEnvVars();


class Lobby extends React.Component {
  state = {
    rooms: []
  };

  createRoom = () => {
    const { socket } = this.props;
    // socket.id is a temporary name
    socket.emit('create room', { roomData: { name: 'Game Room', side: 1 }, playerName: socket.id });
  };

  joinRoom = (id) => {
    const { socket } = this.props;
    // socket.id is a temporary name
    socket.emit('join room', { id, playerName: socket.id })
  };

  componentDidMount() {
    const { socket, setSocket, startGame } = this.props;

    if (socket === null) {
      const socket = socketIO(apiUrl, {
        transports: ['websocket'],
        jsonp: false
      });

      socket.on('room joined', (joinedRoom) => {
        let side;

        if (joinedRoom.players[0].socket === socket.id) {
          joinedRoom.players[0].name = `${joinedRoom.players[0].name} (You)`;
          side = 0;
        } else {
          joinedRoom.players[1].name = `${joinedRoom.players[1].name} (You)`;
          side = 1;
        }

        startGame({ ...joinedRoom, side });
      });

      socket.on('room created', (rooms) => {
        this.setState({ rooms });
      });

      socket.on('room started', (rooms) => {
        this.setState({ rooms });
      });

      socket.on('room ended', (rooms) => {
        this.setState({ rooms });
      });

      socket.connect();

      socket.on('connect', () => {
        setSocket(socket);
      });
    }

    api.get('/rooms').then(response => {
      this.setState({ rooms: response.data.rooms });
    }).catch(error => console.error(error));
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.removeAllListeners();
  }

  render() {
    return (
      <View style={styles.background}>
        <Text>Lobby</Text>
        <TouchableHighlight style={styles.button} onPress={this.createRoom}>
          <Text>Create Room</Text>
        </TouchableHighlight>
        {
          this.state.rooms.map((room, index) => {
            const statusStyle = room.status === 'waiting' ? styles.waiting : styles.started;

            return (
              <TouchableHighlight key={index} onPress={() => room.status === 'waiting' ? this.joinRoom(room.id) : null}>
                <View style={[styles.room, statusStyle]}>
                  <Text>{room.name}</Text>
                  <Text>Blue: {room.players[0].name}</Text>
                  <Text>White: {room.players[1].name}</Text>
                </View>
              </TouchableHighlight>
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
  },
  button: {
    backgroundColor: '#2B7FAE',
    width: vw(60),
    height: vh(7),
    borderRadius: 12,
    marginTop: 20
  },
  waiting: {
    backgroundColor: white
  },
  started: {
    backgroundColor: grayDark
  }
});

export default Lobby;