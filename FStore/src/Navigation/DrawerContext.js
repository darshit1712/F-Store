import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Context} from '../context/FStoreContext';
import images from '../utility/ImageConst';

const DrawerContext = (props) => {
  const {signout, state, gettoken, Getuser} = useContext(Context);
  const [fname, setFname] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    gettoken();
    Getuser();
    if (state.updates == undefined) {
      setFname('xyz');
    } else {
      setImage(state.updates.imageUrl);
      setFname(state.updates.fname);
    }
  }, [state.updates]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header_image}>
        {image!=null? 
          <Image source={{uri: image}} style={styles.image} /> :
          <Image source={images.profile} style={styles.image} />
        }
        <TouchableOpacity
          onPress={() => props.navigation.navigate('EditeProfile')}>
          <Text style={styles.header_text}>Edit profile</Text>
        </TouchableOpacity>
        </View>
        <Text style={{fontSize: 16}}>Welcome to {fname}</Text>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.content_menu}
            onPress={() => props.navigation.navigate('Home')}>
            <Image style={styles.content_menu_icon} source={images.home} />
            <Text style={styles.content_menu_text}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.content_menu}
            onPress={() => props.navigation.navigate('Favorit')}>
            <Image style={styles.content_menu_icon} source={images.heart} />
            <Text style={styles.content_menu_text}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.content_menu}
            onPress={() => props.navigation.navigate('Event')}>
            <Image style={styles.content_menu_icon} source={images.event} />
            <Text style={styles.content_menu_text}>Event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.content_menu}
            onPress={() => props.navigation.navigate('Editevent')}>
            <Image style={styles.content_menu_icon} source={images.edit} />
            <Text style={styles.content_menu_text}>EditeEvent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.content_menu}
            onPress={() => props.navigation.navigate('Profile')}>
            <Image style={styles.content_menu_icon} source={images.user} />
            <Text style={styles.content_menu_text}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => signout()}>
            <Text style={styles.text}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrawerContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  header_image: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 200,
  },
  header_text: {
    color: '#1abc9c',
    marginTop: 5,
  },
  content: {
    flex: 4,
    marginLeft: '3%',
  },
  content_menu: {
    marginBottom: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content_menu_icon: {
    height: 25,
    width: 25,
  },
  content_menu_text: {
    fontSize: 20,
    margin: 10,
  },
  footer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text: {
    backgroundColor: '#16a085',
    paddingHorizontal: 50,
    paddingVertical: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});
