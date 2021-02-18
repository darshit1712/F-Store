import React from 'react';
import {View,Image,StyleSheet,Text,TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Input =({placeholder, label,value, onChangeText, secureTextEntry,editable,icon,onPress}) =>{
  return (
    <View>    
        <Text style={styles.label}>{label}</Text>
        <View style={styles.container}>
          <TextInput 
            style={styles.textinput}
            placeholder={placeholder} 
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize='none'
            editable={editable}
          />
          <TouchableOpacity onPress={onPress}>
            <Image source={icon} style={{height:25,width:25,marginRight:10}}/> 
          </TouchableOpacity>
        </View>
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
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