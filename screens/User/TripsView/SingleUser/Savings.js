import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'
import { Button, Overlay } from 'react-native-elements'


const Savings = props =>{
    
    const { navigation } = props
    const selectedTrip = useSelector(state=> state.tripID.id)
    console.log('this should be the trip SAVINGS', selectedTrip)

    const [open, setOpen] = useState(false)
    
    return(
        <View style={styles.screen}>
            <Overlay 
                isVisible={open}
                onBackdropPress={() => setOpen(false)}
            >
                <View style={styles.overlayView}>
                    <Text>Add Savings!</Text>
                </View>
            </Overlay>
            <View>
                <Text style={{color: 'black'}}>
                        SAVINGS HOMEPAGE
                </Text>
                <Button 
                type="outline"
                title="Add Savings"
                onPress={()=>setOpen(true)}
                />
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
    },
    overlayView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})

export default Savings;