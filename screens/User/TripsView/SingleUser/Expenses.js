import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    Picker,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Keyboard
} from 'react-native'
import { useSelector } from 'react-redux'
import { Button, Overlay} from 'react-native-elements'
import Input  from '../../../../components/Input'
import { useFirestoreConnect, useFirestore, isEmpty, isLoaded } from 'react-redux-firebase'
import ExpensesCharts from '../../../../components/Charts/ExpensesCharts' 



const Expenses = props =>{
    
    const { navigation } = props
    const firestore = useFirestore();

    const selectedTrip = useSelector(state=> state.tripID.id)
    const ExpenseLocation = firestore.collection('Trips').doc(selectedTrip)
    const ExpensesData = `ExpensesData${selectedTrip}`
    const BudgetBreakdownData = `BudgetBreakdownData${selectedTrip}`

    useFirestoreConnect([{ collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
    doc: `${selectedTrip}`, 
    subcollections: [{ collection: "Expenses" }],
    storeAs: ExpensesData
   },
   { collection: 'Trips', 
        doc: `${selectedTrip}`, 
        subcollections: [{ collection: "BudgetBreakdown" }],
        storeAs: BudgetBreakdownData
    },
   ]);

    const BudgetData = useSelector(state =>state.firestore.ordered[BudgetBreakdownData])
    const fullStoreExpensesArr = useSelector(state=> state.firestore.ordered[ExpensesData])
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
             clearValues()

          } catch (err) {
              console.log(err)
              errorAlert();
              setOpen(false)
              clearValues()
          }
       }else{
        incompleteAlert();
        console.log('failed test')
        console.log(pickedCategory, expenseAmount, expenseDescription)
       }
    }

    const incompleteAlert = () => {
        Alert.alert(
            'Cannot Add Expense',
            'Please verify all fields are filled out completely and there is a dollar amount',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
     )
    }
    const errorAlert = () => {
        Alert.alert(
            'Internal Catch Error',
            'Something went wrong, please let us know an issue occured while posting an expense',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
     )
    }
    const clearValues = ()=> {
        setAmountText();
        setDescriptionText("")

    }


    if(!isLoaded(fullStoreExpensesArr && BudgetData)){
        return (<View style={styles.screen}>
            <ActivityIndicator  
                size="large"
            /> 
        </View>)
    }
    if(isEmpty(BudgetData)){
        return(
            <View style={styles.screen}>
                <Text>Complete the budget form in your trip dashboard to use this feature</Text>
            </View>
        )
    }
    if(isEmpty(fullStoreExpensesArr)){
        return(
            <TouchableWithoutFeedback 
                        onPress={()=> 
                        Keyboard.dismiss()}>
        
                <KeyboardAvoidingView 
                    style={{flex:1}}
                    behavior="padding"
                    keyboardVerticalOffset={15}
                    >
                
                <View style={styles.screen}>
                    <Overlay 
                        isVisible={open}
                        onBackdropPress={() => setOpen(false)}
                        height='95%'
                        >
                        
                        <View style={styles.overlayView}>
                            <View style={styles.overlayHeader}>
                                <Text>Add an Expense!</Text>
                            </View>
                            <View style={styles.categoryHeader}>
                                <Text>Expense Category</Text>
                            </View>
                            <View>
                                <Picker
                                    selectedValue={pickedCategory}
                                    onValueChange={(itemValue) =>
                                    setPickedCategory(itemValue)}
                                >
                                    <Picker.Item label="Airfare" value="Airfare" />
                                    <Picker.Item label="Transportation" value="Transportation" />
                                    <Picker.Item label="Lodging" value="Lodging" />
                                    <Picker.Item label="Food/Drink" value="Food & Drink" />
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
                                <Button 
                                    type="outline"
                                    title="Cancel"
                                    onPress={()=>setOpen(false)}
                                />
                            </View>
                        </View>
                        
                     </Overlay>
                    <View style={styles.initialButtonContainer}>
        
                        
                        <Button 
                        type="outline"
                        title="Add Expense"
                        onPress={()=>setOpen(true)}
                        />
                    </View>
                </View>
                
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
                
            )
        }

      
    if(isLoaded(fullStoreExpensesArr && <ExpensesCharts/> && BudgetData)){
        return(
            <TouchableWithoutFeedback 
                        onPress={()=> 
                        Keyboard.dismiss()}>
        
                <KeyboardAvoidingView 
                    style={{flex:1}}
                    behavior="padding"
                    keyboardVerticalOffset={15}
                    >
                
                <View style={styles.screen}>
                    <Overlay 
                        isVisible={open}
                        onBackdropPress={() => setOpen(false)}
                        height='95%'
                        >
                        
                        <View style={styles.overlayView}>
                            <View style={styles.overlayHeader}>
                                <Text>Add an Expense!</Text>
                            </View>
                            <View style={styles.categoryHeader}>
                                <Text>Expense Category</Text>
                            </View>
                            <View>
                                <Picker
                                    selectedValue={pickedCategory}
                                    onValueChange={(itemValue) =>
                                    setPickedCategory(itemValue)}
                                >
                                    <Picker.Item label="Airfare" value="Airfare" />
                                    <Picker.Item label="Transportation" value="Transportation" />
                                    <Picker.Item label="Lodging" value="Lodging" />
                                    <Picker.Item label="Food/Drink" value="Food & Drink" />
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
                                <Button 
                                    type="outline"
                                    title="Cancel"
                                    onPress={()=>setOpen(false)}
                                />
                            </View>
                        </View>
                        
                     </Overlay>
                    <View style={styles.initialButtonContainer}>
        
                        
                        <Button 
                        type="outline"
                        title="Add Expense"
                        onPress={()=>setOpen(true)}
                        />
                    </View>

                    <View style={styles.chartsContainer}>
                            <ExpensesCharts/>       
                    </View>


                </View>
                
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
                
            )
    
    
    }
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
    input: {
        width: '100%',
        textAlign: 'center'
    },
    inputContainer: {
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop: 5,
    },
    initialButtonContainer:{
        alignContent: 'center',
        justifyContent: 'center'
    }

})

export default Expenses;