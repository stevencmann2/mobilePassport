import React from 'react'
import { Avatar } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const DrawerAvatar = props => {

    const firestore = useFirestore();
    const UserId = useSelector(state=> state.auth.userId)
    const Profile = `Profile${UserId}`
    useFirestoreConnect([
        {collection: 'Users', doc: UserId, storeAs: Profile}
    ]);
  
    const UserProfile = useSelector(state =>state.firestore.ordered[Profile])
  
if(!isLoaded(UserProfile)){

    <View style={styles.Loadingscreen}>
                    <ActivityIndicator  
                        size="large"
                    /> 
    </View>
}

if(isLoaded(UserProfile)){
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