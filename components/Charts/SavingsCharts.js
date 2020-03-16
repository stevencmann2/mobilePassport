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
            subcollections: [{ collection: "BudgetBreakdown" }],
            storeAs: 'BudgetBreakdownData'
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            storeAs: 'SavingsData'
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Emergency'],
            storeAs: 'EmergencySavings'
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Misc'],
            storeAs: 'MiscSavings'
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Activities'],
            storeAs: 'ActivitiesSavings'
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Food & Drink'],
            storeAs: 'FoodDrinkSavings'
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Lodging'],
            storeAs: 'LodgingSavings'
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Transportation'],
            storeAs: 'TransportationSavings'
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Airfare'],
            storeAs: 'AirfareSavings'
        },
   ]);

   const BudgetData = useSelector(state =>state.firestore.data.BudgetBreakdownData)
   const fullStoreSavingsArr = useSelector(state=> state.firestore.ordered.SavingsData)
        const EmergencySavingsArr = useSelector(state=> state.firestore.ordered.EmergencySavings)
        const MiscSavingsArr = useSelector(state=> state.firestore.ordered.MiscSavings)
        const ActivitiesSavingsArr = useSelector(state=> state.firestore.ordered.ActivitiesSavings)
        const TransportationSavingsArr = useSelector(state=> state.firestore.ordered.TransportationSavings)
        const FoodDrinkSavingsArr = useSelector(state=> state.firestore.ordered.FoodDrinkSavings)
        const LodgingSavingsArr = useSelector(state=> state.firestore.ordered.LodgingSavings)
        const AirfareSavingsArr = useSelector(state=> state.firestore.ordered.AirfareSavings)
 
   
   console.group("Savings Arrays")
   console.log("Savings Store",fullStoreSavingsArr)
   console.log("Budget Data", BudgetData)
   console.log("Emergency", EmergencySavingsArr)
   console.log("Misc", MiscSavingsArr)
   console.log("Act", ActivitiesSavingsArr)
   console.log("Trans", TransportationSavingsArr)
   console.log("Food", FoodDrinkSavingsArr)
   console.log("hotel", LodgingSavingsArr)
   console.log("Air", AirfareSavingsArr)
   console.groupEnd()






    return(
    
        <View>
        </View>
    )

   }

   export default SavingsCharts;