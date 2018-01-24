package com.churchapplication;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.util.Log;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ActivityEventListener;


//class extending FirebaseMessagingService
public class MyFirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Log.i("tag1","on message recieve : "+ remoteMessage.toString());

        if (remoteMessage.getData() != null) {
            Log.i("tag1", "remote data = " + remoteMessage.getData().toString());
        }
        if (remoteMessage.getNotification() != null) {
            Log.i("tag1", "remote notification = " + remoteMessage.getNotification().getBody());        
            Log.i("tag1", "remote notification = " + remoteMessage.getNotification().getTitle());
        }
        WritableMap params = Arguments.createMap();
        params.putInt("notification_title", remoteMessage.getNotification().getTitle());
        params.putString("book_name", "Proverbs");
        param.putLong("timestamp", System.currentTimeInmillis());

        NotificationModule.sendEvent("notificationReceived", params);

        //if the message contains data payload
        //It is a map of custom keyvalues
        //we can read it easily
        if(remoteMessage.getData().size() > 0){
            //handle the data message here

        }

        //getting the title and the body
        String title = remoteMessage.getNotification().getTitle();
        String body = remoteMessage.getNotification().getBody();

        //then here we can use the title and body to build a notification

        MyNotificationManager.getInstance(this).displayNotification(title,body);

    }
}