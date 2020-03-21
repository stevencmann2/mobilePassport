import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { ListItem } from 'react-native-elements'
import _ from 'lodash'


const RecentActivity = () => {
   

  const [savingsDelete, setSavingsDelete] = useState(false);
  const [expensesDelete, setExpensesDelete] = useState(false);

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
if(fullStoreSavingsArr.length < 1 && fullStoreExpensesArr < 1){
  return(
    <View style={styles.loadContainer}>
        <Text> No recent actions to report</Text>
    </View>
  )
}

if(isLoaded(fullStoreExpensesArr && fullStoreSavingsArr)){
  return (
    <ScrollView>
      <View stlye={styles.screen}>
        <View style={styles.screenHeader}>
          <Text style= {{fontSize: 25, marginTop: 30}}>Recent Actions </Text>
        </View>

      
      {SavingsResultsArr.length > 0 ? (
        <View style={styles.resultsContainer}>
          <View style={styles.listHeader}>
            <Text>Savings</Text>
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
        <Text>Expenses</Text>
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
      listHeader:{
        alignItems: 'flex-start',
        paddingLeft: 8
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
      
})

export default RecentActivity;