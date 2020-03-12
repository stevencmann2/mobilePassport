import React from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'
// import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";




const Settings = props =>{
    
    const { navigation } = props
    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
      ];
      
    
    return(
        <View style={styles.container}>
            <View>
                <Text style={{color: 'black'}}>
                        USER SETTINGS HOMEPAGE
                        <Text>
                            hello
                        </Text>
                </Text>
            </View>
            <Text>
                hello
            </Text>
            
            {/* <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View> */}

        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});

export default Settings;