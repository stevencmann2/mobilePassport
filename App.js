import React, {useState} from 'react';
import MainStackNavigator from './navigation/MainStackNavigation'
import UserNavigation from "./navigation/UserNavigation";

export default function App() {
  const[isUser, setIsUser] = useState(false)

  return (
     (isUser) ? <UserNavigation /> : <MainStackNavigator /> 
    );



}





