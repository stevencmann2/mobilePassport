import React, { useEffect, useState } from 'react';
import MainStackNavigator from './navigation/MainStackNavigation'
import UserNavigation from "./navigation/UserNavigation";
import { Provider, useSelector } from 'react-redux';
import { ReactReduxFirebaseProvider, useFirestoreConnect, isLoaded, useFirestore  } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import createStore from './store';
import firebaseConfig from './config/firebase-config';
import rrfConfig from './config/rrf-config';
import firebase from 'firebase';
import '@firebase/firestore';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {decode, encode} from 'base-64'



if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const initialState = {
  firebase: {
    authError: null,
  },
}


const store = createStore(initialState);


try {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  
} catch (err) {
  console.log(err)
};



function DetermineView({ children }) {
  const auth = useSelector(state => state.auth.token)
  if (auth=== null) return <MainStackNavigator />;
  return <UserNavigation />
}


const App = () => {
  useEffect(() => {
    Font.loadAsync({
     'comfortaa-regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
     'comfortaa-bold': require('./assets/fonts/Comfortaa-Bold.ttf'), 
     'abel-regular': require('./assets/fonts/Abel-Regular.ttf')
     
   })
 }, []);

  const rrfProps = {
    firebase: firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };


  if(isLoaded){

    return (
      
        <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <DetermineView/>
        </ReactReduxFirebaseProvider>
      </Provider>

    );
  } else {
    return (
      <AppLoading
        
      />
    )
  }

}

export default App;





