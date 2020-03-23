import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, KeyboardAvoidingView, ImageBackground, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button} from 'react-native-elements';
import Input from '../../components/Input'
import { useDispatch, useSelector } from 'react-redux';
import * as addTripActions from '../../store/actions/trips'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import DateTimePicker from '@react-native-community/datetimepicker';


const AddTrip = ({ navigation }) => {
    
 
 const dispatch = useDispatch();
 const firestore = useFirestore();
 
 //GET ROUTE
  useFirestoreConnect([
    { collection: 'Trips' },{ collection: 'Users', doc: UserId}
  ]);

//   const TripsState = useSelector(state => state.firestore.ordered.Trips);
  const UserId = useSelector(state=> state.auth.userId)
  const firestoreTrips = firestore.collection("Trips")

const [tripName, setTripName]= useState('')
const [destinationText, setDestinationText]= useState('')
const [totalBudgetText, setTotalBudgetText]= useState('')
const [dateDep, setDateDep] = useState(new Date())
const [dateRet, setDateRet] = useState(dateDep)
const [showDep, setShowDep] = useState(false);
const [showRet, setShowRet] = useState(false);


const incompleteFields = () => {
    Alert.alert(
        'Cannot Add Trip Yet',
        'Please verify all fields are filled out correctly.',
        [
            {text: 'Ok',
            onPress: ()=>console.log('Ok Pressed, Alert Closed')
            }
        ]
 )
}

const FormSubmit = ()=>{
    const totalBudgetTest = /^[0-9]*$/.test(totalBudgetText)
    // DEPARTING STRINGIFY
    const departingDateString = JSON.stringify(dateDep)
    const departingArray = departingDateString.split('T')
    const depString = departingArray[0]
    const depArray = depString.split('"')
    const departingText = depArray[1]
  
    //RETUNING STRINGIFY
    const returningDateString = JSON.stringify(dateRet)
    const returningArray = returningDateString.split('T')
    const retString = returningArray[0]
    const retArray = retString.split('"')
    const returningText = retArray[1]
    
    if(destinationText.length >0 && tripName.length >0 && totalBudgetTest){

    const TripData = {
        tripName: tripName,
        totalBudget: parseInt(totalBudgetText),
        destination: destinationText,
        returning: returningText,
        departing: departingText,
        users: UserId
     }
    
    firestoreTrips.add(TripData)
        .then(()=> navigation.navigate("My Trips") )
        .catch(()=> errorAlert())
    }else{
        incompleteFields();
    }
}

const onChangeDeparting = (event, selectedDate) => {
    const DepartingDate = selectedDate || date
    setDateDep(DepartingDate);
   
  };
  
const onChangeReturning = (event, selectedDate) => {
    const ReturningDate = selectedDate || date
    setDateRet(ReturningDate);
    
  };

  const showDeparting=()=>{
      setShowDep(true)

      
  }

  const showReturning=()=>{
    setShowRet(true)
    
}


const errorAlert = () => {
    Alert.alert(
        'Internal Catch Error',
        'Something went wrong, please let us know an issue occured while creating your trip.',
          [
              {text: 'Ok',
              onPress: ()=>console.log('Ok Pressed, Alert Closed')
              }
          ]
        )
      }



  return (

<ImageBackground 
    source={require('../../assets/images/defaultBackground.jpg')}
        style={styles.backgroundImage}>
    <KeyboardAvoidingView 
    style={{flex:1}}
    behavior="padding"
    keyboardVerticalOffset={100}
    >
    <ScrollView>
    <View style={styles.screen}>

        <View style={styles.ScreenHeader}>
            <Text style={styles.ScreenHeaderText}>Passport Trip Builder</Text>
        </View>

       
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Input
                label="Trip Name"
                placeholder="John's Bachelor Party"
                name='tripname'
                blurOnSubmit
                autoCorrect={true}
                keyboardType="default"
                maxLength={30}
                onChangeText={(text)=> setTripName(text)}
                value={tripName}
                returnKeyType='next'
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Max Budget ($)"
                    placeholder="1000"
                    name='returning'
                    blurOnSubmit
                    autoCorrect={true}
                    keyboardType="number-pad"
                    maxLength={10}
                    onChangeText={(text)=> setTotalBudgetText(text)}
                    value={totalBudgetText}
                    returnKeyType='next'
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Destination"
                    placeholder="Denver, CO"
                    name='destination'
                    blurOnSubmit
                    autoCorrect={true}
                    keyboardType="default"
                    maxLength={30}
                    onChangeText={(text)=> setDestinationText(text)}
                    value={destinationText}
                    returnKeyType='next'
                 />
            </View>

            <View style={styles.ButtonContainer}>
                
            {showRet ?(  
                null
            ):(<View style={styles.buttonCenter}>
                <Button
                    type="solid"
                    raised
                    linearGradientProps={{
                        colors: ['purple', 'black']}}
                    title="Departure Date"
                    onPress={showDeparting}/>
            </View>)}
            
            {showDep ? (null):(
                <View style={styles.buttonCenter}>
                <Button
                type="solid"
                raised
                linearGradientProps={{
                    colors: ['purple', 'black']}}
                title="Return Date"
                onPress={showReturning}/>
            </View> 
            )}
            </View>

            <View style={styles.dateContainer}>
            {showDep ? (
                    <View>
                        <DateTimePicker 
                            value={dateDep}
                            display="default"
                            minimumDate={new Date ()}
                            onChange={onChangeDeparting}
                            />
                            <View style={styles.buttonCenter}>
                                <Button
                                    type="solid"
                                    raised
                                    linearGradientProps={{
                                        colors: ['purple', 'black']}}
                                    title="Hide Departing Date"
                                    onPress={()=> setShowDep(false)}
                                    
                                />
                            </View>
                        </View>
            ):(null)}
            {showRet ? (
                <View>
                <DateTimePicker 
                    value={dateRet}
                    display="default"
                    minimumDate={dateDep}
                    onChange={onChangeReturning}
                    />
                    <View style={styles.buttonCenter}>
                        <Button
                            type="solid"
                            raised
                            linearGradientProps={{
                                colors: ['purple', 'black']}}
                            title="Hide Returning Date"
                            onPress={()=> setShowRet(false)} 
                        />
                        </View>
            </View>
            ):(null)}
            </View>
            <View style={styles.nextContainer}>
            <Button
                type="solid"
                raised
                linearGradientProps={{
                    colors: ['purple', 'black']}}             
                title="Next"
                icon={
                    <Icon
                        name="arrow-right"
                        size={15}
                        color="white" 
                    />
                    }
                onPress={FormSubmit}
                
            />  
            </View>
            </View>
       
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </ImageBackground>
   
  );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10
      }, 
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
     },
    bannerContainer: {
          marginTop: 20,
          marginBottom: 10

      },
      ScreenHeader: {
        marginTop: 30,
        marginBottom: 20
      },
      ScreenHeaderText: {
        fontSize: 22,
        fontFamily: 'comfortaa-bold',
      },
    formContainer: {
        marginTop: 20,
        width: 400,
        maxWidth: '80%'

      },
      dateContainer: {
        width: 400,
        maxWidth: '98%',
        marginBottom: 10,
    },
    inputContainer :{
        marginTop: 10,
        marginBottom: 10
    },
   buttonCenter: {
        alignItems: 'center'
   },
    ButtonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    nextContainer: {
        marginTop: 20
    }
    
  });

export default AddTrip;