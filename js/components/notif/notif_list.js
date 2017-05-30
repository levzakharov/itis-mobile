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

export default class NotifList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
    this.setRoles();
  }

  componentDidMount() {
    this.getNotifications();
  }

  render() {
    const notifs = this.state.notifs;
    const roles = this.state.roles;

    if(!notifs || !roles)
      return <Spinner/>;

    return (
      <MyDrawerLayout
        navigator={this.props.navigator}
        title='Уведомления'
        roles={roles}
      >
        <ListView
          dataSource={this.state.ds}
          renderRow={renderRow.bind(this)}
          enableEmptySections={true}
          style={styles.list}/>
      </MyDrawerLayout>
    );
  }

  setRoles() {
    AsyncStorage.getItem('roles', (err, res) => {
      console.log(res);
      this.setState({
        roles: JSON.parse(res)
      });
    });
  }

  getNotifications() {
    AsyncStorage.getItem('client_token', (err, token) => {
      token = JSON.parse(token);
      const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
      // get unread notifications
      fetch(Environment.BASE_URL + Api.notif, {
        headers: headers
      })
        .then(response => response.json())
        .then(resp => {
          this.setState({
            notifs: resp,
            ds: this.state.ds.cloneWithRows(resp)
          });
        })
        .catch((error) => console.error(error))
        .done();
      // get sent notifications
      fetch(Environment.BASE_URL + Api.sentNotif, {
        headers: headers
      })
        .then(response => response.json())
        .then(resp => {
          this.setState({
            sentNotif: resp
          });
        })
        .catch((error) => console.error(error))
        .done();
    });
  }

  updateDataSource(notifications) {
    this.setState({
      ds: this.state.ds.cloneWithRows(notifications)
    });
  }
}

function renderRow(notif) {
  return <NotifRow notif={notif.notification}
                   navigator={this.props.navigator}
         />;
}

// styles here...
const styles = StyleSheet.create({
  list: {
    backgroundColor: '#214268'
  }
});
