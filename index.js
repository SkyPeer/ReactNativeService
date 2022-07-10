import { AppRegistry } from "react-native";
import React, {useEffect, useState} from "react";
import { Provider } from "react-redux";
import App from "./App";
import { name as appName } from "./app.json";
import { increaseAttempt, increaseReceived, increaseFailed, store } from "./store";
import Heartbeat from "./Heartbeat";

let bootUpInterval = null;

const serviceStarter = () => {
  return bootUpInterval = setTimeout(() => {
    console.log('serviceStarter');
    return Heartbeat.startService();
  }, 3000);
};

const clearServiceStarter = () => {
  console.log('clearServiceStarter')
  return clearTimeout(bootUpInterval);
}

const MyHeadlessTask = async () => {
  clearServiceStarter()
  await testFetchData();
};

const testFetchData = async () => {
  store.dispatch(increaseAttempt())
  try {
    await fetch('')
    store.dispatch(increaseReceived())
  } catch (e) {
    store.dispatch(increaseFailed())
  }
}

const RNRedux = () => {



  const ttt = ()=> {
    console.log("TTT TTT TTT")
  }

  useEffect(() => {
    return
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
