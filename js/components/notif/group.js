import React from 'react';
import {
  Text,
  View,
  Switch,
  StyleSheet
} from 'react-native';

import {
  Card
} from 'react-native-elements';

export default class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false
    };
  }

  render() {
    const group = this.props.group;

    return (
      <View>
        <Text>{group.number}</Text>
        <Switch
          onValueChange={(on) => {
            this.setState({on});
            this.props.cb(group, on);
          }}
          style={{marginBottom: 10}}
          value={this.state.on}
        />
      </View>
    );
  }

}

// styles here...
const styles = StyleSheet.create({
});
