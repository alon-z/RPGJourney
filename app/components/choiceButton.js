import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';

class ChoiceButton extends Component {
  constructor(props) {
    super(props);
    this.onPress = () => {
      this.props.story.choose(this.props.choice)
    };
  }

  render() {
    return (
      <TouchableHighlight style={styles.choice_button}
        underlayColor='#e6ce99'
        onPress={this.onPress}>
        <Image source={require('../assets/wood_button.png')} style={styles.backgroundImage}>
          <Text style={styles.topText}>
            {this.props.choice.topText}
          </Text>
          <Text style={styles.bottomText}>
            {this.props.choice.underText}
          </Text>
        </Image>
      </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  choice_button: {
    minWidth: 400,
    minHeight: 100,
    maxWidth: 400,
    maxHeight: 100,
    backgroundColor: 'rgba(0,0,0, 0)',
    borderRadius:4,
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    fontSize: 20,
    textAlign: 'center'
  },
  bottomText: {
    fontSize: 17,
    textAlign: 'center'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
    width: null,
    height: null,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ChoiceButton;
