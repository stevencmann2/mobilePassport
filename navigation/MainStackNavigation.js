import * as React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NewUserScreen from '../screens/NotUser/NewUser';
import LogInScreen from '../screens/NotUser/LogIn'
import HomeScreen  from '../screens/NotUser/Home'



const Stack = createStackNavigator ();


const MainStackNavigator = ()=> {
  // EXAMPLE OF  THEME TO PASS IN USING REACT NATIVE NAVIGATION
      // COULD ALSO PASS IN CUSTOM HEADER USING REACT NATIVE ELEMENTS USING HEADER COMPONENT
      //MyTheme NOT IN USE RIGHT NOW
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
    },
  };

  // THEME PROP SET TO DARK THEME BY DEFAULT
return(
  <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        gestureEnabled: true,
        headerBackTitleVisible: false,
        
      }}
      >
      <Stack.Screen 
            name='Home' 
            component={HomeScreen} 
            options={{ title: 'Welcome to Passport', headerShown: false }}/>
        <Stack.Screen 
            name='NewUser' 
            component={NewUserScreen} 
            options={{ title: 'Sign Up' }}/>
        <Stack.Screen 
            name='LogIn' 
            component={LogInScreen} 
            options={{ title: 'Log In' }}/>
      
      
      </Stack.Navigator>
  </NavigationContainer>
)
}
export default MainStackNavigator;