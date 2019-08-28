import React from "react";
import socketIO from 'socket.io-client';
import { ImageBackground, StyleSheet, View, TouchableHighlight } from "react-native";
import { vw, vh } from 'react-native-expo-viewport-units';
import Modal from "react-native-modal";
import Text from '../CustomText';

import {
  white,
  grayDark
} from "../constants/colors";
import api from '../../utils/YonmoqueApi';
import getEnvVars from '../../environment';
import ChooseColor from "../ChooseColorModal";


const { apiUrl } = getEnvVars();


class Lobby extends React.Component {
  state = {
    rooms: []
  };

  setSocketListeners = (socketInstance) => {
    const { startGame } = this.props;

    socketInstance.on('room joined', (joinedRoom) => {
      let side;

      if (joinedRoom.players[0].socket === socketInstance.id) {
        joinedRoom.players[0].name = `${joinedRoom.players[0].name} (You)`;
        side = 0;
      } else {
        joinedRoom.players[1].name = `${joinedRoom.players[1].name} (You)`;
        side = 1;
      }

      startGame({ ...joinedRoom, side });
    });

    socketInstance.on('room created', (rooms) => {
      this.setState({ rooms });
    });

    socketInstance.on('room started', (rooms) => {
      this.setState({ rooms });
    });

    socketInstance.on('room ended', (rooms) => {
      this.setState({ rooms });
    });
  }

  createRoom = (side) => {
    const { socket } = this.props;
    // socket.id is a temporary name
    socket.emit('create room', { roomData: { side }, playerName: socket.id });
  };

  joinRoom = (id) => {
    const { socket } = this.props;
    // socket.id is a temporary name
    socket.emit('join room', { id, playerName: socket.id })
  };

  componentDidMount() {
    const { socket, setSocket } = this.props;

    if (socket === null) {
      const socket = socketIO(apiUrl, {
        transports: ['websocket'],
        jsonp: false
      });

      socket.connect();

      socket.on('connect', () => {
        setSocket(socket);
        this.setSocketListeners(socket);
      });
    } else {
      this.setSocketListeners(socket);
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
      <ImageBackground 
        source={require("../../assets/backgrounds/mainmenubackground.jpg")}
        style={styles.background}>
        <View style={styles.container}>
          <Text style={{fontSize: vw(10)}}>Lobby:</Text>
          <TouchableHighlight style={styles.button} onPress={this.props.toggleChooseColor}>
            <Text style={[{fontSize: vw(5), color: white}, styles.margins]}>Create Room</Text>
          </TouchableHighlight>
          <Modal isVisible={this.props.isChooseColorVisible}>
            <ChooseColor
              toggleChooseColor={this.props.toggleChooseColor}
              createRoom={this.createRoom}
              isCreate={true}
            />
          </Modal>
          {
            this.state.rooms.map((room, index) => {
              return (
                <TouchableHighlight key={index} onPress={() => this.joinRoom(room.id)}>
                  <View style={[styles.room, styles.waiting]}>
                    <Text>{room.name}</Text>
                    <Text>Blue: {room.players[0].name}</Text>
                    <Text>White: {room.players[1].name}</Text>
                  </View>
                </TouchableHighlight>
              )
            })
          }
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
  container: {
    marginTop: vh(13),
    marginLeft: vw(5),
    marginRight: vw(5),
  },
  room: {
    backgroundColor: white,
    color: grayDark,
    margin: vh(1),
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#2B7FAE',
    width: vw(30),
    height: vh(7),
    borderRadius: 12,
    marginTop: 20
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
});

export default Lobby;