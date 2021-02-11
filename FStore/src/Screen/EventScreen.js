import React,{useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../Components/CustomHeader';
import TextArea from '../Components/TextArea';
import TextInput from '../Components/TextInput';

const EventScreen = ({navigation}) => {
  const [image,setImage]=useState('file:///Users/mac/Library/Developer/CoreSimulator/Devices/FCD42C24-8F05-4BE4-A2EB-74C0FF4F7C73/data/Media/DCIM/100APPLE/IMG_0002.JPG')
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
                source={{uri:image}}
                />
            </View>
            <View style={{flex: 2,marginHorizontal:20}}>
                <TextInput label="Title" placeholder='Title'/>
                <TextArea label='Descripation' placeholder='Descripation' multiline={true} numberOfLines={5}/>
                <TextInput label="Place" placeholder='Place'/>
                <TextInput label="Date" placeholder='Date'/>
                <TextInput label="Quest" placeholder='Quest'/>
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
