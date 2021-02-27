import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Btn from '../Components/Btn';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomHeader from '../Components/CustomHeader';
import Input from '../Components/Input';
import Checkbox from '../Components/Checkbox';
import moment from 'moment';
// import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Context} from '../context/FStoreContext';
import storage, {firebase} from '@react-native-firebase/storage';
import images from '../utility/ImageConst';

const EditeProfileScreen = ({navigation}) => {
  const {state, gettoken, Getuser, UpadataUsedetils} = useContext(Context);
  const [id, setId] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [show, setShow] = useState(false);
  // Todo:- gender male,female and other useState
  // const [checkboxes, setCheckBoxes] = useState([
  //   {id: 'male', title: 'Male'},
  //   {id: 'female', title: 'female'},
  //   {id: 'other', title: 'other'},
  // ]);
  const [checkedId, setCheckedId] = useState(0);

  useEffect(() => {
    gettoken();
    Getuser();
    state.user.map((e) => {
      if (e.id === state.userData) {
        setId(e.id);
        setFName(e.FirstName);
        setLName(e.LastName);
        setEmail(e.Email);
        setDob(e.Dob);
        setGender(e.Gender);
        setImage(e.Image);
      }
    });
  }, []);

  const onchangegender = (checkedId) => {
    console.log(checkedId);
    setCheckedId(checkedId);
  };

  const handleConfirm = (date) => {
    setDob(moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onAddImage = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 200,
      cropping: true,
      compressImageQuality: 0,
    }).then((image) => {
      setImage(image.sourceURL);
    });
  };
  const onUpdate = async () => {
    const imageUrl = await uploadImage();
    if (imageUrl == null) {
      UpadataUsedetils(fname, lname, email, image, dob, gender, id);
    } else {
      UpadataUsedetils(fname, lname, email, imageUrl, dob, gender, id);
    }
  };
  const uploadImage = async () => {
    if (image === null) {
      return image;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = firebase.storage().ref(`User/${filename}`);
    const task = storageRef.putFile(uploadUri);
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="EditeProfile"
        navigation={() => {
          navigation.goBack();
        }}
        lefticons={images.back}
        leftname="Back"
      />
      <KeyboardAwareScrollView>
        <View style={styles.header}>
          {isLoading && (
            <ActivityIndicator size="large" style={styles.loadingIndicator} />
          )}
          <View>
            <Image style={styles.header_image} source={{uri: image}} />
          </View>
          <TouchableOpacity onPress={onAddImage}>
            <Text style={styles.header_text}>Edit profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Input
            label="First Name"
            placeholder="First Name"
            value={fname}
            onChangeText={(fname) => setFName(fname)}
          />
          <Input
            label="Last Name"
            placeholder="First Name"
            value={lname}
            onChangeText={(lname) => setLName(lname)}
          />
          <Input
            label="Email"
            placeholder="First Name"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <Text style={styles.content_date_label}>Date of Birthday</Text>
          <TouchableOpacity
            style={styles.content_date_text}
            onPress={showDatePicker}>
            {dob.length == 0 ? (
              <Text style={styles.content_date_unselect}>DD-MM-YYYY</Text>
            ) : (
              <View style={styles.content_date_select}>
                <Text style={styles.content_date_select_text}> {dob}</Text>
                <Image
                  style={styles.content_date_select_icon}
                  source={images.calendar}
                />
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.content_gender}>Gender</Text>
          <View style={styles.content_gender_chechbox}>
            {/* Todo:-gender second methods male female and other  */}
            {/* {checkboxes.map((e) => {
              return (
                <Checkbox
                  key={e.id}
                  label={e.title}
                  checked={e.title == checkedId}
                  onChange={() => onchangegender(e.title)}
                />
              );
            })} */}
            <Checkbox
              label="Male"
              onChange={() => setGender('male')}
              checked={gender == 'male'}
            />
            <Checkbox
              label="FeMale"
              onChange={() => setGender('female')}
              checked={gender == 'female'}
            />
            <Checkbox
              label="Other"
              onChange={() => setGender('other')}
              checked={gender == 'other'}
            />
          </View>
          <Input
            label="Password"
            placeholder="Change Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={show}
            onPress={() => setShow(!show)}
            icon={show ? images.visible : images.invisible}
          />
          <Btn title="Save" onPress={() => onUpdate()} />
        </View>
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

export default EditeProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_image: {
    height: 150,
    width: 150,
    borderRadius: 200,
  },
  header_text: {
    color: '#1abc9c',
    marginTop: 5,
  },
  content: {
    flex: 3.5,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  content_date_label: {
    fontSize: 16,
    color: '#4d4d4d',
  },
  content_date_text: {
    marginBottom: 10,
    marginVertical: 10,
    borderBottomWidth: 0.4,
    marginHorizontal: 5,
  },
  content_date_unselect: {
    marginBottom: 10,
    fontSize: 16,
    color: 'rgb(120, 120, 120)',
  },
  content_date_select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  content_date_select_text: {
    fontSize: 18,
    color: '#000',
  },
  content_date_select_icon: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  content_gender: {
    marginTop: 10,
    marginBottom: 10,
    color: 'rgb(120, 120, 120)',
    fontSize: 18,
  },
  content_gender_chechbox: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  fromText: {
    fontSize: 18,
  },
  frominput: {
    flex: 1,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
});
