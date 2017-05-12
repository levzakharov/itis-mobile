import React from 'react';
import {
  View,
  Text,
  ListView,
  AsyncStorage,
  StyleSheet
} from 'react-native';

import Spinner from '../core/spinner';
import Environment from '../../environment/environment';
import NewsRow from './news_row';

export default class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getNews();
  }

  render() {
    const news = this.state.news;

    if(!news)
      return <Spinner/>;

    return (
      <ListView
        dataSource={dataSource.apply(this)}
        renderRow={renderRow.bind(this)}
        enableEmptySections={true}
        style={styles.list}/>
    );
  }

  getNews() {
    this.setState({
      news: 'some news'
    });
    // fetch(Environment.BASE_URL + Api.news)
    //   .then(response => response.json())
    //   .then(resp => {
    //     this.setState({
    //       news: resp.data,
    //       error: resp.error
    //     });
    //   })
    //   .catch((error) => console.error(error))
    //   .done();
  }
}

function dataSource() {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  // return ds.cloneWithRows(this.state.news)
  return ds.cloneWithRows([{title: 'first news!', content: 'testing content...'},
    {title: 'second news', content: 'testing content...'}]);
}

function renderRow(news) {
  return <NewsRow news={news} navigator={this.props.navigator}/>;
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white'
  }
});

