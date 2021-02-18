import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import {Input} from 'react-native-elements'

const TextArea = ({numberOfLines,placeholder,multiline,label,onChangeText,value,editable}) => {
    return (
        <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput 
         style={styles.textinput}
           multiline={multiline}
            numberOfLines={numberOfLines}
            autoCapitalize='none'
            placeholder={placeholder}
            placeholderTextColor={"#9E9E9E"}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
          />
        </View>
    )
}
const styles = StyleSheet.create({
  container:{
    marginBottom:20,
    borderBottomWidth:0.5,
  },
  label:{
    fontSize:18,
    marginBottom:10,
    fontWeight: '300',
    color: '#4d4d4d'
  },
  textinput:{
    marginHorizontal:8,
    flex:1,
    fontSize:20,
    fontWeight:'400',
    marginBottom:10,
  }
})
export default TextArea
