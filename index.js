import { AppRegistry } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { name as appName } from "./app.json";
import { increaseAttempt, increaseReceived, increaseFailed, store } from "./store";

const getTime = ()=> {
  const currentDate = new Date();
  return String(currentDate);
};

const MyHeadlessTask = async () => {
  await testFetchData()
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

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
