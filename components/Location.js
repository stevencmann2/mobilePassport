import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Button } from 'react-native-elements'
import MapPreview from './MapPreview'

const ChooseLocation = props => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();
  
    const verifyPermissions = async () => {
      const result = await Permissions.askAsync(Permissions.LOCATION);
      if (result.status !== 'granted') {
        Alert.alert(
          'Cannot Determine Location!',
          'Please grant Passport permision to use location services.',
          [{ text: 'Okay' }]
        );
        return false;
      }
      return true;
    };
  
    const getLocationHandler = async () => {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        return;
      }
  
      try {
        setIsFetching(true);
        const location = await Location.getCurrentPositionAsync({
          timeout: 5000
        });
        setPickedLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });
        console.log(location)
      } catch (err) {
        Alert.alert(
          'Unable to determine location!',
          'Please try again later or pick a location on the map.',
          [{ text: 'Okay' }]
        );
      }
      setIsFetching(false);
    };


    const pickOnMapHandler = () => {
      props.navigation.navigate('MapsScreen');
    };
  
    return (
      <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview } location={pickedLocation} onPress={pickOnMapHandler}>
        
          {isFetching ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text>No location chosen yet!</Text>
          )}
        
        </MapPreview>
        <View style={styles.buttonContainer}>
          <Button
            type='solid'
            raised
            linearGradientProps={{
              colors: ['purple', 'black']}}
            title="Get User Location"
            onPress={getLocationHandler}
          />
          <Button
            type='solid'
            raised
            linearGradientProps={{
              colors: ['purple', 'black']}}
            title="Choose on Map"
            onPress={pickOnMapHandler}
          />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    locationPicker: {
      marginBottom: 15
    },
    mapPreview: {
      marginBottom: 10,
      width: '100%',
      height: 150,
      borderColor: '#ccc',
      borderWidth: 1,
      
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%'
    }
  });
  
  export default ChooseLocation;
  