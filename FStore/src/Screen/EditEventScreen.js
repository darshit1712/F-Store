import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Btn from '../Components/Btn';
import CustomHeader from '../Components/CustomHeader';
import TextArea from '../Components/TextArea';
import TextInput from '../Components/TextInput';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MultiSelect from 'react-native-multiple-select';

import storage, {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {Context} from '../context/FStoreContext';
import {useAsyncStorage} from '@react-native-community/async-storage';
import EventModal from '../Components/EventModal';

const EditEventScreen = ({navigation}) => {
  const {addstore, state, Eventdetils,Getuser} = useContext(Context);

  const [isLoading, setIsloading] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [quest, setQuest] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isVisible, setISVisible] = useState(false);
const [list,setList]=useState([])

  const handleConfirm = (date) => {
    setDate(moment(date).format('DD-MM-YYYY'));
    hideDatePicker();
  };

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
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onaddImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImage(image.sourceURL);
    });
  };

  const onsubmit = async () => {
    if (image === null) {
      alert('place add to image');
    } else if (title == '') {
      alert('Add to Title');
    } else if (description == '') {
      alert('Add to descripation');
    } else if (place == '') {
      alert('Add to place');
    } else if (date == '') {
      alert('Add to Data');
    } else {
      const imageUrl = await uploadImage();
      Eventdetils(title, description, place, quest, date, imageUrl);
      // addstore(title,descripation,place,quest,date,image)
    }
  };
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = firebase.storage().ref(`event/${filename}`);
    const task = storageRef.putFile(uploadUri);
    try {
      setIsloading(true);
      await task;
      const url = await storageRef.getDownloadURL();
      setIsloading(false);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.contioner}>
      <CustomHeader
        title="EditeEvent"
        navigation={() => {
          navigation.goBack();
        }}
        lefticons={require('../Image/back.png')}
        leftname="Back"
      />
      <KeyboardAwareScrollView>
        <View style={styles.headerImage}>
          {image !== null ? (
            <Image style={{height: 150, width: 300}} source={{uri: image}} />
          ) : null}
          <TouchableOpacity onPress={() => onaddImage()}>
            <Text
              style={{
                color: '#16a085',
                fontSize: 18,
                fontWeight: 'bold',
                marginVertical: 5,
              }}>
              Add Image
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, marginHorizontal: 20}}>
          <TextInput
            label="Title"
            placeholder="Title"
            value={title}
            onChangeText={(title) => setTitle(title)}
          />
          <TextArea
            label="Description"
            placeholder="Description"
            multiline={true}
            numberOfLines={5}
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
          <TextInput
            label="Place"
            placeholder="Place"
            value={place}
            onChangeText={(place) => setPlace(place)}
          />
          <Text style={{marginHorizontal: 10, fontSize: 16, color: '#4d4d4d'}}>
            Date
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
              marginVertical: 10,
              borderBottomWidth: 0.4,
              marginHorizontal: 10,
            }}
            onPress={showDatePicker}>
            {date.length == 0 ? (
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 16,
                  color: 'rgb(120, 120, 120)',
                }}>
                DD-MM-YYYY
              </Text>
            ) : (
              <Text style={{marginBottom: 10, fontSize: 16, color: '#000'}}>
                {' '}
                {date}
              </Text>
            )}
            <Image
              style={{width: 25, height: 25, marginRight: 25, marginBottom: 10}}
              source={require('../Image/calendar.png')}
            />
          </TouchableOpacity>
          <Text style={{marginHorizontal: 10, fontSize: 16, color: '#4d4d4d'}}>
            Quest
          </Text>
          <TouchableOpacity
            style={{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:"space-between",
              marginBottom: 20,
              marginVertical: 10,
              borderBottomWidth: 0.4,
              marginHorizontal: 10,
            }}
            onPress={() => setISVisible(true)}>
            {date.length == 0 ? (
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 16,
                  color: 'rgb(120, 120, 120)',
                }}>
                Quest
              </Text>
            ) : (
              <Text style={{marginBottom: 10, fontSize: 16, color: '#000'}}>
                {quest}
              </Text>
            )}
            <Image
              style={{width: 25, height: 25, marginRight: 25, marginBottom: 10}}
              source={require('../Image/quest.png')}
            />
          </TouchableOpacity>
          <Btn title="Add" onPress={onsubmit} />
          {isLoading && (
            <ActivityIndicator size="large" style={styles.loadingIndicator} />
          )}
        </View>
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <EventModal isVisible={isVisible} setISVisible={setISVisible} />
    </SafeAreaView>
  );
};

export default EditEventScreen;

const styles = StyleSheet.create({
  contioner: {
    flex: 1,
  },
  headerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
});
