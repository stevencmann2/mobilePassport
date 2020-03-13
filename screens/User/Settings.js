import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'
import CalendarComponent from '../../components/CalendarComponent';

const Settings = props =>{
    
    const { navigation } = props 
   
    return(
        <View style={styles.screen}>
        <View style={styles.textContainer}>
            <Text style={{color: 'black'}}>
                Settings Home page
            </Text>
            <CalendarComponent />
        </View>
        </View>

    )
}


const styles = StyleSheet.create({
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

export default Settings;