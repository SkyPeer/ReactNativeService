import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import Heartbeat from "./Heartbeat";

const getTime = () => {
  const currentDate = new Date();
  return String(currentDate);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  view: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});

//https://github.com/react-native-netinfo/react-native-netinfo
// npx react-native run-android --variant=release

const App = ({ heartBeat, attempt, received, failed, loaded }) => {
  const imageSize = heartBeat ? 150 : 100;

  const [logData, setLogData] = useState('');

  // useEffect(()=>{
  //   if(heartBeat) {
  //     ttt()
  //   }
  // },[heartBeat])


  const testFoo = async () => {
    const ttt = await Heartbeat.checkService();
    setLogData(String(" ->>> CheckService: " + ttt));
  };

  const resetLogData = () => {
    setLogData('')
  };


  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View>
          <Text>Attempt: {attempt}</Text>
          <Text>Received: {received}</Text>
          <Text>Failed: {failed}</Text>
          <Text>Loaded: {loaded ? 'true' : 'false'}</Text>
          <TextInput multiline
                     style={{ borderWidth: 1.0, minWidth: 150, maxHeight: 200 }}
                     scrollEnabled={true}
                     numberOfLines={5} value={logData}
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
  attempt: store.App.attempt,
  received: store.App.received,
  failed: store.App.failed,
  loaded: store.App.loaded,
});

export default connect(mapStateToProps)(App);
