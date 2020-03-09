import React, { useState } from 'react';
import {
    Text, 
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Header, Image, Icon, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';





const Trips = props =>{
    
    const { navigation } = props


    return(
 
        <View style={styles.screen}>

        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>console.log('heyyyyyyyy')}>
                    <View style={styles.ImgContainer}>
                         <Image 
                            source={require('../../assets/images/PalmTrees.jpg')} 
                            style={styles.Img}
                            onPress={()=>{console.log('Pressed Hawaii')}}  
                            />
                    </View>
                </TouchableOpacity>

                <View style={styles.TripName}>
                    <Text>
                        Hawaii Trip
                    </Text>
                </View>
            </View>

            
            <View style={styles.buttonContainer}>
            <Button
                type= 'outline'
                title="Add Trip"
                onPress={()=> props.navigation.navigate('AddTrip')}
            />
            </View>

        </ScrollView>
        </View>
         
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        marginTop: 20
    },
    ImgContainer: {
        width : 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3, 
        borderColor: 'black',
        overflow: 'hidden'
    },
    Img: {
        width: 300, 
        height: 300,
        
        
    },
    TripName: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 50
    }
    
})

export default Trips