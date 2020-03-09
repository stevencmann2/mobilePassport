import React, { useEffect, useState } from 'react';
import MainStackNavigator from './navigation/MainStackNavigation'
import UserNavigation from "./navigation/UserNavigation";
import { Provider } from 'react-redux';
// import RNFirebase from 'react-native-firebase';
// import 'firebase/firestore';
import { Text, View } from 'react-native'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import createStore from './store';
import firebaseConfig from './config/firebase-config';
import rrfConfig from './config/rrf-config';
import firebase from 'firebase'
import '@firebase/firestore';


const initialState = {
  firebase: {
    authError: null,
  },
}

console.log(firebaseConfig)

const store = createStore(initialState);


try {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  
} catch (err) {
  console.log(err)
};


const App = () => {
  const rrfProps = {
    firebase: firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };

  return (

    <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
        <MainStackNavigator/>
    </ReactReduxFirebaseProvider>
</Provider>

    );



}

export default App;





