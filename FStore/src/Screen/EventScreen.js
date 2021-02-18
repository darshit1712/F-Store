import React, {useState, useEffect, useContext} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../Components/CustomHeader';
import TextArea from '../Components/TextArea';
import Input from '../Components/Input';
import {Context} from '../context/FStoreContext';
import images from '../utility/ImageConst';

const EventScreen = ({navigation}) => {
  const {state} = useContext(Context);
  const [image,setImage]=useState(null)
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [place,setPlace]=useState('')
  const [date,setDate]=useState('')
  const [quest,setQuest]=useState('')

  useEffect(() => {
  if(state.event===undefined){
      setImage()
      setTitle('')
      setDate('')
      setDescription('')
      setQuest('')
      setPlace('')
  }else{
      setImage(state.event.imageUrl)
      setTitle(state.event.title)
      setDate(state.event.date)
      setDescription(state.event.description)
      setQuest(state.event.quest)
      setPlace(state.event.place)
  }
  }, [])

  return (
    <SafeAreaView style={styles.conatiner}>
      <CustomHeader
        title="Event"
        navigate={() => navigation.navigate('EditEvent')}
        navigation={() => {
          navigation.openDrawer();
        }}
        lefticons={images.menu}
        righticons={images.add_event}
      />
      <ScrollView>
        <View style={styles.headerImage}>
          <Image
            style={styles.image}
            source={{uri: image}}
          />
        </View>
        <View style={styles.content}>
          <Input
            label="Title"
            placeholder="Title"
            value={title}
            editable={false}
          />
          <TextArea
            label="Description"
            placeholder="Description"
            multiline={true}
            numberOfLines={5}
            value={description}
            editable={false}
          />
          <Input label="Place" 
            placeholder="Place" 
            value={place} 
            editable={false}

          />
          <Input 
            label="Date" 
            placeholder="Date"  
            value={date}
            editable={false}
             />
          <Input 
            label="Quest" 
            placeholder="Quest" 
            value={quest}
            editable={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15%',
  },
  image:{
    width: 300, height: 150
  },
  content:{
    flex: 2, marginHorizontal: 20
  },
});
