import React,{useContext,useState,useEffect} from 'react'
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image,TouchableOpacity} from 'react-native'
import { Context } from '../context/FStoreContext'

const DrawerContext = (props) => {
    const {signout,state,gettoken,Getuser} =useContext(Context);
    const[fname,setFname]=useState('');
    const[image,setImage]=useState(null);

    useEffect(() => {
        gettoken();
        Getuser();
        if(state.updates==undefined){
          state.user.map((item)=>{
            if(item.Email===state.userData){
               setImage(item.Image)
               setFname(item.FirstName)
             }
         });
        }else{
          setImage(state.updates.imageUrl)
          setFname(state.updates.fname)
        }
       
      },[state.updates])
    return (
        <SafeAreaView style={{flex:1,justifyContent:'space-around'}}>
        <ScrollView>
          <View style={{flex:2,alignItems:'center',justifyContent:'center',marginVertical:25}}>
            <Image source={{uri:image}} 
             style={{width:150,height:150,borderRadius:200 }} 
             />
            <TouchableOpacity onPress={()=>props.navigation.navigate('EditeProfile')} >
              <Text style={{color:'#1abc9c',marginTop:5}}>Edit profile</Text>
             </TouchableOpacity>
          </View>
           <Text style={{fontSize:18}}>Welcome to {fname}</Text>
          <View style={{flex:4,marginLeft:'3%'}}>
            <TouchableOpacity  style={{marginBottom:'5%',flexDirection:'row',alignItems:'center'}} onPress={()=>props.navigation.navigate('Home')}>
                <Image style={{height:25,width:25}} source={require('../Image/home.png')}/>
                <Text style={{fontSize:24,margin:5}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:'5%',flexDirection:'row',alignItems:'center'}} onPress={()=>props.navigation.navigate('Favorit')}>
               <Image style={{height:25,width:25}} source={require('../Image/heart.png')}/>
                <Text  style={{fontSize:24,margin:10}}>Favorite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:'5%',flexDirection:'row',alignItems:'center'}} onPress={()=>props.navigation.navigate('Event')}>
               <Image style={{height:25,width:25}} source={require('../Image/event.png')}/>
                <Text  style={{fontSize:24,margin:10}}>Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:'5%',flexDirection:'row',alignItems:'center'}} onPress={()=>props.navigation.navigate('Editevent')}>
              <Image style={{height:25,width:25}} source={require('../Image/edit.png')}/>
                <Text  style={{fontSize:24,margin:10}}>EditeEvent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:'5%',flexDirection:'row',alignItems:'center'}} onPress={()=>props.navigation.navigate('Profile')}>
            <Image style={{height:25,width:25}} source={require('../Image/heart.png')}/>
                <Text  style={{fontSize:24,margin:10}}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1,alignSelf:'center',justifyContent:'flex-end',alignItems:'center'}}>
           <TouchableOpacity onPress={()=>signout()}>
             <Text style={{backgroundColor:'#16a085',paddingHorizontal:50,paddingVertical:10,color:'#fff',fontWeight:'bold'}}>
               LogOut
             </Text>
           </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default DrawerContext

const styles = StyleSheet.create({})
