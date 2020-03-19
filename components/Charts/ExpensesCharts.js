import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Tooltip } from 'react-native-elements'
import { VictoryPie,  VictoryBar, VictoryAnimation, VictoryChart  } from 'victory-native';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import _ from 'lodash'



const ExpensesCharts = () =>{
    const firestore = useFirestore();
    const selectedTrip = useSelector(state=> state.tripID.id)

    const BudgetBreakdownData = `BudgetBreakdownData${selectedTrip}`
    const ExpensesData = `ExpensesData${selectedTrip}`
    const EmergencyExpenses = `EmergencyExpenses${selectedTrip}`
    const MiscExpenses = `MiscExpenses${selectedTrip}`
    const ActivitiesExpenses = `ActivitiesExpenses${selectedTrip}`
    const FoodExpenses = `FoodExpenses${selectedTrip}`
    const LodgingExpenses = `LodgingExpenses${selectedTrip}`
    const TransportationExpenses = `TransportationExpenses${selectedTrip}`
    const AirfareExpenses = `AirfareExpenses${selectedTrip}`

    useFirestoreConnect([
        { collection: 'Trips', doc: `${selectedTrip}`},
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "BudgetBreakdown" }],
            storeAs: BudgetBreakdownData
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Expenses" }],
            storeAs: ExpensesData
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Expenses" }],
            where:['Category', '==', 'Emergency'],
            storeAs: EmergencyExpenses
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Expenses" }],
            where:['Category', '==', 'Misc'],
            storeAs: MiscExpenses
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Expenses" }],
            where:['Category', '==', 'Activities'],
            storeAs: ActivitiesExpenses
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Expenses" }],
            where:['Category', '==', 'Food'],
            storeAs: FoodExpenses
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Expenses" }],
            where:['Category', '==', 'Lodging'],
            storeAs: LodgingExpenses
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Expenses" }],
            where:['Category', '==', 'Transportation'],
            storeAs: TransportationExpenses
        },
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "Expenses" }],
            where:['Category', '==', 'Airfare'],
            storeAs: AirfareExpenses
        },
   ]);
   // REDUX STORE
   const BudgetData = useSelector(state =>state.firestore.ordered[BudgetBreakdownData])
   const fullStoreExpensesArr = useSelector(state=> state.firestore.ordered[ExpensesData])
        const EmergencyExpensesArr = useSelector(state=> state.firestore.ordered[EmergencyExpenses])
        const MiscExpensesArr = useSelector(state=> state.firestore.ordered[MiscExpenses])
        const ActivitiesExpensesArr = useSelector(state=> state.firestore.ordered[ActivitiesExpenses])
        const TransportationExpensesArr = useSelector(state=> state.firestore.ordered[TransportationExpenses])
        const FoodExpensesArr = useSelector(state=> state.firestore.ordered[FoodExpenses])
        const LodgingExpensesArr = useSelector(state=> state.firestore.ordered[LodgingExpenses])
        const AirfareExpensesArr = useSelector(state=> state.firestore.ordered[AirfareExpenses])
        

     console.group("&&&&&&&&&&& FOOD DRINK ARRAY &&&&&&&&&&&&&&&&")
     console.log(FoodExpensesArr)
   
   const FoodValArr = _.map(FoodExpensesArr, 'Amount')
   const EmergencyValArr = _.map(EmergencyExpensesArr, 'Amount')
   const MiscValArr = _.map(MiscExpensesArr, 'Amount')
   const ActivitiesValArr = _.map(ActivitiesExpensesArr, 'Amount')
   const TransportationValArr = _.map(TransportationExpensesArr, 'Amount')
   const LodgingValArr = _.map(LodgingExpensesArr, 'Amount')
   const AirfareValArr = _.map(AirfareExpensesArr, 'Amount')

   const Foodtotal = _.sum(FoodValArr)
   const Emergencytotal = _.sum(EmergencyValArr)
   const Misctotal = _.sum(MiscValArr)
   const Activitiestotal = _.sum(ActivitiesValArr)
   const Transportationtotal = _.sum(TransportationValArr)
   const Lodgingtotal = _.sum(LodgingValArr)
   const Airfaretotal = _.sum(AirfareValArr)

   console.group("total type check===================")
   console.log(typeof(FoodTotal))
//    console.log(typeof(Emergencytotal))
//    console.log(typeof(Misctotal))
//    console.log(typeof(Activitiestotal))
//    console.log(typeof(Transportationtotal))
//    console.log(typeof(Lodgingtotal))
//    console.log(typeof(Airfaretotal))


//    // BUDGET BREAKDOWN BY CATEGORY
   const FoodBudget = _.get(BudgetData[0], 'Food')
   const EmergencyBudget = _.get(BudgetData[0], 'Emergency')
   const MiscBudget = _.get(BudgetData[0], 'Misc')
   const ActivitiesBudget = _.get(BudgetData[0], 'Activities')
   const TransportationBudget = _.get(BudgetData[0], 'Tranportation')
   const LodgingBudget = _.get(BudgetData[0], 'Lodging')
   const AirfareBudget = _.get(BudgetData[0], 'Airfare')

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



if(!isLoaded(fullStoreExpensesArr)){
   
        return (
            <View style={styles.screen}>
                <ActivityIndicator  
                    size="large"
                /> 
            </View>    
            )
    }

if(isEmpty(fullStoreExpensesArr)){
    return(null)
}


return(
    <View style={styles.screen}>
      
        
        {ChartsArr.map((item, index) => (
            (item[0].y!==0 && item[0].y!==1) ? (
            <View key={index}>
                <Tooltip 

                    popover={
                        <View style={styles.tooltipTextContainer}>
                            <Text style={styles.toolTipTextHeader}>{item[2].name}:</Text>
                            <Text style={styles.toolTipText}>You've spent ${item[2].currentTotal}</Text>
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
                            const color = datum.y >= 1 ? "red" : "green";
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
   const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: 400,
        marginBottom: 50,
        marginTop: 0
      },
      overallChart: {
          alignItems: 'center',
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

   export default ExpensesCharts;