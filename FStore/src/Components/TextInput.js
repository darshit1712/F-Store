import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';

const TextInput = ({placeholder, label,value, onChangeText, secureTextEntry}) => {
  return (
    <View>
      <Input 
        label={label}
        placeholder={placeholder} 
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize='none'
        />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
    
});
