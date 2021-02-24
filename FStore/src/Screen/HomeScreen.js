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
  const [id, setId] = useState('');
  const [itemlike, setItemLike] = useState(false);

  useEffect(() => {
    setId(state.userData);
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
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity>
              <Card
                guest={item.Guest.length}
                icon={itemlike ? images.like : images.like_black}
                image={item.image}
                title={item.Title}
                description={item.Description}
                onPress={() => {
                  if (item.like.length > 0) {
                    let data = [];
                    let finaldata = [];

                    item.like.map((likeItem) => {
                      let likeValue = likeItem;
                      if (likeValue.id === state.userData) {
                        likeValue.isSelected = !likeValue.isSelected;
                        data.push(likeValue);
                        firebase
                          .firestore()
                          .collection('UserEvent')
                          .doc(item.id)
                          .update({
                            like: data,
                          });
                      } else {
                        let newdata = [];
                        console.log('data else:::-', data);
                        if (state.userData !== likeValue.id) {
                          newdata.push({
                            isSelected: true,
                            id: state.userData,
                          });
                          data.push(likeValue);
                          finaldata = data.concat(newdata);
                          console.log('final data:::--', finaldata);
                          firebase
                            .firestore()
                            .collection('UserEvent')
                            .doc(item.id)
                            .update({
                              like: finaldata,
                            });
                        }
                      }
                    });
                  }
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
