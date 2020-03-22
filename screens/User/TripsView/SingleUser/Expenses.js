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
    Keyboard,
} from 'react-native'
import { useSelector } from 'react-redux'
import { Button, Overlay, Icon} from 'react-native-elements'
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
    const [screenInfo, setScreenInfo] = useState(false)

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

    const cancelHandler = () => {
        setOpen(false)
        clearValues()
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
            <View style={styles.noBudget}>
                <Text style={styles.noBudgetText}>Can not use this feature yet</Text>
                <Text style={styles.noBudgetText}>Complete budget form to use</Text>
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
                    <Header
                    centerComponent={{ text: 'YOUR EXPENSES', style: { color: '#fff', fontFamily: 'comfortaa-bold' } }}
                  />
                                  
                <View style={styles.NoExpensesScreen}>
                <View style={styles.EmptyScreenView}>
                <View style={styles.EmptyIconContainer}>
                        <Icon
                            name='ios-help-circle-outline'
                            type='ionicon'
                            size ={18}
                            color='black'
                            onPress={()=>setScreenInfo(true)}
                        />
                </View>
                    <Overlay 
                        isVisible={open}
                        onBackdropPress={() => setOpen(false)}
                        height='95%'
                        borderRadius={20}
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
                                    <Picker.Item label="Food" value="Food" />
                                    <Picker.Item label="Activities" value="Activities" />
                                    <Picker.Item label="Emergency" value="Emergency" />
                                    <Picker.Item label="Misc." value="Misc" />
                                </Picker>
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
                                    returnKeyType='done' 
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
                                    onPress={cancelHandler}
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

                    <Overlay
                    isVisible={screenInfo}
                    onBackdropPress={() => setScreenInfo(false)}
                    borderRadius={20}
                            >
                        <View style={styles.overlayView}>
                            <View style={styles.overlayHeader}>
                                <Text style={styles.overlayHeaderText}>Expenses Tracker</Text>
                            </View>
                            <View style={styles.overlayBody}>
                                <Text style={styles.overlayText}>
                                Need to account for expenses prior to or during your trip? This is where you will add it! 
                                </Text>
                                <Text style={styles.overlayText}>
                                 Click the add expense button to begin. Once added, charts will appear to help you understand how you are spending your hard earned money.
                                </Text>
                                <Text style={styles.overlayText}>
                                Need more info? Try pressing the individual charts that appear to better understand their meaning! 
                                </Text>
                            </View>
                            
            
                            <View style={styles.overlayButton}>
                                <Button 
                                    type="outline"
                                    title="Got It"
                                    onPress={()=>setScreenInfo(false)}
                                />
                            </View>


                        </View>
                        
                    </Overlay>
                </View>
                
                </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
                
            )
        }

      
    if(isLoaded(fullStoreExpensesArr && <ExpensesCharts/> && BudgetData)){
        return(
            <ScrollView>
                <Header
  centerComponent={{ text: 'YOUR EXPENSES', style: { color: '#fff', fontFamily: 'comfortaa-bold' } }}
/>
       
                <View style={styles.screen}>
                    <Overlay 
                        isVisible={open}
                        onBackdropPress={() => setOpen(false)}
                        height='95%'
                        borderRadius={20}
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
                                    <Picker.Item label="Food" value="Food" />
                                    <Picker.Item label="Activities" value="Activities" />
                                    <Picker.Item label="Emergency" value="Emergency" />
                                    <Picker.Item label="Misc." value="Misc" />
                                </Picker>
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
                                    returnKeyType='done' 
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
                                    onPress={cancelHandler}
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
                
         </ScrollView>
                
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
    NoExpensesScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    noBudget: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 40,    
      },
      noBudgetText:{
        lineHeight: 25,
      },
    screenHeader: {
        marginTop: 100,
        marginBottom: 30
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartsContainer: {
        marginTop: 30
    },
 
    EmptyIconContainer: {
        alignItems: 'center',
        marginBottom: 50,     
    },
    overlayBody: {  
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    overlayText: {
        marginBottom: 15,
        lineHeight: 25
    },
   overlayHeaderText: {
       fontSize: 20
   },
    overlayButton:{
        justifyContent: 'flex-end',
    },
    EmptyScreenView: {
        flexDirection: 'column',
        justifyContent: "space-around"
    }

})

export default Expenses;