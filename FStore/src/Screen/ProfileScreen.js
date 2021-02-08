import React,{useState} from 'react'
import { StyleSheet, Text, View ,SafeAreaView,Image,TouchableOpacity} from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import TextInput from '../Components/TextInput'
import Btn from '../Components/Btn'
const ProfileScreen = ({navigation}) => {
  const [fname,setFName]=useState('');
  const [lname,setLName]=useState('');
  const [email,setEmail]=useState('');
  const [dob,setDob]=useState('');
  const [gender,setGender]=useState('');
  const [password,setPassword]=useState('');
    return (
        
        <SafeAreaView style={styles.contioner}>
            <CustomHeader title='Profile'  lefticons={require('../Image/menu.png')}  righticons={require('../Image/edit.png')} navigation={()=>navigation.openDrawer()} navigate={()=>{navigation.navigate('EditeProfile')}}/>
            <View style={{flex: 1,alignItems:'center',justifyContent:'center',}}>
      <View>
        <Image
        style={{height:150,width:150}}
        source={require('../Image/profile.png')}
       />
      </View>
      </View>
      <View style={{flex: 3,marginHorizontal:20,marginVertical:20}}>
      <TextInput label='First Name' placeholder="First Name" value={fname} onChangeText={(fname)=>setFName(fname)}/>
       <TextInput label='Last Name' placeholder="First Name" value={lname} onChangeText={(lname)=>setLName(lname)}/>
       <TextInput label='Email' placeholder="First Name" value={email} onChangeText={(email)=>setEmail(email)} />
       <TextInput label='Data of birthday' placeholder="DD-MM-YYYY" value={dob} onChangeText={(dob)=>setDob(dob)}/>
       <TextInput label='Gender' placeholder="male/female" value={gender} onChangeText={(gender)=>setGender(gender)}/>
       <TextInput label='Password' placeholder="Change Password" value={password} onChangeText={(password)=>setPassword(password)}/>
      
      </View>
           
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
