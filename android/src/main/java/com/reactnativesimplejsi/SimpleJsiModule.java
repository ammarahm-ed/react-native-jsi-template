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

@ReactModule(name = SimpleJsiModule.NAME)
public class SimpleJsiModule extends ReactContextBaseJavaModule {
  public static final String NAME = "SimpleJsi";

  static {
    try {
      // Used to load the 'native-lib' library on application startup.
      System.loadLibrary("cpp");
    } catch (Exception ignored) {
    }
  }

  public SimpleJsiModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  private native void nativeInstall(long jsi);

  public void installLib(JavaScriptContextHolder reactContext) {

    if (reactContext.get() != 0) {
      this.nativeInstall(
        reactContext.get()
      );
    } else {
      Log.e("SimpleJsiModule", "JSI Runtime is not available in debug mode");
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
