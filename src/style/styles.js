import {StyleSheet,PixelRatio, Dimensions} from 'react-native'

  var width = Dimensions.get('window').width; 
  var height = Dimensions.get('window').height;

  var heightHalf = height/2
  var heightQuarter = height/4
  var youtubeViewHeight = width * 0.5625
  var heightOneThird = height/3

  
  var widthHalf = width/2
  var widthQuarter = width/4
  var youtubeTextWidth = width-160
  var searchTextContainerWidth =  width-80 

  const titleColor = '#48BBEC';
  const navBarColor = "#3F51B5"
  const colorBlack = "#000";
  const colorWhite = "#fff";
  const modalBackgroundColor = "#F5F5F5"
  const contactListBackgroundColor = "#eee"
  const youtubeIconBackgroundColor = "#E9E9EF"

  const justifyContentStart = "flex-start"
  const justifyContentEnd = "flex-end"
  const justifyContentCenter = "center"
  const justifyContentSpaceBetween = "space-between"
  const justifyContentSpaceAround = "space-around"

  const alignItemsStart = "flex-start"
  const alignItemsEnd = "flex-end"
  const alignItemsCenter = "center"

  const alignSelfCenter = "center"
  const alignSelfStart = "flex-start"
  const alignSelfEnd = "flex-end"
  const alignSelfStretch = "stretch"

  const marginTab = 8;
  const paddingValue = 8;

  const flexFirst = 1
  const flexDirectionRow = "row"
  const flexDirectionColumn = "column"

  const fontFamilyRobotoMedium = 'roboto-medium'
  const fontFamilyRoboto = 'Roboto'

  const absolutePosition = 'absolute'

  const textAlignLeft = "left"

  const navbarTitlefontWeight ="400"

  const routerbuttonLeftMargin = 8
  const routerbuttonRightMargin = 8

  const NavbarTitleFontSize = 19
  const tabContentTextFontSize = 18
  const songLyricsTextFontSize = 16
  const songTitleTextFontSize = 18

export const styleRouter = StyleSheet.create({
navbarRightButton:{
  flexDirection:flexDirectionRow,
  justifyContent:justifyContentCenter
},
buttonTouchable:{
  alignItems:alignItemsCenter,
  marginLeft:routerbuttonLeftMargin,
  marginRight:routerbuttonRightMargin
},
navigationBarColor:{
    backgroundColor: navBarColor
  },
navbarTitle:{
    fontSize:NavbarTitleFontSize,
    color:colorWhite,
    fontFamily:fontFamilyRobotoMedium,
    fontWeight:navbarTitlefontWeight
  },
  tabContainer:{
    flex:flexFirst, 
    flexDirection:flexDirectionColumn, 
    alignItems:alignItemsCenter, 
    alignSelf:alignSelfCenter, 
    justifyContent:justifyContentCenter
  },
})
export const tabStyle = StyleSheet.create({
  containerFlexValue:{
    flex:flexFirst
  },
  container:{
    flex:flexFirst,
    margin:marginTab,
  },
  scrollViewContainer:{
    flexGrow:flexFirst
  },
  centerView:{
    flex:flexFirst,
    justifyContent: justifyContentCenter,
    alignItems:alignItemsCenter
  },
  tabBounderyMargin:{
    margin:marginTab
  },
  flexRow:{
    flexDirection:flexDirectionRow
  },
  flexCol:{
    flexDirection:flexDirectionColumn
  },
  flexColContent:{
    flexDirection:flexDirectionColumn,
    justifyContent:justifyContentStart
  },
  tabContentText:{
    padding:0,
    fontSize:tabContentTextFontSize,
    width:widthHalf
  },
  eventImage:{
    height:widthQuarter,
    width:widthQuarter
  },
  songTitleText:{
    fontSize:songTitleTextFontSize,
  },
  songLyricsText:{
    fontSize:songLyricsTextFontSize,
    lineHeight: 26,
    marginTop:marginTab
  },
  contactBookView: {
    margin:4,
    backgroundColor: colorWhite,
    flexDirection: flexDirectionRow,
    alignItems: alignItemsCenter,
  },
  contactList:{
    height:height/16, 
    justifyContent:justifyContentCenter, 
    backgroundColor: contactListBackgroundColor, 
  },
  contactData:{
    margin:marginTab,
  },
  contactPhoneIcon:{
    margin:marginTab,
    marginLeft:0
  },
  contactEmailIcon:{
  margin:marginTab
  },
  contactSMSIcon:{
    margin:marginTab
  },
  contactView:{
    flex:flexFirst
  },
  searchIconPadding:{
    paddingLeft:4
  },
  searchText:{
    width:searchTextContainerWidth
  },
  verseListItemStyle:{
    borderBottomWidth:0,
    flexDirection: flexDirectionRow,
    justifyContent: justifyContentSpaceBetween
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
    flexDirection: flexDirectionRow,
    justifyContent: justifyContentSpaceBetween
  },
  songCardItem:{
    flexDirection:flexDirectionColumn,
    alignItems:alignItemsStart
  },
  timeStampStyle:{
    fontSize:16,
    alignSelf:alignSelfStart
  }

})
export const eventDetailStyle = StyleSheet.create({
  container:{
    flex:flexFirst,
    margin:8,
  },
  centerView:{
     flex:flexFirst,
     justifyContent:justifyContentSpaceAround,
     alignItems: alignItemsCenter,
     margin:8,
     flexDirection:flexDirectionRow
   },
  eventDetailImage:{
    width:width,
    height:heightOneThird,
    marginBottom:15
  },
  eventMap: {
  height:heightOneThird,
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
    flex:flexFirst
  }
})

export const guestLoginStyle = StyleSheet.create({
  tryGuestText: {
    fontSize: 16,
    alignSelf:alignSelfCenter,
    marginBottom:36,
    position: absolutePosition,
    bottom: 0,
  },
  centerView:{
    flex:flexFirst,
    justifyContent: justifyContentCenter,
    alignItems: alignItemsCenter
  },
  
 
})
  
export const liveStreamStyle = StyleSheet.create({
  container:{
    flex:flexFirst,
    margin:8,
  },
  liveStreamView:{
    padding:8,
  },
  liveStreamVideo: {
    alignSelf: alignSelfStretch,
    backgroundColor:colorBlack,
    height: youtubeViewHeight
  },
  button: {
    height: height/16,
    backgroundColor: navBarColor,
    borderColor: navBarColor,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: alignSelfStretch,
    justifyContent: justifyContentCenter
  },
  buttonText: {
    fontSize: 18,
    color: colorWhite,
    alignSelf: alignSelfCenter
  },

})
export const loginButtonStyle = StyleSheet.create({
  buttonRegister: {
    height: height/12,
    backgroundColor: titleColor,
    alignSelf: alignSelfStretch,
    marginTop: 24,
    marginBottom: 48,
    padding:12,
    justifyContent:justifyContentCenter
  }, 
  loginButtonText: {
    fontSize: 20,
    color: colorWhite,
    alignSelf: alignSelfCenter
  },
})

export const SigninStyle = StyleSheet.create({
  tryGuestText: {
    fontSize: 16,
    alignSelf: alignSelfCenter,
    marginBottom:36,
    position: absolutePosition,
    bottom: 0,
  },
  userContainer:{
    flex: 1,
    backgroundColor: colorWhite,
    paddingTop: 64,
    paddingLeft:24,
    paddingRight:24
  },
   heading:{
    fontSize:28,
    color:titleColor,
    fontFamily: fontFamilyRoboto,
    alignSelf: alignSelfCenter,
    marginBottom:16
  },
  spinnerCustom:{
    justifyContent:justifyContentCenter,
    alignItems:alignItemsCenter
  },
  input: {
    height: height/12,
    marginTop: 8,
    marginBottom:8,
    fontSize: 18,
    borderWidth: 1,
    borderColor:titleColor,
  },
  passwordInput: {
    height: height/12,
    marginTop: 8,
    marginBottom:8,
    fontSize: 18,
    width:width, 
  },
  passwordHolder: {
    height: height/12,
    borderWidth: 1,
    borderColor:titleColor,
    flexDirection:flexDirectionRow,
  },
  noAccountText: {
    fontSize: 16,
    alignSelf: alignSelfCenter,
    marginBottom:24,
  },
   buttonText: {
    fontSize: 18,
    color: colorWhite,
    alignSelf: alignSelfCenter
  },
  buttonRegister: {
    height: height/12,
    backgroundColor: titleColor,
    alignSelf: alignSelfStretch,
    marginTop: 24,
    marginBottom: 48,
    padding:12,
    justifyContent:justifyContentCenter
  }
})

export const profilePageStyle = StyleSheet.create({
  profileContainer:{
    flex:flexFirst
  },
  profileTitle:{
    textAlign:textAlignLeft
  },
  emailField:{
    marginTop:12
  },
  contactField:{
    marginTop:12
  },
  checkEmail:{
    margin:-8,
    padding:0,
    flexDirection:flexDirectionRow
  },
  ProfilePageContent:{
    margin:16,
    padding:8
  },
  profileView:{
    margin:20,
  },
  customEmail:{
    color:colorBlack,
    fontSize:16,
    marginTop:8
  },
  shareContainer:{
    marginTop:28
  },
  checkboxContainer:{
    flexDirection:flexDirectionRow,
    marginBottom:4,
    marginTop:20,
    alignSelf:alignSelfStart
  },
  checkBoxFiled:{
    alignSelf:alignSelfStart,
    marginRight:16
  },
  checkboxText:{
    color:colorBlack
  }
})

export const songLyricStyle = StyleSheet.create({
  songLyricsContainer:{
    flex:flexFirst,
  },
  topYoutubeView:{
    flexDirection:flexDirectionColumn
  },
  youtubeViewRatio:{
    height: youtubeViewHeight
  },
  initialYoutubeColor:{
    backgroundColor:colorBlack
  },
  alignDeleteIcon:{
    alignSelf:alignSelfEnd
  },
  youtubePlay:{
    backgroundColor:colorBlack, 
    height:youtubeViewHeight,
    justifyContent:justifyContentCenter
  },
  playIconAlignment:{
    alignSelf:alignSelfCenter
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
    position: absolutePosition,
    alignItems: alignItemsCenter,
    justifyContent: justifyContentCenter,
    right: 0,
    backgroundColor:youtubeIconBackgroundColor,
    bottom: 0,
  },
})

export const youtubeSongSearchStyle = StyleSheet.create({
  youtubeContainer:{
    flex:flexFirst,
    margin:8,
  },
   spinnerCustom:{
    justifyContent:justifyContentCenter,
    alignItems:alignItemsCenter
  },
  imageContainer:{
    flexDirection:flexDirectionRow,
    marginBottom:8
  },
  imageCustom:{
    width:width/3, 
    height:height/8
  },
  playIconAlignment:{
    alignItems:alignItemsCenter,
    justifyContent:justifyContentCenter,
    position:absolutePosition,
    right:0,
    bottom:0
  },
  youtubeTextCustom:{
    height:height/8
    , 
    width:youtubeTextWidth , 
    marginLeft:8
  },
  youtubeTextTitle:{
    marginBottom:8, 
    fontSize:14
  },
  youtubeDescription:{
    fontSize:12
  },
  modalContainer:{
     justifyContent: justifyContentCenter
  },
  modal:{
   borderRadius: 2,
   margin:5,
   padding: 5,
   paddingTop:0,
   backgroundColor: modalBackgroundColor
  },
  modalConent:{
    flexDirection:flexDirectionColumn
  },
  modalConentTitle:{
    fontSize:18,
    margin:10
  },
  youtubeViewRatio:{
  height: youtubeViewHeight
  },
  modalOpen:{
    flexDirection:flexDirectionRow,
    justifyContent:justifyContentEnd
  },
  modalClose:{
    margin: 5,
    marginRight:20,
    alignItems:alignItemsEnd
  },
  modalText:{
   fontSize:20
  },
  modalSave:{
    margin: 5,
    alignItems:alignItemsEnd
  }

})

export const settingStyle = StyleSheet.create({
  container:{
    flex:flexFirst,
    margin:8,
  },
  spinnerCustom:{
    justifyContent:justifyContentCenter,
    alignItems:alignItemsCenter
  },
  textStyle:{
      margin:20
  }
})