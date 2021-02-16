import React, {useState, useContext,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import TextInput from '../Components/TextInput';
import Btn from '../Components/Btn';
import {ScrollView, State} from 'react-native-gesture-handler';
import Checkbox from '../Components/Checkbox';
import {Context} from '../context/FStoreContext';

const ProfileScreen = ({navigation}) => {
  const {signout,state,gettoken,Getuser} = useContext(Context);
  const[fname,setFname]=useState('');
  const[lname,setLname]=useState('');
  const[dob,setDob]=useState('');
  const[email,setEmail]=useState('');
  const[gender,setGender]=useState('');
  const[image,setImage]=useState(null);
  
useEffect(() => {
  gettoken();
  Getuser();
  if(state.updates==undefined){
    state.user.map(e=>{
      if(e.Email===state.userData){
         setImage(e.Image)
         setFname(e.FirstName)
         setLname(e.LastName)
         setEmail(e.Email)
         setDob(e.Dob)
         setGender(e.Gender)
       }
   });
  }else{
    setImage(state.updates.imageUrl)
    setFname(state.updates.fname)
    setLname(state.updates.lname)
    setEmail(state.updates.email)
    setDob(state.updates.dob)
    setGender(state.updates.gender)
  }
 
},[state.updates])
  return (
    <SafeAreaView style={styles.contioner}>
      <CustomHeader
        title="Profile"
        lefticons={require('../Image/menu.png')}
        righticons={require('../Image/edit.png')}
        navigation={() => navigation.openDrawer()}
        navigate={() => {
          navigation.navigate('EditeProfile');
        }}
      />
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View>
            <Image
              style={{height: 150, width: 150, borderRadius: 200}}
              source={{uri: image }}
            />
          </View>
        </View>
        <View style={{flex: 3, marginHorizontal: 20, marginVertical: 20}}>
          <TextInput
            label="First Name"
            placeholder="First Name"
            value={fname}
            editable={false}
          />
          <TextInput
            label="Last Name"
            placeholder="First Name"
            value={lname}
            editable={false}
          />
          <TextInput
            label="Email"
            placeholder='Enter the Email'
            value={email}
            editable={false}
          />
          <TextInput
            label="Date of birthday"
            placeholder="DD-MM-YYYY"
            value={dob}
            editable={false}
          />
          <Text
            style={{
              marginHorizontal: 10,
              marginBottom: 10,
              color: 'rgb(120, 120, 120)',
              fontSize: 18,
            }}>
            Gender
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginBottom: 20,
            }}>
              <Checkbox label='Male'
                checked={gender=='male'}
                />
              <Checkbox label='FeMale'  
              checked={gender=='female'}
              />
              <Checkbox label='Other' 
                checked={gender=='other'}
              />
          </View>

          <Btn title='Log Out' onPress={()=> signout()}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  contioner: {
    flex: 1,
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
