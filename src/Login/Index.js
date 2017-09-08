import React, {Component} from 'react';
<<<<<<< HEAD
import {Router, Scene} from 'react-native-router-flux';
import {ActivityIndicator,AsyncStorage} from 'react-native'
=======
import {Router, Scene, AsyncStorage} from 'react-native-router-flux';
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
import Authentication from './Authentication'
import HomePage from './HomePage'

class App extends Component {
  constructor() {
    super();
<<<<<<< HEAD
    this.state = { hasToken: false, isLoaded: false  };
  }

   componentDidMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  }
  render() {
       if (!this.state.isLoaded) {
=======
    this.state = { hasToken: false };
  }

  componentWillMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null })
    })
  }
  render() {
    
      if (!this.state.isLoaded) {
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
      return (
        <ActivityIndicator />
      )
    }
<<<<<<< HEAD
    else {
      return(

         <Router>
=======
      else{
        <Router>
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
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
<<<<<<< HEAD
            initial={this.state.hasToken}
            hideNavBar={true}
=======
            hideNavBar={true}
            initial={this.state.hasToken}
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
            key='HomePage'
            title='Home Page'
          />
        </Scene>
      </Router>
<<<<<<< HEAD

        )}
     
    
=======
      }  
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
  }
}

export default App;