import React, { useState, useEffect } from 'react';
import {
    Text, 
    View, 
    Button, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard, 
    ImageBackground, 
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import { Icon }from 'react-native-elements'
import Input from '../../components/Input'
import Card from '../../components/Card'
import Colors from '../../constants/colors';
import { useDispatch} from 'react-redux'
import * as authActions from '../../store/actions/auth'



const NewUser = props => {
   
    const dispatch = useDispatch();

  

    const { navigation } = props

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [confirmPasswordText, setConfirmPasswordText] = useState("");
    const [newUserInfo, setNewUserInfo]= useState({})

   
    const emailTest = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailText)
    const passwordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,}$/.test(passwordText)
    const confirmPasswordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,}$/.test(confirmPasswordText)
   

    useEffect(() => {
        if (error) {
          Alert.alert('Sign Up Error!', error, [{ text: 'Okay' }]);
        }
      }, [error]);

    const addUser = async() => {
         if(emailTest && confirmPasswordTest && passwordTest ){
             if(confirmPasswordText=== passwordText){
            setNewUserInfo({
                email: emailText,
                password: passwordText, 
                confirmPassword: confirmPasswordText
            })

            setError(null);
            setIsLoading(true);
            try {
                
                await dispatch(authActions.signup(emailText, passwordText));
    
            } catch (err) {
              setError(err.message);
              setIsLoading(false);
            }
            

        }else if(confirmPasswordText!== passwordText){
            passwordsDontMatch()
        }
        }else{
            console.log('NEW USER form NOT complete')
             incompleteFields()
             
           }
        
    }


    const passwordsDontMatch = press =>{
        
        Alert.alert(
            'Check Passwords',
            'Please Make Sure Your Passwords Match to Continue',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
        )
    }

    const passwordInstructions = press => {
        console.log('Touched username field')
        Alert.alert(
            'Your Password',
            'Must contain 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character & be longer than 6 characters ',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
        )

    }
    const incompleteFields = () => {
        Alert.alert(
            'Sign Up Error',
            'Please verify all fields are filled out correctly',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
     )
    }


    return (

   
    <ImageBackground 
            source={require('../../assets/images/sample2.jpg')}
            style={styles.backgroundImage}> 
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
            <Card>
              <View style={styles.center}>
                     <Text style={styles.cardHeader}>Create Account</Text>
              </View>
               <View style={styles.container}>
                    
                    <Input
                        style={styles.input}
                        label="Email Address"
                        name='email'
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="email-address"
                        maxLength={50}
                        onChangeText={(text)=> setEmailText(text)}
                        value={emailText}
                        returnKeyType='next'
                    /> 
                    <TouchableOpacity onPress={passwordInstructions}>
                    <Input
                        
                        style={styles.input}
                        label="Password"
                        name="password"
                        special={<Icon
                            name='ios-information-circle-outline'
                            type='ionicon'
                            size ={18}
                            color='red'
                          />}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={20}
                        secureTextEntry={true}
                        onChangeText={(text)=> setPasswordText(text)}
                        value={passwordText}
                        returnKeyType='next'
                     /> 
                     </TouchableOpacity>

                    <Input
                        style={styles.input}
                        label="Confirm Password"
                        name="confirmPassword"
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={20}
                        secureTextEntry={true}
                        onChangeText={(text)=> setConfirmPasswordText(text)}
                        value={confirmPasswordText}
                        returnKeyType='done'
                    /> 
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                        {isLoading?  (<ActivityIndicator/>):(
                            <Button
                                title="Create Account"
                                color= {Colors.primary}
                                accessibilityLabel = "Create Account"
                                onPress={addUser}
                            />)}
                        </View>
                        <View style={styles.button}>
                            <Button 
                                title="Cancel"
                                color= {Colors.accent}
                                accessibilityLabel = "Cancel"
                                onPress={()=>props.navigation.navigate('Home')}
                            />
                        </View>
                    </View>
                </View>
            </Card>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
       
       
        </ImageBackground>
        
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      marginTop: 40,
      opacity: 0.9
    }, 
    container: {
        width: 300,
        maxWidth: '80%',
        padding: 20, 

    },
    center : {
        alignItems: 'center',
    },
    cardHeader : {
        fontSize: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        width: 100
      },
    input: {
        width: '100%',
        textAlign: 'center'
    
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        
     }
});



export default NewUser;