import React, { useState } from 'react';
import {
    Text, 
    View, 
    Button, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard, 
    ImageBackground, 
    Alert
} from 'react-native'
import Input from '../../components/Input'
import Card from '../../components/Card'
import Colors from '../../constants/colors';


const NewUser = props => {
    const { navigation } = props

    const [firstNameText, setFirstNameText] = useState("");
    const [lastNameText, setLastNameText] = useState("");
    const [usernameText, setUsernameText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [confirmPasswordText, setConfirmPasswordText] = useState("");
    const [newUserInfo, setNewUserInfo]= useState({})

    const firstNameTest = /^[A-Za-z]+$/.test(firstNameText)
    const lastNameTest = /^[A-Za-z]+$/.test(lastNameText)
    const emailTest = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailText)
    ///Password expresion that requires:
        // one lower case letter, one upper case letter, 
        //one digit, one non-word character, 6>= length and no spaces.
    const passwordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,}$/.test(passwordText)
    const confirmPasswordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,}$/.test(confirmPasswordText)
    const usernameTest = /^[a-zA-Z0-9_-]{4,16}$/.test(usernameText) 


    const addUser = obj => {
         if(firstNameTest && lastNameTest && emailTest && usernameTest && passwordTest && confirmPasswordTest ){
            setNewUserInfo({
                firstName: firstNameText,
                lastName: lastNameText,
                username: usernameText,
                email: emailText,
                password: passwordText, 
                confirmPassword: confirmPasswordText
            })
            console.log(newUserInfo)
            resetFields();

        }else{
            console.log('NEW USER form NOT complete')
             incompleteFields()
             
           }
        
    }

    const resetFields = () => {
       
       setFirstNameText("");
       setLastNameText("")
       setEmailText("")
       setPasswordText("")
       setConfirmPasswordText("")
       setUsernameText("") 
    }

    const userNameInstructions = press =>{
        console.log('Touched username field')
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
            source={require('../../assets/images/NewUserBackground.jpg')}
            style={styles.backgroundImage}>

    <TouchableWithoutFeedback 
            onPress={()=> 
                Keyboard.dismiss()}>
       
        <View style={styles.screen}>
       
            <Card>
              <View style={styles.center}>
                     <Text style={styles.cardHeader}>Create Account</Text>
              </View>
               <View style={styles.container}>
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
                    /> 
                    
                    <TouchableOpacity onPress={userNameInstructions}>
                    <Input
                        
                        style={styles.input}
                        label='Username'
                        special='More Info'
                        name='username'
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={30}
                        onChangeText={(text)=> setUsernameText(text)}
                        value={usernameText} 
                    /> 
                    </TouchableOpacity>
                    
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
                    /> 
                    <TouchableOpacity onPress={passwordInstructions}>
                    <Input
                        
                        style={styles.input}
                        label="Password"
                        name="password"
                        special="More Info"
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={20}
                        secureTextEntry={true}
                        onChangeText={(text)=> setPasswordText(text)}
                        value={passwordText}
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
                    /> 
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title="Create Account"
                                color= {Colors.primary}
                                accessibilityLabel = "Create Account"
                                onPress={addUser}
                            />
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
        opacity: 0.8
     }
});



export default NewUser;