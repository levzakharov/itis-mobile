import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  AsyncStorage,
  View,
  Image
} from 'react-native';

import Route from '../../enums/route';
import Role from '../../enums/role';
import DrawerLayout from 'react-native-drawer-layout';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

export default class MyDrawerLayout extends React.Component {
  render() {
    let newNotifBut = null;
    const roles = this.props.roles;
    if (roles && (roles.indexOf(Role.star) !== -1 || roles.indexOf(Role.teach) !== -1))
      newNotifBut =
        <TouchableOpacity
          style={styles.newNotifButtonContainer}
          onPress={this.onPressNewNotif.bind(this)}
        >
          <EvilIcon name='pencil' size={25} color='white'/>
        </TouchableOpacity>
    return(
      <DrawerLayout
        ref={(drawer) => {this.drawer = drawer;}}
        drawerWidth={250}
        renderNavigationView={this.renderMenu.bind(this)}>
        <View style={styles.navBar}>
          <Text style={styles.navBarTitle}>{this.props.title}</Text>
          {newNotifBut}
          <TouchableOpacity
            style={styles.notifButtonContainer}
            onPress={this.onPressNotif.bind(this)}
          >
            <EvilIcon name='bell' size={25} color='white'/>
          </TouchableOpacity>
        </View>
        {this.renderMenuButton()}
        {this.props.children}
      </DrawerLayout>
    );
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

  renderMenu() {
    return (
      <View style={{backgroundColor: '#275589', flex: 1}}>
        <View style={styles.drawerButtonsContainer}>
          <TouchableOpacity style={styles.drawerButton} onPress={this.onPressNews.bind(this)}>
            <Text style={styles.drawerButtonText}>Новости</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerButton} onPress={this.onPressSchedule.bind(this)}>
            <Text style={styles.drawerButtonText}>Расписание</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerButton} onPress={this.onLogout.bind(this)}>
            <Text style={styles.drawerButtonText}>Выйти</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
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
  },
  newNotifButtonContainer: {
    position: 'absolute',
    top: 35,
    right: 50,
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
