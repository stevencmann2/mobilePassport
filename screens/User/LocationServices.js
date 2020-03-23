import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { Header } from "react-native-elements";
import ChooseLocation from "../../components/Location";
import { isLoaded } from "react-redux-firebase";

const LocationServices = props => {
  const { navigation } = props;

  if (!isLoaded(<ImageBackground />)) {
    return (
      <View style={styles.Loadingscreen}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isLoaded(<ImageBackground /> && <ChooseLocation />)) {
    return (
      <ImageBackground
        source={require("../../assets/images/defaultBackground.jpg")}
        style={styles.backgroundImage}
      >
        <Header
          backgroundColor="white"
          centerComponent={{
            text: "Location Services",
            style: { color: "black", fontFamily: "comfortaa-bold" }
          }}
        />
        <View style={styles.screen}>
          <View style={styles.header}>
            <Text style={styles.comingSoon}>Coming Soon!</Text>
          </View>
          <View style={styles.mapContainer}>
            <ChooseLocation navigation={navigation} />
          </View>
        </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop: 40
  },
  Loadingscreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40
  },
  header: {
    padding: 30
  },
  mapContainer: {
    justifyContent: "center",
    width: 400,
    maxWidth: "80%"
  },
  comingSoon: {
    fontSize: 25
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  }
});

export default LocationServices;
