import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import images from '../utility/ImageConst';

const Search = ({placeholder, value, onChangeText}) => {
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={images.search} />
      <TextInput
        style={{fontSize: 24}}
        placeholder={placeholder}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  header: {
    borderWidth: 1,
    marginHorizontal: 20,
    borderColor: '#1abc9c',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowRadius: 30,
    marginBottom: 10,
  },
  image: {
    width: 25,
    height: 25,
    margin: 10,
  },
});
