import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'
<<<<<<< HEAD
// import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
=======
import CalendarComponent from '../../components/CalendarComponent';


>>>>>>> c95323c81f7af24cf730971ca573e318822d2aab




<<<<<<< HEAD
const Settings = props =>{
    
    const { navigation } = props
    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
      ];
      
=======

const Settings = props =>{
>>>>>>> c95323c81f7af24cf730971ca573e318822d2aab
    
    const { navigation } = props 
   
    return(
<<<<<<< HEAD
        <View style={styles.container}>
            <View>
                <Text style={{color: 'black'}}>
                        USER SETTINGS HOMEPAGE
                        <Text>
                            hello
                        </Text>
                </Text>
            </View>
            <Text>
                hello
            </Text>
            
            {/* <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View> */}

=======
        <View style={styles.screen}>
        <View style={styles.textContainer}>
            <Text style={{color: 'black'}}>
                Settings Home page
            </Text>
            <CalendarComponent />
        </View>
>>>>>>> c95323c81f7af24cf730971ca573e318822d2aab
        </View>

    )
}


const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});
=======
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    textContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
   
    
})
>>>>>>> c95323c81f7af24cf730971ca573e318822d2aab

export default Settings;