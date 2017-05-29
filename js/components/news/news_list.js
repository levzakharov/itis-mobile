import React from 'react';
import {
  View,
  Text,
  ListView,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import Spinner from '../core/spinner';
import Environment from '../../environment/environment';
import NewsRow from './news_row';

import MyDrawerLayout from '../core/my_drawer_layout';

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

    return(
      <MyDrawerLayout title='Новости' navigator={this.props.navigator}>
        <ListView
          dataSource={dataSource.apply(this)}
          renderRow={renderRow.bind(this)}
          enableEmptySections={true}
          style={styles.list}/>
      </MyDrawerLayout>
    );
  }

  getNews() {
    AsyncStorage.getItem('client_token', (err, token) => {
      token = JSON.parse(token);
      fetch(Environment.BASE_URL + Api.news, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => response.json())
        .then(resp => {
          this.setState({
            news: resp
          });
        })
        .catch((error) => console.error(error))
        .done();
    });
  }
}

function dataSource() {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  return ds.cloneWithRows(this.state.news);
}

function renderRow(news) {
  return <NewsRow news={news} navigator={this.props.navigator}/>;
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#214268'
  }
});
