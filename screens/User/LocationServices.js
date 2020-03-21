
import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import ChooseLocation from '../../components/Location'







const LocationServices = props => {
    const { navigation } = props
return(
    <View style={styles.screen}>
        <View style={styles.header}>
            <Text style={styles.comingSoon}> Location Services Coming Soon</Text>
        </View>
        <View style={styles.mapContainer}>
            <ChooseLocation navigation={navigation}/>
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
    header: {
        padding: 30
    },
    mapContainer: {
        justifyContent: 'center',
        width: 400,
        maxWidth: '80%'
    },
    comingSoon: {
        fontSize: 25
    }
})


export default LocationServices;


