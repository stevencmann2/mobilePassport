import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const DeviceImage = props => {

const [chosenPhoto, setChosenPhoto] = useState();

    const verifyPermissions = async () => {
                  //// CAMERA_ROLL ACCESSES GALLERY CAMERA ACCESSES CAMERA
                  // Permissions.CAMERA, 
      const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);     
      if (result.status !== 'granted') {
        Alert.alert(
          'Insufficient permissions!',
          'You need to grant camera permissions to use this app.',
          [{ text: 'Okay' }]
        );
        return false;
      }
      return true;
    };
  
    const takeImageHandler = async () => {
    
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
          return;
      }
      // CAN ALSO CALL launchImageLibraryAsync
      const image = await ImagePicker.launchImageLibraryAsync({
        // allowsEditing: true, // allows cropping
        aspect: [16 , 9],  //aspect ratio
        quality: 0.9      // value 0-1 1 is highest quality
      });

      console.log( image)
      setChosenPhoto(image.uri)
      props.onPhotoTaken(image.uri)
    };
  

    return (

      <Avatar
      source={!chosenPhoto ? ( {uri:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}): ({uri: chosenPhoto})}
    
      size='xlarge'
      showEditButton
      onEditPress={takeImageHandler}
    />
  
      
    );
  };
  
  const styles = StyleSheet.create({
  })
  
  export default DeviceImage;