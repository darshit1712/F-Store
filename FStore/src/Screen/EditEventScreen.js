import React,{useState,useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View ,Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Btn from '../Components/Btn';
import CustomHeader from '../Components/CustomHeader';
import TextArea from '../Components/TextArea';
import TextInput from '../Components/TextInput';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditEventScreen = ({navigation}) => {
  const [addimage,setAddimage]=useState(true);
  const [title,setTitle]=useState('a')
  const [descripation,setDescripation]=useState('a')
  const [place,setPlace]=useState('a')
  const [date,setDate]=useState('')
  const [quest,setQuest]=useState('a')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

 
  const handleConfirm = (date) => {
    setDob(moment(date).format('DD-MM-YYYY'))
    hideDatePicker();
  };

 const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const onaddImage=()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image.path);
      setImage(image.path)
      setAddimage(false)
    });
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
        {addimage===false? <Image style={{height:150,width:300}} source={{uri:image}}/> : null}
            <TouchableOpacity onPress={()=>onaddImage()}>
                <Text style={{color:'#16a085',fontSize:18,fontWeight:'bold' ,marginVertical:5}}>Add Image</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:3,marginHorizontal:20}}>
            <TextInput label='Title' placeholder='Title' value={title} onChangeText={(title)=>setTitle(title)}/>
            <TextArea label='Descripation' placeholder='Descripation' multiline={true} numberOfLines={5} value={descripation} onChangeText={(descripation)=>setDescripation(descripation)}/>
            <TextInput label='Place' placeholder='Place' value={place} onChangeText={(place)=>setPlace(place)}/>
            <Text style={{marginHorizontal:10,fontSize:16,color:'#4d4d4d'}}>Date</Text>
            <TouchableOpacity style={{marginBottom:20,marginVertical:10,borderBottomWidth:0.4,marginHorizontal:10}} onPress={showDatePicker}>
            {date.length==0? 
            <Text style={{marginBottom:10,fontSize:16,color:'rgb(120, 120, 120)'}}>DD-MM-YYYY</Text>:
            <Text style={{marginBottom:10,fontSize:16,color:'#000'}}> {date}</Text>
            }
           </TouchableOpacity>
            <TextInput label='Quest' placeholder='Quest' value={quest} onChangeText={(quest)=>setQuest(quest)}/>
            <Btn title='Add'/>
        </View>
      </ScrollView>
      <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

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
