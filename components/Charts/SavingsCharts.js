import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Tooltip } from 'react-native-elements'
import { VictoryPie,  VictoryBar, VictoryAnimation, VictoryChart  } from 'victory-native';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import _ from 'lodash'


const SavingsCharts = () =>{
    
    const firestore = useFirestore();
    const selectedTrip = useSelector(state=> state.tripID.id)

    const BudgetBreakdownData = `BudgetBreakdownData${selectedTrip}`
    const SavingsData = `SavingsData${selectedTrip}`
    const EmergencySavings = `EmergencySavings${selectedTrip}`
    const MiscSavings = `MiscSavings${selectedTrip}`
    const ActivitiesSavings = `ActivitiesSavings${selectedTrip}`
    const FoodSavings = `FoodSavings${selectedTrip}`
    const LodgingSavings = `LodgingSavings${selectedTrip}`
    const TransportationSavings = `TransportationSavings${selectedTrip}`
    const AirfareSavings = `AirfareSavings${selectedTrip}`

    useFirestoreConnect([
        { collection: 'Trips', doc: `${selectedTrip}`},
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "BudgetBreakdown" }],
            storeAs: BudgetBreakdownData
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            storeAs: SavingsData
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Emergency'],
            storeAs: EmergencySavings
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Misc'],
            storeAs: MiscSavings
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Activities'],
            storeAs: ActivitiesSavings
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Food'],
            storeAs: FoodSavings
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Lodging'],
            storeAs: LodgingSavings
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Transportation'],
            storeAs: TransportationSavings
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Savings" }],
            where:['Category', '==', 'Airfare'],
            storeAs: AirfareSavings
        },
   ]);
   // REDUX STORE
   const BudgetData = useSelector(state =>state.firestore.ordered[BudgetBreakdownData])
   const fullStoreSavingsArr = useSelector(state=> state.firestore.ordered[SavingsData])
        const EmergencySavingsArr = useSelector(state=> state.firestore.ordered[EmergencySavings])
        const MiscSavingsArr = useSelector(state=> state.firestore.ordered[MiscSavings])
        const ActivitiesSavingsArr = useSelector(state=> state.firestore.ordered[ActivitiesSavings])
        const TransportationSavingsArr = useSelector(state=> state.firestore.ordered[TransportationSavings])
        const FoodSavingsArr = useSelector(state=> state.firestore.ordered[FoodSavings])
        const LodgingSavingsArr = useSelector(state=> state.firestore.ordered[LodgingSavings])
        const AirfareSavingsArr = useSelector(state=> state.firestore.ordered[AirfareSavings])
  
     
   //NEW ARRAY OF ONLY AMOUNTS DONE BY CATEGORY
   const FoodValArr = _.map(FoodSavingsArr, 'Amount')
   const EmergencyValArr = _.map(EmergencySavingsArr, 'Amount')
   const MiscValArr = _.map(MiscSavingsArr, 'Amount')
   const ActivitiesValArr = _.map(ActivitiesSavingsArr, 'Amount')
   const TransportationValArr = _.map(TransportationSavingsArr, 'Amount')
   const LodgingValArr = _.map(LodgingSavingsArr, 'Amount')
   const AirfareValArr = _.map(AirfareSavingsArr, 'Amount')


   //TOTAL Sum of Categories ARRAYS
   const Foodtotal = _.sum(FoodValArr)
   const Emergencytotal = _.sum(EmergencyValArr)
   const Misctotal = _.sum(MiscValArr)
   const Activitiestotal = _.sum(ActivitiesValArr)
   const Transportationtotal = _.sum(TransportationValArr)
   const Lodgingtotal = _.sum(LodgingValArr)
   const Airfaretotal = _.sum(AirfareValArr)
   

//    // BUDGET BREAKDOWN BY CATEGORY
   const FoodBudget = _.get(BudgetData[0], 'Food')
   const EmergencyBudget = _.get(BudgetData[0], 'Emergency')
   const MiscBudget = _.get(BudgetData[0], 'Misc')
   const ActivitiesBudget = _.get(BudgetData[0], 'Activities')
   const TransportationBudget = _.get(BudgetData[0], 'Tranportation')
   const LodgingBudget = _.get(BudgetData[0], 'Lodging')
   const AirfareBudget = _.get(BudgetData[0], 'Airfare')


//    //Make Arrays of Data
//    // RESULT IS y:NaN IF UNDEFINED

  
    const FoodData = [{x: 1, y:(Foodtotal/FoodBudget)},{x:2, y:((1)-(Foodtotal/FoodBudget))}, 
                        {name: "Food", currentTotal: Foodtotal, budget: FoodBudget } ]
    const EmergencyData = [{x:1, y:(Emergencytotal/EmergencyBudget)}, {x:2, y:((1)-(Emergencytotal/EmergencyBudget))}, 
                                {name: "Emergency", currentTotal: Emergencytotal, budget: EmergencyBudget}]
    const MiscData = [{x:1, y:(Misctotal/MiscBudget)}, {x:2, y:((1)-(Misctotal/MiscBudget))}, 
                            {name: "Misc", currentTotal: Misctotal, budget: MiscBudget}]
    const ActivitiesData = [{x:1, y:(Activitiestotal/ActivitiesBudget)}, {x:2, y:((1)-(Activitiestotal/ActivitiesBudget))}, 
                                    {name: "Activities", currentTotal: Activitiestotal, budget: ActivitiesBudget}]
    const TransportationData = [{x:1, y:(Transportationtotal/TransportationBudget)}, {x:2, y:((1)-(Transportationtotal/TransportationBudget))}, 
                                    {name: "Transportation", currentTotal: Transportationtotal, budget: TransportationBudget}]
    const LodgingData = [{x:1, y:(Lodgingtotal/LodgingBudget)}, {x:2, y:((1)-(Lodgingtotal/LodgingBudget))}, 
                                {name: "Lodging", currentTotal: Lodgingtotal, budget: LodgingBudget} ]
    const AirfareData = [{x:1, y:(Airfaretotal/AirfareBudget)}, {x:2, y:((1)-(Airfaretotal/AirfareBudget))}, 
                                {name: "Airfare", currentTotal: Airfaretotal, budget: AirfareBudget} ]
    

     const ChartsArr = [FoodData, EmergencyData, MiscData, ActivitiesData, 
                TransportationData, LodgingData, AirfareData];

console.group("PETERRR PETTTTER PEEEEEEETER PPPPPPPPPEEEEEETERRRR")
       console.log(ChartsArr)
console.groupEnd("END END END END END END END END END END ")
if(!isLoaded(fullStoreSavingsArr)){
   
        return (
            <View style={styles.screen}>
                <ActivityIndicator  
                    size="large"
                /> 
            </View>    
            )
    }
if(isEmpty(fullStoreSavingsArr)){
    return(null)
}

return(
    
    <View style={styles.screen}>
       
  
        
        {ChartsArr.map((item, index) => (
            (item[0].y!==0  && item[1].y!==1 && !isNaN(item[0].y)) ? (
            <View  key={index}>
                <Tooltip 
                    popover={
                        <View style={styles.tooltipTextContainer}>
                            <Text style={styles.toolTipTextHeader}>{item[2].name}:</Text>
                            <Text style={styles.toolTipText}>You've saved ${item[2].currentTotal}</Text>
                            <Text style={styles.toolTipText}>of your ${item[2].budget} budget</Text>
                        </View>
                    }
                    backgroundColor="#aeced1"
                    width={200}
                    height={100}
                    >

                    <VictoryPie 
                        data={item}  
                        width={300}  
                        height={200}
                        innerRadius={40}
                        labels={[item[2].name, `${(item[0].y*100).toFixed(0)}%`]}
                        animate={{ 
                            duration: 10000,
                            onLoad: { duration: 8000 },
                            easing: "bounce"
                        }}
                        cornerRadius={25}
                        style={{
                            data: { fill: ({ datum }) => {
                            const color = datum.y >= 1 ? "green" : "red";
                            return datum.x === 1 ? color : "transparent"; //tranparent instead of blue
                            }
                            }
                        }}
                    /> 
                   </Tooltip>
               </View>

           
            ) : 
            (null)
            ))}
            
        </View>
        
    
    
)
 }




//  <View style={styles.overallChart}>
//  <VictoryBar horizontal
//      style={{ data: { fill: "#c43a31" } }}
//      data={[{x: 1, y: 1}]}
//      width={100}
//      height={50}
//      animate={{
//          duration: 5000,
//          onLoad: { duration: 8000 },
//          easing: "bounce"
//        }}
       
//  />
   const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        width: 400,
        padding:5,
        marginBottom: 50,
        marginTop: 0
      },
      overallChart: {
          alignItems: 'center',
      },
  
      eachChart:{
      },
      tooltipTextContainer:{
          alignItems: 'center',  
      },
      toolTipTextHeader: {
        padding: 2
      },
      toolTipText: {
        padding: 2
      }
    })

   export default SavingsCharts;