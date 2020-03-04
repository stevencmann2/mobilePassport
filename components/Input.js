import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return ( 
      <View>
        <Text>
           {props.label}
        </Text>
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
  }
});

export default Input;



// return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;