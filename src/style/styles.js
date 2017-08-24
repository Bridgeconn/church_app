import {StyleSheet,PixelRatio, Dimensions} from 'react-native'

const styles = StyleSheet.create({
	container:{
		flex:1,
		margin:10
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
  	height:200,
  	width:400,
  },
  titleView:{
  	justifyContent:'center',
  	alignItems:'center',
  	marginVertical: 10

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
  }

})

export default styles