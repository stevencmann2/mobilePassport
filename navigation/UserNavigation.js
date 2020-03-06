import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SettingsScreen from '../screens/User/Settings'
import TripsScreen from '../screens/User/Trips';
import MyAccountScreen from '../screens/User/MyAccount'
import DrawerAvatar from '../components/DrawerAvatar'


const Drawer = createDrawerNavigator();

const UserNavigation = () => {
  return (
    <NavigationContainer>
        
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
    backgroundColor: '#a6cfa1',  
};
// PROPERTY NAMES DEFINED BY THE API, PER ITEM LISTED
///https://reactnavigation.org/docs/drawer-navigator/#props
const DrawerOptions ={
    //text color!!!
    activeTintColor: 'white',
    inactiveTintColor: 'black',
    //background color!!!!! 
    activeBackgroundColor: 'blue',
    inactiveBackgroundColor: 'pink'
};

export default UserNavigation;