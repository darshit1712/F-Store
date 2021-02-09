import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import {Input} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'

const TextArea = ({numberOfLines,placeholder,multiline,label}) => {
    return (
        <View>
        <Input 
            multiline={multiline}
            numberOfLines={numberOfLines}
            autoCapitalize='none'
            placeholder={placeholder}
            placeholderTextColor={"#9E9E9E"}
            label={label}
        />
        </View>
    )
}

export default TextArea

const styles = StyleSheet.create({
   
})
