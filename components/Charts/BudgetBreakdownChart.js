import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import { VictoryPie, VictoryBar, VictoryGroup, VictoryChart, VictoryLabel} from 'victory-native';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty  } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Tooltip, Text } from 'react-native-elements';



const BudgetBreakdownChart = () =>{
    const firestore = useFirestore();
    const selectedTrip = useSelector(state=> state.tripID.id)

    
    useFirestoreConnect([{ collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
    doc: `${selectedTrip}`, 
    subcollections: [{ collection: "BudgetBreakdown" }],
    storeAs: 'BudgetBreakdownData'
   }
   ]);
   let BudgetData = useSelector(state =>state.firestore.data.BudgetBreakdownData)
   console.log('CHARTS CHARTS CHARTS CHARTS CHARTS CHARTS ')
   console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
   console.log('TRIP ID TRIP ID TRIP ID')
   console.log(selectedTrip)
   console.log('TRIP ID TRIP ID TRIP ID')
    console.log('Budget Data Budget Data Budget Data')
    console.log('Budget Data Budget Data Budget Data')
   console.log(BudgetData)
   console.log('Budget Data Budget Data Budget Data')
   console.log('Budget Data Budget Data Budget Data')
   console.log('selected trip selected trip selecte tripd')
    console.log(BudgetData[selectedTrip])
   console.log('selected trip selected trip selecte tripd')
   console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
   
        Object.keys(BudgetData[selectedTrip]).forEach(key => {
            if (BudgetData[selectedTrip][key]=== 0) delete BudgetData[selectedTrip][key];
          });

        const xkeys = Object.keys(BudgetData[selectedTrip]);
        const BudgetDataArr = xkeys.map(key => {
        return {x: key, y: BudgetData[selectedTrip][key]};
        })
        console.log("NEW ARRAY FOR CHART DATA NEW ARRAY FOR DATA NEW ARRAY FOR DATA  ")
        console.log(BudgetDataArr) 
        console.log("NEW ARRAY FOR CHART DATA NEW ARRAY FOR DATA NEW ARRAY FOR DATA  ")
   

if(!isLoaded(BudgetData)){
    return(
        <View style={styles.screen}>
            <ActivityIndicator  size="large"/> 
        </View>)
}
if(isEmpty(BudgetData)){
    return(<View>
                <Text>ERROR: No Budget Data to present</Text>
            </View>)
}
return(
    <View>
        <View style={styles.PiechartContainer} >
            <Tooltip 
                popover={<Text>This is a breakdown of your set budget by category</Text>}
                backgroundColor="#aeced1"
                width={200}
                height={100}
                >
                    <VictoryPie
                    width={300}
                        data={BudgetDataArr}
                        colorScale={[ "tomato", "orange", "gold", "cyan", "navy", "green", "red" ]}
                        innerRadius={50}
                        // PAD ANDLE FOR SPACING BETWEEN SEGMENTS
                        padAngle={2}
                        
                        
                    />
            </Tooltip>
        </View>
        <View style={styles.chartContainer}>
        <Tooltip 
            popover={<Text>This a breakdown by cateogry of your budget, expenses and savings </Text>}
            backgroundColor="#aeced1"
            width={200}
            height={100}
            >
                <VictoryChart>
                    <VictoryGroup offset={20}
                        colorScale={"qualitative"}
                        
                    >
                        <VictoryBar
                            data={BudgetDataArr}
                        />
                        <VictoryBar
                            data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]}
                        />
                        <VictoryBar
                            data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]}
                        />
                    </VictoryGroup>
                </VictoryChart>
            </Tooltip>
        </View>
    </View>

)
}

const styles = StyleSheet.create({
   
      PiechartContainer: {
          alignItems:'center',
          justifyContent: 'center'
          
      },
      
})

export default BudgetBreakdownChart;