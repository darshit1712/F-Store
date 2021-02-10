import React,{useState} from 'react'
import { SafeAreaView, StyleSheet, Text, View,FlatList} from 'react-native'
import {  ScrollView } from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Card from '../Components/Card'
import CustomHeader from '../Components/CustomHeader'
import Search from '../Components/Search'

const FavoriteScreen = ({route,navigation}) => {
//    const  {data}= route.params.data;
//     console.log(data);
    const [like, setLike] = useState(false);
    const [serach, setSerach] = useState('');
    const [passengersList, setPassengersList] = useState([]);

    const onlike = () => {
       setLike(like == false ? true : false);

    };
    const datas=[
        {
          image:require('../Image/event.jpeg'),
          title:'ck1',
          descripation:'it is a  good',
          date:'1-02-2021',
          place:'surt',
          quest:'student',
          like:false
        },
        {
          image:require('../Image/event2.jpeg'),
          title:'ck2',
          descripation:'it is a  very good',
          date:'15-04-2021',
          place:'surat',
          quest:'te',
          like:true
        },
       
    ];
    return (
        <SafeAreaView style={styles.contioner}>
        <CustomHeader title='Favorit' lefticons={require('../Image/menu.png')} navigation={()=>{navigation.openDrawer()}} />
        <Search  
          placeholder='Serach'
          value={serach}
          onChangeText={event =>{setSerach(event)}}/>
        <FlatList 
        data={datas.filter((item)=>{
                        if(serach==""){
                            return item;
                           }else if( item.date.toString().includes(serach.toString()) ||
                           item.descripation.toLowerCase().includes(serach.toLowerCase()) ||
                           item.title.toLowerCase().includes(serach.toLowerCase()) ||
                           item.place.toLowerCase().includes(serach.toLowerCase()) ){
                               return item;
                       }})
        }
        keyExtractor={item=>item.title}
        renderItem={({item})=>{
          return(
            <Card
            like={like}
            image={item.image}
            title={item.title}
            descripation={item.descripation}
            onPress={onlike}
            date={item.date}
            place={item.place}
        />)}}
      />
        </SafeAreaView>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({
    contioner:{
        flex: 1,
    }
})
