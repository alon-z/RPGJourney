import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import Storage from 'react-native-storage';

import Home from './pages/home';
import Page2 from '../page2';

var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync : {
        //alert('No data found, creating new.'');
    }
})

global.storage = storage;

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

const Main = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={styles.tabBarStyle}
        >
          <Scene key="hometabs" title="Home" icon={TabIcon} hideNavBar
            onPress={()=> {
              Actions.homepage({type: ActionConst.REFRESH});
            }}>
            <Scene
              key="homepage"
              component={Home}
              title="Home"
              initial
            />
          </Scene>
          <Scene key="page2" title="Page22" icon={TabIcon}>
            <Scene
              key="_page2"
              component={Page2}
              title="_Page2"
              initial
            />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopWidth : .5,
    borderColor    : '#b7b7b7',
    backgroundColor: 'rgb(255, 255, 255)',
    opacity        : 1,
  }
});

export default Main;
