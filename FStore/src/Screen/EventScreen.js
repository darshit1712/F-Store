import React, {useState, useEffect, useContext} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../Components/CustomHeader';
import TextArea from '../Components/TextArea';
import TextInput from '../Components/TextInput';
import {Context} from '../context/FStoreContext';
import storage, {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Btn from '../Components/Btn';

const EventScreen = ({navigation}) => {
  const {state} = useContext(Context);
  const [image,setImage]=useState(null)
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [place,setPlace]=useState('')
  const [date,setDate]=useState('')
  const [quest,setQuest]=useState('')

  console.log(state.event)
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
    <SafeAreaView style={styles.contioner}>
      <CustomHeader
        title="Event"
        navigate={() => navigation.navigate('EditEvent')}
        navigation={() => {
          navigation.openDrawer();
        }}
        lefticons={require('../Image/menu.png')}
        righticons={require('../Image/add-event.png')}
      />
      <ScrollView>
        <View style={styles.headerImage}>
          <Image
            style={{width: 300, height: 150}}
            source={{uri: image}}
          />
        </View>
        <View style={{flex: 2, marginHorizontal: 20}}>
          <TextInput
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
          <TextInput label="Place" 
            placeholder="Place" 
            value={place} 
            editable={false}

          />
          <TextInput 
            label="Date" 
            placeholder="Date"  
            value={date}
            editable={false}
             />
          <TextInput 
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
  contioner: {
    flex: 1,
  },
  headerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15%',
  },
});
