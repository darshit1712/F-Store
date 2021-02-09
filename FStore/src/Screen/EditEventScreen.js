import React,{useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View ,Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Btn from '../Components/Btn';
import CustomHeader from '../Components/CustomHeader';
import TextArea from '../Components/TextArea';
import TextInput from '../Components/TextInput';

const EditEventScreen = ({navigation}) => {
  const [addimage,setImage]=useState(true);
  const onaddImage=()=>{
    setImage(addimage===false?true:false)
  }
  return (
    <SafeAreaView style={styles.contioner}>
      <CustomHeader
        title="EditeEvent"
        navigation={() => {
          navigation.goBack();
        }}
        lefticons={require('../Image/back.png')}
        leftname="Back"
      />
      <ScrollView>
        <View style={styles.headerImage}>
        {addimage===false? <Image style={{height:150,width:300}} source={require('../Image/event.jpeg')}/> :null}
            <TouchableOpacity onPress={()=>onaddImage()}>
                <Text style={{color:'#16a085',fontSize:18,fontWeight:'bold' ,marginVertical:5}}>Add Image</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:3,marginHorizontal:20}}>
            <TextInput label='Title' placeholder='Title'/>
            <TextArea label='Descripation' placeholder='Descripation' multiline={true} numberOfLines={5}/>
            <TextInput label='Place' placeholder='Place'/>
            <TextInput label='Date' placeholder='Date'/>
            <TextInput label='Quest' placeholder='Quest'/>
            <Btn title='Add'/>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default EditEventScreen;

const styles = StyleSheet.create({
    contioner:{
        flex:1
    },
    headerImage:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:'5%'
    }
});
