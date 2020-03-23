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
    Keyboard,
    ImageBackground
} from 'react-native'
import { Header, Image, Icon, Button } from 'react-native-elements'
import Input from '../../components/Input'
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore, withFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import * as tripActions from '../../store/actions/trips'
import * as Animatable from 'react-native-animatable';
import Colors from '../../constants/colors';
import moment from 'moment';




const Trips = ({ navigation }) =>{
   
    const [animationType, setAnimationType]=useState("bounceIn")
    const [animationTime, setAnimationTime] = useState(1)
    const [animationDuration, setAnimationDuration] = useState(2000)
   
    
  
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
    const TripDel = useSelector(state=> state.firestore.data[userTrips])
    
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
                userId: UserId,
                
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
            'Please verify all fields are filled out correctly.',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed.')
                }
            ]
     )
    }

    const selectTrip = async(id) => {
        
        try {
            await dispatch(tripActions.trackTrip(id));
            navigation.navigate('DashNav')

        } catch (err) {
         console.log(err);
    
        }   
    }

    const deleteTripConfirm = (id) => {
        setAnimationTime('infinite')
        setAnimationType("shake")
        setAnimationDuration(2000)
        Alert.alert(
            
            'Trip Delete Warning!',
            'You are about to delete your trip. Are you sure you want to delete?',
            [
                {text: 'Delete',
                onPress: ()=> deleteTripHandler(id)
                },
                {text: 'Cancel',
                onPress: ()=> cancelDelete()
                }
            ]
      )
      }

      const cancelDelete = ()=>{
        setAnimationTime()
        setAnimationType("")
        setAnimationDuration()
      }

      const deleteTripHandler = async(id) => {  
    
        try{    
          await firestore.collection('Trips').doc(id).delete()
           setAnimationTime(1)
            setAnimationType("bounceIn")
            setAnimationDuration(2000)
        } catch (err) {
            console.log(err)
            setAnimationTime(1)
            setAnimationType("bounceIn")
            setAnimationDuration(2000)
            deleteErrorAlert()    
        }
      }

      const deleteErrorAlert = () => {
        Alert.alert(
            'Delete Error',
            'We apologize, an error occured while attempeting to delete your trip. Please let us know this issue occured.',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
     )
    }

   
    if(!isLoaded(UserData)){

        return( 
            <View style={styles.screen}>
                <ActivityIndicator  size="large"/> 
            </View>)
        
    }


    if(isEmpty(UserData)&& isLoaded(<ImageBackground/>)){
        return(
    <ImageBackground 
    source={require('../../assets/images/defaultBackground.jpg')}
    style={styles.backgroundImage}>
         <TouchableWithoutFeedback 
                onPress={()=> 
                Keyboard.dismiss()}>
            <View style={styles.firstScreen}>
   
                 <View style={styles.banner}>
                     <Text style={styles.bannerHeader}>
                        Thanks for choosing Passport!  
                    </Text>
                    <Text styles={styles.bannerText}>
                        We need some additional information before we proceed.
                    </Text>
                </View>
       
       
                <Card style={styles.formCard}>
                <View style={styles.cardHeader}>
                    <Text style={{fontSize: 16}}>Account Preferences:</Text>
                </View>
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
                            type='solid'
                            raised
                            title="Next"
                            linearGradientProps={{
                                colors: ['purple', 'red'],}}
                            onPress={userHandler}
                        />
                
                    </View>
                </Card>
    
            </View>
        </TouchableWithoutFeedback>
        </ImageBackground>
        )

    }
            
    if(isLoaded(UserData && <ImageBackground/>)){

        let now = moment();
      
        
        

        return(
            <ImageBackground 
            source={require('../../assets/images/defaultBackground.jpg')}
            style={styles.backgroundImage}>

            <ScrollView>
            <View style={styles.screen}>
          
            {TripsData.length > 0 ? (
                TripsData.map((trip)=>
                <Animatable.View  key={trip.id} animation={animationType} iterationCount={animationTime} duration={animationDuration} direction="normal">
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={()=>selectTrip(trip.id)}
                            onLongPress={()=> deleteTripConfirm(trip.id)}>
                
                            <View style={styles.ImgContainer}>
                                <Image 
                                    source={require('../../assets/images/PalmTrees.jpg')} 
                                    style={styles.Img} 
                                />
                            </View>
                         </TouchableOpacity>
                        <View style={styles.TripName}>
                            <Text style={styles.tripTitle}>
                                {trip.tripName}
                            </Text>
                            <Text style={styles.tripDate}>
                                {moment(trip.departing).diff(now, 'days') + " days away"}
                            </Text>
                        </View>
                    </View>
                    </Animatable.View>
                )

            ) : (<Text style={styles.container}>
                    Please click the button below to add a trip. 
                </Text>) 
            }
                       
                <View style={styles.buttonContainer}>
                    <Button
                        type= 'solid'
                        title="Add Trip"
                        raised
                        color= '#c717fc'
                        linearGradientProps={{
                            colors: ['purple', 'red'],}}
                        onPress={()=> navigation.navigate('AddTrip')}
                    />
                </View>
           
         </View>
         </ScrollView>
        </ImageBackground>
        )
    }
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
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
     },
    container: {
        marginTop: 100,
        fontSize: 17,
        fontFamily: 'comfortaa-bold',
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
        fontFamily: 'comfortaa-bold',
        fontSize: 30,
        marginTop: 20
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 50
    },
    input: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 10
    
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
    },
    cardHeader: {
        alignItems: 'center',
       marginBottom: 25
    },
    tripTitle:{
        fontSize: 18
    },
    tripDate: {
        fontSize: 13
    }
    
})

export default Trips