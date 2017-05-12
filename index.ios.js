import React from 'react';
import {
  AppRegistry
} from 'react-native';

import Dispatcher from './js/components/dispatcher'

export default class ItisMobile extends React.Component {
  render() {
    return <Dispatcher/>;
  }
}

AppRegistry.registerComponent('ItisMobile', () => ItisMobile);

