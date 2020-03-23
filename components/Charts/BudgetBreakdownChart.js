import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import { VictoryPie, VictoryBar, VictoryGroup, VictoryChart, VictoryLabel} from 'victory-native';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty  } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Tooltip, Text, Button, Overlay, ListItem } from 'react-native-elements';
import _ from 'lodash'




const BudgetBreakdownChart = () =>{

    const [openBudget, setOpenBudget] = useState(false)
    const firestore = useFirestore();
    const selectedTrip = useSelector(state=> state.tripID.id)
    const BudgetBreakdownData = `BudgetBreakdownData${selectedTrip}`

    useFirestoreConnect([{ collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
    doc: `${selectedTrip}`, 
    subcollections: [{ collection: "BudgetBreakdown" }],
    storeAs: BudgetBreakdownData
   }
   ]);
   const TripData = useSelector(state=> state.firestore.ordered.Trips[0])
   const TripBudget = TripData.totalBudget
   const BudgetData = useSelector(state =>state.firestore.ordered[BudgetBreakdownData])
  const TripBudgetObj = BudgetData[0]
  
   console.log('Budget Data Budget Data Budget Data')
   console.log(BudgetData)
   console.log('Budget Data Budget Data Budget Data')
   console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log(TripBudgetObj)
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
   
   const colorsArray = [ "tomato", "orange", "gold", "cyan", "navy", "green", "red" ]


        Object.keys(TripBudgetObj).forEach(key => {
            if (TripBudgetObj[key]=== 0) delete TripBudgetObj[key];
            if (TripBudgetObj[key]=== selectedTrip) delete TripBudgetObj[key]
          });

        const xkeys = Object.keys(TripBudgetObj);
        const BudgetDataArr = xkeys.map(key => {
        return {x: key, y: TripBudgetObj[key]};
        })
     
 console.log("OISDINSIDMoajsdoasmdoanmsodinamsodn")
 console.log(BudgetDataArr)
          

if(!isLoaded(BudgetData && TripData)){
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
        <Overlay 
            isVisible={openBudget}
            onBackdropPress={() => setOpenBudget(false)}
            borderRadius={20}
            height="95%"
        >
            <View style={styles.overlayView}>
                <View style={styles.overlayHeader}>
                    <Text style={styles.overlayHeaderText}>Budget by Category</Text>
                </View>
                <View style={styles.overlaySubheading}>
                    <Text>Expected budget (%) </Text>
                </View>
                <View style={styles.overlayBody}>
                {
                    BudgetDataArr.map((item, index) => (
                      <ListItem
                        key={index}
                        title={item.x}
                        rightTitle={`${((item.y/TripBudget)*100).toFixed(1)} %`}
                        subtitle={`$${item.y}`}
                        bottomDivider
                      />
                    ))
                  }
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                    type="solid"
                    raised
                    linearGradientProps={{
                        colors: ['purple', 'black']}}
                    title="Close"
                    onPress={()=>setOpenBudget(false)}
                    />
                </View>
            </View>
        </Overlay>

        <View style={styles.PiechartContainer} >
            <Tooltip 
                popover={<Text>This is a breakdown of trip budget goals by category</Text>}
                backgroundColor="#aeced1"
                width={300}
                height={100}
                >
                    <VictoryPie
                    width={380}
                        data={BudgetDataArr}
                        colorScale={colorsArray}
                        innerRadius={50}
                        // PAD ANDLE FOR SPACING BETWEEN SEGMENTS
                        padAngle={2}
                        padding={100} 
                    />
            </Tooltip>
        </View>
    
        <View style={styles.buttonContainer}>
            <Button 
                type="solid"
                raised
                linearGradientProps={{
                    colors: ['purple', 'black']}}
                title="More Info"
                onPress={()=>setOpenBudget(true)}
            />
        </View>

       

    </View>

)
}


const styles = StyleSheet.create({
   
      PiechartContainer: {
          alignItems:'center',
          justifyContent: 'center'
          
      },
      legendContainer:{
          alignItems: 'center',
          padding: 0,
          margin: 0
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    overlayHeader: {
        marginTop: 10,
        alignItems: 'center'
    },
    overlayHeaderText:{
        fontSize: 22
    },
    overlaySubheading: {
        marginTop: 22,
        alignItems: 'center'

    },
    overlayBody: {  
        marginTop: 20,
        marginBottom: 20
    },
    overlayText: {
        marginBottom: 15
    },
    overlayButton:{
        justifyContent: 'flex-end',
    }
})

export default BudgetBreakdownChart;