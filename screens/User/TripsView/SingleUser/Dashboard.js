import React  from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'



const Dashboard = props =>{
   
    
    
   
   
    return(
        <View style={styles.screen}>
            <View>
                <Text style={{color: 'black'}}>
                        USER DASBOARD HOMEPAGE
                        
                </Text>
               
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    }
    
})

export default Dashboard;