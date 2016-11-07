// home.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ListView,
  Image,
  ScrollView
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
    var _scrollView: ScrollView;
    return (
      <Image source={require('../assets/wood_background.png')} style={styles.backgroundImage}>
      <View style={styles.main_view}>
        <ScrollView style={styles.event_text}
         contentContainerStyle={{alignItems: 'center'}}
        ref={(scrollView) => { _scrollView = scrollView; }}
        onContentSizeChange={() => {_scrollView.scrollTo({y: 0,animated: false})}}>
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
        </ScrollView>
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
      </Image>
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
    paddingTop: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  list_view: {
    flex: 1,
  },
  title: {
    fontSize: 47,
    color: 'rgb(0, 0, 0)'
  },
  description: {
    fontSize: 34,
    color: 'rgb(0, 0, 0)'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    height: null,
    alignSelf: 'stretch'
  },
  event_text: {
    borderColor: 'rgb(113, 77, 15)',
    borderWidth: 5,
    maxHeight: 300,
    width: 420,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
});

export default Home;
