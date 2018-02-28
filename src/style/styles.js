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
  const colorGrey = "grey"

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

  const flexFirst = 1
  const flexDirectionRow = "row"
  const flexDirectionColumn = "column"

  const fontFamilyRobotoMedium = 'roboto-medium'
  const fontFamilyRoboto = 'Roboto'

  const absolutePosition = 'absolute'

  const textAlignLeft = "left"

  const navbarTitlefontWeight ="400"

  const sceneHorizontalMargin = 16
  const sceneVerticalMargin = 16

  const itemVerticalMargin = 8
  const itemHorizontalMargin = 8

  const itemMargin = 8

  const itemPadding = 4
  const textSizeLarge = 20
  const titleTextSize = 18
  const subTextSize = 16
  const textSizeMedium = 14
  const textSizeSmall = 12

export const styleRouter = StyleSheet.create({
navbarRightButton:{
  flexDirection:flexDirectionRow,
  justifyContent:justifyContentCenter
},
buttonTouchable:{
  alignItems:alignItemsCenter,
  marginLeft:itemHorizontalMargin,
  marginRight:itemHorizontalMargin
},
navigationBarColor:{
    backgroundColor: navBarColor
  },
navbarTitle:{
    fontSize:titleTextSize,
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
    margin:itemMargin,
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
    margin:itemMargin
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
    fontSize:titleTextSize,
    width:widthHalf
  },
  eventImage:{
    height:widthQuarter,
    width:widthQuarter,
    justifyContent:justifyContentCenter
  },
  songTitleText:{
    fontSize:titleTextSize,
  },
  songLyricsText:{
    fontSize:subTextSize,
    lineHeight: 26,
    marginTop:0
  },
  contactBookView: {
    margin:itemMargin,
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
    margin:itemMargin,
  },
  contactPhoneIcon:{
    margin:itemMargin,
    marginLeft:0
  },
  contactEmailIcon:{
  margin:itemMargin
  },
  contactSMSIcon:{
    margin:itemMargin
  },
  contactView:{
    flex:flexFirst
  },
  searchIconPadding:{
    paddingLeft:itemPadding
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
    fontSize:subTextSize
  },
  tabTextVerseSize:{
    padding:0,
    fontSize:titleTextSize,
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
    fontSize:subTextSize,
    alignSelf:alignSelfStart
  },
  imageLoaderCenter:{
    alignItems:alignItemsCenter
  }

})
export const eventDetailStyle = StyleSheet.create({
  container:{
    flex:flexFirst,
    margin:itemMargin,
  },
  centerView:{
     flex:flexFirst,
     justifyContent:justifyContentSpaceAround,
     alignItems: alignItemsCenter,
     margin:itemMargin,
     flexDirection:flexDirectionRow
   },
  eventDetailImage:{
    height:heightOneThird,
    marginBottom:sceneVerticalMargin
  },
  eventMap: {
  height:heightOneThird,
  width:width,
  marginTop:itemMargin
  },
  calendarMargin:{
    margin:itemMargin
  },
  eventData:{
    fontSize:titleTextSize,
    padding:itemPadding,
    marginLeft:itemMargin,
    marginRight: itemMargin
  },
  flexOne:{
    flex:flexFirst
  },
  iconTitle:{
    fontSize:subTextSize
  }
})

export const guestLoginStyle = StyleSheet.create({
  tryGuestText: {
    fontSize: subTextSize,
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
    margin:itemMargin,
  },
  liveStreamVideo: {
    alignSelf: alignSelfStretch,
    backgroundColor:colorBlack,
    height: youtubeViewHeight
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
    fontSize: textSizeLarge,
    color: colorWhite,
    alignSelf: alignSelfCenter
  },
})

export const SigninStyle = StyleSheet.create({
  tryGuestText: {
    fontSize: subTextSize,
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
    fontSize: titleTextSize,
    borderWidth: 1,
    borderColor:titleColor,
  },
  passwordInput: {
    height: height/12,
    marginTop: 8,
    marginBottom:8,
    fontSize: titleTextSize,
    width:width, 
  },
  passwordHolder: {
    height: height/12,
    borderWidth: 1,
    borderColor:titleColor,
    flexDirection:flexDirectionRow,
  },
  noAccountText: {
    fontSize: subTextSize,
    alignSelf: alignSelfCenter,
    marginBottom:24,
  },
   buttonText: {
    fontSize: titleTextSize,
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
    margin:sceneVerticalMargin,
    padding:8
  },
  profileView:{
    margin:sceneVerticalMargin,
  },
  RightButton:{
    marginRight:itemHorizontalMargin,
  },
  RightButtonText:{
    color:colorWhite,
    fontSize:subTextSize
  },
  customEmail:{
    color:colorBlack,
    fontSize:titleTextSize,
    marginTop:itemMargin
  },
  shareContainer:{
    marginTop:28
  },
  checkboxContainer:{
    flexDirection:flexDirectionRow,
    marginBottom:4,
    marginTop:sceneVerticalMargin,
    alignSelf:alignSelfStart
  },
  checkBoxFiled:{
    alignSelf:alignSelfStart,
    marginRight:sceneVerticalMargin
  },
  checkboxText:{
    color:colorBlack
  },
  spinnerCustom:{
    justifyContent:justifyContentCenter,
    alignItems:alignItemsCenter
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
    margin: itemMargin
  },
  textSong:{
    fontSize:subTextSize
  },
 youtubeButton: {
    marginRight:sceneHorizontalMargin, 
    marginBottom:itemMargin,
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
    margin:itemMargin,
  },
   spinnerCustom:{
    justifyContent:justifyContentCenter,
    alignItems:alignItemsCenter
  },
  imageContainer:{
    flexDirection:flexDirectionRow,
    marginBottom:itemMargin
  },
  imageCustom:{
    width:width/3, 
    height:height/8,
    backgroundColor:colorGrey
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
    marginLeft:itemMargin
  },
  youtubeTextTitle:{
    marginBottom:itemMargin, 
    fontSize:textSizeMedium
  },
  youtubeDescription:{
    fontSize:textSizeSmall
  },
  modalContainer:{
     justifyContent: justifyContentCenter
  },
  modal:{
   borderRadius: 2,
   margin:itemMargin,
   padding: itemPadding,
   paddingTop:0,
   backgroundColor: modalBackgroundColor
  },
  modalConent:{
    flexDirection:flexDirectionColumn
  },
  modalConentTitle:{
    fontSize:titleTextSize,
    margin:itemMargin
  },
  youtubeViewRatio:{
  height: youtubeViewHeight
  },
  modalOpen:{
    flexDirection:flexDirectionRow,
    justifyContent:justifyContentEnd
  },
  modalClose:{
    margin:itemMargin ,
    marginRight:sceneHorizontalMargin,
    alignItems:alignItemsEnd
  },
  modalText:{
   fontSize:titleTextSize
  },
  modalSave:{
    margin: itemMargin,
    alignItems:alignItemsEnd
  }

})

export const settingStyle = StyleSheet.create({
  container:{
    flex:flexFirst,
    margin:itemMargin,
  },
  spinnerCustom:{
    justifyContent:justifyContentCenter,
    alignItems:alignItemsCenter
  },
  textStyle:{
      margin:sceneHorizontalMargin
  }
})