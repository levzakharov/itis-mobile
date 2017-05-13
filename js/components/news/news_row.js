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
      <Card title={news.title}
          containerStyle={this.props.style}>
        <Text>
          {news.content}
        </Text>
        <View style={styles.rowBlock}>
          <Text>Some text here...</Text>
        </View>
      </Card>
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
  }
});
