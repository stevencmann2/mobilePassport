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
   // REDUX STORE
   const BudgetData = useSelector(state =>state.firestore.data.BudgetBreakdownData)
   const fullStoreSavingsArr = useSelector(state=> state.firestore.ordered.SavingsData)
        const EmergencySavingsArr = useSelector(state=> state.firestore.ordered.EmergencySavings)
        const MiscSavingsArr = useSelector(state=> state.firestore.ordered.MiscSavings)
        const ActivitiesSavingsArr = useSelector(state=> state.firestore.ordered.ActivitiesSavings)
        const TransportationSavingsArr = useSelector(state=> state.firestore.ordered.TransportationSavings)
        const FoodDrinkSavingsArr = useSelector(state=> state.firestore.ordered.FoodDrinkSavings)
        const LodgingSavingsArr = useSelector(state=> state.firestore.ordered.LodgingSavings)
        const AirfareSavingsArr = useSelector(state=> state.firestore.ordered.AirfareSavings)
        console.log("==============================")
        console.log(BudgetData[selectedTrip])
        console.log("==============================")
   // NEW ARRAY OF ONLY AMOUNTS DONE BY CATEGORY
   const FoodValArr = _.map(FoodDrinkSavingsArr, 'Amount')
   const EmergencyValArr = _.map(EmergencySavingsArr, 'Amount')
   const MiscValArr = _.map(MiscSavingsArr, 'Amount')
   const ActivitiesValArr = _.map(ActivitiesSavingsArr, 'Amount')
   const TransportationValArr = _.map(TransportationSavingsArr, 'Amount')
   const LodgingValArr = _.map(LodgingSavingsArr, 'Amount')
   const AirfareValArr = _.map(AirfareSavingsArr, 'Amount')

   //TOTAL ABOVE ARRAYS
   const Foodtotal = _.sum(FoodValArr)
   const Emergencytotal = _.sum(EmergencyValArr)
   const Misctotal = _.sum(MiscValArr)
   const Activitiestotal = _.sum(ActivitiesValArr)
   const Transportationtotal = _.sum(TransportationValArr)
   const Lodgingtotal = _.sum(LodgingValArr)
   const Airfaretotal = _.sum(AirfareValArr)

   // BUDGET BREAKDOWN BY CATEGORY
   const FoodBudget = _.get(BudgetData[selectedTrip], 'Food & Drink')
   const EmergencyBudget = _.get(BudgetData[selectedTrip], 'Emergency')
   const MiscBudget = _.get(BudgetData[selectedTrip], 'Misc')
   const ActivitiesBudget = _.get(BudgetData[selectedTrip], 'Activities')
   const TransportationBudget = _.get(BudgetData[selectedTrip], 'Tranportation')
   const LodgingBudget = _.get(BudgetData[selectedTrip], 'Lodging')
   const AirfareBudget = _.get(BudgetData[selectedTrip], 'Airfare')

   console.group()
   console.log(FoodBudget, "food")
   console.log(EmergencyBudget, "emerg")
   console.log(MiscBudget, "misc")
   console.log(ActivitiesBudget, "act")
   console.log(TransportationBudget, "transpo")
   console.log(LodgingBudget, "lodge")
   console.log(AirfareBudget, "airfare")
   console.groupEnd()

   const expenseTotal = 3220
   const CategoryTotal = 5000
   const ExpPercent  = (expenseTotal/CategoryTotal)
   const PercentasText = (ExpPercent.toFixed(2))*100
   console.log(ExpPercent)

   //Make Arrays of Data
   // RESULT IS y:NaN IF UNDEFINED

    const FoodData = [{x: 1, y:(Foodtotal/FoodBudget)},{x:2, y:1-(Foodtotal/FoodBudget)}]
    const EmergencyData = [{x:1, y:(Emergencytotal/EmergencyBudget)}, {x:2, y:1-(Emergencytotal/EmergencyBudget)}]
    const MiscData = [{x:1, y:(Misctotal/MiscBudget)}, {x:2, y:1-(Misctotal/MiscBudget)}]
    const ActivitiesData = [{x:1, y:(Activitiestotal/ActivitiesBudget)}, {x:2, y:1-(Activitiestotal/ActivitiesBudget)}]
    const TranportationData = [{x:1, y:(Transportationtotal/TransportationBudget)}, {x:2, y:1-(Transportationtotal/TransportationBudget)}]
    const LodgingData = [{x:1, y:(Lodgingtotal/LodgingBudget)}, {x:2, y:1-(Lodgingtotal/LodgingBudget)}]
    const AirfareData = [{x:1, y:(Airfaretotal/AirfareBudget)}, {x:2, y:1-(Airfaretotal/AirfareBudget)}]
    
    console.group()
    console.log(FoodData, "food obj")
    console.log(EmergencyData, "emerg obj")
    console.log(MiscData, "Miscobj")
    console.log(ActivitiesData, "Activities obj")
    console.log(TranportationData, "Transport obj")
    console.log(LodgingData, "Lodging obj")
    console.log(AirfareData, "Air obj")
    console.groupEnd()





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
                data={LodgingData}  
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



//    console.group("Savings Sum Arrays")
//    console.log("Savings Store",fullStoreSavingsArr)
//    console.log("Budget Data", BudgetData)
//    console.log("Emergency", Emergencytotal)
//    console.log("Misc", Misctotal)
//    console.log("Act", Activitiestotal)
//    console.log("Trans", Transportationtotal)
//    console.log("Food", Foodtotal)
//    console.log("hotel", Lodgingtotal)
//    console.log("Air", Airfaretotal)
//    console.groupEnd()
  

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