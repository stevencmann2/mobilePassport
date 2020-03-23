import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const DeviceImage = props => {
  const [chosenPhoto, setChosenPhoto] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
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

    const image = await ImagePicker.launchImageLibraryAsync({
      aspect: [16, 9],
      quality: 0.9
    });

    setChosenPhoto(image.uri);
    props.onPhotoTaken(image.uri);
  };

  return (
    <Avatar
      source={
        !chosenPhoto
          ? {
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
            }
          : { uri: chosenPhoto }
      }
      size="xlarge"
      showEditButton
      onEditPress={takeImageHandler}
    />
  );
};

const styles = StyleSheet.create({});

export default DeviceImage;
