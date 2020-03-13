import React, { useState }  from 'react';
import {
    Text, 
    View, 
   StyleSheet, 
    TouchableWithoutFeedback,
    Keyboard, 
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import { useSelector } from 'react-redux'
import Input from '../../../../components/Input'
import Card from '../../../../components/Card'
import { Button } from 'react-native-elements'



const Dashboard = props =>{

    const selectedTrip = useSelector(state=> state.tripID.id)
    const [open, setOpen] = useState(true) 
   
    const [airfareText, setAirfareText]= useState('');
    const [transportationText, setTranportationText]= useState('');
    const [lodgingText, setLodgingText]= useState('');
    const [foodText, setFoodText]= useState('');
    const [activitiesText, setActivitiesText]= useState('');
    const [emergencyText, setEmergencyText]= useState('');
    const [miscText, setMiscText]= useState('');
    const [total, setTotal] =useState('')


   
    return(
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
                        <Card stlye={styles.card}>
                            <View style={styles.center}>
                                <Text style={styles.cardHeader}>Desired Budget</Text>
                             </View>

                             <View style={styles.totalContainer}>
                                <View style={styles.formTotal}>
                                    <Text>FORM TOTAL</Text>
                                </View>
                                <View style={styles.databaseTotal}>
                                    <Text>DATABSE TOTAL</Text>
                                </View>
                            
                             </View>
                             <View style={styles.container}>
                                <View style={styles.inputContainer}>
                                    <Input
                                    label="Airfare ($)"
                                    placeholder="enter number here"
                                    blurOnSubmit
                                    autoCorrect={true}
                                    keyboardType="number-pad"
                                    maxLength={50}
                                    onChangeText={(text)=> setAirfareText(parseInt(text))}
                                    value={airfareText.toString()}
                                    returnKeyType='next'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Input
                                    label="Transportation ($)"
                                    placeholder="enter number here"
                                    blurOnSubmit
                                    autoCorrect={true}
                                    keyboardType="number-pad"
                                    maxLength={50}
                                    onChangeText={(text)=> setTranportationText(parseInt(text))}
                                    value={transportationText.toString()}
                                    returnKeyType='next'
                                />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Input
                                        label="Lodging ($)"
                                        placeholder="enter number here"
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setLodgingText(parseInt(text))}
                                        value={lodgingText.toString()}
                                        returnKeyType='next'
                                    />
                                </View>
                        
                        
                                <View style={styles.inputContainer}>
                                    <Input
                                        label="Food and Drink ($)"
                                        placeholder="enter number here"
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setFoodText(parseInt(text))}
                                        value={foodText.toString()}
                                        returnKeyType='next'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Input
                                        label="Activities ($)"
                                        placeholder="enter number here"
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setActivitiesText(parseInt(text))}
                                        value={activitiesText.toString()}
                                        returnKeyType='next'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Input
                                        label="Emergency ($)"
                                        placeholder="enter number here"
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setEmergencyText(parseInt(text))}
                                        value={emergencyText.toString()}
                                        returnKeyType='next'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Input
                                        label="Miscellaneous ($)"
                                        placeholder="enter number here"
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setMiscText(parseInt(text))}
                                        value={miscText.toString()}
                                        returnKeyType='done'
                                />
                            </View>
                            <Button 
                            type="outline"
                            title="Set Budget"
                            />
                     </View>
                </Card>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
      }, 
      card: {
          marginTop: 20
      },
    center : {
        alignItems: 'center',
    },
    cardHeader : {
        fontSize: 20,
        marginBottom: 10
    },
    totalContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    formTotal: {
        marginBottom: 10
    },
    databaseTotal: {
        marginBottom: 10
    },
    container: {
        width: 300,
        maxWidth: '80%',
        padding: 20, 

    },
    inputContainer: {
        width: '100%',
        textAlign: 'center'
    
    },
})

export default Dashboard;