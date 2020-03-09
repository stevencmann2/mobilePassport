import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
    Text, 
    View, 
    Button, 
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    Alert

} from 'react-native';
import { useDispatch } from 'react-redux';
import Card from '../../components/Card'
import Input from '../../components/Input'
import Colors from '../../constants/colors';
import * as authActions from '../../store/actions/auth'



const LogIn = props => {
    const { navigation } = props

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState()
    const passwordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,}$/.test(passwordText)
    const emailTest = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailText)
  
    useEffect(() => {
        if (error) {
          Alert.alert('Login Error!', error, [{ text: 'Okay' }]);
        }
      }, [error]);

    const confirmLogin =() =>{
        if (passwordTest && emailTest){
            loginHandler();
        }else{
            inputError()
        }
    }

    const loginHandler = async() => {
        
    

            setError(null);
            setIsLoading(true);
            try {
              await dispatch(authActions.login(
                emailText, passwordText  
            ));
            props.navigation.navigation('My Trips')
            } catch (err) {
              setError(err.message);
              setIsLoading(false);
            }
            // setIsLoading(false);
          };
        
    const inputError = press =>{
        Alert.alert(
            'Login Error',
            'Please make sure your email and password are entered correctly',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
        )
    }
 
    return(
    <ImageBackground 
            source={require('../../assets/images/LogInBackground.jpg')}
            style={styles.backgroundImage}>

        <TouchableWithoutFeedback 
            onPress={()=> 
                Keyboard.dismiss()}>

            <View style={styles.screen}>
                <Card style={styles.card}>
                    <View style={styles.center}>
                        <Text style={styles.cardHeader}>Log In</Text>
                    </View>
                    <View style={styles.container}>
                        <Input
                        style={styles.input}
                        id="email"
                        label="E-Mail"
                        keyboardType="default"
                        blurOnSubmit
                        required
                        autoCapitalize="none"
                        autoCorrect={false}
                        errorText="The email or password you entered is incorrect."
                        minlength={5}
                        maxLength={30}
                        // onInputChange={inputChangeHandler}
                        intitialValue=""
                        onChangeText={(text)=> setEmailText(text)}
                        value={emailText}
                        returnKeyType='next'
                        />
                        
                        <Input 
                        style={styles.input}
                        id="password"
                        label="Password"
                        keyboardType="default"
                        blurOnSubmit
                        required
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        errorText="The username or password you entered is incorrect."
                        minlength={5}
                        maxLength={30}
                        // onInputChange={inputChangeHandler}
                        intitialValue=""
                        onChangeText={(text)=> setPasswordText(text)}
                        value={passwordText}
                        returnKeyType='done'
                        />
                       
                    </View>
                    
                    <View style={styles.buttonContainer}>
                    
                        <View style={styles.button}>
                        {isLoading?  (<ActivityIndicator/>):(
                            <Button
                                title="Sign In"
                                color= {Colors.primary}
                                onPress={confirmLogin}
                                accessibilityLabel = "Sign In"
                                
                            />
                            )}
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
    center : {
        alignItems: 'center',
    },
    container: {
        width: 300,
        maxWidth: '100%',
        padding: 20, 
    },
    card: {
        maxWidth: '80%',
    },
    cardHeader : {
        fontSize: 20
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        opacity: 0.8
     },
     input: {
        width: '100%',
        textAlign: 'center'
    
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
})

export default LogIn;