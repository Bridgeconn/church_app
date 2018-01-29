import { Platform, AsyncStorage} from 'react-native';
import { Router, Scene,  Schema, Animations, Actions} from 'react-native-router-flux'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";

AsyncStorage.getItem('lastNotification').then(data=>{
  if(data){
    // if notification arrives when app is killed, it should still be logged here
    console.log('last notification', JSON.parse(data));
    AsyncStorage.removeItem('lastNotification');
  }
})

export function registerKilledListener(){
  // these callback will be triggered even when app is killed
      console.log('in registerKilledListener');
  FCM.on(FCMEvent.Notification, notif => {
        console.log(' in registerKilledListener, fcm = ' + JSON.stringify(notif));
    AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
  });
}

// these callback will be triggered only when app is foreground or background
export function registerAppListener(){
      console.log('in registerAppListener');
  
  FCM.on(FCMEvent.Notification, notif => {
    // console.log("Notificatiooooooooooooon", JSON.stringify(notif));
    console.log('in registerAppListener fcm==== ' + JSON.stringify(notif));
    // if(notif.local_notification){
    //   // Actions.noti({notif:notif});
    //    console.log("hey, it opened from there!!!!!");
    //   return
    // }
    if(notif.opened_from_tray){
      console.log("hi it opened from here");
      Actions.jump("tab_verses");
      return
    }

    if(Platform.OS ==='android'){
            //optional
            //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
            //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
            //notif._notificationType is available for iOS platfrom
            switch(notif._notificationType){
              case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
              case NotificationType.NotificationResponse:
                notif.finish();
                break;
              case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
            }
    }
  });

  FCM.on(FCMEvent.RefreshToken, token => {
    console.log("TOKEN (refreshUnsubscribe)", token);
    this.props.onChangeToken(token);
  });

  FCM.enableDirectChannel();
  FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
    console.log('direct channel connected' + data);
  });
  setTimeout(function() {
    FCM.isDirectChannelEstablished().then(d => console.log(d));
  }, 1000);

}

