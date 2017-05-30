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

import DateUtil from '../../util/date_util.js';

export default class Group extends React.Component {
  render() {
    const group = this.props.group;

    return (
      <View>
        <Switch
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          style={{marginRight: 50}}
          value={group.number}
        />
        <Text style={{marginRight: 100}}>{group.number}</Text>
      </View>
    );
  }
}

// styles here...
const styles = StyleSheet.create({
});
