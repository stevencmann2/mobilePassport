import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
<<<<<<< HEAD
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import DashboardScreen from '../screens/User/Dashboard';
=======
import { NavigationContainer } from '@react-navigation/native';
>>>>>>> steven
import SettingsScreen from '../screens/User/Settings'
import TripsScreen from '../screens/User/Trips';
import MyAccountScreen from '../screens/User/MyAccount'
import DrawerAvatar from '../components/DrawerAvatar'


const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00ff00',
  },
};

const UserNavigation = () => {

  return (
    <NavigationContainer theme={MyTheme}>
        
      <Drawer.Navigator 
        initialRouteName="Trips"
        drawerStyle={DrawerColor}
        drawerContent={props => DrawerAvatar(props)}
        drawerContentOptions={DrawerOptions}>

        <Drawer.Screen name="My Account" component={MyAccountScreen} />
        <Drawer.Screen name="Trips" component={TripsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        

      </Drawer.Navigator>
    </NavigationContainer>
  
  );
}
// STYLING FOR THE DRAWER

const DrawerColor = {
    backgroundColor: '#f08080',  
};
// PROPERTY NAMES DEFINED BY THE API, PER ITEM LISTED
///https://reactnavigation.org/docs/drawer-navigator/#props
const DrawerOptions ={
    //text color!!!
    activeTintColor: 'white',
    inactiveTintColor: 'black',
    //background color!!!!! 
    // activeBackgroundColor: '#add8e6',
    // inactiveBackgroundColor: 'pink'
};

export default UserNavigation;