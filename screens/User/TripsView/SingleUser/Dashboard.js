import React  from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'



const Dashboard = props =>{
    
    const { navigation } = props
   
   
    return(
        <View style={styles.screen}>
            <View>
                <Text style={{color: 'black'}}>
                        USER DASBOARD HOMEPAGE
                </Text>
                <View style={styles.ImgContainer}>
                
                </View>
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
    },
    ImgContainer: {
        width : 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3, 
        borderColor: 'black',
        overflow: 'hidden'
    },
    
})

export default Dashboard;