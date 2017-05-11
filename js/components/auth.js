import React from 'react';
import {
  View,
  Alert,
  Button,
  TextInput,
  AsyncStorage,
} from 'react-native';

import Route from '../enums/route';
import Api from '../enums/api';
import Environment from '../environment/environment';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TextInput
          style={{height: 40}}
          placeholder="Имя пользователя"
          onChangeText={(login) => this.setState({login})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Пароль"
          secureTextEntry={true}
          onChangeText={(pass) => this.setState({pass})}
        />
        <Button title="Войти" onPress={auth.bind(this)} />
      </View>
    );
  }
}

function auth() {
  fetch(Environment.BASE_URL + Api.auth, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: this.state.login,
      pass: this.state.pass,
    })
  })
    .then(response => response.json())
    .then(resp => {
      let token = resp.data;
      if (token) {
        AsyncStorage.setItem(
          'client_token', JSON.stringify(token)
        );
        this.props.navigator.resetTo({
          id: Route.main
        });
      } else {
        Alert.alert('Упс!', [{ text: 'ы' }]);
      }
    })
    .catch((error) => console.error(error))
    .done();
}
