import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { VictoryPie  } from 'victory-native';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'



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
    const BudgetData = useSelector(state =>state.firestore.data.BudgetBreakdownData)
        const xkeys = Object.keys(BudgetData[selectedTrip]);
        const chartDataArr = xkeys.map(key => {
        return {x: key, y: BudgetData[selectedTrip][key]};
        })
        
   


return(
<ScrollView>
    <View style={styles.screen}>
        <View style={styles.chartContainer}>
            <VictoryPie
                data={chartDataArr}
                colorScale={[ "tomato", "orange", "gold", "cyan", "navy", "green", "red" ]}
                innerRadius={68}
                // PAD ANDLE FOR SPACING BETWEEN SEGMENTS
                padAngle={2}
                
            />
        </View>
     
    </View>
</ScrollView>
)
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        
      }, 
      chartContainer: {
          
      }
})

export default BudgetBreakdownChart;