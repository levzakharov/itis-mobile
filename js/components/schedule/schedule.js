import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import MyDrawerLayout from '../core/my_drawer_layout';

export default class Schedule extends React.Component {
  constructor() {
    super();
    this.state = {personalSelected: true, dayNumber: 1};
  }

  render() {
    return (
      <MyDrawerLayout navigator={this.props.navigator} title='Расписание'>
        <View>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <TouchableOpacity style={[{width: '50%', height: 30, paddingTop: 5}, this.state.personalSelected ? {backgroundColor: '#00bfff'} : {backgroundColor: 'gray'}]}>
              <Text style={{alignSelf: 'center', color: 'white'}}>Личное</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: '50%', height: 30, backgroundColor: 'gray', paddingTop: 5}, this.state.overallSelected ? {backgroundColor: '#00bfff'} : {backgroundColor: 'gray'}]}>
              <Text style={{alignSelf: 'center', color: 'white'}}>Общее</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', flexWrap:'wrap', backgroundColor: 'gray'}}>
            <TouchableOpacity style={[{width: '14%', height: 30, paddingTop: 5}, this.dayColor(1)]}>
              <Text style={{alignSelf: 'center', color: 'white'}}>Пн</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: '14%', height: 30, paddingTop: 5}, this.dayColor(2)]}>
              <Text style={{alignSelf: 'center', color: 'white'}}>Вт</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: '14%', height: 30, paddingTop: 5}, this.dayColor(3)]}>
              <Text style={{alignSelf: 'center', color: 'white'}}>Ср</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: '14%', height: 30, paddingTop: 5}, this.dayColor(4)]}>
              <Text style={{alignSelf: 'center', color: 'white'}}>Чт</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: '14%', height: 30, paddingTop: 5}, this.dayColor(5)]}>
              <Text style={{alignSelf: 'center', color: 'white'}}>Пт</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: '14%', height: 30, paddingTop: 5}, this.dayColor(6)]}>
              <Text style={{alignSelf: 'center', color: 'white'}}>Сб</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: '14%', height: 30, paddingTop: 5}, this.dayColor(7)]}>
              <Text style={{alignSelf: 'center', color: 'white'}}>Вс</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Страница с расписанием</Text>
          <Text style={styles.text}>Страница с расписанием</Text>
        </View>
      </MyDrawerLayout>
    )
  }

  dayColor(dayNumber) {
    if(this.state.dayNumber == dayNumber)
      return {backgroundColor: 'orange'};
  }
}

const styles = StyleSheet.create({
	text: {
	    backgroundColor: 'white',
	    padding: 20
	  }
});