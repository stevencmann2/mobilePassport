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
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore, withFirestore, isLoaded, isEmpty } from 'react-redux-firebase'





const Trips = ({ navigation }) =>{
    
   

    const userTrips = 'userTrips'
    // FIRESTORE STUFF
    const firestore = useFirestore();
    const UserId = useSelector(state=> state.auth.userId)
    
    useFirestoreConnect([
        {
            collection: 'Trips',
            where: [
              ['users', '==', `${UserId}`]
            ],
            storeAs: userTrips
          },{ collection: 'Users', doc: UserId}
      ]);

   
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
        }      
    }else{
        incompleteFields();
    }
    }

    const userNameInstructions = press =>{
        
        Alert.alert(
            'Your Username',
            'Only Letters and Numbers Permitted (ex: username123, UserName987)',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
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
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
     )
    }

    


    if(!UserData){
        return(
         <TouchableWithoutFeedback 
                onPress={()=> 
                Keyboard.dismiss()}>
            <View style={styles.firstScreen}>
   
                 <View style={styles.banner}>
                     <Text>
                        Please Create a User Profile to Continue
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

    }else if(!isLoaded(UserData)){

        return( 
            <View style={styles.screen}>
                <ActivityIndicator  size="large"/> 
            </View>)
        
    }else if(UserData){
            
        return(
            <ScrollView>
            <View style={styles.screen}>
            
            {TripsData.length > 0 ? (
                TripsData.map((trip)=>
                    
                    <View style={styles.container} key={trip.id}>
                        <TouchableOpacity
                            onPress={()=>navigation.navigate('DashNav')}>
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
                    You have no trips yet, click the button below to add a trip! 
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
        marginTop: 20
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
        marginBottom: 20
    },
    formCard: {
        width: 300,
        maxWidth: '80%'
    }
    
})

export default Trips