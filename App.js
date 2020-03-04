import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import NewUser from './screens/NewUser'
import Header from './components/Header'

export default function App() {
  return (
   
    <View style={styles.container}>
      <Header title = "WELCOME TO PASSPORT"/>
      <NewUser/>
    </View>

  );
}




const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
