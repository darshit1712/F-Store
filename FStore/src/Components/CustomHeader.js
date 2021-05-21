import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const CustomHeader = ({
  title,
  navigation,
  navigate,
  lefticons,
  leftname,
  righticons,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation} style={styles.left_header}>
          <Image
            style={styles.left_header_icon}
            source={lefticons}
            resizeMode="contain"
          />
          <Text style={{fontSize: 18}}>{leftname}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.left_header_style}>
        <Text style={styles.left_header_title}>{title}</Text>
      </View>

      <View style={styles.right_header}>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={navigate}>
          <Image style={styles.right_header_icon} source={righticons} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  left_header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left_header_icon: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  left_header_style: {
    flex: 2,
    justifyContent: 'center',
  },
  left_header_title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  right_header: {
    flex: 1,
    justifyContent: 'center',
  },
  right_header_icon: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
});
export default CustomHeader;
