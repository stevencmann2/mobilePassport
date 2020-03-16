import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    
} from 'react-native'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { ListItem } from 'react-native-elements'




const RecentActivity = () => {
    const list = [
        {
          category: 'Airfare',
          description: "United Airlines",
          Amount: 300,
          icon: 'airplanemode-active'
        },
        {
            category: 'Lodging',
            description: "AirBnB",
            Amount: 300,
            icon: 'hotel'
          },
          {
            category: 'Transportation',
            description: "Uber",
            Amount: 300,
            icon: 'local-taxi'
          },
          {
            category: 'Food and Drink',
            description: "Chipotle",
            Amount: 300,
            icon: 'local-cafe'
          },
          {
            category: 'Misc.',
            description: "Gas",
            Amount: 300,
            icon: 'palette'
          },
          {
            category: 'Emergency',
            description: "hospital visit",
            Amount: 300,
            icon: 'local-hospital'
          },
          {
            category: 'Activities',
            description: "Hiking",
            Amount: 300,
            icon: 'landscape'
          },
          
          
    ]
   

  return (
      
      <View style={styles.screen}>
        <View>
        <Text>Recent Activity Page</Text>
        </View>
    <View stlye={styles.list}>
  
  {
    list.map((l, i) => (
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: l.avatar_url } }}
        title={l.description}
        rightTitle={l.category}
        subtitle={`$${l.Amount}`}
        leftIcon={{ name: l.icon}}
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
      list: {
          width: 50,
          maxWidth: '50%'
      }
})

export default RecentActivity;