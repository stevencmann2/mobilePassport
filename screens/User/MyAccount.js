import React from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'
import { Button } from 'react-native-elements'
import { useDispatch } from 'react-redux';
import * as authActions from "../../store/actions/auth"




const MyAccount = props =>{
    
    const { navigation } = props
    const dispatch = useDispatch();
    
    const logOutHandler = () => {
        dispatch(authActions.logout());
    }


    return(
        <View style={styles.screen}>
            <View>
                <Text style={{color: 'black'}}>
                        MY ACCOUNT HOMEPAGE
                </Text>
            </View>
            <View>
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
      justifyContent: 'center',
      marginTop: 40,
    }
    
})

export default MyAccount;