import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return ( 
      <View>
      <View style={styles.labelsContainer}>
        <Text>
           {props.label}
        </Text>
        <Text style={styles.specialLabel}>
          {props.special}
        </Text>
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
    color: 'red',
    marginLeft: 5,
    fontStyle: 'italic'
  }

});

export default Input;



// return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;