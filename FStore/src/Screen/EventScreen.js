import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';
const EventScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <View>
            <CustomHeader title='Event' navigation={()=>{navigation.navigate("EditEvent")}} righticons={require('../Image/add-event.png')}/>
                <Text>EventScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default EventScreen

const styles = StyleSheet.create({})
