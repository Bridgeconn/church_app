import {StyleSheet,PixelRatio, Dimensions} from 'react-native'
 var width = Dimensions.get('window').width; //full width
 var height = Dimensions.get('window').height; //full height
 const titleColor = '#48BBEC';
 const navBarColor = "#3F51B5"
 const centerAlign = 'center';
 // const 8 = 8;
const paddingValue = 8;

export const styleRouter = StyleSheet.create({
navbarRightButton:{
  flexDirection:"row",justifyContent:"center"
},
buttonTouchable:{
  alignItems:"center",marginLeft:10,marginRight:10
},
navigationBarColor:{
    backgroundColor: navBarColor
  },
navbarTitle:{
    fontSize:19,
    color:'#fff',
    fontFamily:'roboto-medium',
    fontWeight:'400'
  },
  tabContainer:{
    flex:1, 
    flexDirection:'column', 
    alignItems:'center', 
    alignSelf:'center', 
    justifyContent: 'center'
  },
})
export const tabStyle = StyleSheet.create({
  containerFlexValue:{
    flex:1
  },
  container:{
    flex:1,
    margin:8,
  },
  scrollViewContainer:{
    flexGrow:1
  },
  centerView:{
    flex:1,justifyContent: 'center',alignItems: 'center'
  },
  tabBounderyMargin:{
    margin:8
  },
  flexRow:{
    flexDirection:"row"
  },
  flexCol:{
    flexDirection:"column"
  },
  flexColContent:{
    flexDirection:'column',justifyContent:"flex-start"
  },
  tabContentText:{
    padding:0,
    fontSize:18,
    width:width/2
  },
  eventImage:{
    height:width/4,
    width:width/4
  },
  songTitleText:{
    fontSize:18,
  },
  songLyricsText:{
    fontSize:16,
    lineHeight: 26,
    marginTop:8
  },
  contactBookView: {
    margin:4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactList:{
    height: 35, 
    justifyContent: 'center', 
    backgroundColor: '#eee', 
    paddingLeft: 10 
  },
  contactData:{
    margin:8,
  },
  contactPhoneIcon:{
    margin:10,
    marginLeft:0
  },
  contactEmailIcon:{
  margin:10
  },
  contactSMSIcon:{
    margin:10
  },
  contactView:{
    flex:1
  },
  searchIconPadding:{
    paddingLeft:4
  },
  searchText:{
    width:Dimensions.get('window').width-80
  },
  verseListItemStyle:{
    borderBottomWidth:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verseTimestamp:{
    fontSize:16
  },
  tabTextVerseSize:{
    padding:0,
    fontSize:18,
  },
  contactListItemStyle:{
    borderBottomWidth:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  songCardItem:{
    flexDirection:"column",
    alignItems:"flex-start"
  },
  timeStampStyle:{
    fontSize:16,alignSelf:"flex-start"
  }

})
export const eventDetailStyle = StyleSheet.create({
  container:{
    flex:1,
    margin:8,
  },
  centerView:{
     flex:1,justifyContent:'space-around',alignItems: 'center',margin:8,flexDirection:"row"
   },
  eventDetailImage:{
    width:width,
    height:height*0.40,
    marginBottom:15
  },
  eventMap: {
  height:height*0.35,
  width:width,
  marginTop:8
  },
  calendarMargin:{
    margin:8
  },
  
  eventData:{
    fontSize:20,
    padding:1,
    marginLeft:8
  },
  eventCalendar:{
    fontSize:20,
    color:navBarColor,
    marginTop:12,
    marginBottom:20,
    marginLeft:8
  },
  flexOne:{
    flex:1
  }
})

export const guestLoginStyle = StyleSheet.create({
  tryGuestText: {
    fontSize: 16,
    alignSelf: centerAlign,
    marginBottom:36,
    position: 'absolute',
    bottom: 0,
  },
  centerView:{
    flex:1,justifyContent: 'center',alignItems: 'center'
  },
  
 
})
  
export const liveStreamStyle = StyleSheet.create({
  container:{
    flex:1,
    margin:8,
  },
  liveStreamView:{
    padding:8,
  },
  liveStreamVideo: {
    height: PixelRatio.roundToNearestPixel(
      Dimensions.get('window').width / (16 / 9),
    ),
    alignSelf: 'stretch',
    marginVertical: 12,
  },
  button: {
    height: 36,
    backgroundColor: navBarColor,
    borderColor: navBarColor,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'stretch',
    justifyContent: centerAlign
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: centerAlign
  },

})
export const loginButtonStyle = StyleSheet.create({
  buttonRegister: {
    height: 50,
    backgroundColor: titleColor,
    alignSelf: 'stretch',
    marginTop: 24,
    marginBottom: 48,
    padding:12,
    justifyContent:centerAlign
  }, 
  loginButtonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: centerAlign
  },
})

export const SigninStyle = StyleSheet.create({
  tryGuestText: {
    fontSize: 16,
    alignSelf: centerAlign,
    marginBottom:36,
    position: 'absolute',
    bottom: 0,
  },
  userContainer:{
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 64,
    paddingLeft:24,
    paddingRight:24
  },
   heading:{
    fontSize:28,
    color:titleColor,
    fontFamily: "Roboto",
    alignSelf: centerAlign,
    marginBottom:16
  },
  spinnerCustom:{
    justifyContent:centerAlign,
    alignItems:centerAlign
  },
  input: {
    height: 50,
    marginTop: 8,
    marginBottom:8,
    fontSize: 18,
    borderWidth: 1,
    borderColor:titleColor
  },
  noAccountText: {
    fontSize: 16,
    alignSelf: centerAlign,
    marginBottom:24,
  },
   buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: centerAlign
  },
  buttonRegister: {
    height: 50,
    backgroundColor: titleColor,
    alignSelf: 'stretch',
    marginTop: 24,
    marginBottom: 48,
    padding:12,
    justifyContent:centerAlign
  }
})

export const profilePageStyle = StyleSheet.create({
  profileContainer:{
    flex:1
  },
  profileTitle:{
    textAlign:"left"
  },
  emailField:{
    marginTop:12
  },
  contactField:{
    marginTop:12
  },
  checkEmail:{
    margin:-8,padding:0,flexDirection:"row"
  },
  ProfilePageContent:{
    margin:16,
    padding:8
  },
  profileView:{
    margin:20,
  },
  customEmail:{
    color:'#000',
    fontSize:16,
    marginTop:8
  },
  shareContainer:{
    marginTop:28
  },
  checkboxContainer:{
    flexDirection:"row",
    marginBottom:4,
    marginTop:20,
    alignSelf:'flex-start'
  },
  checkBoxFiled:{
    alignSelf:"flex-start",
    marginRight:16
  },
  checkboxText:{
    color:"#000"
  }
})

export const songLyricStyle = StyleSheet.create({
  songLyricsContainer:{
    flex:1,
  },
  topYoutubeView:{
    flexDirection:"column"
  },
  youtubeViewRatio:{
    height: (Dimensions.get("window").width) * 0.5625
  },
  initialYoutubeColor:{
    backgroundColor:"#000"
  },
  alignDeleteIcon:{
    alignSelf:"flex-end"
  },
  youtubePlay:{
    backgroundColor:'black', height:(Dimensions.get("window").width) * 0.5625,justifyContent:"center"
  },
  playIconAlignment:{
    alignSelf:'center'
  },
  songLyricsScrollView: {
    margin: 8
  },
  textSong:{
    fontSize:16
  },
 youtubeButton: {
    marginRight:16, 
    marginBottom:8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    backgroundColor:"#E9E9EF",
    bottom: 0,
  },
})

export const youtubeSongSearchStyle = StyleSheet.create({
  youtubeContainer:{
    flex:1,
    margin:8,
  },
   spinnerCustom:{
    justifyContent:centerAlign,
    alignItems:centerAlign
  },
  imageContainer:{
    flexDirection:'row', marginBottom:8
  },
  imageCustom:{
    width:120, height:90
  },
  playIconAlignment:{
    alignItems:'center',justifyContent:'center',position:'absolute',right:0,bottom:0
  },
  youtubeTextCustom:{
    height:90, width:Dimensions.get('window').width-160, marginLeft:8
  },
  youtubeTextTitle:{
    marginBottom:8, fontSize:14
  },
  youtubeDescription:{
    fontSize:12
  },
  modalContainer:{
     justifyContent: 'center'
  },
  modal:{
   borderRadius: 2,
   margin:5,
   padding: 5,paddingTop:0,
   backgroundColor: '#F5F5F5'
  },
  modalConent:{
    flexDirection:"column"
  },
  modalConentTitle:{
    fontSize:18,margin:10
  },
  youtubeViewRatio:{
  height: (Dimensions.get("window").width) * 0.5625
  },
  modalOpen:{
    flexDirection:"row",justifyContent:"flex-end"
  },
  modalClose:{
    margin: 5,marginRight:20,alignItems:"flex-end"
  },
  modalText:{
   fontSize:20
  },
  modalSave:{
    margin: 5,alignItems:"flex-end"
  }

})

export const settingStyle = StyleSheet.create({
  container:{
    flex:1,
    margin:8,
  },
  spinnerCustom:{
    justifyContent:"center",
    alignItems:"center"
  },
  textStyle:{
      margin:20
  }
})