 import React,{useState} from 'react'
 import { Button, SafeAreaView, StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import CheckBox from 'react-native-check-box'
import { ScrollView } from 'react-native-gesture-handler'
import Btn from '../Components/Btn'

 import TextInput from '../Components/TextInput'

 const SignUpScreen = ({navigation}) => {
     const [fname,setFName]=useState('');
     const [lname,setLName]=useState('');
     const [email,setEmail]=useState('');
     const [gender,setGender]=useState('');
     const [dob,setDob]=useState('');
     const [password,setPassword]=useState('');
     const [comfirmpassword,setComfirmpassword]=useState('');
     const [error,setEroor]=useState(true);
     const [emaileroor,setEmailError]=useState(true);
    

      const onSignUpPress = () =>{navigation.navigate('SignIn')}
      const onsubmit=()=>{
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email validation
       
        if(fname == ''){
            alert('Enter the First_Name')
        }else if (reg.test(email) !== emaileroor){
            alert('Enter the Valid Email')
        }else if(dob==''){
            alert('Enter the Date of birthday')
        }else if(gender==''){
            alert('Enter the Gender')
        }else if(password==''){
            alert("Enter the password")
        }else if(password!==comfirmpassword){
            alert('Passwords must be same')
        }

     }

     return (
         <SafeAreaView style={styles.continer}>
         <ScrollView >
            <View style={styles.header}>
                <Text style={{fontSize:24,}}>Sign Up</Text>
            </View>
            <View style={styles.content}>
               <TextInput placeholder='First_Name*' value={fname} onChangeText={(fname)=>setFName(fname)}/>
               <TextInput placeholder='Last_Name' value={lname} onChangeText={(lname)=>setLName(lname)}/>
               <TextInput placeholder='Email*' value={email} onChangeText={(email)=>setEmail(email)}/>
               <TextInput placeholder='Date of birthday(DD-MM-YYYY)*' value={dob} onChangeText={(dob)=>setDob(dob)}/>
               <TextInput placeholder='Gender*' value={gender} onChangeText={(gender)=>setGender(gender)}/>
               <TextInput placeholder='Password*' value={password} onChangeText={(password)=>setPassword(password)}/>
               <TextInput placeholder='Confirm Password*' value={comfirmpassword} onChangeText={(comfirmpassword)=>setComfirmpassword(comfirmpassword)}/>
               <Btn 
                type='outline' 
                title='Sign UP' 
                onPress={()=>{
                    onsubmit()
                    }} />
            </View>
            <View style={styles.footer}>
                <Text style={{color:'#000'}}>
                    Already have an Account?
                </Text>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginVertical:5 }} onPress={()=>navigation.navigate('SignIn')} >
                 <Image source={require('../Image/back.png')} style={{width:18,height:18,marginHorizontal:2}} />
                 <Text style={{color:'#000',fontWeight:"bold",fontSize:18}}>Sign In</Text>
                </TouchableOpacity>
            </View> 

         </ScrollView>
         </SafeAreaView>
     )
 }
 
 export default SignUpScreen
 
 const styles = StyleSheet.create({
     continer:{
         flex: 1,
         backgroundColor:'#fff'
     },
     header:{
         alignItems:'center',
         marginBottom:'5%'
     },
     content:{
         flex: 1,
         marginHorizontal:20,
         marginBottom:'5%'
     },
     footer:{
        color:"#1abc9c",
        fontSize:18,
        marginHorizontal:20,
        alignItems:'center'
    },
    error:{
        fontSize:18,
        color:'red'
    }
 })
 