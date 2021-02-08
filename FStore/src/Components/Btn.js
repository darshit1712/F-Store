import React from 'react';
import {StyleSheet, Text, View,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Btn = ({title,onPress,type}) => {
  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={onPress}>
        <Text style={{fontSize:18,color:'#fff',padding:5}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Btn;

const styles = StyleSheet.create({
  header:{
    alignItems:'center',
    borderWidth:1,
    borderColor:'grey',
    backgroundColor:'#1abc9c',
    shadowRadius:30,
    borderRadius: 30,
  }
});
