import React from 'react';
import {
  AsyncStorage
} from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';

import Spinner from './core/spinner';
import AuthPage from './auth';
import NewsList from './news/news_list';
import NotifList from './notif/notif_list';

import Route from '../enums/route';

export default class InitialDispatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setClientToken();
  }

  render() {
    const token = this.state.token;

    if(token === undefined) {
      return <Spinner/>
    }

    const initialRoute = token == null ? Route.auth : Route.newsList;
    return (
      <NavigationExperimental.Navigator
        initialRoute={{id: initialRoute}}
        renderScene={navigatorRenderScene}
      />
    );
  }

  setClientToken() {
    AsyncStorage.getItem('client_token', (err, res) => {
      this.setState({
        token: res
      });
    });
  }
}

function navigatorRenderScene(route, navigator) {
  switch (route.id) {
    case Route.auth:
      return <AuthPage navigator={navigator}/>;
    case Route.newsList:
      return <NewsList navigator={navigator}/>;
    case Route.notifList:
      return <NotifList navigator={navigator}/>;
  }
}
