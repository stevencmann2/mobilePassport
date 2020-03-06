import React from 'react'
import { Avatar } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import { View, Text, StyleSheet } from 'react-native';



//customDrawerContent


const DrawerAvatar = props => {

return (

<DrawerContentScrollView {...props}>
    <View style={styles.Avatarcontainer}>
        <Avatar
            rounded
            size='xlarge'
            title='username'
            source={{
                 uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
        />
        <Text>Username</Text>
    </View>
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
    }
    
})


export default DrawerAvatar