import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View,FlatList} from 'react-native';
import Card from '../Components/Card';
import CustomHeader from '../Components/CustomHeader';
import Search from '../Components/Search';

const HomeScreen = ({navigation}) => {
  const [like, setLike] = useState(true);
  const [serach, setSerach] = useState('');
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
    {
      image:require('../Image/event3.jpeg'),
      title:'ck3',
      descripation:'it is a  nice',
      date:'20-08-2021',
      place:'surat',
      quest:'dome',
      like:true
    },
    {
      image:require('../Image/event4.jpeg'),
      title:'ck4',
      descripation:'it is also find it',
      date:'30-03-2021',
      place:'junagath',
      quest:'collage',
      like:true
    },
];

  const onlike = (e) => {
    const checked=e.like

    console.log(checked);
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Home"
        navigation={() => {
          navigation.openDrawer();
        }}
        lefticons={require('../Image/menu.png')}
      />
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
            like={item.like}
            image={item.image}
            title={item.title}
            descripation={item.descripation}
            onPress={onlike(item)}
            date={item.date}
            place={item.place}
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
