import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CustomHeader from '../Components/CustomHeader'

const EditEventScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <View>
            <CustomHeader title='EditeEvent'  navigation={()=>{navigation.goBack()}} lefticons={require('../Image/back.png')}  leftname='Back'/>
                <Text>EditEventScreen </Text>
            </View>
        </SafeAreaView>
    )
}

export default EditEventScreen

const styles = StyleSheet.create({})
