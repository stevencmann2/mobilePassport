import React, { useState } from 'react';
import {
    Text, 
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Header, Image, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';







const Trips = props =>{
    
    const { navigation } = props

//    const [modalOpen, isModalOpen ] = useState(false)

    return(
     






        <View style={styles.screen}>
        <Header
            centerComponent={{ 
                text: 'My Trips', 
                style: { color: '#fff' } }}
            rightComponent={{
                text: '+ Add Trip', 
                style: { color: '#fff' }, 
                onPress: ()=> props.navigation.navigate('AddTrip')
            }}
            
        />
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
    }
    
})

export default Trips