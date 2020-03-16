import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    
} from 'react-native'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { ListItem } from 'react-native-elements'
import _ from 'lodash'




const RecentActivity = () => {
   
  const firestore = useFirestore();
  const selectedTrip = useSelector(state=> state.tripID.id)
  useFirestoreConnect([
    { collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
      doc: `${selectedTrip}`, 
      subcollections: [{ collection: "Savings" }],
      storeAs: 'SavingsData'
   },
   { collection: 'Trips', 
     doc: `${selectedTrip}`, 
    subcollections: [{ collection: "Expenses" }],
    storeAs: 'ExpensesData'
   }
  ])

  const fullStoreSavingsArr = useSelector(state=> state.firestore.ordered.SavingsData)
  const fullStoreExpensesArr = useSelector(state=> state.firestore.ordered.ExpensesData)

  // console.group()
    console.log("Savings ==============")
    console.log(fullStoreSavingsArr)
    console.log("Savings ==============")
    // console.log("Expenses =============", fullStoreExpensesArr)
  // console.groupEnd()

  const iconArray = [
    {Category: 'Airfare',
      Icon: 'airplanemode-active'},
    {Category: 'Lodging',
     Icon: 'hotel'},
    {Category: "Transportation",
      Icon: 'local-taxi'},
    {Category: "Food and Drink",
      Icon: 'local-cafe'},
    {Category: "Misc",
      Icon: 'palette'},
    {Category: "Emergency",
      Icon: 'local-hospital'},
    {Category: "Activities",
      Icon: 'landscape'},
  ]

  const SavingsResultsArr = _.intersectionWith(_.cloneDeep(fullStoreSavingsArr), iconArray, function(x, y) {
    return x.Category === y.Category && _.assign(x, y);
  });

  console.log('%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%')
  console.log(SavingsResultsArr)
  console.log('%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%')


  const list = [
    {
      category: 'Airfare',
      description: "United Airlines",
      Amount: 300,
      icon: 'airplanemode-active'
    },
  ]


  return (
      
      <View stlye={styles.screen}>
        <View>
        <Text>Recent Activity Page</Text>
        </View>
    <View style={styles.list}>
  
  {
    SavingsResultsArr.map((item, index) => (
      <ListItem
        key={index}
        // leftAvatar={{ source: { uri: item.avatar_url } }}
        title={item.Description}
        rightTitle={item.Category}
        subtitle={`$${item.Amount}`}
        leftIcon={{ name: item.Icon}}
        bottomDivider
      />
    ))
  }
</View>
</View>
  )

}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 40,
      },
      
})

export default RecentActivity;