import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'
import { Button, Overlay, CheckBox } from 'react-native-elements'


const Expenses = props =>{
    
    const { navigation } = props
    const selectedTrip = useSelector(state=> state.tripID.id)
    console.log('this should be the trip EXPENSES', selectedTrip)

    const [open, setOpen] = useState(false)
    const[isChecked, setIsChecked] = useState(false)


    
    return(
        <View style={styles.screen}>
            <Overlay 
                isVisible={open}
                onBackdropPress={() => setOpen(false)}
            >
                <View style={styles.overlayView}>
                    <Text>Add an Expense!</Text>
                </View>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        title='Airfare'
                        checked={false}
                    />
                    <CheckBox
                    title='Transportation'
                    checked={false}
                    />
                </View>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        title='Food and Drink'
                        checked={true}
                    />
                    <CheckBox
                    title='Lodging'
                    checked={false}
                    />
                </View>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        title='Activities'
                        checked={true}
                    />
                    <CheckBox
                    title='Emergency'
                    checked={false}
                    />
                </View>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        title='Miscellaneous'
                        checked={false}
                        />
                 </View>
                
             </Overlay>
            <View>
                <Text style={{color: 'black'}}>
                        SAVINGS HOMEPAGE
                </Text>
                <Button 
                type="outline"
                title="Add Expense"
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
    },
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
    
})

export default Expenses;