import React from 'react';
import {
  View,
  Text,
  ListView,
  AsyncStorage,
  StyleSheet
} from 'react-native';

import Spinner from '../core/spinner';
import NotifRow from './notif_row';

import Api from '../../enums/api';
import Environment from '../../environment/environment';

export default class NotifList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getNotifications();
  }

  render() {
    const notifs = this.state.notifs;

    if(!notifs)
      return <Spinner/>;

    return (
      <ListView
        dataSource={dataSource.apply(this)}
        renderRow={renderRow.bind(this)}
        enableEmptySections={true}
        style={styles.list}/>
    );
    return <Text>!</Text>
  }

  getNotifications() {
    AsyncStorage.getItem('client_token', (err, token) => {
      token = JSON.parse(token);
      fetch(Environment.BASE_URL + Api.notif, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => response.json())
        .then(resp => {
          console.log(resp);
          this.setState({
            notifs: resp
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
  return ds.cloneWithRows(this.state.notifs);
}

function renderRow(notif) {
  return <NotifRow notif={notif} navigator={this.props.navigator}/>;
}

// styles here...
const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white'
  }
});
