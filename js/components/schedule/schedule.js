import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Alert,
  ScrollView
} from 'react-native';

import Environment from '../../environment/environment.js';
import Api from '../../enums/api';
import Spinner from '../core/spinner';
import Role from '../../enums/role';

import MyDrawerLayout from '../core/my_drawer_layout';

import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const intervals = ['08:30', '10:10', '11:50', '13:35', '15:20', '17:00', '18:40'];

export default class Schedule extends React.Component {
  constructor() {
    super();
    this.state = {dayNumber: 1};
  }

  componentDidMount() {
    this.getSchedule();
  }

  render() {
    const schedule = this.state.schedule;
    const roles = this.state.roles;

    if(!schedule || !roles)
      return <Spinner/>;

    let tableHead;
    let tableData;

    tableHead = ['Время', 'Предмет'];
    if(roles.indexOf(Role.teach) !== -1) {
      tableData = this.constructTeacherTableData();
    } else {
      tableData = this.constructStudentTableData();
    }

    return (
      <MyDrawerLayout navigator={this.props.navigator} title='Расписание'>
        <View>
          <View style={{flexDirection:'row', flexWrap:'wrap', backgroundColor: 'gray'}}>
            <TouchableOpacity style={[styles.weekButton, this.dayColor(1)]}
                              onPress={this.onDayOfTheWeekPress.bind(this, 1)}>
              <Text style={styles.dayOfTheWeek}>Пн</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.weekButton, this.dayColor(2)]}
                              onPress={this.onDayOfTheWeekPress.bind(this, 2)}>
              <Text style={styles.dayOfTheWeek}>Вт</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.weekButton, this.dayColor(3)]}
                              onPress={this.onDayOfTheWeekPress.bind(this, 3)}>
              <Text style={styles.dayOfTheWeek}>Ср</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.weekButton, this.dayColor(4)]}
                              onPress={this.onDayOfTheWeekPress.bind(this, 4)}>
              <Text style={styles.dayOfTheWeek}>Чт</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.weekButton, this.dayColor(5)]}
                              onPress={this.onDayOfTheWeekPress.bind(this, 5)}>
              <Text style={styles.dayOfTheWeek}>Пт</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.weekButton, this.dayColor(6)]}
                              onPress={this.onDayOfTheWeekPress.bind(this, 6)}>
              <Text style={styles.dayOfTheWeek}>Сб</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.weekButton, this.dayColor(7)]}
                              onPress={this.onDayOfTheWeekPress.bind(this, 7)}>
              <Text style={styles.dayOfTheWeek}>Вс</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Table>
              <Row data={tableHead} style={styles.head} textStyle={styles.tableText}/>
              <Rows data={tableData} style={styles.row} textStyle={styles.tableText}/>
            </Table>
          </ScrollView>
        </View>
      </MyDrawerLayout>
    )
  }

  constructStudentTableData() {
    let dayOfTheWeek = this.getDayOfTheWeek();
    let day = this.state.schedule[dayOfTheWeek];

    let result = [];
    let idx = 0;

    Object.keys(day).forEach(function(key) {
      if(day[key].length != 0) {
        result.push([intervals[idx], day[key][0]['name'] + ', ' + day[key][0]['place']]);
      } else {
        result.push([intervals[idx], '']);
      }
      idx++;
    });

    return result;
  }

  constructTeacherTableData() {
    let dayOfTheWeek = this.getDayOfTheWeek();
    let day = this.state.schedule[dayOfTheWeek];

    let result = [];
    let idx = 0;

    Object.keys(day).forEach(function(key) {
      if(day[key].length != 0) {
        firstIter = true;

        for(var k in day[key]) {
          let grSubjPlace = '(' + day[key][k].userGroup.number+ ') '
            + day[key][k].name + ', ' + day[key][k].place;

          if(firstIter) {
            firstIter = false;
            result.push([intervals[idx], grSubjPlace]);
          } else {
            result.push(['', grSubjPlace]);
          }
        }
      } else {
        result.push([intervals[idx], '']);
      }
      idx++;
    });

    return result;
  }

  getDayOfTheWeek() {
    switch(this.state.dayNumber) {
      case 1:
        return 'MONDAY';
      case 2:
        return 'TUESDAY';
      case 3:
        return 'WEDNESDAY';
      case 4:
        return 'THURSDAY';
      case 5:
        return 'FRIDAY';
      case 6:
        return 'SATURDAY';
      case 7:
        return 'SUNDAY';
    }
  }

  onDayOfTheWeekPress(dayNumber) {
    this.setState({dayNumber: dayNumber});
  }

  dayColor(dayNumber) {
    if(this.state.dayNumber === dayNumber)
      return {backgroundColor: 'orange'};
  }

  getSchedule() {
    AsyncStorage.getItem('roles', (err, res) => {
      roles = JSON.parse(res);

      AsyncStorage.getItem('client_token', (err, token) => {
      token = JSON.parse(token);

      fetch(Environment.BASE_URL + Api.schedule + '?interval=week&personality=1', {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then(response => response.json())
        .then(resp => {
          this.setState({schedule: resp, roles: roles});
        })
        .catch((error) => console.error(error))
        .done();
      });
    });
  }
}

const styles = StyleSheet.create({
	text: {
    backgroundColor: 'white',
    padding: 20
	},
  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  tableText: {
    marginLeft: 5
  },
  row: {
    height: 60
  },
  dayOfTheWeek: {
    alignSelf: 'center',
    color: 'white'
  },
  weekButton: {
    width: '14%',
    height: 30,
    paddingTop: 5
  }
});