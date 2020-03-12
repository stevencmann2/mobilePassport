import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return ( 
      <View>
      <View style={styles.labelsContainer}>
        <Text>
           {props.label}
        </Text>
        <View style={styles.specialLabel}>
          {props.special}
        </View>
        </View>
        <TextInput  {...props} style={{...styles.input, ...props.style}} />
      </View>
      )
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  },
  labelsContainer: {
    flexDirection: 'row',
  },
  specialLabel: {
    marginLeft: 10,
  }

});

export default Input;



// return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;