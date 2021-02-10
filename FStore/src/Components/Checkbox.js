import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CheckBox from 'react-native-checkbox';

const Checkbox = ({label,onChange,checked}) => {
    return (
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <CheckBox
            label={null}
            checked={checked}
            onChange={onChange}
            />
            <Text style={{marginHorizontal:10,fontSize:18,color:'rgb(120, 120, 120)'}}>{label}</Text>
        </View>
    )
}

export default Checkbox

const styles = StyleSheet.create({})
