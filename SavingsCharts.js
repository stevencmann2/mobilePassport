import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { VictoryPie, VictoryAnimation, VictoryLabel  } from 'victory-native';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'



const SavingsCharts = () => {

    const firestore = useFirestore();
    const selectedTrip = useSelector(state=> state.tripID.id)

    useFirestoreConnect([{ collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
    doc: `${selectedTrip}`, 
    subcollections: [{ collection: "Savings" }],
    storeAs: 'SavingsData'
   }
   ]);

    const expenseTotal = 3220
    const CategoryTotal = 5000
    const ExpPercent  = (expenseTotal/CategoryTotal)
    const PercentasText = (ExpPercent.toFixed(2))*100

    return(
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    <Text>EXPENSE CATEGORY</Text>
                    <Text>{`${PercentasText}%`}</Text>
                </View>
            
                <View style={styles.chartContainer}>
                <VictoryLegend x={125} y={50}
                title="Legend"/>
                    <VictoryPie 
                        data={[{ x: 1, y: ExpPercent}, {x: 2, y: (1-ExpPercent)} ]}    
                        innerRadius={120}
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
       </ScrollView>
    )

   }
   const styles = StyleSheet.create({
   screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
  },
})



export default SavingsCharts;