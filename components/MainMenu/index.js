import React, { Fragment } from "react";
import { ImageBackground, StyleSheet, Button, Text, View } from "react-native";

import colors from "../constants/colors";

class MainMenu extends React.Component {
  render() {
    const { startGame, joinLobby } = this.props;
    const gameDataAI = {
      name: "Playing with AI",
      players: {
        "0": {
          name: 'You',
          skin: null
        },
        "1": {
          name: 'AI',
          skin: null
        }
      },
      secret: null,
      isMultiplayer: false
    };

    return (
      <View style={styles.root}>
        <ImageBackground
          source={require("../../assets/backgrounds/mainmenubackground.jpg")}
          style={styles.root}
          >
          <Fragment>
            <Text style={styles.text}>Yonmoque</Text>

            <Button
              title="Play with AI"
              color={colors.yellowLight}
              accessibilityLabel="Start the game"
              onPress={() => startGame(gameDataAI)}
            />

            <Button
              title="Multiplayer"
              color={colors.redMedium}
              accessibilityLabel="Multiplayer"
              onPress={joinLobby}
            />
          </Fragment>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    borderColor: "blue",
  },
  text: {
    color: colors.white,
    fontSize: 48,
  },
});

export default MainMenu;