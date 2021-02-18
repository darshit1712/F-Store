import React, {useState,useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View,FlatList,ActivityIndicator} from 'react-native';
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
    .onSnapshot(snapshot => {
      const lists = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setLists(lists)
    })
  }, [])
  

  const onlike = (e) => {
    if(e){
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
        data={lists
        // .filter((item)=>{
        //                 if(serach==""){
        //                     return item;
        //                    }else if( item.date.toString().includes(serach.toString()) ||
        //                    item.description.includes(serach) ||
        //                    item.title.includes(serach) ||
        //                    item.place.includes(serach) ){
        //                        return item;
        //                }})
        }
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>{
          return(
            <Card
            like={like}
            image={item.image}
            title={item.Title}
            description={item.Description}
            onPress={(e)=>onlike(e)}
            date={item.date}
            place={item.Place}
        />)}}
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
