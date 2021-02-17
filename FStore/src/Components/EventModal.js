import React,{useState,useEffect,useContext}  from 'react'
import { Modal, StyleSheet, Text, View ,Pressable, SafeAreaView,Image,FlatList} from 'react-native'
import { Context } from '../context/FStoreContext'
import Checkbox from './Checkbox';

const EventModal = ({isVisible,setISVisible}) => {
const {signIn,state,Getuser} =useContext(Context);
const [list,setList]=useState([])
console.log('List ::--', list)
useEffect(() => {
    let data = [];
    Getuser()
    state.user.map(e=>{
        console.log(e.Email)
        data.push(e.Email)
        // let listItem = e.Email;
        console.log('Data ::-', data);
        setList(data)
     })
  }, [])
  
    return (
        <View style={styles.centeredView}>
        <Modal animationType="slide"
        transparent={true}
        visible={isVisible}
        supportedOrientations={['portrait', 'landscape']}
        >
             <View style={styles.centered}>
                <View style={styles.modalView}>
                       <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
                        <Text style={{fontSize:24}}>Quest</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => setISVisible(!isVisible)}
                            >
                        <Image style={{height:25,width:25}} source={require('../Image/cancel.png')}/>
                        </Pressable>
                       </View>

                       <FlatList 
                          data={list}
                          keyExtractor={(index)=>index.toString()}
                          renderItem={({item})=>{
                              console.log(item)
                              return(
                                <View style={{flexDirection:'row',alignItems:'center',marginVertical:10}}>
                                  <Checkbox />
                                  <Text style={{fontSize:18}}>
                                      {item}
                                  </Text>
                                 
                                </View>
                              )
                          }}
                       />
                       
                </View>
            </View>
        </Modal>
        </View>
    )
}
export default EventModal

const styles = StyleSheet.create({
    centeredView: {
        flex:1,
        justifyContent: "center",
      },
      centered:{
        flex:1,
        justifyContent: "center",
        marginHorizontal:20
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      
})
