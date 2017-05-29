import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';

import {
  Card
} from 'react-native-elements';

import DateUtil from '../../util/date_util.js';

export default class NotifRow extends React.Component {
  render() {
    const notif = this.props.notif;

    let dateTime = Platform.OS === 'ios' ? DateUtil.getDateTime(notif.date)
          : DateUtil.getDateTimeAndroid(notif.date);

    return(
      <View style={styles.view}>
        <Card title={notif.theme}
            containerStyle={this.props.style}>
          <Text>
            {notif.text}
          </Text>
          <View style={styles.rowBlock}>
            <Text>{dateTime}</Text>
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
