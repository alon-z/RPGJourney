import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './pages/home';
import Page2 from '../page2';

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
          <Scene key="hometabs" title="Home" icon={TabIcon}>
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
