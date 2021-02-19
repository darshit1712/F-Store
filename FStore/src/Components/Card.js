import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import images from '../utility/ImageConst';
import Checkbox from './Checkbox';

const Card = ({like, title, date, description, onPress, image, place}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImageBackground
          style={styles.image_background}
          source={{uri: image}}
          blurRadius={5}>
          <View style={{flex: 1}}>
          <Checkbox 

          />
            {like ? (
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={onPress}>
                <Image style={styles.image} source={images.like_black} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{flex: 1, alignItems: 'flex-end'}}
                onPress={onPress}>
                <Image style={styles.image} source={images.like} />
              </TouchableOpacity>
            )}
            <View style={styles.card_content}>
              <Text style={styles.card_title}>{title}</Text>
              <Text style={styles.card_date}>{date}</Text>
            </View>
          </View>
        </ImageBackground>
        <View>
          <View style={styles.card_footer}>
            <Text style={styles.card_footer_styles}>Place :-</Text>
            <Text style={styles.card_footer_place}>{place}</Text>
          </View>
          <Text style={styles.card_footer_styles}>Description</Text>
          <Text style={styles.card_footer_description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: '2%',
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  image_background: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  image: {
    width: 30,
    height: 30,
    margin: 10,
  },
  card_content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  card_title: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  card_date: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    fontWeight: '500',
  },
  card_footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card_footer_styles: {
    color: '#000',
    fontSize: 22,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  card_footer_place: {
    color: '#000',
    fontSize: 18,
    marginLeft: 5,
    fontWeight: '300',
  },
  card_footer_description: {
    color: '#000',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '300',
  },
});
