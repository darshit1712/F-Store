import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Card from '../Components/Card';
import CustomHeader from '../Components/CustomHeader';
import Search from '../Components/Search';
import storage, {firebase} from '@react-native-firebase/storage';
import {Context} from '../context/FStoreContext';
import images from '../utility/ImageConst';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const {state} = React.useContext(Context);
  const [serach, setSerach] = useState('');
  const [lists, setLists] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('UserEvent')
      .orderBy('date', 'asc')
      .onSnapshot((snapshot) => {
        const lists = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLists(lists);
      });
  }, []);
  const onLikePress = (item) => {
    if (item.like && item.like.length > 0) {
      let index = item.like.findIndex((likeItem) => {
        return likeItem.id === state.userData;
      });
      if (index > -1) {
        let newData = [...item.like];
        newData[index] = {
          ...newData[index],
          isSelected: !newData[index].isSelected,
        };
        firebase.firestore().collection('UserEvent').doc(item.id).update({
          like: newData,
        });
      } else {
        let newUser = [
          {
            id: state.userData,
            isSelected: true,
          },
        ];
        let finalData = [...item.like, ...newUser];
        firebase.firestore().collection('UserEvent').doc(item.id).update({
          like: finalData,
        });
      }
    } else {
      firestore()
        .collection('UserEvent')
        .doc(item.id)
        .set(
          {
            like: [
              {
                id: state.userData,
                isSelected: true,
              },
            ],
          },
          {merge: true},
        );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Home"
        navigation={() => {
          navigation.openDrawer();
        }}
        lefticons={images.menu}
      />

      <Search
        placeholder="Serach"
        value={serach}
        onChangeText={(event) => {
          setSerach(event);
        }}
      />
      <FlatList
        data={lists.filter((e) => {
          if (serach == '') {
            return e;
          } else if (
            e.date.toString().includes(serach.toString()) ||
            e.Title.toLowerCase().includes(serach.toLowerCase()) ||
            e.Description.toLowerCase().includes(serach.toLowerCase()) ||
            e.Place.toLowerCase().includes(serach.toLowerCase())
          ) {
            return e;
          }
        })}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity>
              <Card
                guest={item.Guest.length}
                icon={item.like}
                image={item.image}
                title={item.Title}
                description={item.Description}
                onPress={() => {
                  onLikePress(item);
                }}
                date={item.date}
                place={item.Place}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
