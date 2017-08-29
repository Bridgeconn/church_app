import React, {Component} from 'react'
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  TouchableOpacity
} from 'react-native'
import {Actions} from 'react-native-router-flux'

const t = require('tcomb-form-native')

const Form = t.form.Form

const User = t.struct({
  email: t.String,
  password:  t.String
})

const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
      autoCorrect: false
    },
    password: {
      autoCapitalize: 'none',
      password: true,
      autoCorrect: false
    }
  }
}

class LoginView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: {
        email: '',
        password: ''
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        email: '',
        password: null
      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }
  goToSignup(){
    Actions.signup()
  }
  _handleAdd = () => {
    const value = this.refs.form.getValue();
    // If the form is valid...
    if (value) {
      const data = {
        username: value.email,
        password: value.password
      }
      // Serialize and post the data
      const json = JSON.stringify(data)
      fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
      .then((response) => response.json())
      .then((res) => {
        
        if (res.error) {
          alert(res.error)
        } else {
          this.saveItem('id_token', res.id_token),
          AsyncStorage.setItem('jwt', res.token)
          alert(`Success! You may now access protected content.`)
          // Redirect to home screen
          Actions.home()
        }
      })
      .catch(() => {
        alert('There was an error logging in.');
      })
      .done()
    } else {
      // Form validation error
      alert('Please fix the errors listed and try again.')
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form
          ref='form'
          options={options}
          type={User}
          value={this.state.value}
          onChange={this._onChange}
        />
        <TouchableOpacity onPress={this._handleAdd}>
          <Text style={[styles.button, styles.greenButton]}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goToSignup}>
          <Text style={styles.text}>Creat Account</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },
  greenButton: {
    backgroundColor: '#4CD964'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    textAlign: 'center',
  }
})

module.exports = LoginView