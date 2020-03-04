import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import NewUser from './screens/NewUser'
import Header from './components/Header'
import MainStackNavigator from './navigation/MainStackNavigation'

export default function App() {
  /* 
  <View style={styles.container}>
<Header title = "WELCOME TO PASSPORT"/>
<NewUser/>
</View>
*/

  return (
   <MainStackNavigator/ >
   

  );
}




// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
