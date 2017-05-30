import React from 'react';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {
  Card
} from 'react-native-elements';

import DateUtil from '../../util/date_util.js';

export default class NewsRow extends React.Component {
  render() {
    const news = this.props.news;

    let dateTime = Platform.OS === 'ios' ? DateUtil.getDateTime(news.date)
          : DateUtil.getDateTimeAndroid(news.date);

    return(
      <View style={styles.view}>
        <Card title={news.title}>
        <Text>
          {news.text}
        </Text>
        <View style={styles.rowBlock}>
          <Text>{dateTime}</Text>
        </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowBlock: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  view: {
    backgroundColor: '#214268',
    flex: 1
  }
});
