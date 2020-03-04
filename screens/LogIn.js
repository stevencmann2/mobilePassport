import React, { useState } from 'react';
import { Header } from 'react-native-elements';

import {
    Text, 
    View, 
    Button, 
    StyleSheet,
    TouchableOpacity 

} from 'react-native'



const LogIn = props => {
    const { navigation } = props


    return(
        <View>
            <Text>
                LogIn Screen Body Text
            </Text>
            <TouchableOpacity>
            <Button   
                title="Back A Screen"
                onPress={()=> props.navigation.navigate('NewUser') }
            />
            </TouchableOpacity>
        </View>
    )
}

export default LogIn;