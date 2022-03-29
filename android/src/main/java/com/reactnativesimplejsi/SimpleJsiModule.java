package com.reactnativesimplejsi;

import android.content.SharedPreferences;
import android.os.Build;
import android.preference.PreferenceManager;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReactMethod;

@ReactModule(name = SimpleJsiModule.NAME)
public class SimpleJsiModule extends ReactContextBaseJavaModule {
  public static final String NAME = "SimpleJsi";
  private native void nativeInstall(long jsiPtr, String docDir);

  public SimpleJsiModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean install() {
    try {
      System.loadLibrary("cpp");

      ReactApplicationContext context = getReactApplicationContext();
      nativeInstall(
        context.getJavaScriptContextHolder().get(),
        context.getFilesDir().getAbsolutePath()
      );
      return true;
    } catch (Exception exception) {
      return false;
    }
  }

  public String getModel() {
    String manufacturer = Build.MANUFACTURER;
    String model = Build.MODEL;
    if (model.startsWith(manufacturer)) {
      return model;
    } else {
      return manufacturer + " " + model;
    }
  }

  public void setItem(final String key, final String value) {

    SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this.getReactApplicationContext());
    SharedPreferences.Editor editor = preferences.edit();
    editor.putString(key,value);
    editor.apply();
  }

  public String getItem(final String key) {
    SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this.getReactApplicationContext());
    String value = preferences.getString(key, "");
    return value;
  }

}
