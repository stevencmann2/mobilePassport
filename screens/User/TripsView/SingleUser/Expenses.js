import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    Picker,
    
} from 'react-native'
import { useSelector } from 'react-redux'
import { Button, Overlay} from 'react-native-elements'
import Input  from '../../../../components/Input'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
// import { VictoryPie } from 'victory-native';
// <VictoryPie
// data={[
//     { x: "Cats", y: 35 },
//     { x: "Dogs", y: 40 },
//     { x: "Birds", y: 55 }
//     ]}
// />



const Expenses = props =>{
    
    const { navigation } = props
    const firestore = useFirestore();

    const selectedTrip = useSelector(state=> state.tripID.id)
    const ExpenseLocation = firestore.collection('Trips').doc(selectedTrip)


    useFirestoreConnect([{ collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
    doc: `${selectedTrip}`, 
    subcollections: [{ collection: "Expenses" }],
    storeAs: 'ExpensesData'
   }
   ]);

//    const getTrip  = useSelector(state =>state.firestore.data.userTrips[selectedTrip])

    const [open, setOpen] = useState(false)
    const[AmountText, setAmountText] = useState()
    const[pickedCategory, setPickedCategory] = useState('Misc');
    const[DescriptionText, setDescriptionText] = useState('');

    const addExpense = async() => {
        const expenseDescription = DescriptionText.trim()
        const expenseAmount = parseInt(AmountText)

        const expenseObj = { 
            Category: pickedCategory,
            Description: expenseDescription,
            Amount: expenseAmount
        }
       if (pickedCategory && expenseDescription.length>0 && expenseAmount > 0){
        try{    
            await ExpenseLocation.collection("Expenses").add(expenseObj)
             console.log(`posting Expense to Firestore ${expenseObj}`)
             setOpen(false)

          } catch (err) {
              console.log(err)
          }
       }else{
        console.log('failed test')
        console.log(pickedCategory, expenseAmount, expenseDescription)
       }
    }

    
    return(
        <View style={styles.screen}>
            <Overlay 
                isVisible={open}
                onBackdropPress={() => setOpen(false)}
                >
                <View style={styles.overlayView}>
                    <View style={styles.overlayHeader}>
                        <Text>Add an Expense!</Text>
                    </View>
                    <View style={styles.categoryHeader}>
                        <Text>Expense Category</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={pickedCategory}
                            onValueChange={(itemValue) =>
                            setPickedCategory(itemValue)}
                        >
                            <Picker.Item label="Airfare" value="Airfare" />
                            <Picker.Item label="Transportation" value="Transportation" />
                            <Picker.Item label="Lodging" value="Lodging" />
                            <Picker.Item label="Food/Drink" value="FoodandDrink" />
                            <Picker.Item label="Activities" value="Activities" />
                            <Picker.Item label="Emergency" value="Emergency" />
                            <Picker.Item label="Misc." value="Misc" />
                        </Picker>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            label='Description :'
                            placeholder='ex. Uber Ride'
                            blurOnSubmit
                            autoCorrect={true}
                            keyboardType="default"
                            maxLength={30}
                            onChangeText={(text)=> setDescriptionText(text)}
                            value={DescriptionText}  
                            returnKeyType='next' 
                        /> 
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            label='Amount ($):'
                            blurOnSubmit
                            autoCorrect={false}
                            keyboardType="number-pad"
                            maxLength={10}
                            onChangeText={(text)=> setAmountText(text)}
                            value={AmountText}  
                            returnKeyType='next' 
                        /> 
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button 
                            type="outline"
                            title="Create Expense"
                            onPress={addExpense}
                        />
                    </View>
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
        paddingHorizontal: 30,
    },
    overlayHeader: {  
        alignItems: 'center',
        marginBottom: 20
    },
    categoryHeader: {  
        alignItems: 'center',
        marginBottom: 10
    },
    pickerContainer:{
        marginBottom: 10
    },
    input: {
        width: '100%',
        textAlign: 'center'
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        textAlign: 'center',
       
    },
    buttonContainer: {
        marginTop: 10,
    }

})

export default Expenses;