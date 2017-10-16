

import {StyleSheet,PixelRatio, Dimensions} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
	container:{
		flex:1,
		margin:0
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
  	justifyContent:"flex-end",
  	alignItems:"flex-end",
  	marginTop:140,
  	marginLeft:140,
  },
  editIconProfile:{
    justifyContent:"flex-end",
    alignItems:"flex-end",
    marginTop:220,
    marginLeft:350

  },
  customText:{
  	fontSize:18
  },
  imageCustom:{
  resizeMode:"stretch",
  width:width,
  height:height*0.30,
  },
  hide:{
    opacity:0,
    height:0
  },
  titleView:{
   
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
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
  },
  EventMap: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height:height*0.35,
  width:width
},
eventImage:{
    width:width,
    height:height*0.33
  },
  eventContainer: {
    flex : 1,
    justifyContent:"center",
    alignItems:"center",
  },
  eventData:{
    fontSize:16
  },
  eventCalendar:{
    fontSize:20,
    fontWeight:"700",
    color:"#3F51B5"
  },
  songText:{
    fontSize:30,
    padding:5,
    fontWeight:"700",
    color:"#3F51B5"
  }, 
  textSong:{
    fontSize:18
  },
  contactListStyle:{
    padding:5,
    borderRadius:5,
    borderWidth:1,
    margin: 5,
    width:width*0.98,
    borderColor: 'rgba(0,0,0,.8)'
  },
  contactListItemStyle:{
    borderBottomWidth:0,
    marginLeft:0,
    paddingTop:0
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

  },
  verseTimestamp:{
    marginLeft:70,
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
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
}
})

export default styles