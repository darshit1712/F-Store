import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Btn from '../Components/Btn';
import Input from '../Components/Input';
import {Context} from '../context/FStoreContext';
import images from '../utility/ImageConst';

const SignInScreen = ({navigation}) => {
  const {signIn, state, Getuser} = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    Getuser();
  }, []);

  const onSumbmitNavigation = (email, password) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '') {
      alert('Enter the email');
    } else if (password == '') {
      alert('password is not correct');
    } else if (reg.test(email) !== true) {
      alert('Enter the valid Email');
    } else {
          signIn(email, password);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoStyle}>
        <Image style={styles.ImageStyles} source={images.logo} />
      </View>
      <View style={styles.content}>
        <Input
          label="Email"
          placeholder="user@gmail.com"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          label="Password"
          placeholder="enter password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={show}
          icon={show ? images.visible :images.invisible}
          onPress={()=>setShow(!show)}
        />
        <Btn
          title="Sign In"
          type="outline"
          onPress={() => {
            onSumbmitNavigation(email, password);
          }}
        />
      </View>
      {isLoading && (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      )}
      <View style={styles.footer}>
        <Text style={{color: '#000'}}>Don't have a Account??</Text>
        <TouchableOpacity
          style={styles.signup_header}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Sign Up</Text>
          <Image source={images.is_greater_than} style={styles.signup_icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoStyle: {
    alignItems: 'center',
    marginBottom: '6%',
  },
  ImageStyles: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  content: {
    marginHorizontal: 20,
    marginBottom: '5%',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
  footer: {
    color: '#1abc9c',
    fontSize: 18,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  signup_header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  signupText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 19,
  },
  signup_icon: {
    height: 19,
    width: 19,
    marginHorizontal: 1,
  },
});
