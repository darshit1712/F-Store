import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CustomHeader from '../Components/CustomHeader'

const EditeProfileScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <View>
            <CustomHeader title='EditeProfile'  navigation={()=>{navigation.goBack()}} lefticons={require('../Image/back.png')}  leftname='Back'/>
                <Text>EditeProfileScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default EditeProfileScreen

const styles = StyleSheet.create({})
