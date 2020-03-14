import React from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'


const Savings = props =>{
    
    const { navigation } = props
    const selectedTrip = useSelector(state=> state.tripID.id)
    console.log('this should be the trip SAVINGS', selectedTrip)
    
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