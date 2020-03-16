import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    ScrollView
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

 const ExpensesResultsArr = _.intersectionWith(_.cloneDeep(fullStoreExpensesArr), iconArray, function(x, y) {
  return x.Category === y.Category && _.assign(x, y);
});


  


  return (
    <ScrollView>
      <View stlye={styles.screen}>
        <View style={styles.screenHeader}>
          <Text>Recent Actions </Text>
        </View>

        {ExpensesResultsArr.length > 0 && SavingsResultsArr.length > 0 ? 
          (null) : (
          <View style={styles.emptyContainer}>
              <Text> No recent acitons to report</Text>
          </View>
        )}



      
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
  ) : 
        (null)}

        
</View>
</ScrollView>
  )

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
      }
      
})

export default RecentActivity;