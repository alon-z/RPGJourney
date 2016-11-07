// home.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ListView
} from 'react-native';

import Story from '../logic/story';
import ChoiceButton from '../components/choiceButton';

class Home extends Component {

  constructor(props) {
    super(props);
    var whenLoaded = () => {
      this.setState({
        currChoices: this.state.currChoices.cloneWithRows(
          this.state.myStory.chapter.events[this.state.myStory.event].choices),
        loaded: true
      });
    };
    story = new Story("mainStory", whenLoaded.bind(this));
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      myStory: story,
      currChoices: ds.cloneWithRows([]),
      loaded: false
    };
  }

  render() {
    return (
      <View style={styles.main_view}>
        {
          (this.state && this.state.loaded) ?
          <Text style={styles.title}>{this.state.myStory.chapter
                .events[this.state.myStory.event]
                .title}</Text> : <ActivityIndicator/>
        }
        {
          (this.state && this.state.loaded) ?
          <Text style={styles.description}>{this.state.myStory.chapter
                .events[this.state.myStory.event]
                .description}</Text> : <ActivityIndicator/>
        }
        {(this.state && this.state.loaded) ?
          <ListView
            style={styles.list_view}
            dataSource={this.state.currChoices}
            enableEmptySections={true}
            renderRow={(data) =>
              <ChoiceButton choice={data} story={this.state.myStory}/>
            }
          />
          : <ActivityIndicator/>
        }
        {
          (this.state && this.state.loaded) ?
          <Text>{this.state.myStory.event}</Text> : <ActivityIndicator/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#dedede',
    paddingBottom: 50,
    paddingTop: 70,
  },
  list_view: {
    flex: 1,
  },
  title: {
    fontSize: 47,
  },
  description: {
    fontSize: 34
  }
});

export default Home;
