// import { StatusBar } from 'expo-status-bar';
// import React ,{useState }from 'react';
// import { StyleSheet, Text, View , Button, TextInput } from 'react-native';


// export default function App() {
  
//   const [enterGoal,setGoal]=useState('');
//   const [goalsList,setGoalsList] = useState([]);

//   const handleGoal=(text)=>{
//     setGoal(text);
//   }

//   const addGoalHandler=()=>{
//     setGoalsList(goalsList => [...goalsList,enterGoal]);
//   }

//   return (
//    <View>
//       <View style = {styles.container}>
//         <TextInput placeholder="Add your goal" onChangeText={handleGoal} value={enterGoal} style={{borderWidth:1,borderColor:'black'}}/>
//         <Button title="add" onPress={addGoalHandler}></Button>
//       </View>
//       <View>
//   {goalsList.map(goal =><Text>{goal}</Text>}
//       </View>
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {  
//     padding: 100,
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: "space-between"
//   },
// });
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
