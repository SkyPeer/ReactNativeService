package com.rntestservice;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class HeartbeatModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "Heartbeat";
    private static ReactApplicationContext reactContext;
    boolean checker = false;

    public HeartbeatModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService() {
//         this.reactContext.startService(new Intent(this.reactContext, HeartbeartService.class));

//         MyClass myClass = new MyClass();
//         myClass.setTestVal(111);
//         this.tttVal = myClass.getTestVal();


        if(checker) {
            System.out.println("-----");
            System.out.println("Service already started");
            System.out.println("-----");
        } else {
            this.checker = true;
            System.out.println("-----");
            System.out.println("Start Service");
            System.out.println("-----");
            this.reactContext.startService(new Intent(this.reactContext, HeartbeartService.class));
        }
    }

    @ReactMethod
    public void stopService() {
        this.checker = false;
        System.out.println("-----");
        System.out.println("Try to stop service");
        System.out.println("-----");
        this.reactContext.stopService(new Intent(this.reactContext, HeartbeartService.class));
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean checkService(){
        return this.checker;
    }
}
