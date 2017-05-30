import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  AsyncStorage,
  View,
  Image
} from 'react-native';

import Spinner from '../core/spinner';

import Route from '../../enums/route';
import Role from '../../enums/role';
import DrawerLayout from 'react-native-drawer-layout';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

export default class MyDrawerLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getRoles();
  }

  render() {
    const route = this.props.navigator.getCurrentRoutes().pop().id;

    let sentNotifBut = null;
    let newNotifBut = null;
    let leftBut = this.renderMenuButton();
    let rightBut =
      <TouchableOpacity
        style={styles.notifButtonContainer}
        onPress={this.onPressNotif.bind(this)}
      >
        <EvilIcon name='bell' size={25} color='white'/>
      </TouchableOpacity>

    if (route === Route.notifRec || route === Route.newNotif) {
      leftBut =
        <TouchableOpacity
          style={styles.menuButtonContainer}
          onPress={this.onPressBack.bind(this)}
        >
          <EvilIcon name='close' size={25} color='white'/>
        </TouchableOpacity>
      if (route === Route.newNotif) {
        rightBut =
          <TouchableOpacity
            style={styles.notifButtonContainer}
            onPress={this.props.sendNotifCb}
          >
            <EvilIcon name='sc-telegram' size={25} color='white'/>
          </TouchableOpacity>
      } else {
        rightBut = null;
      }
    } else {
      const roles = this.state.roles;

      if (!roles)
        return <Spinner/>;

      if (roles.indexOf(Role.star) !== -1 || roles.indexOf(Role.teach) !== -1) {
        sentNotifBut =
          <TouchableOpacity
            style={styles.drawerButton}
            onPress={this.onPressSentNotif.bind(this)}>
            <Text style={styles.drawerButtonText}>Отправленные уведомления</Text>
          </TouchableOpacity>
        if (route === Route.notifList || route === Route.sentNotifList) {
            newNotifBut =
              <TouchableOpacity
                style={styles.newNotifButtonContainer}
                onPress={this.onPressNewNotif.bind(this)}
              >
                <EvilIcon name='pencil' size={25} color='white'/>
              </TouchableOpacity>
        }
      }
    }
    return (
      <DrawerLayout
        ref={(drawer) => {this.drawer = drawer;}}
        drawerWidth={250}
        renderNavigationView={this.renderMenu.bind(this, sentNotifBut)}>
        <View style={styles.navBar}>
          <Text style={styles.navBarTitle}>{this.props.title}</Text>
          {newNotifBut}
          {rightBut}
        </View>
        {leftBut}
        {this.props.children}
      </DrawerLayout>
    );
  }

  getRoles() {
    AsyncStorage.getItem('roles', (err, res) => {
      this.setState({
        roles: JSON.parse(res)
      });
    });
  }

  renderMenuButton() {
    return (
      <TouchableOpacity
        hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
        onPress={() => { this.drawer.openDrawer() }}
        style={styles.menuButtonContainer}>
        <Image
          style={styles.menuButton}
          source={require('../../images/menu-button.png')} />
      </TouchableOpacity>
    )
  }

  renderMenu(sentNotifBut) {
    return (
      <View style={{backgroundColor: '#275589', flex: 1}}>
        <View style={styles.drawerButtonsContainer}>
          <TouchableOpacity style={styles.drawerButton} onPress={this.onPressNews.bind(this)}>
            <Text style={styles.drawerButtonText}>Новости</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerButton} onPress={this.onPressSchedule.bind(this)}>
            <Text style={styles.drawerButtonText}>Расписание</Text>
          </TouchableOpacity>
          {sentNotifBut}
          <TouchableOpacity style={styles.drawerButton} onPress={this.onLogout.bind(this)}>
            <Text style={styles.drawerButtonText}>Выйти</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onPressBack() {
    this.props.navigator.pop();
  }

  onPressNewNotif() {
    this.props.navigator.push({
      id: Route.newNotif
    });
  }

  onPressNotif() {
    this.props.navigator.push({
      id: Route.notifList
    });
  }

  onPressSentNotif() {
    this.props.navigator.resetTo({
      id: Route.sentNotifList
    });
  }

  onPressNews() {
    this.props.navigator.resetTo({
      id: Route.newsList
    });
  }

  onPressSchedule() {
    this.props.navigator.resetTo({
      id: Route.mySchedule
    });
  }

  onLogout() {
    AsyncStorage.removeItem('client_token');
    this.props.navigator.resetTo({
      id: Route.auth
    });
  }

}

const styles = StyleSheet.create({
  menuButtonContainer: {
    position: 'absolute',
    top: 35,
    left: 15,
  },
  menuButton: {
    width: 25.5,
    height: 17.5,
  },
  navBar: {
    height: 70,
    backgroundColor: '#2c619e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
    marginRight: 5
  },
  newNotifButtonContainer: {
    position: 'absolute',
    top: 35,
    right: 45,
  },
  notifButtonContainer: {
    position: 'absolute',
    top: 35,
    right: 15,
  },
  drawerButtonsContainer: {
    marginTop: 35,
  },
  drawerButton: {
    backgroundColor: '#275589',
    padding: 15,
    marginBottom: 0
  },
  drawerButtonText: {
    color: '#fff'
  }
});
