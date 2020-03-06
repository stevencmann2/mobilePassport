import React from 'react';
import {
    Text, 
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Header, Image } from 'react-native-elements'
import Card from '../../components/Card'
import { ScrollView } from 'react-native-gesture-handler';




const Trips = props =>{
    
    const { navigation } = props

    return(
        <View style={styles.screen}>
        <Header
            centerComponent={{ text: 'My Trips', style: { color: '#fff' } }}
        />
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>console.log('heyyyyyyyy')}>
                    <Card>
                         <Image 
                            source={require('../../assets/images/PalmTrees.jpg')} 
                            style={styles.CardContainer}
                            onPress={()=>{console.log('Pressed Hawaii')}}  
                        />
                
                    </Card>
                </TouchableOpacity>
                <View style={styles.TripName}>
                    <Text>
                        Hawaii Trip
                    </Text>
                 </View>
            </View>
        </ScrollView>
        </View>
         
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center'
    },
    container: {
        justifyContent: 'center',
        marginTop: 20
    },
    CardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300, 
        height: 300,
        maxWidth: '80%',
        
    },
    TripName: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
    
})

export default Trips