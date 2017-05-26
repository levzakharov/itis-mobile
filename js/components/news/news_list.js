import React from 'react';
import {
  View,
  Text,
  ListView,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import DrawerLayout from 'react-native-drawer-layout';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import Spinner from '../core/spinner';
import Environment from '../../environment/environment';
import NewsRow from './news_row';

export default class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this._onFiltrationCallback = this._onFiltrationCallback.bind(this);
  }

  componentDidMount() {
    this.getNews();
  }

  render() {
    const news = this.state.news;

    if(!news)
      return <Spinner/>;

    return(
      <DrawerLayout
        ref={(drawer) => { this.drawer = drawer; }}
        drawerWidth={250}
        renderNavigationView={this._renderMenu.bind(this)}>
        <View style={styles.navBar}>
          <Text style={styles.navBarTitle}>Новости</Text>
          <TouchableOpacity style={styles.notifButtonContainer}>
            <EvilIcon name='bell' size={25} color='white'/>
          </TouchableOpacity>
        </View>
        {this._renderMenuButton()}

        <ListView
          dataSource={dataSource.apply(this)}
          renderRow={renderRow.bind(this)}
          enableEmptySections={true}
          style={styles.list}/>
      </DrawerLayout>
      );
  }

  getNews() {
    this.setState({news: 'asdfasd'})
    // fetch(Environment.BASE_URL + Api.news, {
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(resp => {
    //     this.setState({
    //       news: resp
    //     });
    //   })
    //   .catch((error) => console.error(error))
    //   .done();
  }

  _renderMenu() {
    return (
      <View style={{backgroundColor: '#F9F9F9', flex: 1}}>
        <View style={styles.drawerButtonsContainer}>
          <TouchableOpacity style={styles.drawerButton}>
            <Text style={styles.drawerButtonText}>Новости</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerButton}>
            <Text style={styles.drawerButtonText}>Расписание</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderMenuButton() {
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

  _onFiltrationCallback(filtrationQuery) {
    let filtrationResult = HackathonFilters
      .filterByQuery(
        this.state.hackathonsToDisplay,
        filtrationQuery
      )

    this.setState(
      {
        hackathonsToDisplay: filtrationResult
      }
    );

    this.drawer.closeDrawer();
  }
}

function dataSource() {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  // return ds.cloneWithRows(this.state.news);
  return ds.cloneWithRows([{title: 'first news!', content: 'testing content...'},
    {title: 'second news', content: 'testing content...'},
    {title: 'second news', content: 'testing content...'},
    {title: 'second news', content: 'testing content...'},
    {title: 'second news', content: 'testing content...'},]);
}

function renderRow(news) {
  return <NewsRow news={news} navigator={this.props.navigator}/>;
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white'
  },
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
  notifButtonContainer: {
    position: 'absolute',
    top: 35,
    right: 15
  },
  drawerButtonsContainer: {
    marginTop: 100
  },
  drawerButton: {
    backgroundColor: '#275589',
    padding: 15,
    marginBottom: 20
  },
  drawerButtonText: {
    color: 'white'
  }
});
