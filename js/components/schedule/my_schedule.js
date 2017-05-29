import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import MyDrawerLayout from '../core/my_drawer_layout';

export default class Schedule extends React.Component {
  render() {
    return (
      <MyDrawerLayout navigator={this.props.navigator} title='Расписание'>
        <Text style={styles.text}>Страница с расписанием</Text>
      </MyDrawerLayout>
    )
  }
}

const styles = StyleSheet.create({
	text: {
	    backgroundColor: 'white',
	    padding: 20
	  }
});