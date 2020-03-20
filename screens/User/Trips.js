import React, { useState } from 'react';
import {
    Text, 
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { Header, Image, Icon, Button } from 'react-native-elements'
import Input from '../../components/Input'
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore, withFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import * as tripActions from '../../store/actions/trips'




const Trips = ({ navigation }) =>{
    
    
    const dispatch = useDispatch();
    const userTrips = 'userTrips'
    // FIRESTORE STUFF
    const firestore = useFirestore();
    const UserId = useSelector(state=> state.auth.userId)
    const Profile = `Profile${UserId}`

    useFirestoreConnect([
        {
            collection: 'Trips',
            where: [
              ['users', '==', `${UserId}`]
            ],
            storeAs: userTrips
          },
          { collection: 'Users', doc: UserId},
          {collection: 'Users', doc: UserId, storeAs: Profile}
      ]);

    const UserProfile = useSelector(state =>state.firestore.ordered[Profile])
    const TripsData = useSelector(state =>state.firestore.ordered[userTrips])
    const UserData = useSelector(({ firestore: { data } }) => data.Users && data.Users[UserId])
   
    
    const [firstNameText, setFirstNameText] = useState("");
    const [lastNameText, setLastNameText] = useState("");
    const [usernameText, setUsernameText] = useState("");

    const firstNameTest = /^[A-Za-z]+$/.test(firstNameText)
    const lastNameTest = /^[A-Za-z]+$/.test(lastNameText)
    const usernameTest = /^[a-zA-Z0-9_-]{4,16}$/.test(usernameText) 

    const userHandler = async() => {
        const firestoreUsers = firestore.collection("Users")
    if (firstNameTest && lastNameTest && usernameTest){
        try {
            await firestoreUsers.doc(UserId).set({
                firstName: firstNameText,
                lastName: lastNameText,
                username: usernameText,
                userId: UserId
            })
         } catch (err) {
          console.log(err)
          errorAlert();
        }      
    }else{
        incompleteFields();
    }
    }
    const errorAlert = () => {
        Alert.alert(
            'Internal Catch Error',
            'Something went wrong, please let us know an issue occured while submitting your profile.',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed.')
                }
            ]
     )
    }


    const userNameInstructions = press =>{
        
        Alert.alert(
            'Your Username',
            'Only Letters and Numbers Permitted (ex: username123, UserName987)',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed.')
                }
            ]
        )
    }
    ////// USE THIS
    const incompleteFields = () => {
        Alert.alert(
            'Profile Error',
            'Please verify all fields are filled out correctly',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed.')
                }
            ]
     )
    }

    const selectTrip = async(id) => {
        console.log('this is the id im grabbing', id)
        try {
            await dispatch(tripActions.trackTrip(id));
            navigation.navigate('DashNav')

        } catch (err) {
         console.log(err);
    
        }
        
    }
   
    if(!isLoaded(UserData)){

        return( 
            <View style={styles.screen}>
                <ActivityIndicator  size="large"/> 
            </View>)
        
    }


    if(isEmpty(UserData)){
        return(
         <TouchableWithoutFeedback 
                onPress={()=> 
                Keyboard.dismiss()}>
            <View style={styles.firstScreen}>
   
                 <View style={styles.banner}>
<<<<<<< HEAD
                     <Text>
                        Please Create a User Profile to Continue.
=======
                     <Text style={styles.bannerHeader}>
                        Thanks for choosing Passport!  
                    </Text>
                    <Text styles={styles.bannerText}>
                        We need some additional information before proceeding
>>>>>>> be6de01e1e5f7ecf396b024e4d297f39f3ed2836
                    </Text>
                </View>
       
       
                <Card style={styles.formCard}>
                     <View>
                        <Input
                            style={styles.input}
                            label="First Name"
                            name="firstName"
                            blurOnSubmit
                            autoCorrect={false}
                            keyboardType="default"
                            maxLength={30}
                            onChangeText={(text)=> setFirstNameText(text)}
                            value={firstNameText}
                            returnKeyType='next'
                        /> 
                        <Input
                            style={styles.input}
                            label='Last Name'
                            name='lastName'
                            blurOnSubmit
                            autoCorrect={false}
                            keyboardType="default"
                            maxLength={30}
                            onChangeText={(text)=> setLastNameText(text)}
                            value={lastNameText}  
                            returnKeyType='next' 
                        /> 
                
                        <TouchableOpacity onPress={userNameInstructions}>
                        <Input
                            
                            style={styles.input}
                            label='Username'
                            special={<Icon
                                name='ios-information-circle-outline'
                                type='ionicon'
                                size ={18}
                                color='red'
                            />}
                            name='username'
                            blurOnSubmit
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType="default"
                            maxLength={30}
                            onChangeText={(text)=> setUsernameText(text)}
                            value={usernameText} 
                            returnKeyType='next'
                        /> 
                        </TouchableOpacity>
                        <Button 
                            type='outline'
                            title="Next"
                            onPress={userHandler}
                        />
                
                    </View>
                </Card>
    
            </View>
        </TouchableWithoutFeedback>
        )

    }
            
        return(
            <ScrollView>
            <View style={styles.screen}>
            
            {TripsData.length > 0 ? (
                TripsData.map((trip)=>
                    
                    <View style={styles.container} key={trip.id}>
                        <TouchableOpacity
                            onPress={()=>selectTrip(trip.id)}>
                            <View style={styles.ImgContainer}>
                                <Image 
                                    source={require('../../assets/images/PalmTrees.jpg')} 
                                    style={styles.Img} 
                                />
                            </View>
                         </TouchableOpacity>

                        <View style={styles.TripName}>
                            <Text>
                                {trip.tripName}
                            </Text>
                        </View>
                    </View>
                )

            ) : (<Text style={styles.container}>
                    You have no trips yet, please click the button below to add a trip. 
                </Text>) 
            }
                
                     
            <View style={styles.buttonContainer}>
            <Button
                type= 'outline'
                title="Add Trip"
                onPress={()=> navigation.navigate('AddTrip')}
            />
            </View>

            
         </View>
         </ScrollView>

        )
    }



    


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    firstScreen: {
        flex: 1,
        alignItems: 'center',
        
      },
    container: {
        marginTop: 20,
        paddingHorizontal: 10
    },
    ImgContainer: {
        width : 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3, 
        borderColor: 'black',
        overflow: 'hidden'
    },
    Img: {
        width: 300, 
        height: 300,
        
    },
    TripName: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 50
    },
    input: {
        width: '100%',
        textAlign: 'center'
    
    },
    banner: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center'
    },
    bannerHeader:{
        lineHeight: 25,
        fontSize: 18,
        marginBottom: 10
    },
    bannerText:{
        lineHeight: 25,  
    },
    formCard: {
        width: 300,
        maxWidth: '80%'
    }
    
})

export default Trips