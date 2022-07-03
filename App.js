import React, {useEffect, useState} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import Heartbeat from './Heartbeat';
import {setDataAction, resetDataAction, store} from './store';

const getTime = ()=> {
  const currentDate = new Date();
  return String(currentDate);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

//https://github.com/react-native-netinfo/react-native-netinfo
// npx react-native run-android --variant=release

const App = ({ heartBeat, counter, arr }) => {
  const imageSize = heartBeat ? 150 : 100;

  // const [resData, setResData] = useState('')

  // useEffect(()=>{
  //   if(heartBeat) {
  //     ttt()
  //   }
  // },[heartBeat])

  const getLogData = ()=> {
    return arr.toString()
  }

  const ttt = async ()=>{
    try {
      const data = await fetch('')
      store.dispatch(setDataAction(String('  -> Status: ' +data.status + ':' + getTime() + '  ')))
    } catch (e) {
      store.dispatch(setDataAction(String(e + ':' + getTime())))
    }
  }


  const testFoo = async ()=>{
    const ttt = await Heartbeat.checkService()
    store.dispatch(setDataAction(String(' ->>> CheckService: ' + ttt)));
  }

  const resetLogData = ()=>{
    store.dispatch(resetDataAction());
  }


  return (
      <View style={styles.container}>
        <View style={styles.view}>
          {/*<Image source={heart} style={{ width: imageSize, height: imageSize }} resizeMode="contain" />*/}
          <View>
            {/*<Text>{heart ? 'send' : 'wait'}</Text>*/}
            {/*{<Text>OK:{counter1}</Text>}*/}
            {/*{<Text>ERR:{counter2}</Text>}*/}
            <Text>Attempt: {counter}</Text>
            <Text>Status info:</Text>
            <TextInput multiline
                       style = {{borderWidth : 1.0, minWidth: 150, maxHeight: 300}}
                       scrollEnabled={true}
                       numberOfLines={5} value={getLogData()}
            />
          </View>
        </View>




        <View style={styles.view}>
          <TouchableOpacity style={styles.button} onPress={() => Heartbeat.startService()}>
            <Text style={styles.instructions}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => Heartbeat.stopService()}>
            <Text style={styles.instructions}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => testFoo()}>
            <Text style={styles.instructions}>TEST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => resetLogData()}>
            <Text style={styles.instructions}>RESET LOG</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const mapStateToProps = store => ({
  heartBeat: store.App.heartBeat,
  counter: store.App.counter,
  arr: store.App.arr
});

export default connect(mapStateToProps)(App);
