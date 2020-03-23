import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import {  useSelector } from 'react-redux';


const TakePhoto = props => {

  const firestore = useFirestore();
    const UserId = useSelector(state=> state.auth.userId)
    
    useFirestoreConnect([
        { collection: 'Users', doc: UserId}
      ]);

   
    const UserData = useSelector(({ firestore: { data } }) => data.Users && data.Users[UserId])
    console.log(UserData)


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
      const image = await ImagePicker.launchCameraAsync({
        // allowsEditing: true, // allows cropping
        aspect: [16 , 9],  //aspect ratio
        quality: 0.9      // value 0-1 1 is highest quality
      });

     
      console.log( image)
      
      setChosenPhoto(image.uri)
      props.onPhotoTaken(image.uri)
    };
  
    const updateProfileHandler = async() => {
      try {
        await firestore.update({ collection: 'Users', doc: UserId }, {ProfilePicture: chosenPhoto} )
        succesAlert();
          
      } catch (err) {
        console.log(err)
        errorAlert();

      }
  
     }


     const errorAlert = () => {
      Alert.alert(
          'Internal Catch Error',
          'Something went wrong, please let us know an issue occured while submitting your profile picture',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
          )
        }

    const succesAlert = () => {
      Alert.alert(
          'Account Update',
          'A profile picture has been added to your account',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
          )
        }

    return (
    <View>
      <Avatar
      source={!chosenPhoto ? ( {uri:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}): ({uri: chosenPhoto})}
    
      size='xlarge'
      showEditButton
      onEditPress={takeImageHandler}
    />
      <View>
        <Button
          title='Save Photo'
          type='solid'
          raised
          linearGradientProps={{
            colors: ['purple', 'red'],}}
          onPress={updateProfileHandler}
        />
      </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
  })
  
  export default TakePhoto;