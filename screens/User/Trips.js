import React from 'react';
import {
    Text, 
    View,
    StyleSheet
} from 'react-native'




const Trips = props =>{
    
    const { navigation } = props

    return(
        <View style={styles.screen}>
            <View>
                <Text style={{color: 'black'}}>
                        MY TRIPS PAGE
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    }
    
})

export default Trips