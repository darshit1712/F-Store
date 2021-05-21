import React, {useState, useEffect, useContext} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Image,
  FlatList,
  Button,
} from 'react-native';
import {LongPressGestureHandler} from 'react-native-gesture-handler';
import {Context} from '../context/FStoreContext';
import images from '../utility/ImageConst';
import Btn from './Btn';
import Checkbox from './Checkbox';

const EventModal = ({isVisible, setISVisible, setGuest, guest}) => {
  const {signIn, state, Getuser} = useContext(Context);
  const [list, setList] = useState([]);
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    let data = [];
    Getuser();
    state.user.map((e) => {
      data.push(e.Email);
      setList(data);
    });
  }, []);
  const onADD = (item) => {
    // const updatedData = list.map((element) => {
    //   if (element.id === item.id) {
    //     return {
    //       ...element,
    //       isSelected: element.isSelected ? !element.isSelected : true,
    //     };
    //   }
    //   return element;
    // });
    // setDatas([...updatedData]);

    if (datas) {
      console.log('datas', datas);
      var demo = [...datas];
    } else {
      var demo = [];
    }
    demo.push(item);
    setDatas(demo);
  };
  const onsubmit = () => {
    setISVisible(!isVisible);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        supportedOrientations={['portrait', 'landscape']}>
        <View style={styles.centered}>
          <View style={styles.modalView}>
            <View style={styles.modal_header}>
              <Text style={{fontSize: 24}}>Guest</Text>
              <Pressable style={styles.button} onPress={() => onsubmit()}>
                <Image style={styles.header_image} source={images.cancel} />
              </Pressable>
            </View>

            <FlatList
              data={list}
              keyExtractor={(index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <View style={styles.content}>
                    <Checkbox
                      label={item}
                      onChange={() => onADD(item)}
                      onConfirm={() => onADD(item)}
                    />
                  </View>
                );
              }}
            />
            <Btn
              title="Confirm"
              onPress={() => {
                setGuest(datas);
                onsubmit();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default EventModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header_image: {
    height: 25,
    width: 25,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
