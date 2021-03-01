import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import Input from '../Components/Input';
import Btn from '../Components/Btn';
import {ScrollView} from 'react-native-gesture-handler';
import Checkbox from '../Components/Checkbox';
import {Context} from '../context/FStoreContext';
import images from '../utility/ImageConst';

const ProfileScreen = ({navigation}) => {
  const {signout, state, gettoken, Getuser} = useContext(Context);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    gettoken();
    Getuser();
    if (state.updates !== undefined) {
      setImage(state.updates.imageUrl);
      setFname(state.updates.fname);
      setLname(state.updates.lname);
      setEmail(state.updates.email);
      setDob(state.updates.dob);
      setGender(state.updates.gender);
    } else {
      state.user.map((e) => {
        if (e.id === state.userData) {
          setImage(e.Image);
          setFname(e.FirstName);
          setLname(e.LastName);
          setEmail(e.Email);
          setDob(e.Dob);
          setGender(e.Gender);
        }
      });
    }
  }, [state.updates]);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Profile"
        lefticons={images.menu}
        righticons={images.edit}
        navigation={() => navigation.openDrawer()}
        navigate={() => {
          navigation.navigate('EditeProfile');
        }}
      />
      <ScrollView>
        <View style={styles.header_image}>
          <View>
            <Image style={styles.image} source={{uri: image}} />
          </View>
        </View>
        <View style={styles.content}>
          <Input
            label="First Name"
            placeholder="First Name"
            value={fname}
            editable={false}
          />
          <Input
            label="Last Name"
            placeholder="First Name"
            value={lname}
            editable={false}
          />
          <Input
            label="Email"
            placeholder="Enter the Email"
            value={email}
            editable={false}
          />
          <Input
            label="Date of birthday"
            placeholder="DD-MM-YYYY"
            value={dob}
            editable={false}
          />
          <Text style={styles.content_gender_label}>Gender</Text>
          <View style={styles.content_gender_text}>
            <Text
              style={{marginBottom: 10, fontSize: 20, marginHorizontal: 10}}>
              {gender}
            </Text>
          </View>
          <Btn title="Log Out" onPress={() => signout()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 200,
  },
  content: {
    flex: 3,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  content_gender_label: {
    marginBottom: 10,
    color: 'rgb(120, 120, 120)',
    fontSize: 18,
  },
  content_gender_text: {
    marginBottom: 50,
    borderBottomWidth: 0.4,
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
