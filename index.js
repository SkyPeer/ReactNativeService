import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import {setDataAction, setHeartBeat, store} from './store';

const getTime = ()=> {
  const currentDate = new Date();
  return String(currentDate);
};

const MyHeadlessTask = async () => {
  console.log('Receiving HeartBeat!');
  await testFetchData()
};

const testFetchData = async () => {
  try {
    const data = await fetch('')
    store.dispatch(setDataAction(String('  -> Status: ' + data.status + ':' + getTime() + '  ')))
  } catch (e) {
    store.dispatch(setDataAction(String(e + ':' + getTime())))
  }
}

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
