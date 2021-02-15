import React,{useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,} from 'react-native';
import {   TouchableOpacity } from 'react-native-gesture-handler';
import Btn from '../Components/Btn';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomHeader from '../Components/CustomHeader';
import TextInput from '../Components/TextInput';
import Checkbox from '../Components/Checkbox';
import moment from 'moment'
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const EditeProfileScreen = ({navigation}) => {
  const [fname,setFName]=useState('');
  const [lname,setLName]=useState('');
  const [email,setEmail]=useState('');
  const [dob,setDob]=useState('');
  const[gender,setGender]=useState('')
  const [password,setPassword]=useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image,setImage]=useState('http://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png')

 
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
  
  const onAddImage =()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setImage(image.path)
    });
  }

  return (
    <SafeAreaView style={styles.contioner}>
      <CustomHeader
        title="EditeProfile"
        navigation={() => {
          navigation.goBack();
        }}
        lefticons={require('../Image/back.png')}
        leftname="Back"
      />
      <KeyboardAwareScrollView>
      <View style={{flex: 1,alignItems:'center',justifyContent:'center',}}>
          <View>
            <Image
            style={{height:150,width:150,borderRadius:200}}
            source={{uri:image}}
          />
          </View>
          <TouchableOpacity  onPress={onAddImage}>
              <Text style={{color:'#1abc9c',marginTop:5}}>Edit profile</Text>
          </TouchableOpacity>
       </View>
        <View style={{flex: 3.5,marginHorizontal:20,marginVertical:20}}>
          <TextInput label='First Name' placeholder="First Name" value={fname} onChangeText={(fname)=>setFName(fname)}/>
          <TextInput label='Last Name' placeholder="First Name" value={lname} onChangeText={(lname)=>setLName(lname)}/>
          <TextInput label='Email' placeholder="First Name" value={email} onChangeText={(email)=>setEmail(email)} />
             <Text style={{marginHorizontal:10,fontSize:16,color:'#4d4d4d'}}>Date of Birthday</Text>
           <TouchableOpacity style={{marginBottom:10,marginVertical:10,borderBottomWidth:0.4,marginHorizontal:10}} onPress={showDatePicker}>
            {dob.length==0? 
            <Text style={{marginBottom:10,fontSize:16,color:'rgb(120, 120, 120)'}}>DD-MM-YYYY</Text>:
            <Text style={{marginBottom:10,fontSize:16,color:'#000'}}> {dob}</Text>
            }
           </TouchableOpacity>
           <Text style={{marginHorizontal:10,marginTop:10,marginBottom:10,color:'rgb(120, 120, 120)',fontSize:18}}>Gender</Text>
               <View style={{flexDirection:'row',marginHorizontal:10,marginBottom:20}}>
                <Checkbox label='Male' onChange={()=>setGender('male')} checked={gender=='male'}/>
                <Checkbox label='FeMale' onChange={()=>setGender('female')} checked={gender=='female'}/>
                <Checkbox label='Other' onChange={()=>setGender('other')} checked={gender=='other'}/>
               </View>
          <TextInput label='Password' placeholder="Change Password" value={password} onChangeText={(password)=>setPassword(password)}/>
          <Btn title="Save"/>
        </View>
      </KeyboardAwareScrollView>
        <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
    </SafeAreaView>
  );
};

export default EditeProfileScreen;

const styles = StyleSheet.create({
  contioner: {
    flex: 1,
  },
  fromText:{
      fontSize:18,
  },
  frominput:{
      flex: 1,
      fontSize:18,
      borderBottomWidth:1,
      borderColor:'grey',
  }
});
