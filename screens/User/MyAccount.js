import React, { useState } from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'
import { Button } from 'react-native-elements'
import { useDispatch } from 'react-redux';
import * as authActions from "../../store/actions/auth"
import DeviceImage from '../../components/DeviceImage'
import Card from "../../components/Card"
import TakePhoto from '../../components/TakePhoto'



const MyAccount = props =>{
    
    const { navigation } = props
    const dispatch = useDispatch();

    


    
    const logOutHandler = () => {
        dispatch(authActions.logout());
    }
    const [ProfileImage, setProfileImage] = useState();

    const ProfilePhotoHandler = imagePath => {
        setProfileImage(imagePath)
       
    }



    return(
     <View style={styles.screen}>
        <View style={styles.screenName}>
            <Text style={{color: 'black'}}>
                        MY ACCOUNT HOMEPAGE
            </Text>
        </View>

        <Card style={styles.cardContainer}>
            
            <View style={styles.textContainer}>
                <Text style={{color: 'black'}}>
                     Add Profile Image
                </Text>
            </View>
                 <Card >
                    <View style={styles.ImageContainer}>
                        <TakePhoto onPhotoTaken={ProfilePhotoHandler}/>
                    </View>
                </Card>   
        </Card>
        <View style={styles.buttonContainer}>
            <Button 
            type="outline"
            title="Log Out"
            onPress={logOutHandler}
            
            />
        </View>

    </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      marginTop: 40,
    },
    screenName:{
        marginTop: 10,
        marginBottom: 70
    },
    textContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent:'center',
        
    },
    ImageContainer :{
        maxWidth: '60%',
        
    },
    buttonContainer:{
        marginTop: 100
    }
    
})

export default MyAccount;