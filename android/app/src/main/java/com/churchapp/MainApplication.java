package com.churchapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.zmxv.RNSound.RNSoundPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.imagepicker.ImagePickerPackage;

import com.lugg.ReactConfig.ReactConfigPackage;

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
            new ReactNativeContacts(),
            new RNSoundPackage(),
            new ReactNativeYouTube(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new ReactConfigPackage()
      );
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
