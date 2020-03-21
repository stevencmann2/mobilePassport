import React from 'react'
import { Avatar } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';


const DrawerAvatar = (props)=> {

return (

    <DrawerContentScrollView {...props}>

    {props.UserProfile? (
        <View style={styles.Avatarcontainer}>
            <Avatar
                rounded
                size="xlarge"
                // FOR PHONE USAGE
            //    source={{uri: props.UserProfile.ProfilePicture}}
                title={props.UserProfile.firstName.charAt(0)+ props.UserProfile.lastName.charAt(0)}
            />
            <View style={styles.textContainer}>
                 <Text style={styles.usernameText}>{props.UserProfile.username}</Text>
            </View>
        </View>
        ): (null)}

        <DrawerItemList {...props} />

    </DrawerContentScrollView>
    )

}
const styles = StyleSheet.create({
    Avatarcontainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 20
    },
    textContainer:{
        marginTop: 15
    },
    usernameText: {
        fontSize: 18
    }
    
})


export default DrawerAvatar