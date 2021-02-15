import React,{useState,useEffect,useContext} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../Components/CustomHeader';
import TextArea from '../Components/TextArea';
import TextInput from '../Components/TextInput';
import { Context } from '../context/FStoreContext'
import storage,{firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Btn from '../Components/Btn';


const EventScreen = ({route,navigation}) => {
  const {state} =useContext(Context);

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
        <ScrollView >
            <View style={styles.headerImage}>
          
                <Image
                style={{width: 300, height: 150}}
                source={{uri:state.image}}
                />
            </View>
            <View style={{flex: 2,marginHorizontal:20}}>
                <TextInput label="Title" placeholder='Title' value={state.title}/>
                <TextArea label='Descripation' placeholder='Descripation' multiline={true} numberOfLines={5} value={state.descripation}/>
                <TextInput label="Place" placeholder='Place' value={state.place}/>
                <TextInput label="Date" placeholder='Date' value={state.date}/>
                <TextInput label="Quest" placeholder='Quest' value={state.quest}/>
               
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
