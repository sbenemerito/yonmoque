import React, { Fragment } from "react";
import { ImageBackground, StyleSheet, Button, Text, View } from "react-native";

import colors from "../constants/colors";

class MainMenu extends React.Component {
  render() {
    const { startGame } = this.props;

    return (
      <View style={styles.root}>
        <ImageBackground
          source={require("../../assets/backgrounds/mainmenu.jpg")}
          style={styles.root}
          >
          <Fragment>
            <Text style={styles.text}>Yonmoque</Text>

            <Button
              title="Start Game"
              color={colors.yellowLight}
              accessibilityLabel="Start the game"
              onPress={startGame}
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