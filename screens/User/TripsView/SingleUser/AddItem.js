import React  from 'react';
import {
    Text, 
    View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'
import Input from '../../../../components/Input'
import Card from '../../../../components/Card'
import { Icon, Button }from 'react-native-elements'



const AddItem = props =>{
    
    const { navigation } = props
   
   
    return(
        <TouchableWithoutFeedback 
            onPress={()=> 
            Keyboard.dismiss()}>
         <KeyboardAvoidingView 
            style={{flex:1}}
            behavior="padding"
            keyboardVerticalOffset={100}
            >
        <ScrollView>

        <View style={styles.screen}>
             
            <View style={styles.firstScreen}>

                <View style={styles.banner}>
                    <Text>
                        
                    </Text>
                </View>
                    <Card style={styles.formCard}>
                        <View>
                            <Input
                                style={styles.input}
                                label="Amount"
                                name="Amount"
                                blurOnSubmit
                                autoCorrect={false}
                                keyboardType="default"
                                maxLength={30}
                                // onChangeText={(text)=> setFirstNameText(text)}
                                // value={firstNameText}
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
                                // onChangeText={(text)=> setLastNameText(text)}
                                // value={lastNameText}  
                                returnKeyType='next' 
                            /> 
                    
                           
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
                                // onChangeText={(text)=> setUsernameText(text)}
                                // value={usernameText} 
                                returnKeyType='next'
                            /> 
                           
                            <Button 
                                type='outline'
                                title="Next"
                                // onPress={userHandler}
                            />
                    
                        </View>
                    </Card>

                </View>
            
            </View>

        </ScrollView>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    },
    firstScreen: {
        flex: 1,
        alignItems: 'center',
        
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

export default AddItem;