

import {StyleSheet,PixelRatio, Dimensions} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const titleColor = '#48BBEC';
const navBarColor = "#3F51B5"
const centerAlign = 'center';
const profileMargin = 12;
const octaValue = 8;

const styles = StyleSheet.create({
	container:{
		flex:1,
    margin:octaValue
	},
  navigationBarColor:{
    backgroundColor: navBarColor
  },
	avatarContainer: {
  borderColor: '#9B9B9B',
  borderWidth: 1 / PixelRatio.get(),
  },
  spinnerCustom:{
    justifyContent:centerAlign,
    alignItems:centerAlign
  },
  profileContent:{
  	flexDirection:"row",
  	margin:profileMargin
  },
  ProfilePageContent:{
    margin:profileMargin
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
    bottom: octaValue,
    right:20 
   
  },
  editIconProfile:{
    position: 'absolute',
    bottom: octaValue,
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
    backgroundColor: 'white',
    paddingTop: 56,
    paddingLeft:24,
    paddingRight:24
  },
  heading:{
    fontSize:28,
    color:titleColor,
    fontFamily: "Roboto",
    alignSelf: centerAlign,
  },
   input: {
    height: 50,
    marginTop: 8,
    marginBottom:8,
    fontSize: 18,
    borderWidth: 1,
    borderColor:titleColor
  },

  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: centerAlign,
  },
  buttonRegister: {
    height: 50,
    backgroundColor: titleColor,
    alignSelf: 'stretch',
    marginTop: 24,
    marginBottom: 24,
    padding:12,
    justifyContent:centerAlign
  }, 
  buttonText: {
    fontSize: 24,
    alignSelf:centerAlign
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign:centerAlign,
    color: '#333333',
    marginBottom: octaValue,
  },
  player: {
    height: PixelRatio.roundToNearestPixel(
      Dimensions.get('window').width / (16 / 9),
    ),
    alignSelf: 'stretch',
    marginVertical: 12,
  },
  titlePage:{
    fontSize:22,
    position: 'absolute',
    bottom: octaValue,
    left:0,
    color:'#fff',
    fontWeight:'900',
    padding:12
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
    paddingRight:12
  },
  button: {
    height: 36,
    backgroundColor: navBarColor,
    borderColor: navBarColor,
    borderWidth: 1,
    borderRadius: octaValue,
    marginBottom: 12,
    alignSelf: 'stretch',
    justifyContent: centerAlign
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: centerAlign
  },
  title: {
    fontSize: 30,
    alignSelf: centerAlign,
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
  height:height/octaValue,
  width:width/4
  },
  eventData:{
    fontSize:20,
    padding:1,
    marginLeft:octaValue
  },
  eventCalendar:{
    fontSize:20,
    color:navBarColor,
    marginTop:12,
    marginBottom:20,
    marginLeft:octaValue
  },
  songText:{
    fontSize:22,
    padding:octaValue,
  }, 
  textSong:{
    fontSize:20
  },
  
  contactTextStyle:{
    padding:0,
    fontSize:18
    
  },
  contactHolder: {
    flex: 0.25,
    justifyContent: centerAlign
  },
  contactText: {
    fontSize: 32,
  },
  verseListStyle:{
    padding:octaValue,
    margin: octaValue,
    width:width*0.98,
    height:height*0.33
  },
  verseListItemStyle:{
    borderBottomWidth:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
   tabTextSize:{
    padding:0,
    fontSize:20
  },
   contactListStyle:{
    padding:octaValue,
    margin: octaValue,

  },
  contactListItemStyle:{
    borderBottomWidth:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verseTimestamp:{
    fontSize:16
  },
  
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
  padding:octaValue
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
  marginLeft:octaValue,
  marginRight:octaValue,
  marginTop:octaValue,
},
card: {
width: (width / 2)-octaValue,
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
    padding:octaValue,
  }
})

export default styles