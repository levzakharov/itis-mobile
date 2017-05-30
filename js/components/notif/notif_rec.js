import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  AsyncStorage,
  ListView,
  StyleSheet
} from 'react-native';

import Spinner from '../core/spinner';

import Api from '../../enums/api';
import Environment from '../../environment/environment';

import Group from './group';
import MyDrawerLayout from '../core/my_drawer_layout';

export default class NotifRec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getGroups();
  }

  render() {
    const groups = this.state.groups;

    if (!groups)
      return <Spinner/>

    return (
      <MyDrawerLayout
        navigator={this.props.navigator}
        title='Выбор получателей'
      >
        <ListView
          dataSource={dataSource.apply(this)}
          renderRow={renderRow.bind(this)}
          enableEmptySections={true}
          style={styles.list}/>
      </MyDrawerLayout>
    );
  }

  getGroups() {
    AsyncStorage.getItem('client_token', (err, token) => {
      token = JSON.parse(token);
      fetch(Environment.BASE_URL + Api.notifRec, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => response.json())
        .then(resp => {
          var groups = [];
          Object.keys(resp)
            .map(key => resp[key])
            .forEach(function(courseGroups) {
              groups = groups.concat(courseGroups);
            })
          this.setState({
            groups: resp
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
  return ds.cloneWithRows(this.state.groups)
}

function renderRow(group) {
  return <Group group={group} cb={addGroupCb.bind(this)}/>;
}

function addGroupCb(group) {
  let groups = this.state.groups
}

// styles here...
const styles = StyleSheet.create({
});
