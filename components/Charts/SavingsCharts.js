import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { VictoryPie  } from 'victory-native';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'


const SavingsCharts = () =>{
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
     subcollections: [{ collection: "BudgetBreakdown" }],
     storeAs: 'BudgetBreakdownData'
    }
   ]);

   const BudgetData = useSelector(state =>state.firestore.data.BudgetBreakdownData)
   





   
    return(
        <View>
        </View>
    )

   }

   export default SavingsCharts;