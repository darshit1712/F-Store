import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import Btn from '../Components/Btn';
import CustomHeader from '../Components/CustomHeader';
import TextArea from '../Components/TextArea';
import Input from '../Components/Input';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import storage, {firebase} from '@react-native-firebase/storage';
import {Context} from '../context/FStoreContext';
import EventModal from '../Components/EventModal';
import images from '../utility/ImageConst';

const EditEventScreen = ({navigation}) => {
  const {addstore, state, Eventdetils, Getuser} = useContext(Context);
  const [isLoading, setIsloading] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [quest, setQuest] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isVisible, setISVisible] = useState(false);
  const [list, setList] = useState([]);

  const handleConfirm = (date) => {
    setDate(moment(date).format('DD-MM-YYYY'));
    hideDatePicker();
  };

  useEffect(() => {
    let data = [];
    Getuser();
    state.user.map((e) => {
      console.log(e.Email);
      data.push(e.Email);
      // let listItem = e.Email;
      //console.log('Data ::-', data);
      setList(data);
    });
  }, []);
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
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="EditeEvent"
        navigation={() => {
          navigation.goBack();
        }}
        lefticons={images.back}
        leftname="Back"
      />
      <KeyboardAwareScrollView>
        <View style={styles.headerImage}>
          {image !== null ? (
            <Image style={styles.image} source={{uri: image}} />
          ) : null}
          <TouchableOpacity onPress={() => onaddImage()}>
            <Text style={styles.image_add}>Add Image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Input
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
          <Input
            label="Place"
            placeholder="Place"
            value={place}
            onChangeText={(place) => setPlace(place)}
          />
          <Text style={styles.content_date_label}>Date</Text>
          <TouchableOpacity
            style={styles.content_date}
            onPress={showDatePicker}>
            {date.length == 0 ? (
              <Text
                style={[
                  styles.content_date_select_text,
                  {color: 'rgb(120, 120, 120)'},
                ]}>
                DD-MM-YYYY
              </Text>
            ) : (
              <Text style={styles.content_date_select_text}>{date}</Text>
            )}
            <Image
              style={styles.content_date_select_icon}
              source={images.calendar}
            />
          </TouchableOpacity>
          <Text style={styles.content_guest_text}>Guest</Text>
          <TouchableOpacity
            style={styles.content_guest}
            onPress={() => setISVisible(true)}>
            {date.length == 0 ? (
              <Text
                style={[
                  styles.content_guest_select,
                  {color: 'rgb(120, 120, 120)'},
                ]}>
                Guest
              </Text>
            ) : (
              <Text style={[styles.content_guest_select, {color: '#000'}]}>
                {quest}
              </Text>
            )}
            <Image
              style={styles.content_guest_icon}
              source={images.guest_list}
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
  container: {
    flex: 1,
  },
  headerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  image: {
    height: 150,
    width: 300,
  },
  image_add: {
    color: '#16a085',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  content: {
    flex: 3,
    marginHorizontal: 20,
  },
  content_date_label: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#4d4d4d',
  },
  content_date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginVertical: 10,
    borderBottomWidth: 0.4,
    marginHorizontal: 10,
  },
  content_date_select_text: {
    marginBottom: 10,
    fontSize: 16,
    color: '#000',
  },
  content_date_select_icon: {
    width: 25,
    height: 25,
    marginRight: 25,
    marginBottom: 10,
  },
  content_guest_text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#4d4d4d',
  },
  content_guest: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginVertical: 10,
    borderBottomWidth: 0.4,
    marginHorizontal: 10,
  },
  content_guest_select: {
    marginBottom: 10,
    fontSize: 16,
  },
  content_guest_icon: {
    width: 25,
    height: 25,
    marginRight: 25,
    marginBottom: 10,
  },
});
