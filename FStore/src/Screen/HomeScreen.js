import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Card from '../Components/Card';
import CustomHeader from '../Components/CustomHeader';
import Search from '../Components/Search';

const HomeScreen = ({navigation}) => {
  const [like, setLike] = useState(true);

  const onlike = () => {
    setLike(like === true ? false : true);
  };
  return (
    <SafeAreaView style={styles.contioner}>
      <CustomHeader
        title="Home"
        navigation={() => {
          navigation.openDrawer();
        }}
        lefticons={require('../Image/menu.png')}
      />
      <Search />
      <ScrollView>
        <Card
          like={like}
          image={require('../Image/event.jpeg')}
          title="Title"
          descripation="it is good"
          onPress={onlike}
          date="12-12-1953"
        />
        <Card
          like={like}
          //image={require('../Image/event.jpeg')}
          title="Title1"
          descripation="it is good"
          onPress={onlike}
          date="12-12-1955"
        />
         <Card
          like={like}
          image={require('../Image/event.jpeg')}
          title="Title1"
          descripation="it is good"
          onPress={onlike}
          date="12-12-1955"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contioner: {
    flex: 1,
  },
});
