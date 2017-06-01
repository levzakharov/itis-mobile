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

import MyDrawerLayout from '../core/my_drawer_layout';

export default class SentNotifList extends React.Component {
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
      <MyDrawerLayout
        navigator={this.props.navigator}
        title='Отправ. уведомления'>
        <ListView
          dataSource={dataSource.apply(this)}
          renderRow={renderRow.bind(this)}
          enableEmptySections={true}
          style={styles.list}/>
      </MyDrawerLayout>
    );
  }

  getNotifications() {
    AsyncStorage.getItem('client_token', (err, token) => {
      token = JSON.parse(token);
      fetch(Environment.BASE_URL + Api.sentNotif, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => response.json())
        .then(resp => {
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
  return ds.cloneWithRows(this.state.notifs)
}

function renderRow(notif) {
  return <NotifRow notif={notif} navigator={this.props.navigator}/>;
}

// styles here...
const styles = StyleSheet.create({
  list: {
    backgroundColor: '#214268'
  }
});
