import React, { useState }  from 'react';
import {
    Text, 
    View, 
   StyleSheet, 
    TouchableWithoutFeedback,
    Keyboard, 
    KeyboardAvoidingView,
    ScrollView,
    Alert
} from 'react-native'
import { useSelector } from 'react-redux'
import Input from '../../../../components/Input'
import Card from '../../../../components/Card'
import { Button } from 'react-native-elements'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'



const Dashboard = props =>{
    const firestore = useFirestore();
    const selectedTrip = useSelector(state=> state.tripID.id)
    
    const bbLocation = firestore.collection('Trips').doc(selectedTrip)
   

     useFirestoreConnect([{ collection: 'Trips', doc: `${selectedTrip}`}]);
      
    const getTrip  = useSelector(state =>state.firestore.data.userTrips[selectedTrip])
    
    
    
   
    const [airfareText, setAirfareText]= useState(0);
    const [transportationText, setTranportationText]= useState(0);
    const [lodgingText, setLodgingText]= useState(0);
    const [foodText, setFoodText]= useState(0);
    const [activitiesText, setActivitiesText]= useState(0);
    const [emergencyText, setEmergencyText]= useState(0);
    const [miscText, setMiscText]= useState(0);
    const [total, setTotal] =useState(0)

      const currentFormTotal = () =>{
          const currentTotal =  parseInt(airfareText) + parseInt(transportationText) + parseInt(lodgingText) + parseInt(foodText) +
          parseInt(activitiesText) + parseInt(emergencyText) + parseInt(miscText)
          console.log('**********************')
          console.log('current total', currentTotal)
          console.log('**********************')
          console.log(typeof(currentTotal))
            setTotal(parseInt(currentTotal))
            console.log('**********************')
            console.log(typeof(total), total)
            console.log('**********************')
      }

      

    const submitBudget = async() =>{
        
    if (getTrip.totalBudget === total){
       try{    
           await bbLocation.collection("BudgetBreakdown").doc(selectedTrip).set({
                Airfare: parseInt(airfareText),
                Tranportation: parseInt(transportationText),
                Lodging: parseInt(lodgingText),
                FoodandDrink: parseInt(foodText),
                Activities: parseInt(activitiesText),
                Emergency: parseInt(emergencyText),
                Misc: parseInt(miscText)
            })
            console.log('after post to DB')
         } catch (err) {
             console.log(err)
         }
     }else{
        BudgetFormInstructions()
     }

    }
    const BudgetFormInstructions = press =>{
        
        Alert.alert(
            'Form Error',
            'Please verify your desired budget by category equals your total trip budget to continue',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
        )
    }

   
    return(
    <TouchableWithoutFeedback 
        onPress={()=> 
        Keyboard.dismiss()}>
                <KeyboardAvoidingView 
                style={{flex:1}}
                behavior="padding"
                keyboardVerticalOffset={15}
                >
                <ScrollView>
                    <View style={styles.screen}>
                        <Card stlye={styles.card}>
                            <View style={styles.center}>
                                <Text style={styles.cardHeader}>Budget by Category</Text>
                             </View>

                             <View style={styles.totalContainer}>
                                <View style={styles.formTotal}>
                                    <Text>Category Total: {parseInt(total)}</Text>
                                </View>
                                <View style={styles.databaseTotal}>
                                    <Text>Total Budget: {getTrip.totalBudget} </Text>
                                </View>
                            
                             </View>
                             <View style={styles.container}>
                                <View style={styles.inputContainer}>
                                    <Input
                                    label="Airfare ($)"
                                    blurOnSubmit
                                    autoCorrect={true}
                                    keyboardType="number-pad"
                                    maxLength={50}
                                    onChangeText={(text)=> setAirfareText(text)}
                                    value={airfareText}
                                    returnKeyType='next'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Input
                                    label="Transportation ($)"
                                    blurOnSubmit
                                    autoCorrect={true}
                                    keyboardType="number-pad"
                                    maxLength={50}
                                    onChangeText={(text)=> setTranportationText(text)}
                                    value={transportationText}
                                    returnKeyType='next'
                                />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Input
                                        label="Lodging ($)"
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setLodgingText(text)}
                                        value={lodgingText}
                                        returnKeyType='next'
                                    />
                                </View>
                        
                        
                                <View style={styles.inputContainer}>
                                    <Input
                                        label="Food and Drink ($)"
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setFoodText(text)}
                                        value={foodText.toString()}
                                        returnKeyType='next'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Input
                                        label="Activities ($)"
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setActivitiesText(text)}
                                        value={activitiesText}
                                        returnKeyType='next'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Input
                                        label="Emergency ($)"
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setEmergencyText(text)}
                                        value={emergencyText.toString()}
                                        returnKeyType='next'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Input
                                        label="Miscellaneous ($)"
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setMiscText(text)}
                                        value={miscText.toString()}
                                        returnKeyType='done'
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button 
                                type="outline"
                                title="Continue"
                                onPress = {submitBudget}
                                />
                                <Button 
                                type="outline"
                                title="Show Total"
                                onPress = {currentFormTotal}
                            />
                            </View>
                     </View>
                </Card>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
      }, 
      card: {
          marginTop: 40
      },
    center : {
        alignItems: 'center',
    },
    cardHeader : {
        fontSize: 20,
        marginBottom: 10
    },
    totalContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    formTotal: {
        marginBottom: 10
    },
    databaseTotal: {
        marginBottom: 10
    },
    container: {
        width: 300,
        maxWidth: '80%',
        padding: 20, 

    },
    inputContainer: {
        width: '100%',
        textAlign: 'center'
    
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default Dashboard;