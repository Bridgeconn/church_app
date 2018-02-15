import { Button ,View,Text} from 'react-native'
import React, {Component} from 'react'

 export default class YoutubeSongSearch extends Component{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
     setTimeout(()=>{SplashScreen.hide()},
         100
      )
  }
 render(){
<View style={{flex:1}}>
  <Button
    title="Show Dialog"
    onPress={() => {
      this.popupDialog.show();
    }}
  />
  <PopupDialog
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  >
    <View>
      <Text>Hello</Text>
    </View>
  </PopupDialog>
</View>

}
}