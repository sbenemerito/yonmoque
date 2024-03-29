import React from "react";
import socketIO from 'socket.io-client';
import { ImageBackground, StyleSheet, View, TouchableHighlight, Image, ScrollView } from "react-native";
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
import i18n from "../../utils/i18n";


const { apiUrl } = getEnvVars();


class Lobby extends React.Component {
  state = {
    rooms: [],
    playerCount: 1,
  };

  setSocketListeners = (socketInstance) => {
    const { startGame } = this.props;

    socketInstance.on('room joined', (joinedRoom) => {
      let side;
      if (joinedRoom.players[0].socket === socketInstance.id) {
        joinedRoom.players[0].user.username = `${joinedRoom.players[0].user.username} (You)`;
        side = 0;
      } else {
        joinedRoom.players[1].user.username = `${joinedRoom.players[1].user.username} (You)`;
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

    socketInstance.on('players updated', ({ playerCount }) => {
      this.setState({ playerCount });
    });
  }

  createRoom = (side) => {
    const { socket, userData } = this.props;
    socket.emit('create room', { roomData: { side }, token: userData.data.token });
  };

  joinRoom = (id) => {
    const { socket, userData } = this.props;
    socket.emit('join room', { id, token: userData.data.token });
  };

  componentDidMount() {
    const { socket, setSocket, userData } = this.props;

    if (socket === null) {
      const socket = socketIO(apiUrl, {
        transports: ['websocket'],
        jsonp: false
      });

      socket.connect();

      socket.on('connect', () => {
        setSocket(socket);
        socket.emit('bind token', { token: userData.data.token })
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
                style={[{width: vw(7), height: vw(7)}, styles.margins]}
                source={require("../../assets/icons/settings.png")}/>
            </TouchableHighlight>
          </View>
          <View style={{flexDirection: 'row', marginTop: vh(2)}}>
            <View style={{marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto',}}>
              <Text style={{fontSize: vw(10)}}>{i18n.t('lobby')}:</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableHighlight 
                style={[styles.button, {justifyContent: 'center'}]} 
                onPress={this.props.toggleChooseColor}>
                <Text style={[{fontSize: vw(5), color: white}, styles.margins]}>{i18n.t('createRoom')}</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: vh(1) }}>
            <View style={{ marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', }}>
              <Text style={{ fontSize: vw(5) }}>{`${this.state.playerCount} ${i18n.t('playerCount')}`}:</Text>
            </View>
          </View>
          <Modal isVisible={this.props.isChooseColorVisible}>
            <ChooseColor
              toggleChooseColor={this.props.toggleChooseColor}
              createRoom={this.createRoom}
              isCreate={true}
            />
          </Modal>
          <ScrollView>
            {
              this.state.rooms.map((room, index) => {
                return (
                  <TouchableHighlight key={index} onPress={() => this.joinRoom(room.id)}>
                    <View style={[styles.room, styles.waiting]}>
                      <Text>{room.name}</Text>
                      <Text>Blue: {room.players[0].user ? room.players[0].user.username : '...' }</Text>
                      <Text>White: {room.players[1].user ? room.players[1].user.username : '...' }</Text>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
          </ScrollView>
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
    width: vw(32),
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
});

export default Lobby;