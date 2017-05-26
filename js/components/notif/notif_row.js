import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {
  Card
} from 'react-native-elements';

export default class NotifRow extends React.Component {
  render() {
    const notif = this.props.notif;

    return(
      <View style={styles.view}>
        <Card title={notif.theme}
            containerStyle={this.props.style}>
          <Text>
            {notif.text}
          </Text>
          <View style={styles.rowBlock}>
            <Text>{notif.date}</Text>
          </View>
        </Card>
      </View>
    );
  }
}
// styles here...
const styles = StyleSheet.create({
  rowBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    fontSize: 15,
    color: 'gray'
  },
  view: {
    backgroundColor: '#214268',
    paddingTop: 20,
    flex: 1
  }
});
