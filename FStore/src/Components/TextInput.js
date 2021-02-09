import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TextInput = ({placeholder, label,value, onChangeText, secureTextEntry,onPress}) => {
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
