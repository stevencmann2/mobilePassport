import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/User/Settings'
import TripsScreen from '../screens/User/Trips';
import AddTripScreen from '../screens/User/AddTrip';
import MyAccountScreen from '../screens/User/MyAccount'
import DrawerAvatar from '../components/DrawerAvatar'
import IndividualDashboardScreen from '../screens/User/TripsView/SingleUser/Dashboard'
import SavingsScreen from '../screens/User/TripsView/SingleUser/Savings'
import ExpensesScreen from '../screens/User/TripsView/SingleUser/Expenses'
import ItineraryScreen from '../screens/User/TripsView/SingleUser/Itinerary'
import { Ionicons } from '@expo/vector-icons';
import Button from 'react-native-elements'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
            <Drawer.Screen name="Trips" component={TripsPageNavigator} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  
  );
}

// 
// For Main Landing page of User -  Select Existing Trip or Add Trip
const TripsPageNavigator = () =>{
  return(
  <Stack.Navigator>
        <Stack.Screen name="My Trips" component={TripsScreen} 
            options= {{
              headerTitle: 'My Trips',
             }}
          />
        <Stack.Screen name="AddTrip" component={AddTripScreen} />
        <Stack.Screen name="DashNav" component={DashboardNavigator} options={{headerShown: false }}/>
  </Stack.Navigator>
  )
}

const DashboardNavigator = () => {

  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Savings') {
          iconName = focused
            ? 'ios-calculator': 'ios-calculator';
        } else if (route.name === 'Expenses') {
          iconName = focused ? 'md-pricetags' : 'md-pricetags';
        }else if(route.name === 'Dashboard'){
          iconName = focused ? 'md-list-box' :'md-list'
        }else if(route.name === 'Itinerary'){
          iconName = focused ? 'ios-calendar' :'ios-calendar'
        }
        
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      }

    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    >

      
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
      <Tab.Screen name="Dashboard" component={IndividualDashboardScreen} />
      <Tab.Screen name="Savings" component={SavingsScreen} />
      <Tab.Screen name="Itinerary" component={ItineraryScreen} />
    </Tab.Navigator>
  )
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