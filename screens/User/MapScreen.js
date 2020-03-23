import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import HeaderButton from '../../components/HeaderButton'


const MapScreen = props => {

    const [selectedLocation, setSelectedLocation] = useState();



  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
      setSelectedLocation({
          lat: event.nativeEvent.coordinate.latitude,
          lng: event.nativeEvent.coordinate.longitude,
      })
  }


    let markerCoordinates;

  if (selectedLocation){
      markerCoordinates = {
          latitude: selectedLocation.lat, 
          longitude: selectedLocation.lng
      }
  }


  return (
      <MapView 
      style={styles.map} 
      region={mapRegion} 
      onPress={selectLocationHandler} >
      
       {markerCoordinates && <Marker
            title="Picked Location"
            coordinate={markerCoordinates}>
        </Marker> }
        
      </MapView>
      )

};



const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
      marginHorizontal: 20
  },
  headerButtonText: {
      fontSize: 16
  }
});

export default MapScreen;
 