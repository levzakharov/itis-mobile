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
        <Card title={news.title} containerStyle={this.props.style}>
          <View style={styles.rowBlock}>
            <Text style={styles.title}>
              {news.text}
            </Text>
            <Text style={styles.text}>Some text here...</Text>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  icon: {
    fontSize: 15,
    color: 'gray'
  },
  view: {
    backgroundColor: '#214268',
    flex: 1
  },
  text: {
    textAlign: 'left',
    flex: 1
  }
});
