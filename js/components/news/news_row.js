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

export default class NewsRow extends React.Component {
  render() {
    const news = this.props.news;

    return(
      <View style={styles.view}>
        <Card title={news.title}
            containerStyle={this.props.style}>
          <Text>
            {news.text}
          </Text>
          <View style={styles.rowBlock}>
            <Text>Some text here...</Text>
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
