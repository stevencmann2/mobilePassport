import React, { useState } from 'react';
// import React, { Component } from 'react';
import {
    Text, 
    View,
    StyleSheet,
    // Image, 
    // Dimensions,
    TouchableOpacity,
    ImageBackground, 
} from 'react-native';
import { Button } from 'react-native-elements';

const Home = props => {

    const { navigation } = props
    
    return(
    <ImageBackground 
         source={require('../../assets/images/HomeScreenBackground.jpg')}
        style={styles.backgroundImage}
    >
     <View style={styles.screen}>
            
        <View style={styles.welcome}>  
            <Text style={styles.welcome}>
                Welcome to Passport
            </Text>
        </View>  
         
        <View style={styles.buttonContainer}>
            <TouchableOpacity>
                <Button
                     title="Sign In"
                     type="solid"
                     buttonStyle={styles.logInButton}
                     onPress={()=> props.navigation.navigate('LogIn') }
                />

                <Button  
                    title="Create Account"
                    type="solid"
                    onPress={()=> props.navigation.navigate('NewUser') }
                    buttonStyle={styles.newUserButton}
                />
            </TouchableOpacity>
        </View>
     </View>
     </ImageBackground>
        )
    }

 const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'space-between'
      }, 
      welcome: {
        marginTop: 87,
        fontFamily: 'comfortaa-bold',
        fontSize: 30,
        alignItems: 'center'
      },
      buttonContainer: {
        fontFamily: 'comfortaa-bold',
        marginBottom: 50,
        marginHorizontal: 40
      },
      logInButton:{
        marginBottom: 10,
        borderRadius: 50, 
        backgroundColor: '#cb81e6',
        opacity: 0.9
      },
      newUserButton: {
        marginBottom: 10,
        borderRadius: 50,
        backgroundColor: "purple",
        opacity: 0.9
     },
     backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        }
      });

export default Home