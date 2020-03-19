import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button} from 'react-native-elements';
import DeviceImage from '../../components/DeviceImage'
import { useDispatch, useSelector } from 'react-redux';
import * as addTripActions from '../../store/actions/trips'
import ChooseLocation from '../../components/Location'
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

const [isGroup, setIsGroup] = useState(false)
const [TripImage, setTripImage] = useState();
const [tripName, setTripName]= useState('')
const [destinationText, setDestinationText]= useState('')
const [totalBudgetText, setTotalBudgetText]= useState('')
const [dateDep, setDateDep] = useState(new Date())
const [dateRet, setDateRet] = useState(dateDep)
const [showDep, setShowDep] = useState(false);
const [showRet, setShowRet] = useState(false);

const Toggle = isGroup =>{
    setIsGroup(isGroup)
    console.log(isGroup)
}

const TripPhotoHandler = imagePath => {
    setTripImage(imagePath)
}
const incompleteFields = () => {
    Alert.alert(
        'Cannot Add Trip Yet',
        'Please verify all fields are filled out correctly',
        [
            {text: 'Ok',
            onPress: ()=>console.log('Ok Pressed, Alert Closed')
            }
        ]
 )
}

console.group("DATES DATES DATES")
   console.log(dateRet)
   console.log(dateDep)
   console.groupEnd('END')
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
     console.group("DATBASE DATES!!!!!!!")
     console.log(departingText)
    console.log(returningText)
    console.log("")
     //// NEED TO ADD A CATCH STATEMTNT IF NOT POSTED
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
        'Something went wrong, please let us know an issue occured while building your trip',
          [
              {text: 'Ok',
              onPress: ()=>console.log('Ok Pressed, Alert Closed')
              }
          ]
        )
      }


  return (
    <KeyboardAvoidingView 
    style={{flex:1}}
    behavior="padding"
    keyboardVerticalOffset={100}
    >
    <ScrollView>
    <View style={styles.screen}>
    
        <View style={styles.bannerContainer}>
            <Text>
                 Where do You want to go?
            </Text>
        </View>

        <View style={styles.ImageContainer}>
            <DeviceImage onPhotoTaken={TripPhotoHandler}/>
        </View>




        <View style={styles.groupContainer}>
            <View style={styles.groupText}>
                <Text>
                    Group Trip
                </Text>
            </View>
            <View style={styles.switchContainer}>
                <Switch 
                    value={isGroup}
                    onValueChange={Toggle}
                    />
            </View>
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
                    <Button
                        type="outline"
                        title="Hide Departing Date"
                        onPress={()=> setShowDep(false)}
                        
                    />
               </View>
                  
                 ):(<Button
                    type="outline"
                    title="Departing Date"
                    onPress={showDeparting}
                     
                  />)}
        </View>
        <View style={styles.dateContainer}>
        {showRet ? (
            <View>
                <DateTimePicker 
                    value={dateRet}
                    display="default"
                    minimumDate={dateDep}
                    onChange={onChangeReturning}
                    />
                    <Button
                        type="outline"
                        title="Hide Returning Date"
                        onPress={()=> setShowRet(false)}
                        
                    />
               </View>
                  
                 ):(<Button
                    type="outline"
                    title="Returning Date"
                    onPress={showReturning}
                     
                  />)}
    
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
        
        <Button
           
            title="Next"
            icon={
                <Icon
                    name="arrow-right"
                    size={15}
                    color="white"
                />
                }
            style={styles.inputContainer}
            onPress={FormSubmit}
            
        />  
        </View>
       
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
   
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10
      }, 
    bannerContainer: {
          marginTop: 20,
          marginBottom: 10

      },
    formContainer: {
          width: 400,
          maxWidth: '80%'

      },
      dateContainer: {
        width: 300,
        marginBottom: 10,
        maxWidth: '80%'
    },
    groupContainer: {
        flexDirection: 'row',
        marginBottom:10,
        marginTop: 10,
    },
    groupText: {
        justifyContent: 'center',
        marginRight: 5,
    },
    switchContainer: {
        
    },
    inputContainer :{
        marginTop: 10,
        marginBottom: 10
    },
    ImageContainer :{
        maxWidth: '60%'
    }
  });

export default AddTrip;