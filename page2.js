// page2.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

const Page2 = () => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.welcome}
      >
        Page 2!!!
        A totaly different page.
      </Text>
      <TouchableHighlight
        style={styles.button}
        underlayColor='#e6ce99'
        onPress={() => {
          global.storage.remove({
            key: 'story'
          })
        }
        }>
        <Text style={styles.buttonText}>Delete story</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        underlayColor='#e6ce99'
        onPress={() => {
          homePage = global.story.homePage;
          global.story.homePage = null;
          global.storage.save({
            key: 'story',
            rawData: global.story,
            expires: null
          }).catch(err => {
            alert(err.message);
          });
          global.story.homePage = homePage;
        }
        }>
        <Text style={styles.buttonText}>Save story</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        underlayColor='#e6ce99'
        onPress={() => {
          global.story.reloadStory();
        }
        }>
        <Text style={styles.buttonText}>Reload story</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  button: {
    padding: 5,
  },
  buttonText: {
    fontSize: 30
  }
});

export default Page2;
