import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const CustomHeader = ({title, navigation,navigate ,lefticons,leftname,righticons}) => {
  return (
    <View style={{flexDirection: 'row', height: 50}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity onPress={navigation} style={{flexDirection:'row',alignItems:'center'}}>
          <Image
            style={{height: 25, width: 25, marginLeft: 5}}
            source={lefticons}
            resizeMode="contain"
          />
          <Text style={{fontSize:18}}>{leftname}</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 2, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center',fontWeight:'bold'}}>{title}</Text>
      </View>
      <View style={{flex: 1,justifyContent:'center'}}>
      <TouchableOpacity style={{alignSelf:'flex-end',}} onPress={navigate} >
        <Image  
          style={{height: 25, width: 25,marginRight:10}}  
          source={righticons}/>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomHeader;

<TouchableOpacity onPress={() => navigation.openDrawer()}>
  <Image
    style={{height: 30, width: 30, marginLeft: 5}}
    source={require('../Image/menu.png')}
    resizeMode="contain"
  />
</TouchableOpacity>;
