import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  AsyncStorage,
  StyleSheet
} from 'react-native';

import Spinner from '../core/spinner';

import Route from '../../enums/route';
import Api from '../../enums/api';
import Environment from '../../environment/environment';

import MyDrawerLayout from '../core/my_drawer_layout';

export default class NewNotif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setSelectedGroups();
  }

  render() {
    let groups = this.state.groups;

    if (groups === undefined) {
      return <Spinner/>
    }

    return (
      <MyDrawerLayout
        navigator={this.props.navigator}
        title='Новое уведомление'
        sendNotifCb={sendNotification.bind(this)}
      >
        <View>
          <TextInput
            placeholder="Тема"
            onChangeText={(theme) => this.setState({theme})}
          />
          <TextInput
            placeholder="Выбрать номера групп"
            onFocus={this.onFocus.bind(this)}
            defaultValue={groups}
          />
          <TextInput
            placeholder="Текст"
            multiline={true}
            numberOfLines={7}
            onChangeText={(text) => this.setState({text})}
          />
        </View>
      </MyDrawerLayout>
    );
  }

  onFocus() {
    this.props.navigator.push({
        id: Route.notifRec
    });
  }

  setSelectedGroups() {
    AsyncStorage.getItem('groups', (err, res) => {
      this.setState({
        groups: JSON.parse(res).toString()
      });
    });
  }
}

function sendNotification() {
  AsyncStorage.getItem('client_token', (err, token) => {
    token = JSON.parse(token);
    fetch(Environment.BASE_URL + Api.newNotif, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        groups: this.state.groups.split(' '),
        theme: this.state.theme,
        text: this.state.text
      })
    })
      .then(response => response.json())
      .then(resp => {
        this.props.navigator.pop();
      })
      .catch((error) => console.error(error))
      .done();
  });
}

// styles here...
const styles = StyleSheet.create({
});
