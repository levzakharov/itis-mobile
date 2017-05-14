import React from 'react';
import {
  View,
  Alert,
  Button,
  TextInput,
  AsyncStorage,
  StyleSheet,
  Image
} from 'react-native';

import Route from '../enums/route';
import Api from '../enums/api';
import Environment from '../environment/environment';

export default class AuthPage extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
        <View style={styles.innerView}>
          <TextInput
            style={styles.input}
            placeholder="Имя пользователя"
            onChangeText={(login) => this.setState({login})}
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry={true}
            onChangeText={(pass) => this.setState({pass})}
          />
          <Button title="Войти" onPress={auth.bind(this)}/>
        </View>
      </View>
    );
  }
}

function auth() {
  // fetch(Environment.BASE_URL + Api.auth, {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     login: this.state.login,
  //     pass: this.state.pass,
  //   })
  // })
  //   .then(response => response.json())
  //   .then(resp => {
  //     let token = resp.data;
  //     if (token) {
  //       AsyncStorage.setItem(
  //         'client_token', JSON.stringify(token)
  //       );
  //       this.props.navigator.resetTo({
  //         id: Route.main
  //       });
  //     } else {
  //       Alert.alert('Упс!', [{ text: 'ы' }]);
  //     }
  //   })
  //   .catch((error) => console.error(error))
  //   .done();
  AsyncStorage.setItem(
    'client_token', 'tobi pizda'
  );

  this.props.navigator.resetTo({
    id: Route.newsList
  });
}

// styles here...
const styles = StyleSheet.create({
 view: {
    flex: 1,
    backgroundColor: '#214268'
  },

  input: {
    height: 40,
    textAlign: 'center',
    marginBottom: 20,
  },

  innerView: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 50,
    padding: 30
  },

  // image style
  image: {
    width: 200,
    height: 30,
    marginTop: 40,
    resizeMode: 'stretch',
    alignSelf: 'center'
  }


});
