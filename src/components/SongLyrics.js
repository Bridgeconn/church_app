import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions} from 'react-native';
import {Button}  from 'native-base'
import styles from '../style/styles.js'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

// const apirequest_1 = require("googleapis/lib/apirequest");
// var googleAuth = require('google-auth-library');
// var google = require('googleapis');
Object.defineProperty(exports, "__esModule", { value: true });
// const transporters_1 = require("google-auth-library/lib/transporters");
// const stream = require("stream");
const parseString = require("string-template");
const apiKey="AIzaSyBsUeJYvXWnxUDhd0GX03D5jknGPaV41Tw";

export default class EventsDetail extends Component{

  constructor(props){
    super(props);
    console.log("title_name "+this.props.song_name)
    this.state = {
        title:this.props.song_name,
        user: null,
        isLoading: true,
        data: []
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

          <Button onPress={() =>{this.callFetchLib();}}>
            <Text>Search FETCH !</Text>
          </Button>

          <Text style={styles.textSong}>{this.props.text}</Text>
        </View>
      );
    }
  }

  callFetchLib() {
    fetch('https://www.googleapis.com/youtube/v3/search?key='+apiKey+
      '&channelId=UC3XTzVzaHQEd30rQbuvCtTQ&part=snippet,id&order=date&maxResults=10'

      https://www.googleapis.com/youtube/v3/search?key=AIzaSyBsUeJYvXWnxUDhd0GX03D5jknGPaV41Tw&part=snippet,id&order=date&maxResults=8&q=arijitsingh

     // /movies.json')
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response in fetch : " + JSON.stringify(responseJson));
      })
      .catch((error) => {
        console.log("error in fetch : "+error);
      });
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: '990724325288-0db4mkhlddbl9904k6831n831cihg2do.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log("_setupGoogleSignin "+user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log("_signIn "+user);
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

  callAuthorize(accessToken) {
    var clientSecret = 'tCYHIRKVk1PnwZzwlW_Vf8ow';
    var clientId = '990724325288-bjhcievn7a5n06ml26no6a4v9jm5oknp.apps.googleusercontent.com';
    var redirectUrl = 'urn:ietf:wg:oauth:2.0:oob';

    // var auth = new googleAuth();
    // var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    // oauth2Client.credentials = accessToken;

    // this.searchListByKeyword(oauth2Client, {'params': {'maxResults': '25',
    //              'part': 'snippet',
    //              'q': 'surfing',
    //              'type': ''} });

    // this.searchListByKeyword({'params': {'maxResults': '25',
    //              'part': 'snippet',
    //              'q': 'surfing',
    //              'type': ''}, 
    //              'auth': {'clientSecret': 'tCYHIRKVk1PnwZzwlW_Vf8ow', 
    //              'clientId': '990724325288-bjhcievn7a5n06ml26no6a4v9jm5oknp.apps.googleusercontent.com', 
    //              'redirectUrl': 'urn:ietf:wg:oauth:2.0:oob', 'credentials': accessToken }});
  }

  searchListByKeyword(auth, requestData) {
    // var service = google.youtube('v3');
    var parameters = requestData['params'];//this.removeEmptyParameters(requestData['params']);
    parameters['auth'] = auth;
    this.searchDirectAPI(parameters, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log('api success ===  '+response);
  });
}

searchDirectAPI(params, callback) {
            // if (typeof options === 'function') {
            //     callback = options;
            //     options = {};
            // }
            // options || (options = {});
            const self = this;
            self._options = callback || {};

            const rootUrl = 'https://www.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/youtube/v3/search').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET'
                }, callback),
                params: params,
                requiredParams: ['part'],
                pathParams: [],
                context: self
            };
            return this.createAPIRequest(parameters, callback);
  }

// function isReadableStream(obj) {
//     return obj instanceof stream.Stream &&
//         typeof obj._read === 'function' &&
//         typeof obj._readableState === 'object';
// }
logError(err) {
    if (err) {
        console.log("loggin error = "+err);
    }
}
createCallback(callback) {
    return typeof callback === 'function' ? callback : this.logError;
}
getMissingParams(params, required) {
    const missing = [];
    required.forEach(param => {
        // Is the required param in the params object?
        if (params[param] === undefined) {
            missing.push(param);
        }
    });
    // If there are any required params missing, return their names in array,
    // otherwise return null
    return missing.length > 0 ? missing : null;
}
}
/**
 * Create and send request to Google API
 * @param  {object}   parameters Parameters used to form request
 * @param  {Function} callback   Callback when request finished or error found
 * @return {Request}             Returns Request object or null
 */
 /*
createAPIRequest(parameters, callback) {
    let req, body, missingParams;
    let params = parameters.params;
    let options = Object.assign({}, parameters.options);
    // If the params are not present, and callback was passed instead,
    // use params as the callback and create empty params.
    if (typeof params === 'function') {
        callback = params;
        params = {};
    }
    // Create a new params object so it can no longer be modified from outside
    // code Also support global and per-client params, but allow them to be
    // overriden per-request
    // params = Object.assign({}, // New base object
    //                         parameters.context.google._options.params, // Global params
    //                         parameters.context._options.params, // Per-client params
    //                         params // API call params
    // );
    const media = params.media || {};
    const resource = params.resource;
    let authClient = params.auth 
    // || parameters.context._options.auth ||
    //     parameters.context.google._options.auth;
    const defaultMime = typeof media.body === 'string' ?
        'text/plain' :
        'application/octet-stream';
    delete params.media;
    delete params.resource;
    delete params.auth;
    // Grab headers from user provided options
    const headers = params.headers || {};
    delete params.headers;
    // Un-alias parameters that were modified due to conflicts with reserved names
    Object.keys(params).forEach(key => {
        if (key.slice(-1) === '_') {
            const newKey = key.slice(0, -1);
            params[newKey] = params[key];
            delete params[key];
        }
    });
    // Normalize callback
    callback = this.createCallback(callback);
    // Check for missing required parameters in the API request
    missingParams = this.getMissingParams(params.params, parameters.requiredParams);
    if (missingParams) {
        // Some params are missing - stop further operations and inform the
        // developer which required params are not included in the request
        callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
        return null;
    }
    // Parse urls
    if (options.url) {
        options.url = parseString(options.url, params);
    }
    if (parameters.mediaUrl) {
        parameters.mediaUrl = parseString(parameters.mediaUrl, params);
    }
    // delete path parameters from the params object so they do not end up in
    // query
    parameters.pathParams.forEach(param => {
        delete params[param];
    });
    // if authClient is actually a string, use it as an API KEY
    if (typeof authClient === 'string') {
        params.key = params.key || authClient;
        authClient = null;
    }
    // if (parameters.mediaUrl && media.body) {
    //     options.url = parameters.mediaUrl;
    //     if (resource) {
    //         params.uploadType = 'multipart';
    //         options.multipart = [
    //             { 'Content-Type': 'application/json', body: JSON.stringify(resource) }, {
    //                 'Content-Type': media.mimeType || (resource && resource.mimeType) || defaultMime,
    //                 body: media.body // can be a readable stream or raw string!
    //             }
    //         ];
    //     }
    //     else {
    //         params.uploadType = 'media';
    //         Object.assign(headers, { 'Content-Type': media.mimeType || defaultMime });
    //         if (isReadableStream(media.body)) {
    //             body = media.body;
    //         }
    //         else {
    //             options.body = media.body;
    //         }
    //     }
    // }
    // else {
        options.json = resource ||
            ((options.method === 'GET' || options.method === 'DELETE') ? true : {});
    // }
    options.headers = headers;
    options.qs = params;
    options.useQuerystring = true;
    // options = Object.assign({}, 
    //                           parameters.context.google._options, 
    //                           parameters.context._options, 
    //                           options
    //   );
    delete options.auth; // is overridden by our auth code
    delete options.params; // We handle params ourselves and Request does not
    // recognise 'params'
    // create request (using authClient or otherwise and return request obj)
    // if (authClient) {
        req = authClient.request(options, callback);
    // }
    // else {
    //     req = new transporters_1.DefaultTransporter().request(options, callback);
    // }
    if (body) {
        body.pipe(req);
    }
    return req;
}
}
*/
// exports.createAPIRequest = createAPIRequest;
//# sourceMappingURL=apirequest.js.map






  /**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
//  authorize(requestData, callback, accessToken) {
//   var clientSecret = 'tCYHIRKVk1PnwZzwlW_Vf8ow';
//   var clientId = '990724325288-bjhcievn7a5n06ml26no6a4v9jm5oknp.apps.googleusercontent.com';
//   var redirectUrl = 'urn:ietf:wg:oauth:2.0:oob';
//   // var auth = new googleAuth();
//   // var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

//   // Check if we have previously stored a token.
//   // fs.readFile(TOKEN_PATH, function(err, token) {
//   //   if (err) {
//   //     getNewToken(oauth2Client, requestData, callback);
//   //   } else {
//     var authObject = new Object();
//     authObject.clientSecret = clientSecret;
//     authObject.clientId = clientId;
//     authObject.redirectUrl = redirectUrl;
//     authObject.credentials = accessToken;
    
//       // oauth2Client.credentials = accessToken; //JSON.parse(token);
//       callback(authObject, requestData);
//     // }
//   // });
// }

/**
 * Remove parameters that do not have values.
 *
 * @param {Object} params A list of key-value pairs representing request
 *                        parameters and their values.
 * @return {Object} The params object minus parameters with no values set.
 */
//  removeEmptyParameters(params) {
//   for (var p in params) {
//     if (!params[p] || params[p] == 'undefined') {
//       delete params[p];
//     }
//   }
//   return params;
// }

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