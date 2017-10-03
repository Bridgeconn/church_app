

import {StyleSheet,PixelRatio, Dimensions} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
	container:{
		flex:1,
		margin:0
	},

	avatarContainer: {
	marginTop:5,
	marginLeft:5,
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
    width: 170,
    height: 170
  },
  avatarProfile: {
    width: 400,
    height: 270
  },
  editIcon:{
  	justifyContent:"flex-end",
  	alignItems:"flex-end",
  	marginTop:140,
  	marginLeft:140

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
    color:'#fff',
    fontWeight:'900'
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
  }

})

export default styles