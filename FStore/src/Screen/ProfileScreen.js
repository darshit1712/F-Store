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
  const {state} = useContext(Context);
  console.log(state.detils);
useEffect(() => {

}, [state.detils])
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
              source={{uri:'http://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png' }}
            />
          </View>
        </View>
        <View style={{flex: 3, marginHorizontal: 20, marginVertical: 20}}>
          <TextInput
            label="First Name"
            placeholder="First Name"
            value={state.fname}
            editable={false}
          />
          <TextInput
            label="Last Name"
            placeholder="First Name"
           // value={state.lname}
            editable={false}
          />
          <TextInput
            label="Email"
            placeholder="First Name"
           // value={state.email}
            editable={false}
          />
          <TextInput
            label="Date of birthday"
            placeholder="DD-MM-YYYY"
            //value={state.detils.dob}
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
              marginBottom: 10,
            }}>
            <Checkbox label="Male" 
           // checked={state.male} 

            />
            <Checkbox label="FeMale" 
            //checked={state.female}
             />
            <Checkbox label="Other" 
            //checked={state.other}
             />
          </View>
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
