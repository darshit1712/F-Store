import React, {useState,useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native';
import Card from '../Components/Card';
import CustomHeader from '../Components/CustomHeader';
import Search from '../Components/Search';
import storage,{firebase} from '@react-native-firebase/storage';
import { Context } from '../context/FStoreContext'
import images from '../utility/ImageConst';

const HomeScreen = ({navigation}) => {
  const {state} =React.useContext(Context);

  const [like, setLike] = useState(false);
  const [serach, setSerach] = useState('');
  const [lists, setLists] = useState([])
  const [isLoading,setIsloading]=useState(false)
  

  useEffect(() => {
    firebase
    .firestore()
    .collection("UserEvent")
    .orderBy('date','asc')
    .onSnapshot(snapshot => {
      const lists = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setLists(lists)
    })
  }, [])
  const onlike = () => {
    if(like===true){
      setLike(!like)
    }else if(like===false){
      setLike(!like)
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Home"
        navigation={() => {
          navigation.openDrawer();
        }}
        lefticons={images.menu}
      />
     
      <Search  
          placeholder='Serach'
          value={serach}
          onChangeText={event =>{setSerach(event)}}/>
      <FlatList 
        data={lists.filter((e)=>{
                        if(serach==""){
                            return e;
                           }else if( e.date.toString().includes(serach.toString()) ||
                           e.Title.toLowerCase().includes(serach.toLowerCase()) ||
                           e.Description.toLowerCase().includes(serach.toLowerCase()) ||
                           e.Place.toLowerCase().includes(serach.toLowerCase())   
                           ){
                               return e;
                       }})
        }
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>{
          return(
            <TouchableOpacity onPress={()=>alert(item.like)}>
              <Card
              like={like}
              image={item.image}
              title={item.Title}
              description={item.Description}
              onPress={()=>onlike(like)}
              date={item.date}
              place={item.Place}
            />
            </TouchableOpacity>
            )}}
      />
    
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
