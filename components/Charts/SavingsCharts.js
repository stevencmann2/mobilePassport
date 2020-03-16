import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { VictoryPie, VictoryAnimation, VictoryLabel, VictoryLegend, VictoryChart  } from 'victory-native';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import _ from 'lodash'


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
 
   const FoodValArr = _.map(FoodDrinkSavingsArr, 'Amount')
   const EmergencyValArr = _.map(EmergencySavingsArr, 'Amount')
   const MiscValArr = _.map(MiscSavingsArr, 'Amount')
   const ActivitiesValArr = _.map(ActivitiesSavingsArr, 'Amount')
   const TransportationValArr = _.map(TransportationSavingsArr, 'Amount')
   const LodgingValArr = _.map(LodgingSavingsArr, 'Amount')
   const AirfareValArr = _.map(AirfareSavingsArr, 'Amount')

   const Foodtotal = _.sum(FoodValArr)
   const Emergencytotal = _.sum(EmergencyValArr)
   const Misctotal = _.sum(MiscValArr)
   const Activitiestotal = _.sum(ActivitiesValArr)
   const Transportationtotal = _.sum(TransportationValArr)
   const Lodgingtotal = _.sum(LodgingValArr)
   const Airfaretotal = _.sum(AirfareValArr)


   console.group("Savings Sum Arrays")
   console.log("Savings Store",fullStoreSavingsArr)
   console.log("Budget Data", BudgetData)
   console.log("Emergency", Emergencytotal)
   console.log("Misc", Misctotal)
   console.log("Act", Activitiestotal)
   console.log("Trans", Transportationtotal)
   console.log("Food", Foodtotal)
   console.log("hotel", Lodgingtotal)
   console.log("Air", Airfaretotal)
   console.groupEnd()


   const expenseTotal = 3220
   const CategoryTotal = 5000
   const ExpPercent  = (expenseTotal/CategoryTotal)
   const PercentasText = (ExpPercent.toFixed(2))*100
   console.log(ExpPercent)


if(!isLoaded(fullStoreSavingsArr)){
   
        return (
            <View style={styles.screen}>
                <ActivityIndicator  
                    size="large"
                /> 
            </View>
            
            )
    }


return(
    <View style={styles.screen}>
        <View style={styles.chartContainer}>
            <VictoryPie 
                data={[{ x: 1, y: ExpPercent}, {x: 2, y: (1-ExpPercent)} ]}  
                width={200}  
                innerRadius={40}
                labels={() => null}
                animate={{ duration: 1000 }}
                cornerRadius={25}
                style={{
                    data: { fill: ({ datum }) => {
                    const color = datum.y >= 1 ? "red" : "green";
                    return datum.x === 1 ? color : "transparent"; //tranparent instead of blue
                    }
                    }
                }}
            /> 
        </View>
    </View>

)

//MY HEADER MY HEADER 
// <View>
//     <Text>EXPENSE CATEGORY</Text>
//     <Text>{`${PercentasText}%`}</Text>
// </View>


//LEGEND HEADER LEGEND HEADER
// <VictoryLegend 
// title="Legend"
// centerTitle
// gutter={20}
// data={[{ name: PercentasText }]}
// // orientation="horizontal"
// />
  

   }
   const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      chartContainer: {
          flexDirection: 'column',
          justifyContent:'space-between'
      }
    })

   export default SavingsCharts;