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
import { Asset } from 'expo-asset'

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



async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      'comfortaa-regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
     'comfortaa-bold': require('./assets/fonts/Comfortaa-Bold.ttf'), 
     'abel-regular': require('./assets/fonts/Abel-Regular.ttf')
    }),
   
  ]);
}

// function cacheImages(images) {
//   return images.map(image => {
//     if (typeof image === 'string') {
//       return Image.prefetch(image);
//     } else {
//       return Asset.fromModule(image).downloadAsync();
//     }
//   });
// }

// function cacheFonts(fonts) {
//   return fonts.map(font => Font.loadAsync(font));
// }



// async function loadResourcesAsync() {
//   const imageAssets = cacheImages([  
//     require('./assets/images/HomeScreenBackground.jpg'),
//     require('./assets/images/LogInBackground.jpg'),
//     require('./assets/images/NewUserBackground.jpg'),
//     require('./assets/images/defaultBackground.jpg'),
//     require('./assets/images/sample1.jpg'),
//     require('./assets/images/sample2.jpg'),
//     require('./assets/images/sample3.jpg'),
//     require('./assets/images/sample4.jpg'),
//   ]);

//   const fontAssets = cacheFonts([
//     require('./assets/fonts/Comfortaa-Regular.ttf'),
//     require('./assets/fonts/Comfortaa-Bold.ttf'), 
//     require('./assets/fonts/Abel-Regular.ttf')
//   ]);

//   await Promise.all([...imageAssets, ...fontAssets]);
// }




const App = () => {
  const [LoadingComplete, setLoadingComplete] = useState(false)
 








  

  const rrfProps = {
    firebase: firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };


  if(!LoadingComplete){
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onFinish={()=>setLoadingComplete(true)}
        
      />
    )
    
  } 
    


    return (
      
      <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <DetermineView/>
      </ReactReduxFirebaseProvider>
    </Provider>

  )
  

}

export default App;





