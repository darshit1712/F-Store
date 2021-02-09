import React,{useState} from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Btn from '../Components/Btn'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import TextInput from '../Components/TextInput'
import Checkbox from '../Components/Checkbox';

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
     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
     const[male,setMale]=useState(false);
     const[female,setFemale]=useState(false);
     const[other,setOther]=useState(false);
    
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
      const onMale=()=>{
        setMale(male==false ? true:false )
        setFemale(false)
        setOther(false)
      }
      const onfemale=()=>{
        setFemale(female==false ? true:false)
        setOther(false);
        setMale(false)
      }
      const onother =()=>{
          setOther(other==false?true:false)
          setFemale(false);
          setMale(false)
      }

      const onSignUpPress = () =>{navigation.navigate('SignIn')}


      const onsubmit=()=>{
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email validation
       
        if(fname == ''){
            alert('Enter the First_Name')
        }else if (lname == ''){
            alert('Enter the Last_Name')
        }else if (email== ''){
            alert('Enter the Email')
        }else if (reg.test(email) !== emaileroor){
            alert('Enter the valid Email')
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
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'center'}}>
                  <Image style={{width:60,height:60,marginLeft:10}} source={require('../Image/camera.png')}/>
                </TouchableOpacity>
               <TextInput placeholder='First_Name*' value={fname} onChangeText={(fname)=>setFName(fname)}/>
               <TextInput placeholder='Last_Name' value={lname} onChangeText={(lname)=>setLName(lname)}/>
               <TextInput placeholder='Email*' value={email} onChangeText={(email)=>setEmail(email)}/>
               <TouchableOpacity onPress={showDatePicker} style={{marginHorizontal:10,borderBottomWidth:0.5,marginBottom:20}}>
                   {dob.length == 0? 
                   <Text style={{marginBottom:10,color:'rgb(120, 120, 120)',fontSize:18}}>Date of Birthday</Text>: 
                   <Text style={{marginBottom:10,color:'#000',fontSize:16}}>{dob}</Text>
                   }
               </TouchableOpacity>
               <Text style={{marginHorizontal:10,marginBottom:10,color:'rgb(120, 120, 120)',fontSize:18}}>Gender</Text>
               <View style={{flexDirection:'row',marginHorizontal:10,marginBottom:10}}>
                <Checkbox label='Male' onChange={onMale} checked={male}/>
                <Checkbox label='FeMale' onChange={onfemale} checked={female}/>
                <Checkbox label='Other' onChange={onother} checked={other}/>
               </View>
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
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

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
 