import React, { useState } from 'react';
import {
    Text, 
    View, 
    Button, 
    StyleSheet, 
    TouchableWithoutFeedback,
    Keyboard, 
    Alert
} from 'react-native'
import Input from '../components/Input'
import Card from '../components/Card'
import Colors from '../constants/colors';

const NewUser = () => {

    const [inputText, setInputText] = useState({

        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
        
    });

    const inputHandler = userInput => {     
          setInputText(userInput)
    }

    const addUser = userInfo => {
        console.log(inputText)
        // resetFields()
    }
    const resetFields = () => {
        //MAKE ALL BLANK STRINGS
        // setInputText("")
    }


   const confirmUserEnrollment = () => {
        //FINAL VALIDATION IF EVERYHTINGS A STRING 
                //EMAIL HAS '@' 
                // PASSWORD MEETS CRIERIA
                // ALL FIELDS.LENGTH > 0 
   }

    return (
        <TouchableWithoutFeedback 
            onPress={()=> 
                Keyboard.dismiss()}>
        <View style={styles.screen}>
            <Card>
              <View style={styles.center}>
                     <Text style={styles.cardHeader}> Create Account</Text>
              </View>
               <View style={styles.container}>
                    <Input
                        style={styles.input}
                        label="First Name"
                        blurOnSubmit
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={30}
                        keyboardAppearance="dark"
                        onChangeText={inputHandler}
                        value={inputText.firstName}
                    /> 
                    <Input
                        style={styles.input}
                        label='Last Name'
                        blurOnSubmit
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={30}
                        onChangeText={inputHandler}
                        value={inputText.lastName}
                        
                    /> 
                    <Input
                        style={styles.input}
                        label="Email Address"
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={inputHandler}
                        maxLength={50}
                        value={inputText.email}
                    /> 
                    <Input
                        style={styles.input}
                        label="Password"
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={20}
                        onChangeText={inputHandler}
                        secureTextEntry={true}
                        value={inputText.password}
                     /> 
                    <Input
                        style={styles.input}
                        label="Confirm Password"
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={20}
                        onChangeText={inputHandler}
                        secureTextEntry={true}
                        value={inputText.confirmPassword}
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
                                accessibilityLabel = "Create Account"
                                onPress={resetFields}
                            />
                        </View>
                    </View>
                </View>
            </Card>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center'
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
    
    }
});



export default NewUser;