import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  AsyncStorage,
  StyleSheet
} from 'react-native';

import Api from '../../enums/api';
import Environment from '../../environment/environment';

export default class NewNotif extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View>
          <TextInput
            placeholder="Тема"
            onChangeText={(theme) => this.setState({theme})}
          />
          <TextInput
            placeholder="Номера групп через пробел"
            onChangeText={(groups) => this.setState({groups})}
          />
          <TextInput
            placeholder="Текст"
            multiline={true}
            numberOfLines={7}
            onChangeText={(text) => this.setState({text})}
          />
          <Button title="Отправить" onPress={sendNotification.bind(this)}/>
        </View>
      </View>
    );
  }
}

function sendNotification() {
  AsyncStorage.getItem('client_token', (err, token) => {
    token = JSON.parse(token);
    const params = {
      groups: this.state.groups.split(' '),
      theme: this.state.theme,
      text: this.state.text
    };
    const formBody = Object.keys(params)
      .map(key => encodeURIComponent(key) +
                  '=' + encodeURIComponent(params[key]))
      .join('&');
    fetch(Environment.BASE_URL + Api.newNotif, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      },
      body: formBody
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
