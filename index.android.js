import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';

import Main from './app/main'

export default class RPGJourney extends Component {
  render() {
    return (
      <View style={{flexDirection:'row', flex:1}}>
        <Main/>
      </View>
    );
  }
}
AppRegistry.registerComponent('RPGJourney', () => RPGJourney);
