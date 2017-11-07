

import {StyleSheet,PixelRatio, Dimensions} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
	container:{
		flex:1,
    margin:8
	},

	avatarContainer: {
  borderColor: '#9B9B9B',
  borderWidth: 1 / PixelRatio.get(),
  },
  profileContent:{
  	flexDirection:"row",
  	margin:10
  },
  ProfilePageContent:{
    margin:10
  },
  profileView:{
  	margin:20,
  },
  avatar: {
    width: width*0.40,
    height: height*0.25
  },
  avatarProfile: {
    width: width,
    height: height*0.40
  },
  editIcon:{
  	position: 'absolute',
    bottom: 8,
    right:20 
   
  },
  editIconProfile:{
    position: 'absolute',
    bottom: 8,
    right:20,
    
  },

  customText:{
  	fontSize:18
  },
  imageCustom:{
  width:width/2,
  height:height*0.30,
  },
  HomeCustom:{
  width:width/2,
  height:height*0.30,
  },
  userContainer:{
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop:50,
  },
  heading:{
    fontSize:28,
    color:"#48BEEC",
    fontFamily: "Pacifico"

  },
   input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
    fontFamily:""
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    height: PixelRatio.roundToNearestPixel(
      Dimensions.get('window').width / (16 / 9),
    ),
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  titlePage:{
    fontSize:22,
    position: 'absolute',
    bottom: 8,
    left:0,
    color:'#fff',
    fontWeight:'900',
    padding:10
  },
  NavBarCustom:{
    backgroundColor:'blue'
  },
  navbarTitle:{
    fontSize:19,
    color:'#fff',
    fontFamily:'roboto-medium',
    fontWeight:'400'
  },
  navbarTitleRight:{
    fontSize:19,
    color:'#fff',
    fontFamily:'roboto-medium',
    fontWeight:'400',
    paddingRight:10
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  eventDetailImage:{
    width:width,
    height:height*0.40,
    marginBottom:15
  },
  EventMap: {
  height:height*0.35,
  width:width
},
eventImage:{
  height:height/8,
  width:width/4
  },
  eventData:{
    fontSize:20,
    padding:1,
    marginLeft:8
  },
  eventCalendar:{
    fontSize:20,
    fontWeight:"700",
    color:"#3F51B5",
    marginTop:10,
    marginBottom:20,
    marginLeft:8
  },
  songText:{
    fontSize:22,
    padding:5,
  }, 
  textSong:{
    fontSize:18
  },
  
  contactTextStyle:{
    padding:0,
    fontSize:18
    
  },
  contactHolder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  contactText: {
    fontSize: 32,
  },
  verseListStyle:{
    padding:5,
    margin: 5,
    width:width*0.98,
    height:height*0.33
  },
  verseListItemStyle:{
    borderBottomWidth:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
   contactListStyle:{
    padding:5,
    margin: 5,

  },
  contactListItemStyle:{
    borderBottomWidth:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verseTimestamp:{
    
    fontSize:16
  },
  verseTextStyle:{
    padding:0,
    fontSize:20
  },
  // eventContainerMaps: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   padding: 30,
  //   flex: 1,
  //   alignItems: 'center'
  // },
  linearGradient: {
    width: width,
    height:height*0.3,
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
},
eventMapButton:{
  fontSize:20,
  fontWeight:"bold",
  color:"#000",
  padding:5
},
mapTouchable:{
  width:width*0.40,
  position:"absolute",
  margin:10,
  right:0,
    
},

listView:{
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginLeft:8,
  marginRight:8,
  marginTop:8,
},
card: {
width: (width / 2)-8,
padding:4,

},
contactsCard:{
  borderWidth:0,
},
tabBar: {
    shadowColor: 'darkgrey',
    shadowOffset: {
     width:width,
     height:2
   },
    backgroundColor: 'ghostwhite',
    opacity: 0.98,
    height:56,
    elevation:4
  },
  liveStreamView:{
    padding:8,
  }
})

export default styles