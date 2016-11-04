// home.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from 'react-native-button';
import { MKButton } from 'react-native-material-kit';

// colored button with default theme (configurable)
const ColoredRaisedButton = MKButton.coloredButton()
  .withText('BUTTON')
  .withOnPress(() => {
    console.log("Hi, it's a colored button!");
  })
  .build();

var customData = require('../story/chapter0.json');

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main_view}>
        <Text>
          {customData[1].header}
        </Text>
        <ColoredRaisedButton />
        <Button
          style={styles.choice_button}
          onPress={() => {}}>
          Press Me!
        </Button>
        <Button
          style={styles.choice_button}
          onPress={() => {}}>
          Press Me!
        </Button>
        <Button
          style={styles.choice_button}
          onPress={() => {}}>
          Press Me!
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#dedede',
    paddingBottom: 50,
  },
  choice_button: {
    width: 200,
    height: 100,
    backgroundColor: 'blue',
    borderRadius:4,
    overflow:'hidden',
  }
});

export default Home;
