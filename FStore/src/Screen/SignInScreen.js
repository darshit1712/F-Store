import React,{useState,useEffect,useContext} from 'react'
import { SafeAreaView, StyleSheet, Text, View,Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Btn from '../Components/Btn';
import TextInput from '../Components/TextInput'
import storage,{firebase} from '@react-native-firebase/storage';
import { Context } from '../context/FStoreContext'

const SignInScreen = ({navigation}) => {
const {signIn,state} =useContext(Context);
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [show,setShow]=useState(true);
const [emaileroor,setEmailError]=useState(true);
const [lists, setLists] = useState([])

// lists.map(e=>{ 
//     console.log(e.Email)
// })

useEffect(() => {
    firebase
    .firestore()
    .collection("user")
    .onSnapshot(snapshot => {
      const lists = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setLists(lists)
    })
  }, [])
  

const onSumbmitNavigation=(email,password)=>{
    signIn(email,password);
}
const onSubmit =()=>{
    
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email validation
    //     if (reg.test(email) === emaileroor){
    //         setEmailError(true);
    //     }
    //     else{
    //         alert('Enter the Valid Email')
    //     }
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
                  {/* <Text style={styles.errorText}>Authentication is Fail</Text> */}
                  <Btn title='Sign In' 
                    type='outline' 
                    onPress={()=>{
                        onSumbmitNavigation(email,password);
                        //onSubmit();

                  }}/>
            </View>
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
