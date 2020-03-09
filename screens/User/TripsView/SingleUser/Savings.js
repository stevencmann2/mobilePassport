import React from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'



const Savings = props =>{
    
    const { navigation } = props

    
    return(
        <View style={styles.screen}>
            <View>
                <Text style={{color: 'black'}}>
                        SAVINGS HOMEPAGE
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

export default Savings;