import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View
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
        <View>
          <Text style={styles.topText}>
            {this.props.choice.topText}
          </Text>
          <Text style={styles.bottomText}>
            {this.props.choice.underText}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  choice_button: {
    minWidth: 200,
    minHeight: 100,
    maxWidth: 200,
    maxHeight: 100,
    backgroundColor: '#d7bb7a',
    borderRadius:4,
    flex: 1,
    margin: 5,
    padding: 5
  },
  topText: {
    fontSize: 20,
    textAlign: 'center'
  },
  bottomText: {
    fontSize: 17,
    textAlign: 'left'
  }
});

export default ChoiceButton;
