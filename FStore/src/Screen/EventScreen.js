import React, {useState, useEffect, useContext} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../Components/CustomHeader';
import TextArea from '../Components/TextArea';
import Input from '../Components/Input';
import {Context} from '../context/FStoreContext';
import images from '../utility/ImageConst';

const EventScreen = ({route, navigation}) => {
  const {state} = useContext(Context);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('saa');
  const [date, setDate] = useState('');
  const [guest, setGuest] = useState([]);

  useEffect(() => {
    if (state.event == undefined) {
      setImage();
      setTitle('');
      setDate('');
      setDescription('');
      setGuest('');
      setPlace('');
    } else {
      setImage(state.event.imageUrl);
      setTitle(state.event.title);
      setDate(state.event.date);
      setDescription(state.event.description);
      setGuest(state.event.guest);
      setPlace(state.event.place);
    }
  }, [state.event]);

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
          <Image style={styles.image} source={{uri: image}} />
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
          <Input
            label="Place"
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
          <Text style={styles.content_guest_text}>Guest</Text>
          <View style={{marginBottom: 20, borderBottomWidth: 0.5}}>
            {guest.length == 0 ? (
              <Text
                style={[
                  styles.content_guest_intext,
                  {color: 'rgb(120, 120, 120)'},
                ]}>
                Guest
              </Text>
            ) : (
              <Text style={styles.content_guest_intext}>{guest}</Text>
            )}
            <Text style={styles.content_guest_intext}>{guest}</Text>
          </View>
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
  image: {
    width: 300,
    height: 150,
  },
  content: {
    flex: 2,
    marginHorizontal: 20,
  },
  content_guest_text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '300',
    color: '#4d4d4d',
  },
  content_guest_intext: {
    marginHorizontal: 8,
    flex: 1,
    fontSize: 20,
    fontWeight: '400',
    // marginBottom: 10,
  },
});
