import React,{useState} from 'react'
import { StyleSheet, Text, View ,SafeAreaView,Image,TouchableOpacity} from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import TextInput from '../Components/TextInput'
import Btn from '../Components/Btn'
import { ScrollView } from 'react-native-gesture-handler'
import Checkbox from '../Components/Checkbox';

const ProfileScreen = ({navigation}) => {
  const [fname,setFName]=useState('');
  const [lname,setLName]=useState('');
  const [email,setEmail]=useState('');
  const [dob,setDob]=useState('');
  const[male,setMale]=useState(false);
  const[female,setFemale]=useState(false);
  const[other,setOther]=useState(false);
  const [image,setImage]=useState('http://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png')

    return (
        
        <SafeAreaView style={styles.contioner}>
            <CustomHeader title='Profile'  lefticons={require('../Image/menu.png')}  righticons={require('../Image/edit.png')} navigation={()=>navigation.openDrawer()} navigate={()=>{navigation.navigate('EditeProfile')}}/>
           <ScrollView>
            <View style={{flex: 1,alignItems:'center',justifyContent:'center',}}>
            <View>
                <Image
                style={{height:150,width:150,borderRadius:200}}
                source={{uri:image}}
              />
            </View>
            </View>
            <View style={{flex: 3,marginHorizontal:20,marginVertical:20}}>
              <TextInput label='First Name' placeholder="First Name" value={fname} onChangeText={(fname)=>setFName(fname)}/>
              <TextInput label='Last Name' placeholder="First Name" value={lname} onChangeText={(lname)=>setLName(lname)}/>
              <TextInput label='Email' placeholder="First Name" value={email} onChangeText={(email)=>setEmail(email)} />
              <TextInput label='Date of birthday' placeholder="DD-MM-YYYY" value={dob} onChangeText={(dob)=>setDob(dob)}/>
              <Text style={{marginHorizontal:10,marginBottom:10,color:'rgb(120, 120, 120)',fontSize:18}}>Gender</Text>
               <View style={{flexDirection:'row',marginHorizontal:10,marginBottom:10}}>
                <Checkbox label='Male'  checked={male}/>
                <Checkbox label='FeMale' checked={female}/>
                <Checkbox label='Other' checked={other}/>
               </View>
            </View>
           </ScrollView>
                
        </SafeAreaView>
    )
}

export default ProfileScreen

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
})
