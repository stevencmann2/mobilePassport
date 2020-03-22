import React, { useState }  from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard, 
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Alert,
    ImageBackground
} from 'react-native'
import { useSelector } from 'react-redux'
import Input from '../../../../components/Input'
import Card from '../../../../components/Card'
import { Button, Overlay, Icon, Header} from 'react-native-elements'
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import BudgetBreakdownChart from '../../../../components/Charts/BudgetBreakdownChart'



const Dashboard = props =>{

 
    const firestore = useFirestore();
    const selectedTrip = useSelector(state=> state.tripID.id)
    const UserId = useSelector(state=> state.auth.userId)
    const bbLocation = firestore.collection('Trips').doc(selectedTrip)

    const BudgetBreakdownData = `BudgetBreakdownData${selectedTrip}`
    const Profile = `Profile${UserId}`
     useFirestoreConnect([
        { collection: 'Trips', doc: `${selectedTrip}`},
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "BudgetBreakdown" }],
            storeAs: BudgetBreakdownData
        },
        {collection: 'Users', doc: UserId, storeAs: Profile}
    ]);

    
   

    const BudgetData = useSelector(state =>state.firestore.ordered[BudgetBreakdownData])
    const UserProfile = useSelector(state =>state.firestore.ordered[Profile])
    const getTrip  = useSelector(state =>state.firestore.data.userTrips[selectedTrip])
   
   const username = UserProfile[0].username

    const [airfareText, setAirfareText]= useState();
    const [transportationText, setTranportationText]= useState();
    const [lodgingText, setLodgingText]= useState();
    const [foodText, setFoodText]= useState();
    const [activitiesText, setActivitiesText]= useState();
    const [emergencyText, setEmergencyText]= useState();
    const [miscText, setMiscText]= useState();
    const [total, setTotal] = useState()
    const[textColor, setTextColor] = useState('black')
    const [welcome, setWelcome]= useState(true)
    const [screenInfo, setScreenInfo] = useState(false)

      const currentFormTotal = () =>{
         
        
          const currentTotal =  parseInt(airfareText) + parseInt(transportationText) + parseInt(lodgingText) + parseInt(foodText) +
          parseInt(activitiesText) + parseInt(emergencyText) + parseInt(miscText)

          if (Number.isNaN(currentTotal)){
              
              return setTotal(0)
          }

         setTotal(parseInt(currentTotal)) 

         getTrip.totalBudget === currentTotal ? (setTextColor('green')):(console.log(setTextColor('red')))
      }


    const submitBudget = async() =>{
        
    if (getTrip.totalBudget === total){


       try{    
           await bbLocation.collection("BudgetBreakdown").doc(selectedTrip).set({
                Airfare: parseInt(airfareText),
                Tranportation: parseInt(transportationText),
                Lodging: parseInt(lodgingText),
                Food: parseInt(foodText),
                Activities: parseInt(activitiesText),
                Emergency: parseInt(emergencyText),
                Misc: parseInt(miscText)
            })
            
         } catch (err) {
             console.log(err)
         }
     }else{
        BudgetFormInstructions()
     }

    }
    const BudgetFormInstructions = press =>{
        
        Alert.alert(
            'Form Error',
            'Please verify your desired budget by category equals your total trip budget to continue',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
        )
    }

    if(!isLoaded(BudgetData)){
        return (<View style={styles.Loadingscreen}>
                    <ActivityIndicator  
                        size="large"
                    /> 
                </View>)
    }
  
    if(isEmpty(BudgetData) && isLoaded(<ImageBackground/>)){
        
        return(
        
         <ImageBackground 
            source={require('../../../../assets/images/defaultBackground.jpg')}
            style={styles.backgroundImage}>
            <TouchableWithoutFeedback 
            onPress={()=> 
            Keyboard.dismiss()}>
                    <KeyboardAvoidingView 
                    style={{flex:1}}
                    behavior="padding"
                    keyboardVerticalOffset={15}
                    >
                    <ScrollView style={styles.EmptyBackground}>
                        <View style={styles.initialscreen}> 
                        <Overlay 
                            isVisible={welcome}
                            onBackdropPress={() => setWelcome(false)}
                            windowBackgroundColor='#cd7ff5'
                            borderRadius={20}
                         >
                         <View style={styles.overlayView}>
                            <View style={styles.overlayHeader}>
                                <Text style={styles.overlayHeaderText}>Welcome to your Trip Dashboard</Text>
                            </View>
                            <View style={styles.overlayBody}>
                                <Text style={styles.overlayText}>
                                    You created a trip, let's keep going and help you track your progress.
                                </Text>
                                <Text style={styles.overlayText}>
                                    To start, let's define your budget by categories. 
                                </Text>
                                <Text style={styles.overlayText}>
                                    The next form will help us do just that! Make sure to match your 
                                    Category Budget to your Total Budget. 
                                </Text>
                                <Text style={styles.overlayText}>
                                    Hint: Take advantage of the calculate button
                                    to help match your budgets.
                                </Text>
                            </View>
                            

                            <View style={styles.overlayButton}>
                                <Button 
                                    type="outline"
                                    title="Get Started!"
                                    onPress={()=>setWelcome(false)}
                                />
                            </View>
                         </View>
                         </Overlay>

                            <Card stlye={styles.card}>
                                <View style={styles.center}>
                                    <Text style={styles.cardHeader}>Budget by Category</Text>
                                 </View>
    
                                 <View style={styles.totalContainer}>
                                    <View style={styles.formTotal}>
                                        <Text style={{color: textColor}}>Category Total: {total}</Text>
                                    </View>
                                    <View style={styles.databaseTotal}>
                                        <Text>Total Budget: {getTrip.totalBudget} </Text>
                                    </View>
                                
                                 </View>
                                 <View style={styles.container}>
                                    <View style={styles.inputContainer}>
                                        <Input
                                        label="Airfare ($)"
                                        placeholder='Enter value here...'
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setAirfareText(text)}
                                        value={airfareText}
                                        returnKeyType='next'
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                        label="Transportation ($)"
                                        placeholder='enter 0 if not desired...'
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setTranportationText(text)}
                                        value={transportationText}
                                        returnKeyType='next'
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                            label="Lodging ($)"
                                            placeholder=''
                                            blurOnSubmit
                                            autoCorrect={true}
                                            keyboardType="number-pad"
                                            maxLength={50}
                                            onChangeText={(text)=> setLodgingText(text)}
                                            value={lodgingText}
                                            returnKeyType='next'
                                        />
                                    </View>
                            
                            
                                    <View style={styles.inputContainer}>
                                        <Input
                                            label="Food ($)"
                                            placeholder=''
                                            blurOnSubmit
                                            autoCorrect={true}
                                            keyboardType="number-pad"
                                            maxLength={50}
                                            onChangeText={(text)=> setFoodText(text)}
                                            value={foodText}
                                            returnKeyType='next'
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                            label="Activities ($)"
                                            placeholder=''
                                            blurOnSubmit
                                            autoCorrect={true}
                                            keyboardType="number-pad"
                                            maxLength={50}
                                            onChangeText={(text)=> setActivitiesText(text)}
                                            value={activitiesText}
                                            returnKeyType='next'
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                            label="Emergency ($)"
                                            placeholder=''
                                            blurOnSubmit
                                            autoCorrect={true}
                                            keyboardType="number-pad"
                                            maxLength={50}
                                            onChangeText={(text)=> setEmergencyText(text)}
                                            value={emergencyText}
                                            returnKeyType='next'
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                            label="Miscellaneous ($)"
                                            placeholder=''
                                            blurOnSubmit
                                            autoCorrect={true}
                                            keyboardType="number-pad"
                                            maxLength={50}
                                            onChangeText={(text)=> setMiscText(text)}
                                            value={miscText}
                                            returnKeyType='done'
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button 
                                    type="outline"
                                    title="Continue"
                                    onPress = {submitBudget}
                                    />
                                    <Button 
                                    type="outline"
                                    title="Calculate"
                                    onPress = {currentFormTotal}
                                />
                                </View>
                         </View>
                    </Card>
                    </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    </ImageBackground>
        
     )}
     
   if(isLoaded(BudgetData && <BudgetBreakdownChart/> &&<ImageBackground/> && UserProfile)) {
   return(
    
    
<ImageBackground 
source={require('../../../../assets/images/defaultBackground.jpg')}
style={styles.backgroundImage}>

<ScrollView style={styles.LoadedBackground}>
<Header
  centerComponent={{ text: 'TOTAL BUDGET', style: { color: '#fff', fontFamily: 'comfortaa-bold'} }}
/>
    <View style={styles.screen}>  
        <View style={styles.banner}>
            <Text style= {{fontSize: 20}}>Welcome {username} </Text>
        </View>  

        <View style={styles.iconContainer}>
            <Icon
                name='ios-information-circle-outline'
                type='ionicon'
                size ={18}
                color='black'
                onPress={()=>setScreenInfo(true)}
            />
        </View>
        <Overlay
                isVisible={screenInfo}
                onBackdropPress={() => setScreenInfo(false)}
                borderRadius={20}
                >
            <View style={styles.overlayView}>
                <View style={styles.overlayHeader}>
                    <Text style={styles.overlayHeaderText}>This is your Dashboard!</Text>
                </View>
                <View style={styles.overlayBody}>
                    <Text style={styles.overlayText}>
                       The purpose of this screen is to help you understand how you've decided to allocate your budget. 
                    </Text>
                    <Text style={styles.overlayText}>
                       Need more info? Try pressing the charts to better understand their meaning! 
                    </Text>
                    <Text style={styles.overlayText}>
                       Or, press the info button to get a more detailed breakdown of your budgeting goals.
                    </Text>
                </View>
                

                <View style={styles.overlayButton}>
                    <Button 
                        type="outline"
                        title="Got It"
                        onPress={()=>setScreenInfo(false)}
                    />
                </View>
            </View>
     </Overlay>
        <View style={styles.chartContainer}>
            <BudgetBreakdownChart/>
        </View>
        
           
    </View>
</ScrollView>
</ImageBackground>
)
   }

}



const styles = StyleSheet.create({
    initialscreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginTop: 40,
      }, 
      screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginTop: 60,
      }, 
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        opacity: 0.8
     },
      Loadingscreen: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
        justifyContent: 'center'
      }, 
      card: {
          marginTop: 40
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    chartContainer: {
        justifyContent: 'center',
        width:'100%',
    },
    banner:{
        marginTop: 30
    },
    overlayView: {
        alignItems: 'center',
        padding: 10
    },
    overlayHeader: {
        marginTop: 10,
        fontSize: 18
    },
    overlayBody: {  
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    overlayText: {
        marginBottom: 15,
        lineHeight: 25
    },
   overlayHeaderText: {
       fontSize: 20
   },
    overlayButton:{
        justifyContent: 'flex-end',
    },
    iconContainer: {
        marginLeft: 300
    }
})

export default Dashboard;