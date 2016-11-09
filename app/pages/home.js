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
import { Actions, ActionConst } from 'react-native-router-flux';

class Home extends Component {

  constructor(props) {
    super(props);

    if (global.story == undefined) {
      storage.load({
        key: 'story',
        autoSync: false,
        syncInBackground: true
      }).then(ret => {
        global.story = new Story(ret, this);
        Actions.homepage({type: ActionConst.REFRESH});
      }).catch(err => {
        if(err.name == 'NotFoundError') {
          story = new Story("mainStory", this);
          global.story = story;
          Actions.homepage({type: ActionConst.REFRESH});
        } else {
          alert(err.message);
        }
      });
    }

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      currChoices: ds.cloneWithRows([]),
      loaded: false
    };
  }

  render() {
    var _scrollView: ScrollView;
    return (
      <Image source={require('../assets/wood_background.png')} style={styles.backgroundImage}>
      <View style={styles.main_view}>
        {
          (global.story && global.story.chapter) ?
          <ScrollView style={styles.event_text}
           contentContainerStyle={{alignItems: 'center'}}
           ref={(scrollView) => { _scrollView = scrollView; }}
           onContentSizeChange={() => {_scrollView.scrollTo({y: 0,animated: false})}}>
            <Text style={styles.title}>{global.story.chapter
                  .events[global.story.event]
                  .title}</Text>
            <Text style={styles.description}>{global.story.chapter
                  .events[global.story.event]
                  .description}</Text>
          </ScrollView>
          : <ActivityIndicator/>
        }
        {(global.story && global.story.chapter) ?
          <ListView
            style={styles.list_view}
            dataSource={this.state.currChoices}
            enableEmptySections={true}
            renderRow={(data) =>
              <ChoiceButton choice={data} story={global.story}/>
            }
          />
         : <ActivityIndicator/> }
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
