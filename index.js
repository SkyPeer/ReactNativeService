import { AppRegistry } from "react-native";
import React, {useEffect, useState} from "react";
import { Provider } from "react-redux";
import App from "./App";
import { name as appName } from "./app.json";
import { increaseAttempt, increaseReceived, increaseFailed, setLoaded, store } from "./store";
import Heartbeat from "./Heartbeat";

let bootUpInterval = null;

const checkService = async () => {
  return await Heartbeat.checkService();
}

bootUpInterval = setTimeout(async () => {
  const isServiceRunning = await checkService()
  console.log('isServiceRunning', isServiceRunning)
  store.dispatch(setLoaded(true))
  return await Heartbeat.startService();

  // if(!isServiceRunning) {
  //   console.log('TTT StartService')
  //   return await Heartbeat.startService();
  // }
}, 7000);

const clearServiceStarter = () => {
  console.log('TTT clearServiceStarter')
  store.dispatch(setLoaded(true))
  clearTimeout(bootUpInterval);
  bootUpInterval = null;
}

const MyHeadlessTask = async () => {
  clearServiceStarter()
  await testFetchData();
};

const testFetchData = async () => {
  store.dispatch(increaseAttempt())
  try {
    await fetch('http://192.168.1.50:3100/api/test')
    store.dispatch(increaseReceived())
  } catch (e) {
    store.dispatch(increaseFailed())
  }
}

const RNRedux = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerHeadlessTask('Heartbeat', ()=>MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
