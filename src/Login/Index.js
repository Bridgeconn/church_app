import React, {Component} from 'react';
import {Router, Scene, AsyncStorage} from 'react-native-router-flux';
import Authentication from './Authentication'
import HomePage from './HomePage'

class App extends Component {
  constructor() {
    super();
    this.state = { hasToken: false };
  }

  componentWillMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null })
    })
  }
  render() {
    
      if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    }
      else{
        <Router>
        <Scene key='root'>
          <Scene
            component={Authentication}
            hideNavBar={true}
            initial={!this.state.hasToken}
            key='Authentication'
            title='Authentication'
          />
          <Scene
            component={HomePage}
            hideNavBar={true}
            initial={this.state.hasToken}
            key='HomePage'
            title='Home Page'
          />
        </Scene>
      </Router>
      }  
  }
}

export default App;