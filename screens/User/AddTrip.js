import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button} from 'react-native-elements';
import DeviceImage from '../../components/DeviceImage'



// Style in the props will allow us to pass in overriding styles I believe

const AddTrip = props => {

 const { navigation } = props

const [isGroup, setIsGroup] = useState(false)
const [TripImage, setTripImage] = useState();

const Toggle = isGroup =>{
    setIsGroup(isGroup)
    console.log(isGroup)
}

const TripPhotoHandler = imagePath => {
    setTripImage(imagePath)
}



const FormSubmit = ()=>{
    props.navigation.navigate("DashNav") 
}

  return (
     
    
    <ScrollView>
    <View style={styles.screen}>
    
        <View style={styles.bannerContainer}>
            <Text>
                 Where do You want to go?
            </Text>
        </View>

        <View style={styles.ImageContainer}>
            <DeviceImage onPhotoTaken={TripPhotoHandler}/>
        </View>




        <View style={styles.groupContainer}>
            <View style={styles.groupText}>
                <Text>
                    Group Trip
                </Text>
            </View>
            <View style={styles.switchContainer}>
                <Switch 
                    value={isGroup}
                    onValueChange={Toggle}
                    />
            </View>
        </View>
        
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Input
                label="Trip Name"
                placeholder="John's Bachelor Party"
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Destination"
                    placeholder="Denver, CO"
                 />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Departing Date"
                    placeholder="MM/DD/YYYY"
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Returning Date"
                    placeholder='MM/DD/YY'
                 />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Max Budget"
                    placeholder="1000"
                />
            </View>

        <Button
           
            title="Next"
            icon={
                <Icon
                    name="arrow-right"
                    size={15}
                    color="white"
                />
                }
            style={styles.inputContainer}
            onPress={FormSubmit}
            
        />  
        </View>
       
    </View>
    </ScrollView>
    
   
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10
      }, 
    bannerContainer: {
          marginTop: 20,
          marginBottom: 10

      },
    formContainer: {
          width: 400,
          maxWidth: '80%'

      },
    groupContainer: {
        flexDirection: 'row',
        marginBottom:10,
        marginTop: 10,
    },
    groupText: {
        justifyContent: 'center',
        marginRight: 5,
    },
    switchContainer: {
        
    },
    inputContainer :{
        marginTop: 10,
        marginBottom: 10
    },
    ImageContainer :{
        maxWidth: '60%'
    }
  });

export default AddTrip;