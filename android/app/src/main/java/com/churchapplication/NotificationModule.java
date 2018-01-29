package com.churchapplication;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import android.support.annotation.Nullable;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;
import com.facebook.react.bridge.ReadableMap;
import android.app.Application;
import android.content.Context;
import android.os.Bundle;
import com.facebook.react.bridge.Arguments;


import android.app.Notification;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationManagerCompat;
import android.util.Log;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class NotificationModule extends ReactContextBaseJavaModule {

    public static ReactApplicationContext mCOntext;
    public static String TAG = "NotificationModuleTag";
    private static final long DEFAULT_VIBRATION = 300L;

    public NotificationModule(final ReactApplicationContext reactContext) {
        super(reactContext);
        mCOntext = reactContext;
    }

    @Override
    public String getName() {
        return "NotificationModule";
    }

    @ReactMethod
    public static void sendEvent(String eventName, @Nullable WritableMap params) {
        mCOntext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

    @ReactMethod
    public void generateNotification(String eventName, ReadableMap details) {
        Bundle bundle = Arguments.toBundle(details);
        Log.d(TAG, "in generate Notification java " + eventName);
        buildNotification((Application) mCOntext.getApplicationContext(), bundle);
    }
    

    public void buildNotification(Context mContext, Bundle bundle) {

        try {
            String intentClassName = getMainActivityClassName(mContext);
            if (intentClassName == null) {
                return ;
            }
            
            if (bundle.getString("body") == null) {
                return ;
            }
            
            Resources res = mContext.getResources();
            String packageName = mContext.getPackageName();
            
            String title = bundle.getString("title");
            if (title == null) {
                ApplicationInfo appInfo = mContext.getApplicationInfo();
                title = mContext.getPackageManager().getApplicationLabel(appInfo).toString();
            }
            
            NotificationCompat.Builder notification = new NotificationCompat.Builder(mContext)
            .setContentTitle(title)
            .setContentText(bundle.getString("body"))
            .setTicker(bundle.getString("ticker"))
            .setVisibility(NotificationCompat.VISIBILITY_PRIVATE)
            .setAutoCancel(bundle.getBoolean("auto_cancel", true))
            .setNumber((int)bundle.getDouble("number"))
            .setSubText(bundle.getString("sub_text"))
            .setGroup(bundle.getString("group"))
            .setVibrate(new long[]{0, DEFAULT_VIBRATION})
            .setExtras(bundle.getBundle("data"));
            
            if (bundle.containsKey("ongoing") && bundle.getBoolean("ongoing")) {
                notification.setOngoing(bundle.getBoolean("ongoing"));
            }
            
            //priority
            String priority = bundle.getString("priority", "");
            switch(priority) {
                case "min":
                    notification.setPriority(NotificationCompat.PRIORITY_MIN);
                    break;
                case "high":
                    notification.setPriority(NotificationCompat.PRIORITY_HIGH);
                    break;
                case "max":
                    notification.setPriority(NotificationCompat.PRIORITY_MAX);
                    break;
                default:
                    notification.setPriority(NotificationCompat.PRIORITY_DEFAULT);
            }
            
            //icon
            String smallIcon = bundle.getString("icon", "ic_launcher");
            int smallIconResId = res.getIdentifier(smallIcon, "mipmap", packageName);
            if(smallIconResId == 0){
                smallIconResId = res.getIdentifier(smallIcon, "drawable", packageName);
            }
            if(smallIconResId != 0){
                notification.setSmallIcon(smallIconResId);
            }
            
            //large icon
            String largeIcon = bundle.getString("large_icon");
            if(largeIcon != null && android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP){
                if (largeIcon.startsWith("http://") || largeIcon.startsWith("https://")) {
                    Bitmap bitmap = getBitmapFromURL(largeIcon);
                    notification.setLargeIcon(bitmap);
                } else {
                    int largeIconResId = res.getIdentifier(largeIcon, "mipmap", packageName);
                    Bitmap largeIconBitmap = BitmapFactory.decodeResource(res, largeIconResId);
                    
                    if (largeIconResId != 0) {
                        notification.setLargeIcon(largeIconBitmap);
                    }
                }
            }
            
            //big text
            String bigText = bundle.getString("big_text");
            if(bigText != null){
                notification.setStyle(new NotificationCompat.BigTextStyle().bigText(bigText));
            }
            
            //picture
            String picture = bundle.getString("picture");
            if(picture!=null){
                NotificationCompat.BigPictureStyle bigPicture = new NotificationCompat.BigPictureStyle();
                
                if (picture.startsWith("http://") || picture.startsWith("https://")) {
                    Bitmap bitmap = getBitmapFromURL(picture);
                    bigPicture.bigPicture(bitmap);
                } else {
                    int pictureResId = res.getIdentifier(picture, "mipmap", packageName);
                    Bitmap pictureResIdBitmap = BitmapFactory.decodeResource(res, pictureResId);
                    
                    if (pictureResId != 0) {
                        bigPicture.bigPicture(pictureResIdBitmap);
                    }
                }
                bigPicture.setBigContentTitle(title);
                bigPicture.setSummaryText(bundle.getString("body"));
                
                notification.setStyle(bigPicture);
            }
            
            //sound
            String soundName = bundle.getString("sound");
            if (soundName != null) {
                if (soundName.equalsIgnoreCase("default")) {
                    notification.setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION));
                } else {
                    int soundResourceId = res.getIdentifier(soundName, "raw", packageName);
                    if (soundResourceId == 0) {
                        soundName = soundName.substring(0, soundName.lastIndexOf('.'));
                        soundResourceId = res.getIdentifier(soundName, "raw", packageName);
                    }
                    notification.setSound(Uri.parse("android.resource://" + packageName + "/" + soundResourceId));
                }
            }
            
            //color
            if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                notification.setCategory(NotificationCompat.CATEGORY_CALL);
                
                String color = bundle.getString("color");
                if (color != null) {
                    notification.setColor(Color.parseColor(color));
                }
            }
            
            //vibrate
            if(bundle.containsKey("vibrate")){
                long vibrate = Math.round(bundle.getDouble("vibrate", DEFAULT_VIBRATION));
                if(vibrate > 0){
                    notification.setVibrate(new long[]{0, vibrate});
                }else{
                    notification.setVibrate(null);
                }
            }
            
            //lights
            if (bundle.getBoolean("lights")) {
                notification.setDefaults(NotificationCompat.DEFAULT_LIGHTS);
            }
            
            if(bundle.containsKey("fire_date")) {
                Log.d(TAG, "broadcast intent if it is a scheduled notification");
                Intent i = new Intent("com.evollu.react.fcm.ReceiveLocalNotification");
                i.putExtras(bundle);
                mContext.sendOrderedBroadcast(i, null);
            }
            
            if(bundle.getBoolean("show_in_foreground")){
                Log.d(TAG, "in show_in_foreground");
                Intent intent = new Intent();
                intent.setClassName(mContext, intentClassName);
                intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                intent.putExtras(bundle);
                intent.setAction(bundle.getString("click_action"));
                
                int notificationID = bundle.containsKey("id") ? bundle.getString("id", "").hashCode() : (int) System.currentTimeMillis();
                PendingIntent pendingIntent = PendingIntent.getActivity(mContext, notificationID, intent,
                                                                        PendingIntent.FLAG_UPDATE_CURRENT);
                
                notification.setContentIntent(pendingIntent);
                
                Notification info = notification.build();
                
                NotificationManagerCompat.from(mContext).notify(notificationID, info);
            }
        } catch (Exception e) {
            Log.e(TAG, "failed to send local notification", e);
        }
    }

    public String getMainActivityClassName(Context mContext) {
        String packageName = mContext.getPackageName();
        Intent launchIntent = mContext.getPackageManager().getLaunchIntentForPackage(packageName);
        String className = launchIntent.getComponent().getClassName();
        return className;
    }

    public Bitmap getBitmapFromURL(String strURL) {
        try {
            URL url = new URL(strURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            return BitmapFactory.decodeStream(input);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
