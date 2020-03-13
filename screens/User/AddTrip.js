import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button} from 'react-native-elements';
import DeviceImage from '../../components/DeviceImage'
import { useDispatch, useSelector } from 'react-redux';
import * as addTripActions from '../../store/actions/trips'
import ChooseLocation from '../../components/Location'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'





// Style in the props will allow us to pass in overriding styles I believe
///// FOR A LOCATION PICKER ADD AT THE END OF BEFORE BUTTON 
// <View>
//  <ChooseLocation navigation={props.navigation}/>
// </View>
const AddTrip = ({ navigation }) => {

 
 const dispatch = useDispatch();
 const firestore = useFirestore();
 
 //GET ROUTE
  useFirestoreConnect([
    { collection: 'Trips' },{ collection: 'Users', doc: UserId}
  ]);

  const TripsState = useSelector(state => state.firestore.ordered.Trips);
  const UserId = useSelector(state=> state.auth.userId)
  const firestoreTrips = firestore.collection("Trips")

const [isGroup, setIsGroup] = useState(false)
const [TripImage, setTripImage] = useState();
const [tripName, setTripName]= useState('')
const [destinationText, setDestinationText]= useState('')
const [returningText, setReturningText]= useState('')
const [departingText, setDepartingText]= useState('')
const [totalBudgetText, setTotalBudgetText]= useState('')

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

const FormSubmit = ()=>{
    
    if(destinationText.length >0 && tripName.length >0 
        && returningText.length >0 && returningText.length >0 
        && totalBudgetText.length > 0 && departingText.length >0 ){

    const TripData = {
        tripName: tripName,
        totalBudget: totalBudgetText,
        destination: destinationText,
        returning: returningText,
        departing: departingText,
        users: UserId
     }
     //// NEED TO ADD A CATCH STATEMTNT IF NOT POSTED
    firestoreTrips.add(TripData)
        .then(()=> navigation.navigate("My Trips") )
        .catch(error=> console.log(error))
    }else{
        incompleteFields();
    }
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
        
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Input
                label="Trip Name"
                placeholder="John's Bachelor Party"
                name='tripname'
                blurOnSubmit
                autoCorrect={true}
                keyboardType="default"
                maxLength={50}
                onChangeText={(text)=> setTripName(text)}
                value={tripName}
                returnKeyType='next'
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Max Budget"
                    placeholder="1000"
                    name='returning'
                    blurOnSubmit
                    autoCorrect={true}
                    keyboardType="numeric"
                    maxLength={50}
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
                    maxLength={50}
                    onChangeText={(text)=> setDestinationText(text)}
                    value={destinationText}
                    returnKeyType='next'
                 />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Departing Date"
                    placeholder="MM/DD/YYYY"
                    name='departing'
                    blurOnSubmit
                    autoCorrect={true}
                    keyboardType="default"
                    maxLength={50}
                    onChangeText={(text)=> setDepartingText(text)}
                    value={departingText}
                    returnKeyType='next'
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Returning Date"
                    placeholder='MM/DD/YY'
                    name='returning'
                    blurOnSubmit
                    autoCorrect={true}
                    keyboardType="default"
                    maxLength={50}
                    onChangeText={(text)=> setReturningText(text)}
                    value={returningText}
                    returnKeyType='next'
                 />
            </View>
            <View>
            <ChooseLocation navigation={navigation}/>
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