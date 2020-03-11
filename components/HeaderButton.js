import React, {useEffect, useCallback} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'


const HeaderButton = props =>{
    const {navigation} = props
   
   


return(
    
    <TouchableOpacity style={styles.headerButton} >
        <Button 
            title='Save'
            type='clear'
            />
    </TouchableOpacity>
    
)
}
const styles = StyleSheet.create({
    map: {
      flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16
    }
  });
export default HeaderButton;