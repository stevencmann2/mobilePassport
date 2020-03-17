import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { ListItem } from 'react-native-elements'
import _ from 'lodash'


const RecentActivity = () => {
   
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

  const fullStoreSavingsArr = useSelector(state=> state.firestore.ordered[SavingsData])
  const fullStoreExpensesArr = useSelector(state=> state.firestore.ordered[ExpensesData])

  const SavingsiconArray = [
    {Category: 'Airfare',
      Icon: 'airplanemode-active'},
    {Category: 'Lodging',
     Icon: 'hotel'},
    {Category: "Transportation",
      Icon: 'local-taxi'},
    {Category: "Food & Drink",
      Icon: 'local-cafe'},
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
    {Category: "Food & Drink",
      Icon: 'local-cafe'},
    {Category: "Misc",
      Icon: 'palette'},
    {Category: "Emergency",
      Icon: 'local-hospital'},
    {Category: "Activities",
      Icon: 'landscape'},
  ]



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
          <Text>Recent Actions </Text>
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