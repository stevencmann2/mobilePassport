import * as React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NewUserScreen from "../screens/NotUser/NewUser";
import LogInScreen from "../screens/NotUser/LogIn";
import HomeScreen from "../screens/NotUser/Home";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#cb81e6"
    }
  };

  // THEME PROP SET TO DARK THEME BY DEFAULT
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          gestureEnabled: true,
          headerBackTitleVisible: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome to Passport", headerShown: false }}
        />
        <Stack.Screen
          name="NewUser"
          component={NewUserScreen}
          options={{
            title: "Passport",
            headerTitleStyle: {
              fontFamily: "comfortaa-bold"
            },
            headerStyle: {
              backgroundColor: "white"
            }
          }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            title: "Passport",
            headerTitleStyle: {
              fontFamily: "comfortaa-bold"
            },
            headerStyle: {
              backgroundColor: "white"
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStackNavigator;
