import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions} from 'react-native';
import {Button}  from 'native-base'
import styles from '../style/styles.js'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const apirequest_1 = require("googleapis/lib/apirequest");
// var googleAuth = require('google-auth-library');

export default class EventsDetail extends Component{
  constructor(props){
    super(props);
    console.log("title_name "+this.props.song_name)
    this.state = {
        title:this.props.song_name,
        user: null
    }
   console.log('name'+this.props.name)
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  render(){
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton 
          style={{width: 120, height: 44}} 
          color={GoogleSigninButton.Color.Light} 
          size={GoogleSigninButton.Size.Icon} 
          onPress={() => { this._signIn(); }}/>
          
          <Text style={styles.textSong}>{this.props.text}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>
            Welcome {this.state.user.name}
          </Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity onPress={() => {this._signOut(); }}>
            <View style={{marginTop: 50}}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>

          <Button onPress={() =>{this.callAuthorize(this.state.user.accessToken);}}>
            <Text>Search ! </Text>
          </Button>

          <Text style={styles.textSong}>{this.props.text}</Text>
        </View>
      );
    }
  }

  callAuthorize(accessToken) {
    this.authorize({'params': {'maxResults': '25',
                 'part': 'snippet',
                 'q': 'surfing',
                 'type': ''}}, 
                 this.searchListByKeyword, accessToken);
  }

  /**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
 authorize(requestData, callback, accessToken) {
  var clientSecret = 'tCYHIRKVk1PnwZzwlW_Vf8ow';
  var clientId = '990724325288-bjhcievn7a5n06ml26no6a4v9jm5oknp.apps.googleusercontent.com';
  var redirectUrl = 'urn:ietf:wg:oauth:2.0:oob';
  // var auth = new googleAuth();
  // var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  // fs.readFile(TOKEN_PATH, function(err, token) {
  //   if (err) {
  //     getNewToken(oauth2Client, requestData, callback);
  //   } else {
    var authObject = new Object();
    authObject.clientSecret = clientSecret;
    authObject.clientId = clientId;
    authObject.redirectUrl = redirectUrl;
    authObject.credentials = accessToken;
    
      // oauth2Client.credentials = accessToken; //JSON.parse(token);
      callback(authObject, requestData);
    // }
  // });
}

/**
 * Remove parameters that do not have values.
 *
 * @param {Object} params A list of key-value pairs representing request
 *                        parameters and their values.
 * @return {Object} The params object minus parameters with no values set.
 */
 removeEmptyParameters(params) {
  for (var p in params) {
    if (!params[p] || params[p] == 'undefined') {
      delete params[p];
    }
  }
  return params;
}

 searchListByKeyword(auth, requestData) {
  // var service = google.youtube('v3');
  var parameters = this.removeEmptyParameters(requestData['params']);
  parameters['auth'] = auth;
  // service.search.list(parameters, function(err, response) {
    this.searchDirectAPI(parameters, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log(response);
  });
}

  searchDirectAPI(params, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            options || (options = {});
            const rootUrl = 'https://www.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/youtube/v3/search').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET'
                }, options),
                params: params,
                requiredParams: ['part'],
                pathParams: [],
                context: self
            };
            return apirequest_1.createAPIRequest(parameters, callback);
  }

async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: '990724325288-0db4mkhlddbl9904k6831n831cihg2do.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
// function getNewToken(oauth2Client, requestData, callback) {
//   var authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES
//   });
//   console.log('Authorize this app by visiting this url: ', authUrl);
//   var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.question('Enter the code from that page here: ', function(code) {
//     rl.close();
//     oauth2Client.getToken(code, function(err, token) {
//       if (err) {
//         console.log('Error while trying to retrieve access token', err);
//         return;
//       }
//       oauth2Client.credentials = token;
//       storeToken(token);
//       callback(oauth2Client, requestData);
//     });
//   });
// }

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
// function storeToken(token) {
//   try {
//     fs.mkdirSync(TOKEN_DIR);
//   } catch (err) {
//     if (err.code != 'EEXIST') {
//       throw err;
//     }
//   }
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token));
//   console.log('Token stored to ' + TOKEN_PATH);
// }

/**
 * Create a JSON object, representing an API resource, from a list of
 * properties and their values.
 *
 * @param {Object} properties A list of key-value pairs representing resource
 *                            properties and their values.
 * @return {Object} A JSON object. The function nests properties based on
 *                  periods (.) in property names.
 */
// function createResource(properties) {
//   var resource = {};
//   var normalizedProps = properties;
//   for (var p in properties) {
//     var value = properties[p];
//     if (p && p.substr(-2, 2) == '[]') {
//       var adjustedName = p.replace('[]', '');
//       if (value) {
//         normalizedProps[adjustedName] = value.split(',');
//       }
//       delete normalizedProps[p];
//     }
//   }
//   for (var p in normalizedProps) {
//     // Leave properties that don't have values out of inserted resource.
//     if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
//       var propArray = p.split('.');
//       var ref = resource;
//       for (var pa = 0; pa < propArray.length; pa++) {
//         var key = propArray[pa];
//         if (pa == propArray.length - 1) {
//           ref[key] = normalizedProps[p];
//         } else {
//           ref = ref[key] = ref[key] || {};
//         }
//       }
//     };
//   }
//   return resource;
// }

// return (
    //   <View style={styles.container}>
    //     <View style={{paddingTop:20}}>
    //       <Button transparent onPress={()=>{
    //         callButtonYoutube
    //       }}/>
    //       <GoogleSigninButton
    //         style={{width: 48, height: 48}}
    //         size={GoogleSigninButton.Size.Icon}
    //         color={GoogleSigninButton.Color.Dark}
    //         onPress={this._signIn.bind(this)}/>
    //       <Text style={styles.textSong}>{this.props.text}</Text>       
    //     </View>
    //   </View>
    //   )