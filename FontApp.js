import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const getFonts = () => Font.loadAsync({
    'comfortaa-regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
    'comfortaa-bold': require('./assets/fonts/Comfortaa-Bold.ttf'), 
    'abel-regular': require('./assets/fonts/Abel-Regular')
  }
);


export default function App () {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded){
    return (
      <Home />,
      <LogIn />,
      <NewUser />
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }
};

export default FontApp;
