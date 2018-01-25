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

        WritableMap params = Arguments.createMap();

        if (remoteMessage.getNotification() != null) {
            if (remoteMessage.getNotification().getTitle() != null) {
                params.putString("notification_title", remoteMessage.getNotification().getTitle());
            }
            if (remoteMessage.getNotification().getBody() != null) {
                params.putString("notification_body", remoteMessage.getNotification().getBody());
            }
        }

        if (remoteMessage.getData() != null) {
            if(remoteMessage.getData().size() > 0){
                 Log.d("tag", "Message data payload: " + remoteMessage.getData().toString());
                 for (String key : remoteMessage.getData().keySet()) {
                    params.putString(key, remoteMessage.getData().get(key));
                }

            }
        }

        params.putDouble("notification_timestamp", (double)System.currentTimeMillis());

        NotificationModule.sendEvent("notificationReceived", params);

        //then here we can use the title and body to build a notification
        // MyNotificationManager.getInstance(this).displayNotification(title,body);

    }
}