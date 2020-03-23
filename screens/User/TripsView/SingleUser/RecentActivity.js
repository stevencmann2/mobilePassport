import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
    ImageBackground
} from 'react-native'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { ListItem, Header, Icon, Overlay, Button } from 'react-native-elements'
import _ from 'lodash'


const RecentActivity = () => {
   

  const [savingsDelete, setSavingsDelete] = useState(false);
  const [expensesDelete, setExpensesDelete] = useState(false);
  const [screenInfo, setScreenInfo] = useState(false)

  const firestore = useFirestore();
  const selectedTrip = useSelector(state=> state.tripID.id)
  const SavingsData = `SavingsData${selectedTrip}`
  const ExpensesData = `ExpensesData${selectedTrip}`

  useFirestoreConnect([
    { collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
      doc: `${selectedTrip}`, 
      subcollections: [{ collection: "Savings" }],
      storeAs: SavingsData
   },
   { collection: 'Trips', 
     doc: `${selectedTrip}`, 
    subcollections: [{ collection: "Expenses" }],
    storeAs: ExpensesData
   }
  ])

  const TripDoc = firestore.collection('Trips').doc(selectedTrip)
  const fullStoreSavingsArr = useSelector(state=> state.firestore.ordered[SavingsData])
  const fullStoreExpensesArr = useSelector(state=> state.firestore.ordered[ExpensesData])

  const SavingsiconArray = [
    {Category: 'Airfare',
      Icon: 'airplanemode-active'},
    {Category: 'Lodging',
     Icon: 'hotel'},
    {Category: "Transportation",
      Icon: 'local-taxi'},
    {Category: "Food",
      Icon: 'local-dining'},
    {Category: "Misc",
      Icon: 'palette'},
    {Category: "Emergency",
      Icon: 'local-hospital'},
    {Category: "Activities",
      Icon: 'landscape'},
  ]
  const ExpensesiconArray = [
    {Category: 'Airfare',
      Icon: 'airplanemode-active'},
    {Category: 'Lodging',
     Icon: 'hotel'},
    {Category: "Transportation",
      Icon: 'local-taxi'},
    {Category: "Food",
      Icon: 'local-dining'},
    {Category: "Misc",
      Icon: 'palette'},
    {Category: "Emergency",
      Icon: 'local-hospital'},
    {Category: "Activities",
      Icon: 'landscape'},
  ]

  const deleteSavingsHandler = async(id) => {  
    console.log(id)
    try{    
      await TripDoc.collection("Savings").doc(id).delete();
       console.log(`deleting savings ${id}`)
    } catch (err) {
        console.log(err)
        deleteErrorAlert()    
    }
  }

  const deleteExpensesHandler = async(id) => {  
    console.log(id)
    try{    
      await TripDoc.collection("Expenses").doc(id).delete();
       console.log(`deleting expenses ${id}`)
    } catch (err) {
        console.log(err)
        deleteErrorAlert()    
    }
  }
  

  const deleteErrorAlert = () => {
    Alert.alert(
        'Unable to Delete',
        'We apologize, an error occured while attempeting to delete an action item. Please let us know this issue occured.',
        [
            {text: 'Ok',
            onPress: ()=>console.log('Ok Pressed, Alert Closed')
            }
        ]
 )
}
const deleteSavingsConfirm = (id) => {
   
  Alert.alert(
      'Delete Warning',
      'You are about to delete an action item. Are you sure you want to do that?',
      [
          {text: 'Delete',
          onPress: ()=>deleteSavingsHandler(id)
          },
          {text: 'Cancel',
          onPress: ()=>console.log('Cancel Pressed, Alert Closed')
          }
      ]
)
}
const deleteExpensesConfirm = (id) => {
   
  Alert.alert(
      'Delete Warning',
      'You are about to delete an expensed item. Are you sure you want to do that?',
      [
          {text: 'Delete',
          onPress: ()=>deleteExpensesHandler(id)
          },
          {text: 'Cancel',
          onPress: ()=>console.log('Cancel Pressed, Alert Closed')
          }
      ]
)
}

const SavingsResultsArr = _.map(fullStoreSavingsArr, function(item){
  return _.extend(item, _.find(SavingsiconArray, { Category: item.Category }));
});
const ExpensesResultsArr = _.map(fullStoreExpensesArr, function(item){
  return _.extend(item, _.find(ExpensesiconArray, { Category: item.Category }));
});




if(!isLoaded(fullStoreExpensesArr && fullStoreSavingsArr)){
  return(
    <View style={styles.loadContainer}>
        <ActivityIndicator  
            size="large"
        /> 
    </View>
  )
}
if(fullStoreSavingsArr.length < 1 && fullStoreExpensesArr < 1 && isLoaded(<ImageBackground/>) ){
  return(
    <ImageBackground 
    source={require('../../../../assets/images/defaultBackground.jpg')}
    style={styles.backgroundImage}>
    <View style={styles.loadContainer}>
        <Text> No recent actions to report</Text>
    </View>
    </ImageBackground>
  )
}

if(isLoaded(fullStoreExpensesArr && fullStoreSavingsArr && <ImageBackground/> && <ListItem/>)){
  return (

    <ImageBackground 
    source={require('../../../../assets/images/defaultBackground.jpg')}
    style={styles.backgroundImage}>

    <ScrollView>
      <Header
      backgroundColor="white"
  centerComponent={{ text: 'Recent Activity', style: { color: 'black', fontFamily: 'comfortaa-bold' } }}
/>
      <View stlye={styles.screen}>
      <Overlay
        isVisible={screenInfo}
        onBackdropPress={() => setScreenInfo(false)}
        borderRadius={20}
                >
            <View style={styles.overlayView}>
                <View style={styles.overlayHeader}>
                    <Text style={styles.overlayHeaderText}>Actions Feed</Text>
                </View>
                <View style={styles.overlayBody}>
                    <Text style={styles.overlayText}>
                    Want to see exactly what you've been tracking?  
                    </Text>
                    <Text style={styles.overlayText}>
                     This screen shows you every logged expense and savings you've acounted for.
                    </Text>
                    <Text style={styles.overlayText}>
                      If you need to delete an item for any reason, simply hold down the listed item and follow the prompts.
                    </Text>
                </View>
                

                <View style={styles.overlayButton}>
                    <Button 
                        type="solid"
                        title="Got It"
                        raised
                        linearGradientProps={{
                          colors: ['purple', 'red'],}}
                        onPress={()=>setScreenInfo(false)}
                    />
                </View>


            </View>
            
        </Overlay>

      {SavingsResultsArr.length > 0 ? (
        <View style={styles.resultsContainer}>
        <View style={styles.listHeader}>
        <View style ={styles.listHeaderText} >
          <Text style= {{fontSize: 20}}>Savings</Text>
        </View>
        <View style={styles.listHeaderIcon}>
            <Icon
            name='ios-information-circle-outline'
            type='ionicon'
            size ={18}
            color='black'
            onPress={()=>setScreenInfo(true)}
            />
        </View>
      </View>
              <View style={styles.listContainer}>
            {
              SavingsResultsArr.map((item, index) => (
                <ListItem
                  key={index}
                  title={item.Description}
                  rightTitle={item.Category}
                  subtitle={`$${item.Amount}`}
                  leftIcon={{ name: item.Icon}}
                  rightContentContainerStyle={{marginRight:10}}
                  bottomDivider
                  onLongPress={()=>deleteSavingsConfirm(item.id)}
                />
              ))
            }
          </View>
        </View>
        ) : 
        (null)}

   {ExpensesResultsArr.length > 0 ? (
    <View style={styles.resultsContainer}>
      <View style={styles.listHeader}>
        <View style ={styles.listHeaderText} >
          <Text style= {{fontSize: 20}}>Expenses</Text>
        </View>
        <View style={styles.listHeaderIcon}>
            <Icon
            name='ios-information-circle-outline'
            type='ionicon'
            size ={18}
            color='black'
            onPress={()=>setScreenInfo(true)}
            />
        </View>
      </View>
      <View style={styles.listContainer}>
      {
        ExpensesResultsArr.map((item, index) => (
          <ListItem
            key={index}
            title={item.Description}
            rightTitle={item.Category}
            subtitle={`$${item.Amount}`}
            leftIcon={{ name: item.Icon}}
            rightContentContainerStyle={{marginRight:10}}
            bottomDivider
            onLongPress={()=>deleteExpensesConfirm(item.id)}
          />
        ))
      }
    </View>
  </View>
  ) : 
        (null)}

        
</View>
</ScrollView>
</ImageBackground>
  )

    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 40,
      },
      screenHeader:{
        marginTop: 30,
        marginBottom: 40,
        alignItems: 'center'
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        
     },
      listHeader:{
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 8,
        marginTop: 20,
        marginBottom: 5,
        paddingHorizontal: 14
      },
      listHeaderText:{
        alignItems: 'flex-start',
      },
      listHeaderIcon: {
        alignItems: 'flex-start', 
      },
      listContainer:{
        marginTop: 10,
        marginBottom:20
      },
      resultsContainer: {
        marginBottom: 20
      },
      emptyContainer:{
        alignItems: 'center',
        justifyContent: 'center'
      },
      loadContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
    overlayView: {
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    overlayHeader: {  
        alignItems: 'center',
        marginBottom: 20
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
  }
      
})

export default RecentActivity;