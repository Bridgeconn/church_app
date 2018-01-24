package com.churchapplication;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import android.support.annotation.Nullable;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactMethod;

public class NotificationModule extends ReactContextBaseJavaModule {

    public static ReactApplicationContext mCOntext;

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
    
}
