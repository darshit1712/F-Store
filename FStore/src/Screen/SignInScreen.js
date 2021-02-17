import React,{useState,useEffect,useContext} from 'react'
import { SafeAreaView, StyleSheet, Text, View,Image,Alert,ActivityIndicator} from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler';
import Btn from '../Components/Btn';
import TextInput from '../Components/TextInput'
import storage,{firebase} from '@react-native-firebase/storage';
import { Context } from '../context/FStoreContext'

const SignInScreen = ({navigation}) => {
const {signIn,state,Getuser} =useContext(Context);
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [show,setShow]=useState(true);
const [isLoading,setIsloading]=useState(false)
useEffect(() => {
    Getuser()
  }, [])
  

const onSumbmitNavigation=(email,password)=>{
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email==''){
        alert('Enter the email')
    }else if(password==''){
        alert('password is not correct')
    }else if (reg.test(email) !== true){
        alert('Enter the valid Email')
    }else {
       state.user.map(e=>{
           if(e.Email===email){
               signIn(email,password)
            }
        })
    }
}
    return (
        <SafeAreaView style={styles.contioner}>
            <View style={styles.logoStyle}>
            <Image  style={{width:150,height:150,resizeMode:'contain'}} source={require('../Image/logo.jpeg')}/>
            </View>
            <View style={styles.content}>
                <TextInput 
                  label='Email'
                  placeholder='user@gmail.com'
                  value={email}
                  onChangeText={(email)=>setEmail(email)}
                  />
                  <TextInput 
                  label='Password'
                  placeholder='Enter Password'
                  value={password}
                  onChangeText={(password)=>setPassword(password)}
                  secureTextEntry={show}
                  />                  
                  <Btn title='Sign In' 
                    type='outline' 
                    onPress={()=>{
                        onSumbmitNavigation(email,password);
                  }}/>
            </View>
             {isLoading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
            <View style={styles.footer}>
                <Text style={{color:'#000'}}>
                    Don't have a Account??
                </Text>
                <TouchableOpacity 
                   style={{flexDirection:'row',alignItems:'center',marginVertical:5 }} 
                   onPress={()=>navigation.navigate('SignUp')} >
                 <Text style={{color:'#000',fontWeight:"bold",fontSize:18}}>Sign Up</Text>
                 <Image source={require('../Image/is-greater-than.png')} style={{width:18,height:18,marginHorizontal:2}} />
                </TouchableOpacity>
            </View>     
        </SafeAreaView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
contioner:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'#fff'
},
logoStyle:{
    alignItems:'center',
    marginBottom:'6%'
},
content:{
    marginHorizontal:20,
    marginBottom:'5%'
},
errorText:{
fontSize:16,
color:"red",
marginBottom:5
},
footer:{
    color:"#1abc9c",
    fontSize:18,
    marginHorizontal:20,
    alignItems:'center'
}
})
