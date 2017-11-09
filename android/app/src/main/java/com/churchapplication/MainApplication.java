package com.churchapplication;

import android.app.Application;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.vonovak.AddCalendarEventPackage;
import com.lugg.ReactConfig.ReactConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.zmxv.RNSound.RNSoundPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new SplashScreenReactPackage(),
          new AddCalendarEventPackage(),
          new ReactConfigPackage(),
          new VectorIconsPackage(),
          new LinearGradientPackage(),
          new MapsPackage(),
          new ReactNativeContacts(),
          new RNSoundPackage(),
          new ReactNativeYouTube(),
          new ImagePickerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
   
  }
}

