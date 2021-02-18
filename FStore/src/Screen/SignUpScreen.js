import React, {useState, useContext, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platfrom,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Btn from '../Components/Btn';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Input from '../Components/Input';
import Checkbox from '../Components/Checkbox';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import {Context} from '../context/FStoreContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../utility/ImageConst';

const SignUpScreen = ({navigation}) => {
  const {signup, state, Userdetils} = useContext(Context);

  const reference = storage().ref('black-t-shirt-sm.png');
  const [isLoading, setIsloading] = useState(false);
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmpassword, setComfirmpassword] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(true);
  const[showcomfimpassword,setShowComfimpassword]=useState(false)
  const handleConfirm = (date) => {
    setDob(moment(date).format('DD-MM-YYYY'));
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onSignUpPress = () => {
    navigation.navigate('SignIn');
  };

  const onAddprofile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      const uriImage = image.sourceURL;
      setImage(uriImage);
    });
  };

  const onsubmit = async (e) => {
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email validation
    // if (image == '') {
    //   alert('place add image');
    // } else if (fname == '') {
    //   alert('Enter the First_Name');
    // } else if (lname == '') {
    //   alert('Enter the Last_Name');
    // } else if (email == '') {
    //   alert('Enter the Email');
    // } else if (reg.test(email) !== true) {
    //   alert('Enter the valid Email');
    // } else if (dob == '') {
    //   alert('Enter the Date of birthday');
    // } else if (gender == '') {
    //   alert('seclect a gender');
    // } else if (password == '') {
    //   alert('Enter the password');
    // } else if (password !== comfirmpassword) {
    //   alert('Passwords must be same');
    // } else {
    //   const imageUrl = await uploadImage();
    //   // Userdetils(fname, lname, dob, imageUrl, gender, email);
    //   signup(email, password);
    // }
    signup(email, password);
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

    const storageRef = firebase.storage().ref(`User/${filename}`);
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
      <KeyboardAwareScrollView>
        <View style={styles.header}>
          <Text style={{fontSize: 24}}>Sign Up</Text>
        </View>
        {isLoading && (
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        )}
        <View style={styles.content}>
          <TouchableOpacity
            style={{flexDirection: 'row', justifyContent: 'center'}}
            onPress={onAddprofile}>
            {image != null ? (
              <Image
                style={styles.header_icon}
                source={{uri: image}}
              />
            ) : (
              <Image
                style={styles.header_iconCamera}
                source={images.camera || {uri: image}}
              />
            )}
          </TouchableOpacity>

          <Input
            placeholder="First_Name*"
            value={fname}
            onChangeText={(fname) => setFName(fname)}
          />
          <Input
            placeholder="Last_Name*"
            value={lname}
            onChangeText={(lname) => setLName(lname)}
          />
          <Input
            placeholder="Email*"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.datestyles}>
            {dob.length == 0 ? (
              <Text
                style={styles.date_text}>
                Date of Birthday*
              </Text>
            ) : (
              <Text style={{marginBottom: 10, color: '#000', fontSize: 16}}>
                {dob}
              </Text>
            )}
          </TouchableOpacity>
          <Text
            style={styles.gender_styles}>
            Gender
          </Text>
          <View
            style={styles.gender_chechbox}>
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
            placeholder="Password*"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={show}
            onPress={()=>setShow(!show)}
            icon={show?images.visible :images.invisible}
          />
          <Input
            placeholder="Confirm Password*"
            value={comfirmpassword}
            onChangeText={(comfirmpassword) =>
              setComfirmpassword(comfirmpassword)
            }
            secureTextEntry={showcomfimpassword}
            onPress={()=>setShowComfimpassword(!showcomfimpassword)}
            icon={showcomfimpassword ?images.visible:images.invisible}
          />
          <Btn type="outline" title="Sign UP" onPress={onsubmit} />
        </View>
        <View style={styles.footer}>
          <Text style={{color: '#000'}}>Already have an Account?</Text>
          <TouchableOpacity
            style={styles.signup_header}
            onPress={() => navigation.navigate('SignIn')}>
            <Image
              source={images.back}
              style={styles.signup_icon}
            />
            <Text style={styles.sign_text}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          maximumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: '5%',
    },
    header_icon: {
        height: 150,
        width: 150,
        borderRadius: 200,
    },
    header_iconCamera:{
        width: 60, 
        height: 60, 
        marginLeft: 10
    },
    datestyles:{
        borderBottomWidth: 0.5,
        marginBottom: 30,
    },
    date_text:{
        marginTop:20,
        marginBottom:10,
        color: 'rgb(120, 120, 120)',
        fontSize: 18,
        marginHorizontal:5
    },
    gender_styles:{
        marginBottom: 20,
        color: 'rgb(120, 120, 120)',
        fontSize: 18,
    },
    gender_chechbox:{
        flexDirection: 'row',
        marginBottom: 5,
        marginHorizontal:5
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: '5%',
    },
    footer: {
        color: '#1abc9c',
        fontSize: 18,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    error: {
        fontSize: 18,
        color: 'red',
    },
    signup_header:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    signup_icon:{
        width: 18, height: 18, marginHorizontal: 2
    },
    sign_text:{
        color: '#000', 
        fontWeight: 'bold', 
        fontSize: 18
    }
});

export default SignUpScreen;