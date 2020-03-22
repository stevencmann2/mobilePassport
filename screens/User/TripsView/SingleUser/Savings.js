import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    Picker,
    Alert,
    ActivityIndicator,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native'
import { useSelector } from 'react-redux'
import { Button, Overlay, Header, Icon } from 'react-native-elements'
import Input  from '../../../../components/Input'
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import SavingsCharts from '../../../../components/Charts/SavingsCharts'


const Savings = props =>{
    
    const { navigation } = props
    const firestore = useFirestore();

    const selectedTrip = useSelector(state=> state.tripID.id)
    const SavingsLocation = firestore.collection('Trips').doc(selectedTrip)
    const SavingsData = `SavingsData${selectedTrip}`
    const BudgetBreakdownData = `BudgetBreakdownData${selectedTrip}`

    useFirestoreConnect([{ collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
        doc: `${selectedTrip}`, 
        subcollections: [{ collection: "Savings" }],
        storeAs: SavingsData
   },
   { collection: 'Trips', 
        doc: `${selectedTrip}`, 
        subcollections: [{ collection: "BudgetBreakdown" }],
        storeAs: BudgetBreakdownData
    },
   ]);

   const BudgetData = useSelector(state =>state.firestore.ordered[BudgetBreakdownData])
   const fullStoreSavingsArr = useSelector(state=> state.firestore.ordered[SavingsData])


    const [open, setOpen] = useState(false)
    const[AmountText, setAmountText] = useState()
    const[pickedCategory, setPickedCategory] = useState('Misc');
    const[DescriptionText, setDescriptionText] = useState('');
    const [screenInfo, setScreenInfo] = useState(false)

    const addSavings = async() => {
        const savingsDescription = DescriptionText.trim()
        const savingsAmount = parseInt(AmountText)

        const savingsObj = { 
            Category: pickedCategory,
            Description: savingsDescription,
            Amount: savingsAmount
        }
       if (pickedCategory && savingsDescription.length>0 && savingsAmount > 0){
        try{    
            await SavingsLocation.collection("Savings").add(savingsObj)
             console.log(`posting Savings to Firestore ${savingsObj}`)
             setOpen(false)
             clearValues();

          } catch (err) {
              console.log(err)
              errorAlert();
              setOpen(false)
              clearValues();
          }
       }else{
           incompleteAlert();
        console.log('failed test')
        console.log(pickedCategory, savingsAmount, savingsDescription)
       }
    }

    const incompleteAlert = () => {
        Alert.alert(
            'Cannot Log Savings',
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
            'Something went wrong, please let us know an issue occured while loging a savings',
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



if(!isLoaded(fullStoreSavingsArr && BudgetData)){
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

if(isEmpty(fullStoreSavingsArr)){
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
  centerComponent={{ text: 'YOUR SAVINGS', style: { color: '#fff', fontFamily: 'comfortaa-bold' } }}
/>
    <View style={styles.screen}>
    <View style={styles.NoSavingsScreen}>
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
        isVisible={screenInfo}
        onBackdropPress={() => setScreenInfo(false)}
        borderRadius={20}
                >
            <View style={styles.overlayView}>
                <View style={styles.overlayHeader}>
                    <Text style={styles.overlayHeaderText}>Savings Tracker</Text>
                </View>
                <View style={styles.overlayBody}>
                    <Text style={styles.overlayText}>
                    Want to see how much you've saved prior to your trip?  
                    </Text>
                    <Text style={styles.overlayText}>
                     Click the add savings button to begin. Once added, charts will appear to help you understand how you are spending your hard earned money.
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


        <Overlay 
        isVisible={open}
        onBackdropPress={() => setOpen(false)}
        height='95%'
        borderRadius={20}
        
        >
        
        <View style={styles.overlayView}>
            <View style={styles.overlayHeader}>
                <Text>Add Your Savings!</Text>
            </View>
            <View style={styles.categoryHeader}>
                <Text>Savings Category</Text>
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
                    title="Log Savings"
                    onPress={addSavings}
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
                title="Add Savings"
                onPress={()=>setOpen(true)}
                />
            </View>
        </View>
        </View>
        </KeyboardAvoidingView>

        </TouchableWithoutFeedback>
     

     )
}    

if(isLoaded(fullStoreSavingsArr && <SavingsCharts/>&& BudgetData)){

return(
 <ScrollView>
      <Header
  centerComponent={{ text: 'YOUR SAVINGS', style: { color: '#fff', fontFamily: 'comfortaa-bold' } }}
/>
    <View style={styles.screen}>
        <Overlay 
        isVisible={open}
        onBackdropPress={() => setOpen(false)}
        height="90%"
        borderRadius={20}
        >
        <View style={styles.overlayView}>
            <View style={styles.overlayHeader}>
                <Text>Add Your Savings!</Text>
            </View>
            <View style={styles.categoryHeader}>
                <Text>Savings Category</Text>
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
                    title="Log Savings"
                    onPress={addSavings}
                />
                <Button 
                    type="outline"
                    title="Cancel"
                    onPress={cancelHandler}
                />
            </View>
        </View>
     </Overlay>
            <View style={styles.buttonContainer}>   
                <Button 
                    type="outline"
                    title="Add Savings"
                    onPress={()=>setOpen(true)}
                />
                
            </View>
            <View style={styles.chartsContainer}>
                 <SavingsCharts/>       
            </View>
            
    </View> 
    </ScrollView>
    
   
)}
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
      },NoSavingsScreen: {
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
      chartsContainer:{
          alignItems: 'center',
          justifyContent: 'center'
      },
      initialButtonContainer:{
          alignContent: 'center',
          justifyContent: 'center'
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
    },
    initialButtonContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    
})

export default Savings;