import React, {useEffect, useState} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import Heartbeat from './Heartbeat';
import heart from './heart.png';
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 0.5,
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

const App = ({ heartBeat }) => {
  const imageSize = heartBeat ? 150 : 100;

  const [resData, setResData] = useState('')

  useEffect(()=>{
    if(heartBeat) {
      ttt()
    }

  },[heartBeat])

  const ttt = async ()=>{
    try {
      const data = await fetch('')
      console.log('data', data.status)
      setResData(data.status)
    } catch (e) {
      setResData(String(e))
    }
  }


  const foo = async ()=>{
    try {
      const data = await fetch('')
      console.log('data', data.status)
      setResData(data.status)
    } catch (e) {
      setResData(String(e))
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image source={heart} style={{ width: imageSize, height: imageSize }} resizeMode="contain" />
      </View>
      <TextInput multiline
                 numberOfLines={20} value={String(resData)} />
      <View style={styles.view}>
        <TouchableOpacity style={styles.button} onPress={() => Heartbeat.startService()}>
          <Text style={styles.instructions}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => Heartbeat.stopService()}>
          <Text style={styles.instructions}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => foo()}>
          <Text style={styles.instructions}>TEST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  heartBeat: store.App.heartBeat,
});

export default connect(mapStateToProps)(App);
